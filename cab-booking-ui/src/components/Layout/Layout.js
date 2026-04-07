import React from "react";
import { Link } from "react-router-dom";
import "../../styles/layout.css";


function Layout({ children }) {
  const role = localStorage.getItem("role");

  return (
    <div className="app-layout">
      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="logo">🚖 CabBooking</h2>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>

          {role === "USER" && (
            <>
              <li><Link to="/userdashboard">Dashboard</Link></li>
              <li><Link to="/book-cab">Book Cab</Link></li>
            </>
          )}

          {role === "ADMIN" && (
            <>
              <li><Link to="/admindashboard">Admin Panel</Link></li>
              <li><Link to="/admin/cabs">Manage Cabs</Link></li>
            </>
          )}

          {!role && <li><Link to="/login">Login</Link></li>}

          {role && (
            <li>
              <button
                className="logout-btn"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/login";
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* PAGE CONTENT */}
      <div className="content">{children}</div>
    </div>
  );
}

export default Layout;