import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/layout.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");

  // Get admin info from localStorage
  const adminEmail = localStorage.getItem("email") || "admin@cab.com";
  const adminName = adminEmail.split("@")[0];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const stats = [
    { icon: "🚕", label: "Total Cabs", value: "156", color: "#3282b8" },
    { icon: "👥", label: "Active Users", value: "1,234", color: "#28a745" },
    { icon: "📊", label: "Total Trips", value: "5,678", color: "#ff9800" },
    { icon: "💰", label: "Revenue", value: "₹2.5M", color: "#673ab7" }
  ];

  const quickActions = [
    {
      icon: "🚕",
      title: "View Cabs",
      description: "Manage all registered cabs",
      color: "#673ab7",
      action: () => alert("Cab List coming soon")
    },
    {
      icon: "➕",
      title: "Add Cab",
      description: "Register a new cab",
      color: "#009688",
      action: () => alert("Add Cab coming soon")
    },
    {
      icon: "📜",
      title: "View Trips",
      description: "Monitor all trip history",
      color: "#ff9800",
      action: () => alert("Trips coming soon")
    },
    {
      icon: "👥",
      title: "Manage Users",
      description: "View and manage users",
      color: "#2196f3",
      action: () => alert("User Management coming soon")
    },
    {
      icon: "📊",
      title: "Analytics",
      description: "View detailed reports",
      color: "#e91e63",
      action: () => alert("Analytics coming soon")
    },
    {
      icon: "⚙️",
      title: "Settings",
      description: "Configure system settings",
      color: "#607d8b",
      action: () => alert("Settings coming soon")
    }
  ];

  const recentActivities = [
    { icon: "🚕", text: "New cab #157 registered", time: "2 mins ago" },
    { icon: "👤", text: "User John Doe completed trip", time: "5 mins ago" },
    { icon: "💰", text: "Payment received ₹450", time: "12 mins ago" },
    { icon: "🔧", text: "System maintenance completed", time: "1 hour ago" }
  ];

  return (
    <div className="admin-dashboard">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="admin-logo">
            <span className="logo-icon">🚖</span>
            <span className="logo-text">Admin Panel</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeSection === "overview" ? "active" : ""}`}
            onClick={() => setActiveSection("overview")}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">Overview</span>
          </button>
          <button 
            className={`nav-item ${activeSection === "cabs" ? "active" : ""}`}
            onClick={() => setActiveSection("cabs")}
          >
            <span className="nav-icon">🚕</span>
            <span className="nav-text">Cabs</span>
          </button>
          <button 
            className={`nav-item ${activeSection === "users" ? "active" : ""}`}
            onClick={() => setActiveSection("users")}
          >
            <span className="nav-icon">👥</span>
            <span className="nav-text">Users</span>
          </button>
          <button 
            className={`nav-item ${activeSection === "trips" ? "active" : ""}`}
            onClick={() => setActiveSection("trips")}
          >
            <span className="nav-icon">📜</span>
            <span className="nav-text">Trips</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            <span className="nav-text">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Top Header */}
        <header className="admin-header">
          <div className="header-content">
            <div className="header-left">
              <h1 className="dashboard-title">Admin Dashboard</h1>
              <p className="dashboard-subtitle">Welcome back, {adminName}!</p>
            </div>
            <div className="header-right">
              <div className="admin-profile">
                <div className="profile-avatar">
                  <span>👨‍💼</span>
                </div>
                <div className="profile-info">
                  <span className="profile-name">{adminName}</span>
                  <span className="profile-role">Administrator</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <section className="stats-section">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div className="stat-card" key={index}>
                <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="stat-content">
                  <p className="stat-label">{stat.label}</p>
                  <h3 className="stat-value">{stat.value}</h3>
                </div>
                <div className="stat-trend">
                  <span className="trend-up">↑ 12%</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="actions-section">
          <h2 className="section-title">Quick Actions</h2>
          <div className="actions-grid">
            {quickActions.map((action, index) => (
              <div className="action-card" key={index} onClick={action.action}>
                <div className="action-icon" style={{ backgroundColor: action.color }}>
                  {action.icon}
                </div>
                <h3 className="action-title">{action.title}</h3>
                <p className="action-description">{action.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="activity-section">
          <h2 className="section-title">Recent Activity</h2>
          <div className="activity-card">
            <div className="activity-list">
              {recentActivities.map((activity, index) => (
                <div className="activity-item" key={index}>
                  <div className="activity-icon">{activity.icon}</div>
                  <div className="activity-content">
                    <p className="activity-text">{activity.text}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;