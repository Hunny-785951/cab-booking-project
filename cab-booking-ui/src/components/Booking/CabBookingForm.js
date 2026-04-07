// src/components/Booking/CabBookingForm.js

import React, { useState } from "react";
import { bookCab } from "../../api";
import "../../styles/booking.css";

const CabBookingForm = () => {
  const [userId, setUserId] = useState("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBook = async () => {
    // Reset previous states
    setError("");
    setResult(null);

    // Validation
    if (!userId || !x || !y) {
      setError("Please fill in all fields to proceed");
      return;
    }

    if (Number(userId) <= 0 || Number(x) < 0 || Number(y) < 0) {
      setError("Please enter valid positive numbers");
      return;
    }

    setLoading(true);

    try {
      const res = await bookCab(Number(userId), Number(x), Number(y));
      setResult(res);
      
      // Clear form on success
      setUserId("");
      setX("");
      setY("");
    } catch (err) {
      setError("Booking failed: " + (err.message || "Please try again"));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUserId("");
    setX("");
    setY("");
    setResult(null);
    setError("");
  };

  return (
    <div className="booking-page">
      {/* Header Section */}
      <div className="booking-header">
        <div className="header-badge">Quick & Easy</div>
        <h1 className="booking-title">Book Your Ride</h1>
        <p className="booking-subtitle">
          Enter your details and we'll find the nearest cab for you in seconds
        </p>
      </div>

      <div className="booking-container">
        {/* Booking Form Card */}
        <div className="booking-card">
          <div className="card-header">
            <div className="card-icon">🚕</div>
            <h2>Ride Details</h2>
            <p>Fill in your information to get started</p>
          </div>

          <div className="booking-form">
            {/* User ID Input */}
            <div className="form-group">
              <label htmlFor="userId">
                <span className="label-icon">👤</span>
                User ID
              </label>
              <input
                id="userId"
                type="number"
                className="form-input"
                placeholder="Enter your User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Location Inputs */}
            <div className="location-inputs">
              <div className="form-group">
                <label htmlFor="xLocation">
                  <span className="label-icon">📍</span>
                  X Coordinate
                </label>
                <input
                  id="xLocation"
                  type="number"
                  className="form-input"
                  placeholder="Enter X location"
                  value={x}
                  onChange={(e) => setX(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="yLocation">
                  <span className="label-icon">📍</span>
                  Y Coordinate
                </label>
                <input
                  id="yLocation"
                  type="number"
                  className="form-input"
                  placeholder="Enter Y location"
                  value={y}
                  onChange={(e) => setY(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="form-actions">
              <button 
                className="btn-primary" 
                onClick={handleBook} 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Finding Cab...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">🚖</span>
                    Book Cab Now
                  </>
                )}
              </button>

              <button 
                className="btn-secondary" 
                onClick={handleReset}
                disabled={loading}
              >
                <span className="btn-icon">🔄</span>
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Result Card */}
        {result && (
          <div className="result-card animate-slide-up">
            <div className="result-header">
              <div className="success-icon">✅</div>
              <h3>Booking Confirmed!</h3>
              <p className="result-message">{result.message}</p>
            </div>

            <div className="result-details">
              <div className="detail-item">
                <div className="detail-icon">🚕</div>
                <div className="detail-content">
                  <span className="detail-label">Cab ID</span>
                  <span className="detail-value">#{result.cabId}</span>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">📏</div>
                <div className="detail-content">
                  <span className="detail-label">Distance</span>
                  <span className="detail-value">{result.distance.toFixed(2)} km</span>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">💰</div>
                <div className="detail-content">
                  <span className="detail-label">Fare Amount</span>
                  <span className="detail-value fare-amount">₹{result.fare.toFixed(2)}</span>
                </div>
              </div>

              {result.surgeApplied && (
                <div className="surge-badge">
                  <span className="surge-icon">⚡</span>
                  Surge Pricing Applied
                </div>
              )}
            </div>

            <div className="result-actions">
              <button className="btn-track">
                <span className="btn-icon">📱</span>
                Track Ride
              </button>
              <button className="btn-call">
                <span className="btn-icon">📞</span>
                Call Driver
              </button>
            </div>

            <div className="booking-info">
              <p>🕐 Your cab will arrive in approximately 5-8 minutes</p>
              <p>📧 Booking confirmation sent to your email</p>
            </div>
          </div>
        )}

        {/* Info Cards */}
        <div className="info-cards">
          <div className="info-card">
            <div className="info-icon">⚡</div>
            <h4>Instant Booking</h4>
            <p>Get confirmed in seconds</p>
          </div>

          <div className="info-card">
            <div className="info-icon">🔒</div>
            <h4>Safe & Secure</h4>
            <p>Verified drivers only</p>
          </div>

          <div className="info-card">
            <div className="info-icon">💳</div>
            <h4>Easy Payment</h4>
            <p>Multiple payment options</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="booking-features">
        <h3>Why Book With Us?</h3>
        <div className="features-list">
          <div className="feature-item">
            <span className="check-icon">✓</span>
            <span>Real-time cab tracking</span>
          </div>
          <div className="feature-item">
            <span className="check-icon">✓</span>
            <span>24/7 customer support</span>
          </div>
          <div className="feature-item">
            <span className="check-icon">✓</span>
            <span>Transparent pricing</span>
          </div>
          <div className="feature-item">
            <span className="check-icon">✓</span>
            <span>Professional drivers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabBookingForm;