import React, { useState } from 'react';
import { Trash2, ShoppingBag, ArrowRight, Tag, Clock, ArrowLeft } from 'lucide-react';

export default function CartPage({
  cart,
  onUpdateCartQuantity,
  onRemoveFromCart,
  onClearCart,
  setCurrentPage,
  checkoutDetails,
  setCheckoutDetails
}) {
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0); // in percentage
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [pickupTimeOption, setPickupTimeOption] = useState('now');
  const [scheduledTime, setScheduledTime] = useState('12:15 PM');
  const [cookingNotes, setCookingNotes] = useState('');

  // Calculate pricing
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = Math.round((subtotal * promoDiscount) / 100);
  const convenienceFee = subtotal > 0 ? 20 : 0; // Rs. 20 campus transaction fee
  const tax = Math.round((subtotal - discountAmount) * 0.05); // 5% tax
  const total = subtotal > 0 ? (subtotal - discountAmount + convenienceFee + tax) : 0;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'CUSIT10') {
      setPromoDiscount(10);
      setPromoApplied(true);
      setPromoError('');
    } else if (promoCode.toUpperCase() === 'FREEKARAK') {
      // flat Rs. 120 discount
      setPromoDiscount(15); // simulate 15% discount
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "CUSIT10"');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Save details in parent state to pass to Payment page
    setCheckoutDetails({
      subtotal,
      discount: discountAmount,
      convenienceFee,
      tax,
      total,
      pickupTime: pickupTimeOption === 'now' ? 'As soon as ready (5-10 mins)' : `Scheduled at ${scheduledTime}`,
      notes: cookingNotes
    });

    setCurrentPage('payment');
  };

  return (
    <div className="container section-padding" style={{ paddingTop: '40px' }}>
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
        <button
          className="action-icon-btn"
          onClick={() => setCurrentPage('menu')}
          title="Back to Menu"
        >
          <ArrowLeft size={20} />
        </button>
        <div style={{ textAlign: 'left' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, margin: 0 }}>My Basket</h1>
          <p style={{ color: 'var(--text-muted)' }}>Review your items and schedule preparation.</p>
        </div>
      </div>

      {cart.length > 0 ? (
        <div className="cart-split-layout">
          {/* Left Column: Cart Items & Cooking Notes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div className="cart-items-card">
              <div className="cart-header-row">
                <h3 style={{ fontWeight: 800, fontSize: '1.2rem' }}>Selected Items ({cart.length})</h3>
                <button
                  onClick={onClearCart}
                  style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 'bold' }}
                >
                  <Trash2 size={16} />
                  Clear Basket
                </button>
              </div>

              <div className="cart-list">
                {cart.map((item, index) => (
                  <div className="cart-item-row" key={index}>
                    <img src={item.image} alt={item.name} className="cart-item-img" />

                    <div className="cart-item-details">
                      <h4 className="cart-item-name">{item.name}</h4>
                      {Object.keys(item.customizations).length > 0 && (
                        <div className="cart-item-customizations">
                          {Object.entries(item.customizations).map(([key, val]) => (
                            <span key={key} style={{ marginRight: '10px', display: 'inline-block' }}>
                              <strong>{key}:</strong> {val.split(' (+')[0]}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="quantity-controller" style={{ marginTop: '10px' }}>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => onUpdateCartQuantity(index, -1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="qty-number">{item.quantity}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => onUpdateCartQuantity(index, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-price-col">
                      <span className="cart-item-price">Rs. {item.price * item.quantity}</span>
                      <button
                        className="cart-item-remove"
                        onClick={() => onRemoveFromCart(index)}
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Instructions & Schedule Time */}
            <div className="cart-items-card">
              <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '20px' }}>Preparation Scheduling</h3>

              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Pickup Time Option</label>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <label
                    style={{
                      flex: 1,
                      border: `1px solid ${pickupTimeOption === 'now' ? 'var(--primary)' : 'var(--border-color)'}`,
                      backgroundColor: pickupTimeOption === 'now' ? 'var(--primary-light)' : '#fff',
                      padding: '12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}
                  >
                    <input
                      type="radio"
                      name="pickupTime"
                      checked={pickupTimeOption === 'now'}
                      onChange={() => setPickupTimeOption('now')}
                      style={{ accentColor: 'var(--primary)' }}
                    />
                    <span>Instant (5-10 mins)</span>
                  </label>

                  <label
                    style={{
                      flex: 1,
                      border: `1px solid ${pickupTimeOption === 'schedule' ? 'var(--primary)' : 'var(--border-color)'}`,
                      backgroundColor: pickupTimeOption === 'schedule' ? 'var(--primary-light)' : '#fff',
                      padding: '12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}
                  >
                    <input
                      type="radio"
                      name="pickupTime"
                      checked={pickupTimeOption === 'schedule'}
                      onChange={() => setPickupTimeOption('schedule')}
                      style={{ accentColor: 'var(--primary)' }}
                    />
                    <span>Schedule Pickup</span>
                  </label>
                </div>
              </div>

              {pickupTimeOption === 'schedule' && (
                <div className="form-group" style={{ marginBottom: '24px' }}>
                  <label className="form-label">Specify Target Pickup Time</label>
                  <select
                    className="form-select"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                  >
                    <option value="12:15 PM">12:15 PM</option>
                    <option value="12:45 PM">12:45 PM</option>
                    <option value="01:15 PM">01:15 PM</option>
                    <option value="01:45 PM">01:45 PM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                  </select>
                </div>
              )}

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Special Cooking Instructions</label>
                <textarea
                  placeholder="E.g., No sugar in Caramel Latte, Extra ketchup packets, Warm the muffins, etc."
                  className="form-input"
                  rows={3}
                  style={{ resize: 'none', height: 'auto' }}
                  value={cookingNotes}
                  onChange={(e) => setCookingNotes(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Checkout details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div className="cart-summary-card">
              <h3 className="summary-header">Checkout Summary</h3>

              <div className="summary-row">
                <span>Basket Subtotal</span>
                <span>Rs. {subtotal}</span>
              </div>

              {promoApplied && (
                <div className="summary-row" style={{ color: 'var(--accent-green)', fontWeight: 'bold' }}>
                  <span>Discount Applied ({promoDiscount}%)</span>
                  <span>- Rs. {discountAmount}</span>
                </div>
              )}

              <div className="summary-row">
                <span>Convenience Fee</span>
                <span>Rs. {convenienceFee}</span>
              </div>

              <div className="summary-row">
                <span>Govt. Food Tax (5%)</span>
                <span>Rs. {tax}</span>
              </div>

              <div className="summary-row total">
                <span>Grand Total</span>
                <span>Rs. {total}</span>
              </div>

              {/* Promo code box */}
              <div style={{ margin: '24px 0', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Have a Promo Coupon?</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <Tag size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-light)' }} />
                    <input
                      type="text"
                      placeholder="CUSIT10"
                      className="form-input"
                      style={{ paddingLeft: '38px', paddingRight: '10px', fontSize: '0.85rem' }}
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                  </div>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={handleApplyPromo}
                    disabled={promoApplied}
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--accent-green)', marginTop: '6px', fontWeight: 'bold' }}>
                    Success! Promo code applied.
                  </p>
                )}
                {promoError && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--accent-red)', marginTop: '6px', fontWeight: 'bold' }}>
                    {promoError}
                  </p>
                )}
              </div>

              <button
                className="btn btn-primary"
                style={{ width: '100%', padding: '16px' }}
                onClick={handleCheckout}
              >
                Proceed to Payment
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-cart-state">
          <ShoppingBag size={72} className="empty-cart-icon" />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>Your Basket is Empty</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Looks like you haven't added any coffee or meals yet.</p>
          <button
            className="btn btn-primary"
            onClick={() => setCurrentPage('menu')}
          >
            Go to Menu
          </button>
        </div>
      )}
    </div>
  );
}
