import React from "react";
import "../styles/notfound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="nf-container">
      <h1 className="nf-title">404</h1>
      <p className="nf-subtitle">Oops! The page you are looking for does not exist.</p>

      <Link to="/" className="nf-btn">
        ⬅ Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
