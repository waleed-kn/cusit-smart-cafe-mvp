import React, { useState } from 'react';
import { LogIn, UserPlus, ArrowRight, ShieldCheck, Mail, Lock, User } from 'lucide-react';
import { MOCK_USERS } from '../mockData';

export default function LoginRegister({ onLoginSuccess, setCurrentPage }) {
  const [activeTab, setActiveTab] = useState('login');
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [agree, setAgree] = useState(true);

  // Quick Login
  const handleQuickLogin = (roleType) => {
    const mockUser = MOCK_USERS[roleType];
    if (mockUser) {
      onLoginSuccess(mockUser);
      // Route immediately
      if (roleType === 'student') {
        setCurrentPage('student-dashboard');
      } else if (roleType === 'staff') {
        setCurrentPage('staff-dashboard');
      } else if (roleType === 'admin') {
        setCurrentPage('admin-dashboard');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful login/register
    if (activeTab === 'login') {
      // Find matching mock user
      let matchedUser = null;
      if (email === MOCK_USERS.student.email) matchedUser = MOCK_USERS.student;
      else if (email === MOCK_USERS.staff.email) matchedUser = MOCK_USERS.staff;
      else if (email === MOCK_USERS.admin.email) matchedUser = MOCK_USERS.admin;
      else {
        // Fallback user if they type something else
        matchedUser = {
          id: "S-10999",
          name: email.split('@')[0] || "Guest Student",
          email: email,
          role: role,
          walletBalance: 1500,
          loyaltyPoints: 120,
          department: "Computer Science",
          avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${email}`
        };
      }
      onLoginSuccess(matchedUser);
      if (matchedUser.role === 'student') setCurrentPage('student-dashboard');
      else if (matchedUser.role === 'staff') setCurrentPage('staff-dashboard');
      else if (matchedUser.role === 'admin') setCurrentPage('admin-dashboard');
    } else {
      // Register
      const newUser = {
        id: role === 'student' ? "S-" + Math.floor(10000 + Math.random() * 90000) : "ST-" + Math.floor(1000 + Math.random() * 9000),
        name: name || "New User",
        email: email || "user@cusit.edu.pk",
        role: role,
        walletBalance: 500, // starting balance
        loyaltyPoints: 10,
        department: role === 'student' ? "Information Technology" : "Cafeteria Operations",
        avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${name || 'default'}`
      };
      onLoginSuccess(newUser);
      if (newUser.role === 'student') setCurrentPage('student-dashboard');
      else if (newUser.role === 'staff') setCurrentPage('staff-dashboard');
      else if (newUser.role === 'admin') setCurrentPage('admin-dashboard');
    }
  };

  return (
    <div className="auth-container">
      {/* Sidebar marketing message */}
      <div className="auth-sidebar">
        <span className="auth-sidebar-tag">Campus Life Made Easy</span>
        <h2>Enjoy Delicious Food Without the Wait</h2>
        <p>
          "CUSIT Smart Café" is a digital initiative to streamline cafeteria ordering. Manage your balance, check today's specials, and secure seating with absolute ease.
        </p>
        <div style={{ marginTop: '40px', display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '12px' }}>
            <ShieldCheck size={28} style={{ color: 'var(--primary)' }} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <h4 style={{ fontWeight: 800 }}>Secured Campus Portal</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Encrypted SSO credentials linked directly to CUSIT student databases.</p>
          </div>
        </div>
      </div>

      {/* Form Page Side */}
      <div className="auth-form-side">
        <div className="auth-card">
          <div className="auth-tabs">
            <div 
              className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Sign In
            </div>
            <div 
              className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {activeTab === 'register' && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-light)' }} />
                  <input 
                    type="text" 
                    placeholder="Enter your full name" 
                    className="form-input" 
                    style={{ paddingLeft: '46px' }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">University Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-light)' }} />
                <input 
                  type="email" 
                  placeholder="student@cusit.edu.pk" 
                  className="form-input" 
                  style={{ paddingLeft: '46px' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-light)' }} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="form-input" 
                  style={{ paddingLeft: '46px' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Select Campus Role</label>
              <select 
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="student">Student / Faculty Member</option>
                <option value="staff">Cafeteria Kitchen Staff</option>
                <option value="admin">System Administrator</option>
              </select>
            </div>

            {activeTab === 'login' ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <label className="checkbox-group">
                  <input type="checkbox" className="checkbox-input" checked={agree} onChange={() => setAgree(!agree)} />
                  <span>Remember me</span>
                </label>
                <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>
                  Forgot Password?
                </a>
              </div>
            ) : (
              <div style={{ marginBottom: '24px' }}>
                <label className="checkbox-group">
                  <input type="checkbox" className="checkbox-input" checked={agree} onChange={() => setAgree(!agree)} required />
                  <span>I agree to CUSIT Digital Policy & Terms</span>
                </label>
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              {activeTab === 'login' ? 'Sign In to Portal' : 'Create Account'}
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Login Profiles for Easy Testing */}
          <div className="quick-profiles-title">Quick Evaluator Login:</div>
          <div className="quick-profiles-grid">
            <div className="quick-profile-card" onClick={() => handleQuickLogin('student')}>
              <h5>Student</h5>
              <p>Waleed</p>
            </div>
            <div className="quick-profile-card" onClick={() => handleQuickLogin('staff')}>
              <h5>Kitchen Staff</h5>
              <p>Chef Asif</p>
            </div>
            <div className="quick-profile-card" onClick={() => handleQuickLogin('admin')}>
              <h5>Admin</h5>
              <p>Dr. Farooq</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
