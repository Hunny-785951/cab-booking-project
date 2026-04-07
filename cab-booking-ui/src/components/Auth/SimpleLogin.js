import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css"; // adjust path if necessary

function SimpleLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setMessage(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!form.email.trim() || !form.password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email: form.email,
        password: form.password,
      });

      const data = res.data;

      // expected backend response: { token, role, message }
      if (!data?.token) {
        setError(data?.message || "Login failed.");
        return;
      }

      // store for protected requests & routing
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role || "USER");
      localStorage.setItem("email", form.email);

      setMessage(data.message || "Login successful");

      // redirect based on role
      if ((data.role || "USER").toUpperCase() === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/userdashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      const serverMsg = err?.response?.data?.message || "Invalid credentials";
      setError(serverMsg);
    } finally {
      setLoading(false);
    }
  };

  // Demo quick-fill for local testing (optional)
  const quickFill = (role) => {
    if (role === "USER") setForm({ email: "user@cab.com", password: "user123" });
    if (role === "ADMIN")
      setForm({ email: "admin@cab.com", password: "admin123" });
  };

  return (
    <div className="login-container">
      <h2>LOGIN</h2>

      <form className="login-form" onSubmit={handleLogin} noValidate>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>

        <div className="forgot-password">
          <a href="#forgot">Forgot your password?</a>
        </div>

        <div className="buttons">
          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            className="btn-signup"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </form>

      {error && <p style={{ color: "red", marginTop: 12 }}>{error}</p>}
      {message && <p style={{ color: "green", marginTop: 12 }}>{message}</p>}

      <div style={{ marginTop: 18, fontSize: 13 }}>
        <div>
          <strong>Demo:</strong>{" "}
          <button onClick={() => quickFill("USER")} style={{ marginRight: 8 }}>
            Fill User
          </button>
          <button onClick={() => quickFill("ADMIN")}>Fill Admin</button>
        </div>

        <div style={{ marginTop: 10 }}>
          <small>User: user@cab.com / user123</small>
          <br />
          <small>Admin: admin@cab.com / admin123</small>
        </div>
      </div>
    </div>
  );
}

export default SimpleLogin;
