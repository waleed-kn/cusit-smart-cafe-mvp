import React from 'react';
import { ArrowRight, Utensils, Calendar, CreditCard, Clock, Star, Zap, UserCheck, BookOpen, ShoppingBag, CheckCircle } from 'lucide-react';
import { MOCK_REVIEWS } from '../mockData';
import AIHero from '../components/AIHero';

export default function LandingPage({ setCurrentPage, user }) {
  const handleGetStarted = (targetPage) => {
    if (!user) {
      setCurrentPage('login');
    } else {
      setCurrentPage(targetPage);
    }
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-tag">
              <span>★ #1 Campus Cafeteria App</span>
            </div>
            <h1 className="hero-title">
              Skip the Queue, <br />
              <span>Order Smart</span>
            </h1>
            <p className="hero-desc">
              Pre-order food, reserve seats, and track orders in real time.
            </p>
            <div className="hero-actions">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => handleGetStarted('menu')}
              >
                Order Now
                <ArrowRight size={18} />
              </button>
              <button
                className="btn btn-secondary btn-lg"
                onClick={() => setCurrentPage('menu')}
                style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.08)' }}
              >
                View Menu
              </button>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <h3>10k+</h3>
                <p>Orders Served</p>
              </div>
              <div className="stat-item">
                <h3>8 mins</h3>
                <p>Avg Prep Time</p>
              </div>
              <div className="stat-item">
                <h3>4.8/5</h3>
                <p>Student Rating</p>
              </div>
            </div>
          </div>

          <div className="hero-image-container">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
              alt="CUSIT Cafeteria Atmosphere"
              className="hero-main-img"
            />
            {/* Floating widget 1 */}
            <div className="hero-floating-card card-1">
              <div className="floating-icon">
                <Utensils size={20} />
              </div>
              <div className="floating-details">
                <h4>Hot Club Sandwich</h4>
                <p>Preparing in the kitchen...</p>
              </div>
            </div>

            {/* Floating widget 2 */}
            <div className="hero-floating-card card-2">
              <div className="floating-icon" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
                <Star size={20} fill="#16a34a" />
              </div>
              <div className="floating-details">
                <h4>Table #12 Secured</h4>
                <p>Window Area reserved!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Section (Hero + Recommendations) */}
      <AIHero />


      {/* Features Grid Section */}
      <section className="features-section section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Features</span>
            <h2 className="section-title">Designed for Busy CUSIT Students</h2>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Zap size={24} />
              </div>
              <h3>Fast Pre-Ordering</h3>
              <p>Browse our extensive digital menu, customize your order (sugar, milk type, extra shots), and specify prep times.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <CreditCard size={24} />
              </div>
              <h3>Online Payments</h3>
              <p>Link your student ID card. Load funds via EasyPaisa/JazzCash and check out securely in a single click.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Clock size={24} />
              </div>
              <h3>Live Order Tracking</h3>
              <p>Receive notifications when your order goes to the kitchen and when it's ready. Scan a unique QR code for quick pickup.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Calendar size={24} />
              </div>
              <h3>Seat Reservation</h3>
              <p>View real-time layout plans. Reserve quiet study corners, window spots, or main dining tables for group discussions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Process</span>
            <h2 className="section-title">How It Works</h2>
            <p className="section-desc-sub">Get your food and drinks in 4 simple steps without waiting in line.</p>
          </div>

          <div className="steps-container">
            <div className="step-card">
              <div className="step-badge">1</div>
              <div className="step-icon-wrapper">
                <UserCheck size={28} />
              </div>
              <h3>Step 1: Login</h3>
              <p>Create an account or login using your CUSIT student portal credentials.</p>
            </div>

            <div className="step-card">
              <div className="step-badge">2</div>
              <div className="step-icon-wrapper">
                <BookOpen size={28} />
              </div>
              <h3>Step 2: Browse Menu</h3>
              <p>Explore our daily specials, coffee brews, hot meals, and customize your orders.</p>
            </div>

            <div className="step-card">
              <div className="step-badge">3</div>
              <div className="step-icon-wrapper">
                <ShoppingBag size={28} />
              </div>
              <h3>Step 3: Place Order</h3>
              <p>Pay securely with your student smart wallet and choose your pickup slot.</p>
            </div>

            <div className="step-card">
              <div className="step-badge">4</div>
              <div className="step-icon-wrapper">
                <CheckCircle size={28} />
              </div>
              <h3>Step 4: Pickup Food</h3>
              <p>Skip the line, show your unique QR code at the counter, and grab your meal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Loyalty Banner */}
      <section className="promo-section section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="promo-banner">
            <div className="promo-content">
              <h2>Join CUSIT Bean Club! ☕</h2>
              <p>Earn loyalty points with every transaction. Accumulate points and redeem them for free Karak tea, muffins, and loaded fries during exam weeks.</p>
            </div>
            <div className="promo-action">
              <button
                className="btn promo-btn"
                onClick={() => setCurrentPage('menu')}
              >
                Browse Menu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section section-padding" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Testimonials</span>
            <h2 className="section-title">What CUSIT Students Say</h2>
          </div>

          <div className="reviews-grid">
            {MOCK_REVIEWS.map((review) => (
              <div className="review-card" key={review.id}>
                <div className="review-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < review.rating ? "#fbbf24" : "none"}
                      stroke={i < review.rating ? "#fbbf24" : "var(--text-light)"}
                    />
                  ))}
                </div>
                <p className="review-comment">"{review.comment}"</p>
                <div className="review-author">
                  <div>
                    <h4>{review.name}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CUSIT Student</p>
                  </div>
                  <span className="review-date">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
