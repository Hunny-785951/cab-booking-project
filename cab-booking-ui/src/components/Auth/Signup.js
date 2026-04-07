import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css"; // adjust path if necessary

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // success or error message
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setMessage(null);
  };

  const handleRole = (selectedRole) => {
    setForm((prev) => ({ ...prev, role: selectedRole }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    // basic client-side validation
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError("Please fill all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/api/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      // backend returns a message string in your UserService.signup implementation
      setMessage(res.data || "Signup successful");
      setForm({ name: "", email: "", password: "", role: "USER"});

      // redirect to login after short delay
      setTimeout(() => navigate("/login"), 900);
    } catch (err) {
      console.error("Signup error:", err);
      const serverMsg = err?.response?.data || "Signup failed. Try again.";
      setError(typeof serverMsg === "string" ? serverMsg : "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>SIGN UP</h2>

      <form className="login-form" onSubmit={handleSignup} noValidate>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
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
            placeholder="Choose a strong password"
            required
          />
        </div>
        {/* ⭐ ADDED ROLE SELECTION BUTTONS */}
        <div className="form-group">
          <label>Select Role</label>
          <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
            <button
              type="button"
              onClick={() => handleRole("USER")}
              style={{
                padding: "6px 10px",
                borderRadius: "6px",
                background: form.role === "USER" ? "green" : "#ccc",
                color: "white",
                border: "none",
              }}
            >
              User
            </button>

            <button
              type="button"
              onClick={() => handleRole("ADMIN")}
              style={{
                padding: "6px 10px",
                borderRadius: "6px",
                background: form.role === "ADMIN" ? "green" : "#ccc",
                color: "white",
                border: "none",
              }}
            >
              Admin
            </button>
          </div>
        </div>

        <div className="buttons">
          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <button
            type="button"
            className="btn-signup"
            onClick={() => navigate("/login")}
          >
            Already have an account?
          </button>
        </div>
      </form>

      {error && <p style={{ color: "red", marginTop: 12 }}>{error}</p>}
      {message && <p style={{ color: "green", marginTop: 12 }}>{message}</p>}

      <div style={{ marginTop: 20, fontSize: 13, opacity: 0.9 }}>
        By signing up you accept the terms. (Demo app)
      </div>
    </div>
  );
}

export default Signup;
