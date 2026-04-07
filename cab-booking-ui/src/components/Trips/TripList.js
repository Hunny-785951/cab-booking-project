import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTrips } from "../../api";
import "../../styles/booking.css";

function TripList() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // all, recent, high-fare

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      setLoading(true);
      const data = await getAllTrips();
      setTrips(data);
      setError("");
    } catch (err) {
      console.error("Error fetching trips:", err);
      setError("Failed to load trip history.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/user-dashboard");
  };

  // Filter trips based on selected filter
  const getFilteredTrips = () => {
    if (filter === "recent") {
      return trips.slice(-5).reverse(); // Last 5 trips
    }
    if (filter === "high-fare") {
      return [...trips].sort((a, b) => b.fare - a.fare);
    }
    return trips;
  };

  const filteredTrips = getFilteredTrips();

  return (
    <div className="trip-list-page">
      {/* Header Section */}
      <div className="trip-list-header">
        <button className="back-btn" onClick={handleBack}>
          <span className="btn-icon">←</span>
          Back to Dashboard
        </button>
        <h1 className="page-title">📜 My Trips</h1>
        <p className="page-subtitle">Browse your trip collection</p>
      </div>

      <div className="trip-list-container">
        {loading ? (
          <div className="loading-state">
            <div className="spinner-large"></div>
            <p>Loading trips...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <span className="error-icon">⚠️</span>
            <h3>Something went wrong</h3>
            <p>{error}</p>
            <button className="retry-btn" onClick={loadTrips}>
              🔄 Try Again
            </button>
          </div>
        ) : trips.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🚕</div>
            <h3>No Trips Yet</h3>
            <p>Start exploring! Book your first ride today.</p>
            <button className="book-new-btn" onClick={() => navigate("/book-cab")}>
              <span className="btn-icon">🚖</span>
              Book a Ride
            </button>
          </div>
        ) : (
          <>
            {/* Filter Buttons */}
            <div className="filter-section">
              <h3 className="filter-title">Filter Trips:</h3>
              <div className="filter-buttons">
                <button
                  className={`filter-btn ${filter === "all" ? "active" : ""}`}
                  onClick={() => setFilter("all")}
                >
                  All Trips
                </button>
                <button
                  className={`filter-btn ${filter === "recent" ? "active" : ""}`}
                  onClick={() => setFilter("recent")}
                >
                  Recent
                </button>
                <button
                  className={`filter-btn ${filter === "high-fare" ? "active" : ""}`}
                  onClick={() => setFilter("high-fare")}
                >
                  High Fare
                </button>
              </div>
            </div>

            {/* Trip Stats */}
            <div className="trip-stats-bar">
              <div className="stat-item">
                <span className="stat-icon">📊</span>
                <span>Showing {filteredTrips.length} of {trips.length} trips</span>
              </div>
            </div>

            {/* Trip Cards Grid with Cab Details */}
            <div className="trip-cards-grid">
              {filteredTrips.map((trip, index) => (
                <div className="trip-card-modern" key={index}>
                  {/* Card Header */}
                  <div className="trip-card-header">
                    <div className="trip-number-badge">
                      <span className="trip-icon">🚖</span>
                      <span>Trip #{trips.indexOf(trip) + 1}</span>
                    </div>
                    <span className="trip-status-badge">✅ Completed</span>
                  </div>

                  {/* Card Body - Trip Info */}
                  <div className="trip-card-body">
                    <div className="trip-section">
                      <h4 className="section-subtitle">Trip Information</h4>
                      
                      <div className="trip-detail-row">
                        <span className="detail-label">👤 User ID</span>
                        <span className="detail-value">{trip.userId}</span>
                      </div>
                      
                      <div className="trip-detail-row">
                        <span className="detail-label">📍 Distance</span>
                        <span className="detail-value distance-highlight">
                          {trip.distance.toFixed(2)} km
                        </span>
                      </div>
                      
                      <div className="trip-detail-row fare-row">
                        <span className="detail-label">💰 Fare</span>
                        <span className="detail-value fare-highlight">₹{trip.fare}</span>
                      </div>
                      
                      <div className="trip-detail-row">
                        <span className="detail-label">⚡ Surge</span>
                        <span className={`surge-indicator ${trip.surgeApplied ? 'active' : ''}`}>
                          {trip.surgeApplied ? "Applied" : "No"}
                        </span>
                      </div>
                    </div>

                    {/* Cab Details Section */}
                    <div className="trip-section cab-info-section">
                      <h4 className="section-subtitle">🚕 Cab Details</h4>
                      
                      <div className="trip-detail-row">
                        <span className="detail-label">🚕 Cab ID</span>
                        <span className="detail-value cab-id-badge">#{trip.cabId}</span>
                      </div>
                      
                      {trip.driverName && (
                        <div className="trip-detail-row">
                          <span className="detail-label">👨‍✈️ Driver</span>
                          <span className="detail-value">{trip.driverName}</span>
                        </div>
                      )}
                      
                      {trip.cabNumber && (
                        <div className="trip-detail-row">
                          <span className="detail-label">🔢 Cab No.</span>
                          <span className="detail-value">{trip.cabNumber}</span>
                        </div>
                      )}
                      
                      {trip.cabType && (
                        <div className="trip-detail-row">
                          <span className="detail-label">🚗 Type</span>
                          <span className="detail-value">{trip.cabType}</span>
                        </div>
                      )}
                      
                      {trip.cabRating && (
                        <div className="trip-detail-row">
                          <span className="detail-label">⭐ Rating</span>
                          <span className="detail-value rating-value">
                            {trip.cabRating} / 5
                          </span>
                        </div>
                      )}
                      
                      {!trip.driverName && !trip.cabNumber && !trip.cabType && (
                        <p className="no-cab-info">
                          <span className="info-icon">ℹ️</span>
                          Additional cab details not available
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="trip-card-footer">
                    <button className="view-details-btn">
                      View Full Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TripList;