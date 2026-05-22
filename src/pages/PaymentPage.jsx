import React, { useState } from 'react';
import { CreditCard, ArrowLeft, Check, Lock, Smartphone, ShieldCheck } from 'lucide-react';

export default function PaymentPage({ 
  user, 
  onUpdateWalletBalance,
  checkoutDetails, 
  cart, 
  onClearCart, 
  onAddOrder, 
  setCurrentPage 
}) {
  const [activeMethod, setActiveMethod] = useState('card');
  const [cardName, setCardName] = useState(user?.name || '');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [phoneNo, setPhoneNo] = useState('03001234567');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  const grandTotal = checkoutDetails?.total || 0;

  const handlePayment = (e) => {
    e.preventDefault();
    if (isProcessing) return;

    if (activeMethod === 'card') {
      if (!cardNumber || !expiry || !cvv) {
        alert('Please fill in your card details.');
        return;
      }
    }

    if ((activeMethod === 'jazzcash' || activeMethod === 'easypaisa') && !phoneNo.trim()) {
      alert('Please enter your mobile account number.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      setGeneratedOrderId(orderId);
      setIsSuccess(true);

      const paymentMethodLabel = activeMethod === 'card'
        ? 'Debit/Credit Card'
        : activeMethod === 'jazzcash'
        ? 'JazzCash'
        : 'EasyPaisa';

      const newOrder = {
        id: orderId,
        userId: user?.id || 'G-101',
        userName: user?.name || 'Guest Student',
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          selectedOptions: item.customizations
        })),
        total: grandTotal,
        paymentMethod: paymentMethodLabel,
        status: 'preparing',
        timestamp: new Date().toISOString(),
        prepCountdown: 300,
        tableReserved: null,
        notes: checkoutDetails?.notes || ''
      };

      onAddOrder(newOrder);
      onClearCart();
    }, 1500);
  };

  const handleCancelOrder = () => {
    setCurrentPage('cart');
  };

  const finishCheckout = () => {
    setCurrentPage('tracking');
  };

  return (
    <div className="container section-padding" style={{ paddingTop: '40px' }}>
      {isSuccess && (
        <div className="modal-overlay">
          <div className="modal-card" style={{ maxWidth: '520px', padding: '32px' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div className="success-icon-circle" style={{ width: '96px', height: '96px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(56, 161, 105, 0.12)', marginBottom: '16px' }}>
                <Check size={40} strokeWidth={3} style={{ color: 'var(--primary)' }} />
              </div>
              <h3 style={{ margin: 0, fontSize: '1.75rem' }}>Payment Confirmed</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Your café order is confirmed and the kitchen is preparing it now.</p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '22px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: 'var(--text-light)' }}>Order ID</span>
                <strong>{generatedOrderId}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: 'var(--text-light)' }}>Total Paid</span>
                <strong>Rs. {grandTotal}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-light)' }}>Pickup</span>
                <strong>{checkoutDetails?.pickupTime}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setCurrentPage('menu')}>
                Back to Menu
              </button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={finishCheckout}>
                Track Order
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
        <button 
          className="action-icon-btn" 
          onClick={() => setCurrentPage('cart')}
          title="Back to Basket"
        >
          <ArrowLeft size={20} />
        </button>
        <div style={{ textAlign: 'left' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, margin: 0 }}>Secure Checkout</h1>
          <p style={{ color: 'var(--text-muted)' }}>Choose a payment method and confirm your order.</p>
        </div>
      </div>

      <div className="payment-grid">
        <div className="payment-methods-card">
          <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '24px' }}>Payment Options</h3>

          <div className="payment-options-tabs">
            <div 
              className={`pay-tab ${activeMethod === 'card' ? 'active' : ''}`}
              onClick={() => setActiveMethod('card')}
            >
              <CreditCard size={24} style={{ color: 'var(--primary)' }} />
              <h4>Debit / Credit Card</h4>
            </div>

            <div 
              className={`pay-tab ${activeMethod === 'jazzcash' ? 'active' : ''}`}
              onClick={() => setActiveMethod('jazzcash')}
            >
              <Smartphone size={24} style={{ color: 'var(--primary)' }} />
              <h4>JazzCash</h4>
            </div>

            <div 
              className={`pay-tab ${activeMethod === 'easypaisa' ? 'active' : ''}`}
              onClick={() => setActiveMethod('easypaisa')}
            >
              <Smartphone size={24} style={{ color: 'var(--primary)' }} />
              <h4>EasyPaisa</h4>
            </div>
          </div>

          <form onSubmit={handlePayment} style={{ marginTop: '28px' }}>
            {activeMethod === 'card' && (
              <>
                <div className="form-group">
                  <label className="form-label">Cardholder Name</label>
                  <input 
                    type="text" 
                    placeholder="Waleed Khan" 
                    className="form-input"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <input 
                    type="text" 
                    placeholder="4123 4567 8901 2345" 
                    className="form-input"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Expiry Date</label>
                    <input 
                      type="text" 
                      placeholder="MM/YY" 
                      className="form-input"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CVV</label>
                    <input 
                      type="password" 
                      placeholder="•••" 
                      className="form-input"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {(activeMethod === 'jazzcash' || activeMethod === 'easypaisa') && (
              <>
                <div className="form-group">
                  <label className="form-label">Mobile Wallet</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={activeMethod === 'jazzcash' ? 'JazzCash' : 'EasyPaisa'}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Registered Mobile Number</label>
                  <input 
                    type="tel" 
                    className="form-input"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    required
                  />
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                  A payment approval request will be sent to your mobile wallet after confirming payment.
                </p>
              </>
            )}

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px', marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Lock size={16} />
              <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>Payments are encrypted and processed through secure campus gateways.</span>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
              <button 
                type="submit" 
                className={`btn btn-primary ${isProcessing ? 'btn-disabled' : ''}`}
                style={{ flex: '1 1 220px', padding: '14px' }}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing payment...' : `Confirm Payment`}
              </button>
              <button 
                type="button"
                className="btn btn-secondary"
                style={{ flex: '1 1 220px', padding: '14px' }}
                onClick={handleCancelOrder}
              >
                Cancel Order
              </button>
            </div>
          </form>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="cart-summary-card">
            <h3 className="summary-header">Order Summary</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
              {cart.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{item.quantity}x {item.name}</span>
                  <span style={{ fontWeight: 700 }}>Rs. {item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>Rs. {checkoutDetails?.subtotal}</span>
              </div>
              <div className="summary-row">
                <span>Tax & Fees</span>
                <span>Rs. {(checkoutDetails?.tax || 0) + (checkoutDetails?.convenienceFee || 0)}</span>
              </div>
              {checkoutDetails?.discount > 0 && (
                <div className="summary-row" style={{ color: 'var(--accent-green)' }}>
                  <span>Discount</span>
                  <span>- Rs. {checkoutDetails?.discount}</span>
                </div>
              )}
              <div className="summary-row total">
                <span>Grand Total</span>
                <span>Rs. {grandTotal}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '30px', backgroundColor: 'var(--bg-color)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <ShieldCheck size={24} style={{ color: 'var(--primary)' }} />
              <div style={{ textAlign: 'left', fontSize: '0.85rem' }}>
                <h4 style={{ fontWeight: 800, margin: 0 }}>Pickup Schedule</h4>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>{checkoutDetails?.pickupTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
