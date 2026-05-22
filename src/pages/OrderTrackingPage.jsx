import React, { useState, useEffect } from 'react';
import { Check, Clock, ShieldCheck, QrCode, AlertCircle, Play } from 'lucide-react';

export default function OrderTrackingPage({ orders, onUpdateOrderStatus, user, setCurrentPage }) {
  const studentOrders = orders
    .filter((o) => o.userId === user?.id)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const [selectedOrder, setSelectedOrder] = useState(studentOrders[0] || null);
  const [timer, setTimer] = useState(selectedOrder?.prepCountdown || 300);

  // Sync selected order if student orders change
  useEffect(() => {
    if (studentOrders.length > 0 && (!selectedOrder || studentOrders[0].id !== selectedOrder.id)) {
      setSelectedOrder(studentOrders[0]);
      setTimer(studentOrders[0].prepCountdown);
    }
  }, [orders, studentOrders, selectedOrder]);

  // Simulate countdown ticking
  useEffect(() => {
    if (!selectedOrder) return;
    if (selectedOrder.status !== 'preparing') return;

    setTimer(selectedOrder.prepCountdown);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Mark order as ready in parent state!
          onUpdateOrderStatus(selectedOrder.id, 'ready');
          return 0;
        }
        // Update the actual object's countdown if needed, but locally is fine
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedOrder]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStepStatusClass = (order, step) => {
    // Steps: 1: placed, 2: preparing, 3: ready, 4: completed
    if (step === 1) return 'completed'; // always completed once tracked

    if (step === 2) {
      if (order.status === 'preparing') return 'active';
      if (order.status === 'ready' || order.status === 'completed') return 'completed';
    }

    if (step === 3) {
      if (order.status === 'preparing') return '';
      if (order.status === 'ready') return 'active';
      if (order.status === 'completed') return 'completed';
    }

    if (step === 4) {
      if (order.status === 'completed') return 'completed';
      if (order.status === 'ready') return 'active';
      return '';
    }

    return '';
  };

  const getBannerContent = () => {
    if (!selectedOrder) return null;
    if (selectedOrder.status === 'preparing') {
      return {
        type: 'progress',
        title: 'Order is being prepared',
        message: `Estimated pickup in ${Math.max(1, Math.ceil(timer / 60))} minutes.`
      };
    }

    if (selectedOrder.status === 'ready') {
      return {
        type: 'ready',
        title: 'Ready for pickup',
        message: 'Please collect your order from the smart counter now.'
      };
    }

    return {
      type: 'completed',
      title: 'Order completed',
      message: 'Your meal has been collected. Thank you for ordering!'
    };
  };

  const notification = getBannerContent();

  // Shortcut developer function to simulate progress
  const advanceStatus = () => {
    if (!selectedOrder) return;
    if (selectedOrder.status === 'preparing') {
      onUpdateOrderStatus(selectedOrder.id, 'ready');
      setSelectedOrder({ ...selectedOrder, status: 'ready', prepCountdown: 0 });
      setTimer(0);
    } else if (selectedOrder.status === 'ready') {
      onUpdateOrderStatus(selectedOrder.id, 'completed');
      setSelectedOrder({ ...selectedOrder, status: 'completed' });
    }
  };

  return (
    <div className="container section-padding" style={{ paddingTop: '40px' }}>
      {/* Title */}
      <div style={{ textAlign: 'left', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, margin: 0 }}>Live Order Tracking</h1>
        <p style={{ color: 'var(--text-muted)' }}>Follow your pre-order preparation steps in real-time.</p>
      </div>

      {selectedOrder && notification && (
        <div className={`tracking-notification-banner banner-${notification.type}`} style={{ marginBottom: '24px' }}>
          <div>
            <strong>{notification.title}</strong>
            <p>{notification.message}</p>
          </div>
        </div>
      )}

      {studentOrders.length > 0 ? (
        <div className="cart-split-layout">
          {/* Left Column: Progress Stepper & Live Countdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div className="tracker-card">
              <div className="tracker-header">
                <div className="tracker-header-info">
                  <h2>Order #{selectedOrder?.id}</h2>
                  <p>Placed on {selectedOrder ? new Date(selectedOrder.timestamp).toLocaleTimeString() : ''}</p>
                </div>
                <div>
                  <span className={`status-badge ${selectedOrder?.status}`}>
                    {selectedOrder?.status}
                  </span>
                </div>
              </div>

              {/* Progress Steps Indicator */}
              <div className="tracker-steps">
                {selectedOrder && (
                  <div className="tracker-progress-line" style={{
                    width: selectedOrder.status === 'preparing' ? '35%' : selectedOrder.status === 'ready' ? '70%' : selectedOrder.status === 'completed' ? '100%' : '20%'
                  }}></div>
                )}

                <div className={`tracker-step ${selectedOrder ? getStepStatusClass(selectedOrder, 1) : ''}`}>
                  <div className="step-icon-box">
                    <Check size={20} />
                  </div>
                  <span className="step-label">Order Placed</span>
                </div>

                <div className={`tracker-step ${selectedOrder ? getStepStatusClass(selectedOrder, 2) : ''}`}>
                  <div className="step-icon-box">
                    <Clock size={20} />
                  </div>
                  <span className="step-label">Preparing</span>
                </div>

                <div className={`tracker-step ${selectedOrder ? getStepStatusClass(selectedOrder, 3) : ''}`}>
                  <div className="step-icon-box">
                    <QrCode size={20} />
                  </div>
                  <span className="step-label">Ready</span>
                </div>

                <div className={`tracker-step ${selectedOrder ? getStepStatusClass(selectedOrder, 4) : ''}`}>
                  <div className="step-icon-box">
                    <ShieldCheck size={20} />
                  </div>
                  <span className="step-label">Completed</span>
                </div>
              </div>

              {/* Live Countdown Clock */}
              {selectedOrder?.status === 'preparing' && (
                <div className="tracker-countdown-wrapper">
                  <span className="countdown-title">Estimated Wait Time</span>
                  <div className="countdown-timer">{formatTime(timer)}</div>
                  <p className="countdown-desc">Your order is being cooked by our chefs. Prepare to head to the counter!</p>
                </div>
              )}

              {selectedOrder?.status === 'ready' && (
                <div style={{ backgroundColor: 'var(--bg-ready)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '30px', margin: '30px 0' }}>
                  <h3 style={{ color: 'var(--color-ready)', fontWeight: 800, marginBottom: '8px' }}>Your Food is Ready! 🎉</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    Please walk to the CUSIT smart pickup counter. Present the QR code below to verify your ticket and claim your order.
                  </p>
                </div>
              )}

              {/* Dev Simulation Control */}
              <div style={{ backgroundColor: 'var(--bg-accent)', padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <div style={{ textAlign: 'left', fontSize: '0.8rem' }}>
                  <strong style={{ display: 'block', color: 'var(--text-main)' }}>Simulator Control (Tester Option)</strong>
                  <span style={{ color: 'var(--text-muted)' }}>Force transition the order to the next step instantly.</span>
                </div>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={advanceStatus}
                  style={{ backgroundColor: 'var(--primary)', color: '#fff', border: 'none' }}
                >
                  <Play size={14} fill="#fff" />
                  {selectedOrder?.status === 'preparing' ? 'Simulate Ready' : 'Simulate Collected'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: QR Code & Receipt Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {/* QR Verification Card */}
            <div className="tracker-card" style={{ padding: '30px' }}>
              <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '16px' }}>Pickup Verification</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
                Present this secure QR code to the scanner at the smart counter.
              </p>

              <div className="pickup-qr-container" style={{ borderTop: 'none', paddingTop: 0 }}>
                <div className="pickup-qr-wrapper">
                  <div className="pickup-qr-code">
                    <span>{selectedOrder?.id}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Items Summary */}
            <div className="tracker-card" style={{ padding: '30px', textAlign: 'left' }}>
              <h3 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Order Items</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {selectedOrder?.items.map((item, idx) => (
                  <div key={idx} style={{ fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong>{item.quantity}x {item.name}</strong>
                      <span>Rs. {item.price * item.quantity}</span>
                    </div>
                    {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '2px' }}>
                        {Object.entries(item.selectedOptions).map(([k, v]) => `${k}: ${v.split(' (+')[0]}`).join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '16px', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
                <span>Paid Total</span>
                <span>Rs. {selectedOrder?.total}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="tracker-card success-screen" style={{ maxWidth: '540px', margin: '0 auto' }}>
          <AlertCircle size={48} style={{ color: 'var(--text-light)', marginBottom: '16px' }} />
          <h3>No Active Orders</h3>
          <p style={{ marginBottom: '24px' }}>You do not have any active cafeteria orders in the queue right now.</p>
          <button className="btn btn-primary" onClick={() => setCurrentPage('menu')}>
            Order Food Now
          </button>
        </div>
      )}
    </div>
  );
}
