import React from 'react';
import { CreditCard, Award, Utensils, Calendar, Clock, ArrowRight, Star, AlertCircle } from 'lucide-react';

export default function StudentDashboard({ 
  user, 
  orders, 
  seats, 
  menuItems, 
  setCurrentPage 
}) {
  // Find active orders for this student
  const activeOrders = orders.filter(o => o.userId === user?.id && o.status !== 'completed');
  const pastOrders = orders.filter(o => o.userId === user?.id && o.status === 'completed');

  // Find active seat reservation
  const activeReservation = seats.find(s => s.reservedBy === user?.id);

  // Get recommended items (take first 3 items from menu)
  const recommendedItems = menuItems.slice(0, 3);

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-profile">
          <img src={user?.avatar} alt={user?.name} className="user-avatar" style={{ width: '48px', height: '48px' }} />
          <div className="sidebar-profile-info">
            <h4>{user?.name}</h4>
            <p>{user?.department} ({user?.semester} Sem)</p>
          </div>
        </div>

        <ul className="sidebar-menu">
          <li className="sidebar-menu-item active">
            <Utensils size={18} />
            <span>Dashboard Home</span>
          </li>
          <li className="sidebar-menu-item" onClick={() => setCurrentPage('menu')}>
            <Utensils size={18} />
            <span>Browse Menu</span>
          </li>
          <li className="sidebar-menu-item" onClick={() => setCurrentPage('reservation')}>
            <Calendar size={18} />
            <span>Seat Reservations</span>
          </li>
          <li className="sidebar-menu-item" onClick={() => setCurrentPage('tracking')}>
            <Clock size={18} />
            <span>Track Live Order</span>
          </li>
        </ul>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-content">
        {/* Welcome Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', textAlign: 'left' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>Welcome back, {user?.name.split(' ')[0]}! 👋</h1>
            <p style={{ color: 'var(--text-muted)' }}>Ready to grab some delicious food without waiting in line?</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-info">
              <p>Smart Wallet Balance</p>
              <h3>Rs. {user?.walletBalance}</h3>
              <span>Linked to ID Card</span>
            </div>
            <div className="stat-card-icon">
              <CreditCard size={24} />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-info">
              <p>Bean Loyalty Points</p>
              <h3>{user?.loyaltyPoints}</h3>
              <span>{Math.floor(user?.loyaltyPoints / 100)} Free Karak Teas left!</span>
            </div>
            <div className="stat-card-icon" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
              <Award size={24} />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-info">
              <p>Active Pre-Orders</p>
              <h3>{activeOrders.length}</h3>
              <span>In progress/ready</span>
            </div>
            <div className="stat-card-icon" style={{ backgroundColor: 'var(--bg-preparing)', color: 'var(--color-preparing)' }}>
              <Clock size={24} />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-info">
              <p>Table Booking</p>
              <h3>{activeReservation ? `Table ${activeReservation.tableNo}` : 'None'}</h3>
              <span>{activeReservation ? activeReservation.timeSlot.split(' ')[0] + ' ' + activeReservation.timeSlot.split(' ')[1] : 'No active reservation'}</span>
            </div>
            <div className="stat-card-icon" style={{ backgroundColor: 'var(--bg-ready)', color: 'var(--color-ready)' }}>
              <Calendar size={24} />
            </div>
          </div>
        </div>

        {/* Main Dashboard Rows */}
        <div className="dash-row">
          {/* Left Column: Active Order & History */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {/* Active Orders Section */}
            <div className="dash-card">
              <div className="dash-card-header">
                <h3 className="dash-card-title">Active Orders</h3>
                {activeOrders.length > 0 && (
                  <button className="btn btn-secondary btn-sm" onClick={() => setCurrentPage('tracking')}>
                    View Tracker
                  </button>
                )}
              </div>

              {activeOrders.length > 0 ? (
                <div className="order-list">
                  {activeOrders.map(order => (
                    <div className="order-item-card" key={order.id}>
                      <div className="order-meta">
                        <h4>Order ID: {order.id}</h4>
                        <div className="order-details-summary">
                          {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                        </div>
                        <p>Total: Rs. {order.total} • Est. Time: {order.prepCountdown > 0 ? `${Math.ceil(order.prepCountdown / 60)} mins` : 'Ready'}</p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                        <span className={`status-badge ${order.status}`}>
                          {order.status}
                        </span>
                        <button 
                          className="btn btn-outline btn-sm"
                          onClick={() => setCurrentPage('tracking')}
                          style={{ padding: '4px 8px', fontSize: '0.75rem', borderRadius: '4px' }}
                        >
                          Track Live
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '30px 20px', color: 'var(--text-light)' }}>
                  <AlertCircle size={32} style={{ marginBottom: '10px' }} />
                  <p>You have no active pre-orders at the moment.</p>
                  <button 
                    className="btn btn-primary btn-sm" 
                    onClick={() => setCurrentPage('menu')} 
                    style={{ marginTop: '14px' }}
                  >
                    Place Pre-Order Now
                  </button>
                </div>
              )}
            </div>

            {/* History Section */}
            <div className="dash-card">
              <div className="dash-card-header">
                <h3 className="dash-card-title">Recent Order History</h3>
              </div>

              {pastOrders.length > 0 ? (
                <div className="order-list">
                  {pastOrders.map(order => (
                    <div className="order-item-card" key={order.id} style={{ opacity: 0.8 }}>
                      <div className="order-meta">
                        <h4>Order ID: {order.id}</h4>
                        <div className="order-details-summary">
                          {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                        </div>
                        <p>{new Date(order.timestamp).toLocaleDateString()} • Payment: {order.paymentMethod}</p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                        <span className="status-badge completed">
                          Completed
                        </span>
                        <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>Rs. {order.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--text-light)', textAlign: 'center', padding: '20px 0' }}>No past order history available.</p>
              )}
            </div>
          </div>

          {/* Right Column: Reservation Summary & Recommended Menu */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {/* Table Reservation Card */}
            <div className="dash-card">
              <div className="dash-card-header">
                <h3 className="dash-card-title">Seat Reservation</h3>
              </div>

              {activeReservation ? (
                <div style={{ textAlign: 'left' }}>
                  <div style={{ backgroundColor: 'var(--primary-light)', padding: '16px', borderRadius: '12px', borderLeft: '4px solid var(--primary)', marginBottom: '16px' }}>
                    <h4 style={{ fontWeight: 800, color: 'var(--primary)', marginBottom: '4px' }}>Table #{activeReservation.tableNo} Reserved</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Category: {activeReservation.category === 'window' ? 'Window Lawn View' : activeReservation.category === 'quiet' ? 'Quiet Study Area' : 'Main Dining Hall'}
                    </p>
                    <p style={{ fontSize: '0.85rem', fontWeight: 700, marginTop: '8px', color: 'var(--text-main)' }}>
                      Time: {activeReservation.timeSlot}
                    </p>
                  </div>
                  <button 
                    className="btn btn-secondary btn-sm" 
                    onClick={() => setCurrentPage('reservation')}
                    style={{ width: '100%' }}
                  >
                    Change Reservation
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '10px 0', color: 'var(--text-light)' }}>
                  <p style={{ marginBottom: '14px', fontSize: '0.9rem' }}>Secure a quiet table for studying or dining with friends.</p>
                  <button 
                    className="btn btn-outline btn-sm" 
                    onClick={() => setCurrentPage('reservation')}
                    style={{ width: '100%' }}
                  >
                    Book a Table
                  </button>
                </div>
              )}
            </div>

            {/* Quick Recommend Items */}
            <div className="dash-card">
              <div className="dash-card-header">
                <h3 className="dash-card-title">Chef's Favorites</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {recommendedItems.map(item => (
                  <div 
                    key={item.id} 
                    style={{ display: 'flex', gap: '12px', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => setCurrentPage('menu')}
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} 
                    />
                    <div style={{ textAlign: 'left', flex: 1 }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 800 }}>{item.name}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Rs. {item.price}</p>
                    </div>
                    <div style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      <Star size={14} fill="#fbbf24" />
                      <span>{item.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
