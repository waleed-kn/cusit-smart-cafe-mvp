import React, { useState } from 'react';
import AIInsightsWidget from '../components/AIInsightsWidget';
import { DollarSign, ShoppingBag, Users, Calendar, Plus, Trash2, Edit2, CheckCircle2, TrendingUp, Sparkles, Download, BarChart3, Settings, AlertCircle, Clock, Eye, EyeOff, ChevronDown, Filter, Search } from 'lucide-react';

export default function AdminDashboard({
  menuItems,
  onAddMenuItem,
  onDeleteMenuItem,
  orders,
  seats,
  user
}) {
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'menu-manager' | 'users' | 'reports' | 'seats'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Add menu item form states
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('Coffee');
  const [itemPrice, setItemPrice] = useState('');
  const [itemPrep, setItemPrep] = useState('5 mins');
  const [itemDesc, setItemDesc] = useState('');
  const [itemImg, setItemImg] = useState('https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=400&q=80');

  // Mock user data
  const mockUsers = [
    { id: 1, name: 'Ahmed Ali', email: 'ahmed@cusit.edu.pk', role: 'Student', joinDate: '2024-01-15', orders: 24, status: 'active' },
    { id: 2, name: 'Fatima Khan', email: 'fatima@cusit.edu.pk', role: 'Student', joinDate: '2024-02-20', orders: 18, status: 'active' },
    { id: 3, name: 'Hassan Raza', email: 'hassan@cusit.edu.pk', role: 'Student', joinDate: '2024-01-10', orders: 32, status: 'active' },
    { id: 4, name: 'Amina Qureshi', email: 'amina@cusit.edu.pk', role: 'Staff', joinDate: '2024-01-05', orders: 5, status: 'inactive' },
    { id: 5, name: 'Ali Hussain', email: 'ali@cusit.edu.pk', role: 'Student', joinDate: '2024-03-01', orders: 42, status: 'active' },
  ];

  // Stats calculation
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0) + 12500; // adding baseline mock revenue
  const totalOrders = orders.length + 84;
  const activeReservationCount = seats.filter(s => s.status === 'reserved').length;
  const tablePercentage = Math.round((activeReservationCount / seats.length) * 100);
  const activeUsers = mockUsers.filter(u => u.status === 'active').length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  // Export functions
  const exportToCSV = (data, filename) => {
    const headers = Object.keys(data[0]);
    const csv = [headers.join(','), ...data.map(row =>
      headers.map(header => {
        const value = row[header];
        return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
      }).join(',')
    )].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${Date.now()}.csv`;
    a.click();
  };

  const exportToPDF = (content, filename) => {
    const printWindow = window.open('', '', 'height=400,width=800');
    printWindow.document.write(`
      <html><head><title>${filename}</title>
      <style>
        body { font-family: Arial; margin: 20px; }
        h1 { color: #4f8cff; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; font-weight: bold; }
      </style></head><body>${content}</body></html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 250);
  };

  const handleExportOrders = () => {
    const data = orders.map(o => ({
      OrderID: o.id,
      Customer: o.userName,
      Items: o.items.map(i => `${i.quantity}x ${i.name}`).join('; '),
      Status: o.status,
      Total: `Rs. ${o.total}`,
      Date: new Date().toLocaleDateString()
    }));
    exportToCSV(data, 'orders-report');
  };

  const handleExportUsers = () => {
    const data = mockUsers.map(u => ({
      Name: u.name,
      Email: u.email,
      Role: u.role,
      JoinDate: u.joinDate,
      Orders: u.orders,
      Status: u.status
    }));
    exportToCSV(data, 'users-report');
  };

  const handleExportSales = () => {
    const data = [
      { Day: 'Monday', Revenue: 12500, Orders: 45 },
      { Day: 'Tuesday', Revenue: 15300, Orders: 52 },
      { Day: 'Wednesday', Revenue: 18700, Orders: 61 },
      { Day: 'Thursday', Revenue: 14200, Orders: 48 },
      { Day: 'Friday', Revenue: 22500, Orders: 78 },
      { Day: 'Saturday', Revenue: 8900, Orders: 25 },
      { Day: 'Sunday', Revenue: 7200, Orders: 22 }
    ];
    exportToCSV(data, 'sales-analytics');
  };

  const handleAddNewItem = (e) => {
    e.preventDefault();
    if (!itemName || !itemPrice) return;

    const newItem = {
      id: menuItems.length + 1,
      name: itemName,
      category: itemCategory,
      price: parseFloat(itemPrice),
      rating: 5.0,
      reviews: 1,
      description: itemDesc || "Freshly cooked CUSIT cafeteria special.",
      image: itemImg,
      available: true,
      prepTime: itemPrep,
      options: {
        size: ["Regular", "Large (+80)"],
        sweetness: ["Medium", "Sugar Free"]
      }
    };

    onAddMenuItem(newItem);

    // Reset Form
    setItemName('');
    setItemPrice('');
    setItemDesc('');
    alert(`Successfully added ${itemName} to the Smart Café menu!`);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-profile">
          <img src={user?.avatar} alt={user?.name} className="user-avatar" style={{ width: '48px', height: '48px' }} />
          <div className="sidebar-profile-info">
            <h4>{user?.name}</h4>
            <p>{user?.department}</p>
          </div>
        </div>

        <ul className="sidebar-menu">
          <li
            className={`sidebar-menu-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <TrendingUp size={18} />
            <span>Sales Analytics</span>
          </li>
          <li
            className={`sidebar-menu-item ${activeTab === 'menu-manager' ? 'active' : ''}`}
            onClick={() => setActiveTab('menu-manager')}
          >
            <Plus size={18} />
            <span>Manage Menu</span>
          </li>
          <li
            className={`sidebar-menu-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={18} />
            <span>Manage Users</span>
          </li>
          <li
            className={`sidebar-menu-item ${activeTab === 'seats' ? 'active' : ''}`}
            onClick={() => setActiveTab('seats')}
          >
            <Calendar size={18} />
            <span>Seat Management</span>
          </li>
          <li
            className={`sidebar-menu-item ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <BarChart3 size={18} />
            <span>Reports</span>
          </li>
        </ul>
      </aside>

      {/* Main Admin Console Panel */}
      <main className="dashboard-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', textAlign: 'left', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>Administrator Control Panel</h1>
            <p style={{ color: 'var(--text-muted)' }}>Manage operations, analytics, and café resources</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <button
                className="btn btn-secondary"
                onClick={() => setShowExportMenu(!showExportMenu)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Download size={16} />
                Export
                <ChevronDown size={14} />
              </button>
              {showExportMenu && (
                <div className="export-menu" style={{ position: 'absolute', top: '100%', right: 0, background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', zIndex: 10, minWidth: '200px', marginTop: '8px' }}>
                  <button onClick={handleExportOrders} style={{ width: '100%', padding: '12px 16px', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.9rem', borderBottom: '1px solid var(--border-color)' }}>Orders Report</button>
                  <button onClick={handleExportUsers} style={{ width: '100%', padding: '12px 16px', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.9rem', borderBottom: '1px solid var(--border-color)' }}>Users List</button>
                  <button onClick={handleExportSales} style={{ width: '100%', padding: '12px 16px', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>Sales Analytics</button>
                </div>
              )}
            </div>
            <span className="status-badge pending" style={{ gap: '8px', padding: '8px 16px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', whiteSpace: 'nowrap' }}>
              <Sparkles size={16} />
              System Active
            </span>
          </div>
        </div>

        {/* Stats Summary Widgets */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-info">
              <p>Total Revenue Today</p>
              <h3>Rs. {totalRevenue}</h3>
              <span>Wallet + Card earnings</span>
            </div>
            <div className="stat-card-icon" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
              <DollarSign size={24} />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-info">
              <p>Orders Placed Today</p>
              <h3>{totalOrders} Orders</h3>
              <span>Online pre-orders</span>
            </div>
            <div className="stat-card-icon" style={{ backgroundColor: 'var(--bg-preparing)', color: 'var(--color-preparing)' }}>
              <ShoppingBag size={24} />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-info">
              <p>Active Users</p>
              <h3>342 Students</h3>
              <span>Currently logged in</span>
            </div>
            <div className="stat-card-icon" style={{ backgroundColor: '#f3f4f6', color: '#4b5563' }}>
              <Users size={24} />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-info">
              <p>Table Reservation Rate</p>
              <h3>{tablePercentage}%</h3>
              <span>{activeReservationCount} / {seats.length} Booked</span>
            </div>
            <div className="stat-card-icon" style={{ backgroundColor: 'var(--bg-ready)', color: 'var(--color-ready)' }}>
              <Calendar size={24} />
            </div>
          </div>
        </div>

        {/* Tab 1: Sales Analytics Dashboard */}
        {activeTab === 'analytics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <AIInsightsWidget />
            <div className="analytics-grid">

              {/* SVG Charts Card */}
              <div className="analytics-chart-card">
                <h3 className="dash-card-title" style={{ marginBottom: '20px' }}>Weekly Cafeteria Revenue (Rs. Thousands)</h3>

                <div className="chart-placeholder-svg">
                  <svg viewBox="0 0 500 240" style={{ width: '100%', height: '100%' }}>
                    {/* Grid Lines */}
                    <line x1="50" y1="40" x2="480" y2="40" className="chart-grid-line" />
                    <line x1="50" y1="90" x2="480" y2="90" className="chart-grid-line" />
                    <line x1="50" y1="140" x2="480" y2="140" className="chart-grid-line" />
                    <line x1="50" y1="190" x2="480" y2="190" className="chart-grid-line" />

                    {/* Y-axis Labels */}
                    <text x="15" y="45" fill="var(--text-light)" fontSize="10">Rs. 40k</text>
                    <text x="15" y="95" fill="var(--text-light)" fontSize="10">Rs. 25k</text>
                    <text x="15" y="145" fill="var(--text-light)" fontSize="10">Rs. 10k</text>
                    <text x="15" y="195" fill="var(--text-light)" fontSize="10">Rs. 0</text>

                    {/* Bars (Mon - Sun) */}
                    <rect x="70" y="100" width="30" height="90" rx="4" className="chart-bar" />
                    <rect x="130" y="70" width="30" height="120" rx="4" className="chart-bar" />
                    <rect x="190" y="60" width="30" height="130" rx="4" className="chart-bar" />
                    <rect x="250" y="80" width="30" height="110" rx="4" className="chart-bar" />
                    <rect x="310" y="50" width="30" height="140" rx="4" className="chart-bar" />
                    <rect x="370" y="150" width="30" height="40" rx="4" className="chart-bar" style={{ fill: 'var(--text-light)' }} />
                    <rect x="430" y="160" width="30" height="30" rx="4" className="chart-bar" style={{ fill: 'var(--text-light)' }} />

                    {/* X-axis Labels */}
                    <text x="75" y="215" fill="var(--text-muted)" fontSize="11" fontWeight="bold">Mon</text>
                    <text x="135" y="215" fill="var(--text-muted)" fontSize="11" fontWeight="bold">Tue</text>
                    <text x="195" y="215" fill="var(--text-muted)" fontSize="11" fontWeight="bold">Wed</text>
                    <text x="255" y="215" fill="var(--text-muted)" fontSize="11" fontWeight="bold">Thu</text>
                    <text x="315" y="215" fill="var(--text-muted)" fontSize="11" fontWeight="bold">Fri</text>
                    <text x="375" y="215" fill="var(--text-muted)" fontSize="11" fontWeight="bold">Sat</text>
                    <text x="435" y="215" fill="var(--text-muted)" fontSize="11" fontWeight="bold">Sun</text>
                  </svg>
                </div>
              </div>

              {/* Top selling list */}
              <div className="analytics-chart-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 className="dash-card-title" style={{ marginBottom: '20px' }}>Top Selling Products</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, justifyContent: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                    <strong>1. Karak Cardamom Tea</strong>
                    <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>512 Sold</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                    <strong>2. Spicy Zinger Burger</strong>
                    <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>410 Sold</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                    <strong>3. CUSIT Club Sandwich</strong>
                    <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>320 Sold</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong>4. Masala Fries</strong>
                    <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>290 Sold</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Live Transaction logs */}
            <div className="dash-card">
              <h3 className="dash-card-title" style={{ marginBottom: '20px' }}>Real-Time System Orders log</h3>
              <div className="order-list">
                {orders.map(order => (
                  <div className="order-item-card" key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ textAlign: 'left' }}>
                      <h4 style={{ fontWeight: 800 }}>{order.id} ({order.userName})</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                        Items: {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span className={`status-badge ${order.status}`} style={{ marginRight: '14px' }}>{order.status}</span>
                      <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>Rs. {order.total}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Menu Manager */}
        {activeTab === 'menu-manager' && (
          <div className="dash-row">
            {/* Left Col: Menu Item List */}
            <div className="dash-card">
              <h3 className="dash-card-title" style={{ marginBottom: '20px' }}>Active Cafeteria Menu</h3>

              <table className="menu-manager-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map(item => (
                    <tr key={item.id}>
                      <td style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                        <strong style={{ fontSize: '0.9rem' }}>{item.name}</strong>
                      </td>
                      <td>{item.category}</td>
                      <td>Rs. {item.price}</td>
                      <td>
                        <button
                          className="action-icon-btn delete"
                          onClick={() => {
                            if (confirm(`Remove ${item.name} from campus menu?`)) {
                              onDeleteMenuItem(item.id);
                            }
                          }}
                          title="Remove Product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right Col: Add New Menu Item Form */}
            <div className="dash-card">
              <h3 className="dash-card-title" style={{ marginBottom: '24px' }}>Add New Product</h3>

              <form onSubmit={handleAddNewItem}>
                <div className="form-group">
                  <label className="form-label">Product Name</label>
                  <input
                    type="text"
                    placeholder="E.g., Hazelnut Latte"
                    className="form-input"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      className="form-select"
                      value={itemCategory}
                      onChange={(e) => setItemCategory(e.target.value)}
                    >
                      <option value="Coffee">Coffee</option>
                      <option value="Tea">Tea</option>
                      <option value="Bakery">Bakery</option>
                      <option value="Meals">Meals</option>
                      <option value="Snacks">Snacks</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Cost Price (Rs.)</label>
                    <input
                      type="number"
                      placeholder="350"
                      className="form-input"
                      value={itemPrice}
                      onChange={(e) => setItemPrice(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Avg Prep Time</label>
                  <select
                    className="form-select"
                    value={itemPrep}
                    onChange={(e) => setItemPrep(e.target.value)}
                  >
                    <option value="2 mins">2 mins</option>
                    <option value="4 mins">4 mins</option>
                    <option value="6 mins">6 mins</option>
                    <option value="8 mins">8 mins</option>
                    <option value="12 mins">12 mins</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    placeholder="Brief recipe details or product sales description..."
                    className="form-input"
                    rows={3}
                    style={{ resize: 'none', height: 'auto' }}
                    value={itemDesc}
                    onChange={(e) => setItemDesc(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '24px' }}>
                  <label className="form-label">Product Image URL</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    className="form-input"
                    value={itemImg}
                    onChange={(e) => setItemImg(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <Plus size={16} />
                  Add to Menu
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tab 3: Manage Users */}
        {activeTab === 'users' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-light)' }} />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="form-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: '40px' }}
                />
              </div>
              <select className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">All Users</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
              <button className="btn btn-secondary" onClick={handleExportUsers}>
                <Download size={16} />
                Export
              </button>
            </div>

            <div className="dash-card">
              <h3 className="dash-card-title" style={{ marginBottom: '20px' }}>User Management</h3>
              <div style={{ overflowX: 'auto' }}>
                <table className="menu-manager-table" style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Join Date</th>
                      <th>Orders</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.filter(u =>
                      (filterStatus === 'all' || u.status === filterStatus) &&
                      (searchQuery === '' || u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase()))
                    ).map(user => (
                      <tr key={user.id}>
                        <td style={{ fontWeight: 600 }}>{user.name}</td>
                        <td>{user.email}</td>
                        <td><span style={{ backgroundColor: 'var(--bg-pending)', color: 'var(--color-pending)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>{user.role}</span></td>
                        <td>{user.joinDate}</td>
                        <td style={{ textAlign: 'center', fontWeight: 600 }}>{user.orders}</td>
                        <td>
                          <span style={{
                            backgroundColor: user.status === 'active' ? 'var(--bg-ready)' : 'var(--bg-completed)',
                            color: user.status === 'active' ? 'var(--color-ready)' : 'var(--color-completed)',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '0.85rem',
                            fontWeight: 600
                          }}>
                            {user.status === 'active' ? '🟢 Active' : '🔴 Inactive'}
                          </span>
                        </td>
                        <td>
                          <button className="action-icon-btn" title="View Details" style={{ marginRight: '8px' }}>
                            <Eye size={16} />
                          </button>
                          <button className="action-icon-btn" title="Deactivate" style={{ color: 'var(--color-pending)' }}>
                            <AlertCircle size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Seat Management */}
        {activeTab === 'seats' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="analytics-grid">
              <div className="analytics-chart-card" style={{ minHeight: 'auto' }}>
                <h3 className="dash-card-title" style={{ marginBottom: '20px' }}>Seating Overview</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                  <div style={{ padding: '15px', backgroundColor: 'var(--bg-ready)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                    <p style={{ color: 'var(--color-ready)', fontWeight: 600, fontSize: '0.9rem' }}>Available</p>
                    <h3 style={{ color: 'var(--color-ready)', margin: '8px 0' }}>{seats.filter(s => s.status === 'available').length}</h3>
                  </div>
                  <div style={{ padding: '15px', backgroundColor: 'var(--bg-pending)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                    <p style={{ color: 'var(--color-pending)', fontWeight: 600, fontSize: '0.9rem' }}>Reserved</p>
                    <h3 style={{ color: 'var(--color-pending)', margin: '8px 0' }}>{seats.filter(s => s.status === 'reserved').length}</h3>
                  </div>
                  <div style={{ padding: '15px', backgroundColor: 'var(--bg-preparing)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                    <p style={{ color: 'var(--color-preparing)', fontWeight: 600, fontSize: '0.9rem' }}>Occupied</p>
                    <h3 style={{ color: 'var(--color-preparing)', margin: '8px 0' }}>{seats.filter(s => s.status === 'occupied').length}</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="dash-card">
              <h3 className="dash-card-title" style={{ marginBottom: '20px' }}>Table Status</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
                {seats.map(seat => (
                  <div
                    key={seat.id}
                    style={{
                      padding: '15px',
                      borderRadius: 'var(--radius-md)',
                      border: '2px solid',
                      borderColor: seat.status === 'available' ? 'var(--color-ready)' :
                        seat.status === 'reserved' ? 'var(--color-pending)' : 'var(--color-preparing)',
                      backgroundColor: seat.status === 'available' ? 'var(--bg-ready)' :
                        seat.status === 'reserved' ? 'var(--bg-pending)' : 'var(--bg-preparing)',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'var(--transition)'
                    }}
                  >
                    <h4 style={{ fontWeight: 700, marginBottom: '8px' }}>{seat.tableNumber}</h4>
                    <p style={{ fontSize: '0.9rem', fontWeight: 600, margin: 0 }}>
                      {seat.status === 'available' ? '✓ Available' : seat.status === 'reserved' ? '⏳ Reserved' : '● Occupied'}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                      Seats: {seat.capacity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Reports & Analytics */}
        {activeTab === 'reports' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="analytics-grid">
              <div className="analytics-chart-card">
                <h3 className="dash-card-title" style={{ marginBottom: '20px' }}>Sales Summary</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
                    <span>Daily Avg Revenue</span>
                    <strong style={{ color: 'var(--primary)' }}>Rs. 14,350</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
                    <span>Weekly Total</span>
                    <strong style={{ color: 'var(--primary)' }}>Rs. 1,04,350</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
                    <span>Monthly Projection</span>
                    <strong style={{ color: 'var(--primary)' }}>Rs. 4,30,000</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Top Category</span>
                    <strong>Coffee (45%)</strong>
                  </div>
                </div>
              </div>

              <div className="analytics-chart-card">
                <h3 className="dash-card-title" style={{ marginBottom: '20px' }}>Order Statistics</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
                    <span>Total Orders (Week)</span>
                    <strong>352</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
                    <span>Avg Order Value</span>
                    <strong>Rs. 412</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
                    <span>Pending Orders</span>
                    <strong style={{ color: 'var(--color-pending)' }}>{pendingOrders}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Completion Rate</span>
                    <strong style={{ color: 'var(--color-ready)' }}>94%</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="dash-card">
              <h3 className="dash-card-title" style={{ marginBottom: '20px' }}>Category Performance</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { name: 'Coffee', sales: 512, revenue: 112640, growth: '+15%' },
                  { name: 'Tea', sales: 328, revenue: 39360, growth: '+22%' },
                  { name: 'Bakery', sales: 245, revenue: 41650, growth: '+8%' },
                  { name: 'Meals', sales: 418, revenue: 181100, growth: '+5%' },
                  { name: 'Snacks', sales: 187, revenue: 28050, growth: '+18%' }
                ].map((cat, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: idx < 4 ? '1px solid var(--border-color)' : 'none' }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0' }}>{cat.name}</h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>Rs. {cat.revenue}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ margin: '0 0 4px 0', fontWeight: 600 }}>{cat.sales} Sales</p>
                      <span style={{ color: 'var(--color-ready)', fontWeight: 600, fontSize: '0.9rem' }}>{cat.growth}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={handleExportSales}>
                <Download size={16} />
                Export Sales Report
              </button>
              <button className="btn btn-secondary">
                <Filter size={16} />
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
