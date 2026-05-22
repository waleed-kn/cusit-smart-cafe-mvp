import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginRegister from './pages/LoginRegister';
import StudentDashboard from './pages/StudentDashboard';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import SeatReservationPage from './pages/SeatReservationPage';
import StaffDashboard from './pages/StaffDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AIChatFloating from './components/AIChatFloating';

// Custom inline SVG icons for 100% reliable rendering
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const PhoneIcon = (props) => (
  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = (props) => (
  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const MapPinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);



import {
  INITIAL_MENU_ITEMS,
  MOCK_USERS,
  INITIAL_SEATS,
  INITIAL_ORDERS
} from './mockData';

function App() {
  // Session States
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('landing');

  // Shared Data States
  const [menuItems, setMenuItems] = useState(INITIAL_MENU_ITEMS);
  const [seats, setSeats] = useState(INITIAL_SEATS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [cart, setCart] = useState([]);
  const [checkoutDetails, setCheckoutDetails] = useState(null);

  // Authentication Handlers
  const handleLoginSuccess = (userObj) => {
    setUser(userObj);
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setCheckoutDetails(null);
    setCurrentPage('landing');
  };

  // Evaluator Dev Override Swapper
  const setRoleOverride = (roleType) => {
    if (!roleType) {
      handleLogout();
    } else {
      const mockUser = { ...MOCK_USERS[roleType] };
      setUser(mockUser);
      if (roleType === 'student') setCurrentPage('student-dashboard');
      else if (roleType === 'staff') setCurrentPage('staff-dashboard');
      else if (roleType === 'admin') setCurrentPage('admin-dashboard');
    }
  };

  // Cart Operations
  const handleAddToCart = (item) => {
    setCart((prev) => {
      // Check if duplicate with SAME customizations already exists
      const duplicateIndex = prev.findIndex(
        (prevItem) =>
          prevItem.id === item.id &&
          JSON.stringify(prevItem.customizations) === JSON.stringify(item.customizations)
      );

      if (duplicateIndex > -1) {
        const updated = [...prev];
        updated[duplicateIndex].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });
  };

  const handleRemoveFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateCartQuantity = (index, delta) => {
    setCart((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        const updatedQty = item.quantity + delta;
        return updatedQty > 0 ? { ...item, quantity: updatedQty } : item;
      }).filter((item) => item.quantity > 0)
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Order Operations
  const handleAddOrder = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
            ...order,
            status: newStatus,
            prepCountdown: newStatus === 'ready' || newStatus === 'completed' ? 0 : order.prepCountdown
          }
          : order
      )
    );
  };

  // Seat Reservation Operations
  const handleReserveSeat = (seatId, studentId, timeSlot) => {
    setSeats((prev) =>
      prev.map((seat) =>
        seat.id === seatId
          ? { ...seat, status: 'reserved', reservedBy: studentId, timeSlot }
          : seat
      )
    );
  };

  const handleCancelReservation = (seatId) => {
    setSeats((prev) =>
      prev.map((seat) =>
        seat.id === seatId
          ? { ...seat, status: 'available', reservedBy: null, timeSlot: null }
          : seat
      )
    );
  };

  // Smart Wallet Updates
  const handleUpdateWalletBalance = (newBalance) => {
    setUser((prev) => (prev ? { ...prev, walletBalance: newBalance } : null));
    // also update corresponding template user
    MOCK_USERS.student.walletBalance = newBalance;
  };

  // Admin Menu CRUD operations
  const handleAddMenuItem = (newItem) => {
    setMenuItems((prev) => [newItem, ...prev]);
  };

  const handleDeleteMenuItem = (itemId) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleToggleMenuItemAvailability = (itemId) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, available: !item.available } : item
      )
    );
  };

  // Navigation Page Switcher
  const renderActivePage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage setCurrentPage={setCurrentPage} user={user} />;
      case 'login':
        return <LoginRegister onLoginSuccess={handleLoginSuccess} setCurrentPage={setCurrentPage} />;
      case 'student-dashboard':
        return (
          <StudentDashboard
            user={user}
            orders={orders}
            seats={seats}
            menuItems={menuItems}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'menu':
        return (
          <MenuPage
            menuItems={menuItems}
            onAddToCart={handleAddToCart}
          />
        );
      case 'cart':
        return (
          <CartPage
            cart={cart}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
            setCurrentPage={setCurrentPage}
            checkoutDetails={checkoutDetails}
            setCheckoutDetails={setCheckoutDetails}
          />
        );
      case 'payment':
        return (
          <PaymentPage
            user={user}
            checkoutDetails={checkoutDetails}
            cart={cart}
            onUpdateWalletBalance={handleUpdateWalletBalance}
            onClearCart={handleClearCart}
            onAddOrder={handleAddOrder}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'tracking':
        return (
          <OrderTrackingPage
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            user={user}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'reservation':
        return (
          <SeatReservationPage
            seats={seats}
            onReserveSeat={handleReserveSeat}
            onCancelReservation={handleCancelReservation}
            user={user}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'staff-dashboard':
        return (
          <StaffDashboard
            orders={orders}
            seats={seats}
            menuItems={menuItems}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onToggleMenuItemAvailability={handleToggleMenuItemAvailability}
            user={user}
          />
        );
      case 'admin-dashboard':
        return (
          <AdminDashboard
            menuItems={menuItems}
            onAddMenuItem={handleAddMenuItem}
            onDeleteMenuItem={handleDeleteMenuItem}
            orders={orders}
            seats={seats}
            user={user}
          />
        );
      default:
        return <LandingPage setCurrentPage={setCurrentPage} user={user} />;
    }
  };

  // Get current shopping basket count
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <Navbar
        user={user}
        cartCount={cartCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        handleLogout={handleLogout}
        setRoleOverride={setRoleOverride}
      />

      <main style={{ flex: 1 }}>
        {renderActivePage()}
      </main>

      <AIChatFloating />

      <footer className="main-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <h3>CUSIT Smart Café</h3>
            <p className="footer-univ-name">City University of Science & Technology</p>
            <p className="footer-brand-desc">Providing state-of-the-art dining and pre-ordering experiences for the CUSIT campus.</p>
            <div className="footer-socials">
              <a href="#" className="social-icon" aria-label="Facebook" onClick={(e) => e.preventDefault()}><FacebookIcon /></a>
              <a href="#" className="social-icon" aria-label="Twitter" onClick={(e) => e.preventDefault()}><TwitterIcon /></a>
              <a href="#" className="social-icon" aria-label="Instagram" onClick={(e) => e.preventDefault()}><InstagramIcon /></a>
              <a href="#" className="social-icon" aria-label="LinkedIn" onClick={(e) => e.preventDefault()}><LinkedinIcon /></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('landing'); }}>Home</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('menu'); }}>Café Menu</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('reservation'); }}>Seat Booking</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact Info</h4>
            <ul className="footer-contact-list">
              <li>
                <PhoneIcon />
                <span>+92 (91) 123-4567</span>
              </li>
              <li>
                <MailIcon />
                <span>smartcafe@cusit.edu.pk</span>
              </li>
              <li>
                <MapPinIcon />
                <span>Main Campus, Peshawar, Pakistan</span>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Opening Hours</h4>
            <ul>
              <li>Mon - Fri: 8:00 AM - 6:00 PM</li>
              <li>Saturday: 9:00 AM - 4:00 PM</li>
              <li>Sunday: Closed (Main Campus)</li>
            </ul>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>&copy; {new Date().getFullYear()} CUSIT Smart Café. Developed for CUSIT Software Engineering Project.</p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
