import React, { useState } from 'react';
import { ChefHat, ClipboardList, CheckCircle2, User, HelpCircle, PackageX, CalendarDays } from 'lucide-react';

export default function StaffDashboard({ 
  orders, 
  seats, 
  menuItems, 
  onUpdateOrderStatus, 
  onToggleMenuItemAvailability, 
  user 
}) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'inventory' | 'seats'

  // Categorize orders
  const preparingOrders = orders.filter(o => o.status === 'preparing');
  const readyOrders = orders.filter(o => o.status === 'ready');
  const completedOrders = orders.filter(o => o.status === 'completed');

  // Reserved seats list
  const reservedSeats = seats.filter(s => s.status === 'reserved');

  return (
    <div className="dashboard-container">
      {/* Sidebar Menu */}
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
            className={`sidebar-menu-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <ClipboardList size={18} />
            <span>Active Orders</span>
          </li>
          <li 
            className={`sidebar-menu-item ${activeTab === 'seats' ? 'active' : ''}`}
            onClick={() => setActiveTab('seats')}
          >
            <CalendarDays size={18} />
            <span>Table Bookings</span>
          </li>
          <li 
            className={`sidebar-menu-item ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <PackageX size={18} />
            <span>Manage Stock</span>
          </li>
        </ul>
      </aside>

      {/* Main Panel Content */}
      <main className="dashboard-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', textAlign: 'left' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>Cafeteria Staff Portal</h1>
            <p style={{ color: 'var(--text-muted)' }}>Manage live orders, monitor seat reservations, and toggle item stock.</p>
          </div>
          <span className="status-badge ready" style={{ gap: '8px', padding: '8px 16px' }}>
            <ChefHat size={16} />
            Kitchen Active
          </span>
        </div>

        {/* Overview Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-info">
              <p>In the Kitchen</p>
              <h3>{preparingOrders.length} Orders</h3>
              <span>Active preparation</span>
            </div>
            <div className="stat-card-icon" style={{ backgroundColor: 'var(--bg-preparing)', color: 'var(--color-preparing)' }}>
              <ChefHat size={24} />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-info">
              <p>Ready for Pickup</p>
              <h3>{readyOrders.length} Orders</h3>
              <span>Awaiting verification</span>
            </div>
            <div className="stat-card-icon" style={{ backgroundColor: 'var(--bg-ready)', color: 'var(--color-ready)' }}>
              <CheckCircle2 size={24} />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-info">
              <p>Reserved Tables</p>
              <h3>{reservedSeats.length} Tables</h3>
              <span>Booked by students</span>
            </div>
            <div className="stat-card-icon" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
              <CalendarDays size={24} />
            </div>
          </div>
        </div>

        {/* Tab 1: Orders Board (3 Columns) */}
        {activeTab === 'orders' && (
          <div>
            <h3 style={{ textAlign: 'left', fontWeight: 800, fontSize: '1.25rem', marginBottom: '16px' }}>Live Order Queue</h3>
            
            <div className="staff-queue-grid">
              {/* Column 1: Preparing */}
              <div className="queue-column">
                <div className="queue-column-header">
                  <span className="queue-column-title" style={{ color: 'var(--color-preparing)' }}>
                    Preparing
                  </span>
                  <span className="queue-count-badge">{preparingOrders.length}</span>
                </div>

                {preparingOrders.length > 0 ? (
                  preparingOrders.map(order => (
                    <div className="staff-order-card" key={order.id}>
                      <div className="staff-order-header">
                        <span className="staff-order-id">{order.id}</span>
                        <span className="staff-order-time">{new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>

                      <div className="staff-order-items">
                        {order.items.map((item, i) => (
                          <div key={i}>
                            <div className="staff-item-row">
                              <span><span className="staff-item-qty">{item.quantity}x</span> {item.name}</span>
                            </div>
                            {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                              <div className="staff-item-options">
                                {Object.entries(item.selectedOptions).map(([k, v]) => `${k}: ${v.split(' (+')[0]}`).join(', ')}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {order.notes && (
                        <div className="staff-order-notes">
                          <strong>Note:</strong> {order.notes}
                        </div>
                      )}

                      <div className="staff-order-footer">
                        <span className="staff-user-name">{order.userName}</span>
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => onUpdateOrderStatus(order.id, 'ready')}
                          style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: '4px' }}
                        >
                          Mark Ready
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', paddingTop: '30px' }}>No orders in prep.</p>
                )}
              </div>

              {/* Column 2: Ready for Pickup */}
              <div className="queue-column">
                <div className="queue-column-header">
                  <span className="queue-column-title" style={{ color: 'var(--color-ready)' }}>
                    Ready for Pickup
                  </span>
                  <span className="queue-count-badge">{readyOrders.length}</span>
                </div>

                {readyOrders.length > 0 ? (
                  readyOrders.map(order => (
                    <div className="staff-order-card" key={order.id} style={{ borderColor: 'var(--color-ready)' }}>
                      <div className="staff-order-header">
                        <span className="staff-order-id">{order.id}</span>
                        <span className="staff-order-time">{new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>

                      <div className="staff-order-items">
                        {order.items.map((item, i) => (
                          <div key={i}>
                            <div className="staff-item-row">
                              <span><span className="staff-item-qty">{item.quantity}x</span> {item.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="staff-order-footer">
                        <span className="staff-user-name">{order.userName}</span>
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => onUpdateOrderStatus(order.id, 'completed')}
                          style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: '4px', backgroundColor: 'var(--color-ready)' }}
                        >
                          Collected
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', paddingTop: '30px' }}>No orders waiting.</p>
                )}
              </div>

              {/* Column 3: Completed Today */}
              <div className="queue-column">
                <div className="queue-column-header">
                  <span className="queue-column-title" style={{ color: 'var(--text-muted)' }}>
                    Completed
                  </span>
                  <span className="queue-count-badge">{completedOrders.length}</span>
                </div>

                {completedOrders.length > 0 ? (
                  completedOrders.map(order => (
                    <div className="staff-order-card" key={order.id} style={{ opacity: 0.75 }}>
                      <div className="staff-order-header">
                        <span className="staff-order-id">{order.id}</span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>Rs. {order.total}</span>
                      </div>

                      <div className="staff-order-items">
                        {order.items.map((item, i) => (
                          <div key={i} style={{ fontSize: '0.8rem' }}>
                            {item.quantity}x {item.name}
                          </div>
                        ))}
                      </div>

                      <div style={{ textAlign: 'left', fontSize: '0.75rem', color: 'var(--text-light)' }}>
                        Picked up by <strong>{order.userName}</strong>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', paddingTop: '30px' }}>No completed orders yet.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Seat Bookings list */}
        {activeTab === 'seats' && (
          <div className="dash-card">
            <h3 className="dash-card-title" style={{ marginBottom: '20px' }}>Active Student Table Bookings</h3>
            
            {reservedSeats.length > 0 ? (
              <div className="order-list">
                {reservedSeats.map(seat => (
                  <div className="order-item-card" key={seat.id}>
                    <div className="order-meta">
                      <h4 style={{ color: 'var(--primary)' }}>Table #{seat.tableNo} - Reserved</h4>
                      <p>Category: <strong style={{ textTransform: 'capitalize' }}>{seat.category} Corner</strong> • Max Seats: {seat.capacity}</p>
                      <p style={{ marginTop: '4px', fontSize: '0.85rem', color: 'var(--text-main)' }}>
                        Booked Time: <strong>{seat.timeSlot}</strong>
                      </p>
                    </div>
                    <div>
                      <span className="status-badge ready">
                        Active Booking
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-light)', textAlign: 'center', padding: '40px 0' }}>No active seat reservations at this time.</p>
            )}
          </div>
        )}

        {/* Tab 3: Manage Menu availability */}
        {activeTab === 'inventory' && (
          <div className="dash-card">
            <h3 className="dash-card-title" style={{ marginBottom: '20px' }}>Kitchen Stock Manager</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
              Toggle stock availability. Out of stock items will hide from student food ordering menu lists.
            </p>

            <table className="menu-manager-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Base Cost</th>
                  <th>Prep Time</th>
                  <th>Status Toggle</th>
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
                    <td>{item.prepTime}</td>
                    <td>
                      <label className="checkbox-group" style={{ cursor: 'pointer' }}>
                        <input 
                          type="checkbox" 
                          className="checkbox-input"
                          checked={item.available}
                          onChange={() => onToggleMenuItemAvailability(item.id)}
                        />
                        <span style={{ fontWeight: 700, fontSize: '0.85rem', color: item.available ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                          {item.available ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
