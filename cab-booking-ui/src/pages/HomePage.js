import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Welcome.css";

function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home-container" id="top">
      {/* PROFESSIONAL NAVBAR */}
      <nav className={`home-navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-brand">
          <div className="brand-logo">
            <span className="logo-icon">🚖</span>
            <span className="brand-name">RideConnect</span>
          </div>
        </div>

        <div className="navbar-center">
          <a href="#top" className="nav-link">Home</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#about" className="nav-link">About</a>
        </div>

        <div className="navbar-actions">
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero-section" id="welcome">
        <div className="hero-content">
          <div className="hero-badge">Trusted by 10,000+ Users</div>
          <h1 className="hero-title">
            Premium Cab Services
            <span className="highlight"> At Your Fingertips</span>
          </h1>
          <p className="hero-subtitle">
            Experience seamless, reliable, and comfortable rides with real-time tracking,
            professional drivers, and competitive pricing. Your journey starts here.
          </p>
          <div className="hero-buttons">
            <button className="hero-btn primary" onClick={() => window.location.href = "/book-cab"}>
              <span className="btn-icon">🚕</span>
              Book a Ride Now
            </button>
            <button className="hero-btn secondary" onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>
              <span className="btn-icon">📱</span>
              Explore Features
            </button>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <h3>50K+</h3>
            <p>Happy Customers</p>
          </div>
          <div className="stat-item">
            <h3>1000+</h3>
            <p>Professional Drivers</p>
          </div>
          <div className="stat-item">
            <h3>24/7</h3>
            <p>Customer Support</p>
          </div>
          <div className="stat-item">
            <h3>4.9★</h3>
            <p>Average Rating</p>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section" id="features">
        <div className="section-header">
          <span className="section-badge">Why Choose Us</span>
          <h2 className="section-title">Premium Features for Modern Travel</h2>
          <p className="section-subtitle">
            Experience the difference with our industry-leading cab booking platform
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Booking</h3>
            <p>Book your cab in seconds with our lightning-fast booking system. No waiting, no hassle.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📍</div>
            <h3>Real-Time Tracking</h3>
            <p>Track your driver's location in real-time and get accurate arrival estimates.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Secure Payments</h3>
            <p>Multiple payment options with bank-grade security for your peace of mind.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👨‍✈️</div>
            <h3>Professional Drivers</h3>
            <p>All drivers are verified, trained, and committed to your safety and comfort.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Competitive Pricing</h3>
            <p>Transparent pricing with no hidden charges. Get the best value for your money.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Safety First</h3>
            <p>Enhanced safety features including SOS button, trip sharing, and 24/7 support.</p>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="services-section" id="services">
        <div className="section-header">
          <span className="section-badge">Our Services</span>
          <h2 className="section-title">Tailored Solutions for Every Journey</h2>
        </div>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-image">🚗</div>
            <h3>Daily Commute</h3>
            <p>Perfect for your daily office rides with subscription plans and priority booking.</p>
            <button className="service-btn">Learn More →</button>
          </div>

          <div className="service-card featured">
            <div className="featured-badge">Most Popular</div>
            <div className="service-image">🚙</div>
            <h3>Premium Rides</h3>
            <p>Luxury vehicles with premium amenities for special occasions and business travel.</p>
            <button className="service-btn">Learn More →</button>
          </div>

          <div className="service-card">
            <div className="service-image">✈️</div>
            <h3>Airport Transfer</h3>
            <p>Reliable airport pickups and drops with flight tracking and meet & greet service.</p>
            <button className="service-btn">Learn More →</button>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section" id="about">
        <div className="about-content">
          <div className="about-text">
            <span className="section-badge">About RideConnect</span>
            <h2 className="section-title">Building the Future of Urban Mobility</h2>
            <p>
              Founded in 2020, RideConnect has grown to become a leading cab booking platform,
              serving thousands of customers daily. Our mission is simple: make transportation
              accessible, reliable, and enjoyable for everyone.
            </p>
            <p>
              We leverage cutting-edge technology and maintain a strong commitment to customer
              satisfaction, safety, and environmental responsibility. Every ride with us is a
              step towards smarter, cleaner urban transportation.
            </p>
            <div className="about-features">
              <div className="about-feature-item">
                <span className="feature-check">✓</span>
                <span>ISO 9001 Certified Operations</span>
              </div>
              <div className="about-feature-item">
                <span className="feature-check">✓</span>
                <span>Carbon Neutral Fleet Initiative</span>
              </div>
              <div className="about-feature-item">
                <span className="feature-check">✓</span>
                <span>Award-Winning Customer Service</span>
              </div>
            </div>
          </div>

          <div className="about-image">
            <div className="about-image-placeholder">
              <span className="image-icon">🏆</span>
              <p>Excellence in Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Experience the Difference?</h2>
          <p>Join thousands of satisfied customers and book your first ride today.</p>
          <div className="cta-buttons">
            <button className="cta-btn primary" onClick={() => window.location.href = "/book-cab"}>
              Book Your Ride
            </button>
            <button className="cta-btn secondary" onClick={() => window.location.href = "/contact"}>
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <span className="footer-logo">🚖</span>
              <span className="footer-brand-name">RideConnect</span>
            </div>
            <p className="footer-description">
              Your trusted partner for safe, reliable, and comfortable rides across the city.
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#team">Team</a></li>
              <li><a href="#about">About Us</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul className="footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Refund Policy</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect With Us</h4>
            <div className="social-links">
              <a href="#" className="social-icon" aria-label="LinkedIn">💼</a>
              <a href="#" className="social-icon" aria-label="Twitter">🐦</a>
              <a href="#" className="social-icon" aria-label="Facebook">📘</a>
              <a href="#" className="social-icon" aria-label="Instagram">📷</a>
            </div>
            <p className="footer-contact">support@rideconnect.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 RideConnect. All rights reserved.</p>
          <p>Made with ❤️ for better mobility</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;