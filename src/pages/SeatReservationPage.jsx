import React, { useState } from 'react';
import { Calendar, Users, MapPin, Check, AlertCircle, Trash2 } from 'lucide-react';
import { SEAT_CATEGORIES } from '../mockData';

export default function SeatReservationPage({
  seats,
  onReserveSeat,
  onCancelReservation,
  user,
  setCurrentPage
}) {
  const [selectedZone, setSelectedZone] = useState('window');
  const [selectedTable, setSelectedTable] = useState(null);
  const [timeSlot, setTimeSlot] = useState('12:00 PM - 01:00 PM');
  const [purpose, setPurpose] = useState('Study & Coding');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Find if current student already has a reservation
  const activeReservation = seats.find(s => s.reservedBy === user?.id);

  // Filter tables by zone
  const zoneTables = seats.filter(s => s.category === selectedZone);

  const handleSelectTable = (table) => {
    if (table.status === 'reserved') return;
    setSelectedTable(table);
  };

  const handleConfirmReservation = () => {
    if (!selectedTable || activeReservation) return;
    setShowConfirmModal(true);
  };

  const handleSubmitReservation = () => {
    if (!selectedTable) return;
    onReserveSeat(selectedTable.id, user.id, timeSlot);
    setShowConfirmModal(false);
    setShowSuccess(true);
    setSelectedTable(null);
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
  };

  const handleCancelBooking = () => {
    if (activeReservation) {
      if (confirm("Are you sure you want to cancel your seat reservation?")) {
        onCancelReservation(activeReservation.id);
      }
    }
  };

  if (showSuccess) {
    return (
      <div className="container section-padding" style={{ maxWidth: '540px', paddingTop: '60px' }}>
        <div className="tracker-card success-screen">
          <div className="success-icon-circle">
            <Check size={40} strokeWidth={3} />
          </div>
          <h3>Table Reserved Successfully!</h3>
          <p>
            Your seat at <strong>Table #{seats.find(s => s.reservedBy === user?.id)?.tableNo}</strong> has been secured for today.
          </p>

          <div style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px', marginBottom: '30px', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-light)' }}>Zone:</span>
              <strong style={{ color: 'var(--text-main)', textTransform: 'capitalize' }}>{selectedZone} Area</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-light)' }}>Time Slot:</span>
              <strong style={{ color: 'var(--primary)' }}>{timeSlot}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-light)' }}>Purpose:</span>
              <strong style={{ color: 'var(--text-main)' }}>{purpose}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="btn btn-primary" onClick={() => setShowSuccess(false)} style={{ flex: 1 }}>
              Back to Map
            </button>
            <button className="btn btn-secondary" onClick={() => setCurrentPage('student-dashboard')} style={{ flex: 1 }}>
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container section-padding" style={{ paddingTop: '40px' }}>
      {/* Title */}
      <div style={{ textAlign: 'left', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, margin: 0 }}>Cafeteria Seat Reservation</h1>
        <p style={{ color: 'var(--text-muted)' }}>Secure a dining or study table ahead of time to avoid busy hours.</p>
      </div>

      {/* If student already has a booking */}
      {activeReservation && (
        <div style={{ backgroundColor: 'var(--primary-light)', border: '1px solid var(--primary)', borderRadius: '16px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', textAlign: 'left' }}>
          <div>
            <h4 style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.1rem', marginBottom: '4px' }}>Active Reservation: Table #{activeReservation.tableNo}</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Zone: <strong style={{ textTransform: 'capitalize' }}>{activeReservation.category} Zone</strong> • Time Slot: <strong>{activeReservation.timeSlot}</strong>
            </p>
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={handleCancelBooking}
            style={{ color: 'var(--accent-red)', borderColor: '#fca5a5', backgroundColor: '#fef2f2' }}
          >
            <Trash2 size={16} />
            Cancel Booking
          </button>
        </div>
      )}

      <div className="cart-split-layout">
        {/* Left Column: Interactive Floor Map */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="seat-map-header">
            <div className="menu-categories" style={{ marginBottom: '20px' }}>
              {SEAT_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  className={`category-tab ${selectedZone === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedZone(cat.id);
                    setSelectedTable(null);
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Currently showing: <strong>{SEAT_CATEGORIES.find(c => c.id === selectedZone)?.desc}</strong>
            </p>

            <div className="seat-legend">
              <div className="legend-item">
                <div className="legend-color available"></div>
                <span>Available</span>
              </div>
              <div className="legend-item">
                <div className="legend-color selected"></div>
                <span>Your Selection</span>
              </div>
              <div className="legend-item">
                <div className="legend-color reserved"></div>
                <span>Occupied</span>
              </div>
            </div>
          </div>

          <div className="seat-grid-container">
            <div className="cafeteria-zones">
              <div className="zone-block">
                <h3 className="zone-title" style={{ textTransform: 'capitalize' }}>{selectedZone} dining block</h3>
                <div className="tables-grid">
                  {zoneTables.map(table => {
                    const isSelected = selectedTable?.id === table.id;
                    return (
                      <div
                        key={table.id}
                        className={`table-seat-card ${table.status} ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleSelectTable(table)}
                      >
                        <div className="table-icon-circle">
                          T{table.tableNo}
                        </div>
                        <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>
                          {table.status === 'reserved' ? 'Reserved' : 'Available'}
                        </span>
                        <div className="table-capacity" style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                          <Users size={12} />
                          <span>{table.capacity} Seats</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Reservation Config Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="reservation-sidebar-card">
            <h3 className="summary-header">Reservation details</h3>

            {selectedTable ? (
              <div>
                <div style={{ backgroundColor: 'var(--primary-light)', padding: '16px', borderRadius: '12px', borderLeft: '4px solid var(--primary)', marginBottom: '24px' }}>
                  <h4 style={{ fontWeight: 800, color: 'var(--primary)' }}>Table #{selectedTable.tableNo} Selected</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Zone: <span style={{ textTransform: 'capitalize' }}>{selectedTable.category}</span>
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Max Capacity: <strong>{selectedTable.capacity} Persons</strong>
                  </p>
                </div>

                <div className="form-group">
                  <label className="form-label">Select Booking Time</label>
                  <select
                    className="form-select"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                  >
                    <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                    <option value="12:00 PM - 01:00 PM">12:00 PM - 01:00 PM</option>
                    <option value="01:00 PM - 02:00 PM">01:00 PM - 02:00 PM</option>
                    <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                    <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '30px' }}>
                  <label className="form-label">Purpose of Reservation</label>
                  <select
                    className="form-select"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                  >
                    <option value="Study & Coding">Study & Coding Session</option>
                    <option value="Lunch / Dining">Lunch / Dining</option>
                    <option value="Group Discussion">Group Assignment Meeting</option>
                  </select>
                </div>

                <button
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={handleConfirmReservation}
                  disabled={!!activeReservation}
                >
                  Confirm Table Booking
                </button>

                {activeReservation && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--accent-red)', marginTop: '8px', fontWeight: 'bold' }}>
                    Note: You must cancel your existing reservation before booking a new table.
                  </p>
                )}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-light)' }}>
                <AlertCircle size={36} style={{ margin: '0 auto 12px auto' }} />
                <p style={{ fontSize: '0.9rem' }}>Please select a table from the floor map grid to configure booking.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showConfirmModal && selectedTable && (
        <div className="reservation-modal-backdrop">
          <div className="reservation-modal">
            <h3>Confirm your seat booking</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '6px' }}>Review your selection before confirming the reservation.</p>

            <div className="reservation-detail-row">
              <span>Table</span>
              <strong>#{selectedTable.tableNo}</strong>
            </div>
            <div className="reservation-detail-row">
              <span>Zone</span>
              <strong style={{ textTransform: 'capitalize' }}>{selectedTable.category}</strong>
            </div>
            <div className="reservation-detail-row">
              <span>Time slot</span>
              <strong>{timeSlot}</strong>
            </div>
            <div className="reservation-detail-row">
              <span>Purpose</span>
              <strong>{purpose}</strong>
            </div>

            <div className="reservation-modal-actions">
              <button className="btn btn-secondary" onClick={handleCloseModal}>Edit</button>
              <button className="btn btn-primary" onClick={handleSubmitReservation}>Confirm Reservation</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
