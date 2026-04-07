import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTrips } from "../../api";
import "../../styles/booking.css";

function TripHistory() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      setLoading(true);
      const data = await getAllTrips();
      console.log("✅ Trip data fetched:", data);
      setTrips(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching trips:", err);
      setError("Failed to load trip history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/user-dashboard");
  };

  return (
    <div className="trip-history-page">
      {/* Header Section */}
      <div className="trip-history-header">
        <button className="back-btn" onClick={handleBack}>
          <span className="btn-icon">←</span>
          Back to Dashboard
        </button>
        <h1 className="page-title">🧾 Trip History</h1>
        <p className="page-subtitle">View all your completed trips</p>
      </div>

      <div className="trip-history-container">
        {loading ? (
          <div className="loading-state">
            <div className="spinner-large"></div>
            <p>Loading your trip history...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <span className="error-icon">⚠️</span>
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
            <button className="retry-btn" onClick={loadTrips}>
              🔄 Retry
            </button>
          </div>
        ) : trips.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🚕</div>
            <h3>No Trips Yet</h3>
            <p>You haven't booked any trips. Start your journey today!</p>
            <button className="book-new-btn" onClick={() => navigate("/book-cab")}>
              <span className="btn-icon">🚖</span>
              Book Your First Ride
            </button>
          </div>
        ) : (
          <>
            {/* Trip Summary Card */}
            <div className="trip-summary-card">
              <div className="summary-item">
                <span className="summary-icon">🚕</span>
                <div className="summary-details">
                  <h3>{trips.length}</h3>
                  <p>Total Trips</p>
                </div>
              </div>
              <div className="summary-item">
                <span className="summary-icon">📍</span>
                <div className="summary-details">
                  <h3>{trips.reduce((sum, trip) => sum + trip.distance, 0).toFixed(2)} km</h3>
                  <p>Total Distance</p>
                </div>
              </div>
              <div className="summary-item">
                <span className="summary-icon">💰</span>
                <div className="summary-details">
                  <h3>₹{trips.reduce((sum, trip) => sum + trip.fare, 0)}</h3>
                  <p>Total Spent</p>
                </div>
              </div>
            </div>

            {/* Trips with Cab Details */}
            <div className="trips-with-cabs-section">
              <h2 className="section-title">📋 Complete Trip Details</h2>
              
              {trips.map((trip, index) => (
                <div className="trip-detail-card" key={index}>
                  {/* Trip Header */}
                  <div className="trip-card-header">
                    <div className="trip-number">
                      <span className="trip-icon">🚖</span>
                      <span>Trip #{index + 1}</span>
                    </div>
                    <span className="trip-status-badge">{trip.message || "Completed"}</span>
                  </div>

                  {/* Two Column Layout */}
                  <div className="trip-card-content">
                    {/* Left Column - Trip Info */}
                    <div className="info-column">
                      <h4 className="column-title">Trip Information</h4>
                      
                      <div className="info-row">
                        <span className="info-label">👤 User ID:</span>
                        <span className="info-value">{trip.userId}</span>
                      </div>
                      
                      <div className="info-row">
                        <span className="info-label">📍 Distance:</span>
                        <span className="info-value highlight-distance">
                          {trip.distance.toFixed(2)} km
                        </span>
                      </div>
                      
                      <div className="info-row">
                        <span className="info-label">💰 Fare:</span>
                        <span className="info-value highlight-fare">₹{trip.fare}</span>
                      </div>
                      
                      <div className="info-row">
                        <span className="info-label">⚡ Surge:</span>
                        <span className={`surge-badge ${trip.surgeApplied ? 'surge-yes' : 'surge-no'}`}>
                          {trip.surgeApplied ? "Yes" : "No"}
                        </span>
                      </div>
                    </div>

                    {/* Right Column - Cab Details */}
                    <div className="info-column cab-details-column">
                      <h4 className="column-title">🚕 Cab Details</h4>
                      
                      <div className="info-row">
                        <span className="info-label">🚕 Cab ID:</span>
                        <span className="info-value cab-id">#{trip.cabId}</span>
                      </div>
                      
                      {trip.driverName && (
                        <div className="info-row">
                          <span className="info-label">👨‍✈️ Driver:</span>
                          <span className="info-value">{trip.driverName}</span>
                        </div>
                      )}
                      
                      {trip.cabNumber && (
                        <div className="info-row">
                          <span className="info-label">🔢 Cab Number:</span>
                          <span className="info-value">{trip.cabNumber}</span>
                        </div>
                      )}
                      
                      {trip.cabType && (
                        <div className="info-row">
                          <span className="info-label">🚗 Cab Type:</span>
                          <span className="info-value">{trip.cabType}</span>
                        </div>
                      )}
                      
                      {trip.cabRating && (
                        <div className="info-row">
                          <span className="info-label">⭐ Rating:</span>
                          <span className="info-value rating">{trip.cabRating} / 5</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Trip Footer with Location */}
                  {(trip.pickupLocation || trip.dropLocation) && (
                    <div className="trip-card-footer">
                      {trip.pickupLocation && (
                        <div className="location-info">
                          <span className="location-icon">📍</span>
                          <div>
                            <span className="location-label">Pickup:</span>
                            <span className="location-value">{trip.pickupLocation}</span>
                          </div>
                        </div>
                      )}
                      {trip.dropLocation && (
                        <div className="location-info">
                          <span className="location-icon">🎯</span>
                          <div>
                            <span className="location-label">Drop:</span>
                            <span className="location-value">{trip.dropLocation}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Trips Table (Alternative View) */}
            <div className="trips-table-container">
              <h2 className="section-title">📊 Table View</h2>
              <table className="trips-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User ID</th>
                    <th>Cab ID</th>
                    <th>Driver</th>
                    <th>Distance</th>
                    <th>Fare</th>
                    <th>Surge</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.map((trip, index) => (
                    <tr key={index} className="trip-row">
                      <td className="trip-number">{index + 1}</td>
                      <td>
                        <span className="user-badge">👤 {trip.userId}</span>
                      </td>
                      <td>
                        <span className="cab-badge">🚕 {trip.cabId}</span>
                      </td>
                      <td>{trip.driverName || "N/A"}</td>
                      <td>
                        <span className="distance-text">{trip.distance.toFixed(2)} km</span>
                      </td>
                      <td>
                        <span className="fare-text">₹{trip.fare}</span>
                      </td>
                      <td>
                        {trip.surgeApplied ? (
                          <span className="surge-badge surge-yes">⚡ Yes</span>
                        ) : (
                          <span className="surge-badge surge-no">❌ No</span>
                        )}
                      </td>
                      <td>
                        <span className="status-badge">{trip.message || "Completed"}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TripHistory;