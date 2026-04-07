import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAvailableCabs } from "../api";
import "../styles/layout.css";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [cabs, setCabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user info from localStorage
  const userEmail = localStorage.getItem("email") || "user@cab.com";
  const userName = userEmail.split("@")[0];

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getAvailableCabs();
      setCabs(data);
      setError(null);
    } catch (err) {
      console.error("Cab load error", err);
      setError("Failed to load available cabs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleBookCab = () => {
    navigate("/book-cab");
  };

  const quickStats = [
    { icon: "🚕", label: "Available Cabs", value: cabs.length, color: "#3282b8" },
    { icon: "📍", label: "Total Trips", value: "23", color: "#28a745" },
    { icon: "💰", label: "Total Spent", value: "₹5,670", color: "#ff9800" }
  ];

  return (
    <div className="user-dashboard">
      {/* Top Navigation */}
      <nav className="user-navbar">
        <div className="navbar-brand">
          <span className="brand-icon">🚖</span>
          <span className="brand-text">RideConnect</span>
        </div>
        <div className="navbar-actions">
          <button className="nav-btn" onClick={() => navigate("/")}>
            <span className="btn-icon">🏠</span>
            Home
          </button>
          <button className="nav-btn" onClick={() => navigate("/trip-history")}>
            <span className="btn-icon">🧾</span>
            Trip History
          </button>
          <button className="nav-btn" onClick={() => navigate("/trip-list")}>
            <span className="btn-icon">📜</span>
            My Trips
          </button>
          <button className="nav-btn logout-btn" onClick={handleLogout}>
            <span className="btn-icon">🚪</span>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="dashboard-container">
        {/* Welcome Section */}
        <section className="welcome-section">
          <div className="welcome-content">
            <div className="welcome-text">
              <h1 className="welcome-title">Welcome back, {userName}! 👋</h1>
              <p className="welcome-subtitle">Ready to book your next ride?</p>
            </div>
            <button className="book-ride-btn" onClick={handleBookCab}>
              <span className="btn-icon">🚕</span>
              Book a Ride
            </button>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="quick-stats">
          <div className="stats-grid">
            {quickStats.map((stat, index) => (
              <div className="stat-card" key={index}>
                <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="stat-details">
                  <h3 className="stat-value">{stat.value}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Available Cabs Section */}
        <section className="cabs-section">
          <div className="section-header">
            <h2 className="section-title">Available Cabs Nearby</h2>
            <button className="refresh-btn" onClick={load} disabled={loading}>
              <span className="btn-icon">{loading ? "⏳" : "🔄"}</span>
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {loading ? (
            <div className="loading-container">
              <div className="spinner-large"></div>
              <p>Loading available cabs...</p>
            </div>
          ) : cabs.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🚕</div>
              <h3>No Cabs Available</h3>
              <p>All cabs are currently busy. Please check back in a few minutes.</p>
            </div>
          ) : (
            <div className="cabs-grid">
              {cabs.map((cab) => (
                <div className="cab-card" key={cab.cabId}>
                  <div className="cab-header">
                    <div className="cab-icon">🚕</div>
                    <div className="cab-badge">Available</div>
                  </div>
                  <div className="cab-body">
                    <h3 className="cab-title">Cab #{cab.cabId}</h3>
                    <div className="cab-info">
                      <div className="info-item">
                        <span className="info-icon">👨‍✈️</span>
                        <span className="info-text">{cab.driverName}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-icon">📍</span>
                        <span className="info-text">Location: ({cab.x}, {cab.y})</span>
                      </div>
                      <div className="info-item">
                        <span className="info-icon">⭐</span>
                        <span className="info-text">4.8 Rating</span>
                      </div>
                    </div>
                  </div>
                  <div className="cab-footer">
                    <button className="book-cab-btn" onClick={handleBookCab}>
                      <span className="btn-icon">🚖</span>
                      Book This Cab
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recent Trips Section */}
        <section className="recent-trips-section">
          <h2 className="section-title">Recent Trips</h2>
          <div className="trips-card">
            <div className="trip-item">
              <div className="trip-icon">🚕</div>
              <div className="trip-details">
                <h4>Trip to Airport</h4>
                <p className="trip-date">Jan 15, 2025 • 10:30 AM</p>
              </div>
              <div className="trip-amount">₹450</div>
            </div>
            <div className="trip-item">
              <div className="trip-icon">🚕</div>
              <div className="trip-details">
                <h4>Trip to Downtown</h4>
                <p className="trip-date">Jan 12, 2025 • 3:45 PM</p>
              </div>
              <div className="trip-amount">₹280</div>
            </div>
            <div className="trip-item">
              <div className="trip-icon">🚕</div>
              <div className="trip-details">
                <h4>Trip to Mall</h4>
                <p className="trip-date">Jan 10, 2025 • 6:20 PM</p>
              </div>
              <div className="trip-amount">₹320</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;