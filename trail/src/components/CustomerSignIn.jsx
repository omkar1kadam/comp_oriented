import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const CustomerSignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://comp-oriented.onrender.com/api/customers/login";
      const res = await axios.post(url, formData);

      console.log("✅ Customer Login successful:", res.data);

      // redirect to customer dashboard
      navigate("/customer/dashboard"); 
    } catch (err) {
      console.error("❌ Login failed:", err);
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <>
      {/* Inline CSS for this component */}
      <style>{`
        :root {
          --brand: #ff6600;
          --brand-hover: #e65a00;
          --bgcustom: #fafafa;
        }
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background-color: var(--bgcustom);
        }
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          max-width: 1000px;
          margin: 50px auto;
          padding: 0 20px;
          align-items: center;
        }
        .left h1 {
          font-size: 32px;
          margin-bottom: 15px;
          color: #333;
        }
        .left p {
          color: #666;
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 30px;
        }
        form {
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        form label {
          font-weight: 600;
          margin-bottom: 6px;
          display: block;
          color: #333;
        }
        form input {
          width: 100%;
          padding: 12px;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          border-radius: 6px;
          outline: none;
          font-size: 15px;
          transition: border 0.2s, box-shadow 0.2s;
        }
        form input:focus {
          border-color: var(--brand);
          box-shadow: 0 0 4px rgba(255,102,0,0.4);
        }
        form button {
          width: 100%;
          background: var(--brand);
          color: #fff;
          padding: 12px;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          font-size: 16px;
          transition: background 0.2s ease;
        }
        form button:hover {
          background: var(--brand-hover);
        }
        @media (max-width: 768px) {
          .container {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>

      <Navbar />
      <main className="container">
        <div className="left">
          <h1>Customer Login</h1>
          <p>
            Buy kits, access your data, and earn Plantera tokens as a customer.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Login as Customer</button>
        </form>
      </main>
    </>
  );
};

export default CustomerSignIn;
