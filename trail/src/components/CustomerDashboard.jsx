import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const CustomerDashboard = () => {
  return (
    <div className="customer-dashboard">
      <style>{`
        body {
          background-color: rgb(255, 255, 246);
          background-image: url('/static/images/Background_home.png');
          background-size: cover;
          background-repeat: no-repeat;
          font-family: 'Segoe UI', sans-serif;
        }

        .dashboard-header {
          padding: 30px;
          text-align: center;
          background: #fff;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .dashboard-header h1 {
          color: #ff5733;
          font-size: 2.2rem;
          margin-bottom: 10px;
        }

        .dashboard-header p {
          color: #444;
          font-size: 1.1rem;
        }

        .dashboard-section {
          padding: 60px 40px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .dashboard-card {
          background: #fff;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 8px 20px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }

        .dashboard-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(254, 87, 50, 0.3);
        }

        .dashboard-card h3 {
          color: #ff5733;
          margin-bottom: 1rem;
        }

        .dashboard-card p {
          color: #333;
          font-size: 0.95rem;
          line-height: 1.5;
        }
      `}</style>

      <Navbar />

      <header className="dashboard-header">
        <h1>👤 Customer Dashboard</h1>
        <p>Welcome back, explore your profile and tokenized rewards.</p>
      </header>

      <section className="dashboard-section">
        <div className="dashboard-card">
          <h3>My Profile</h3>
          <p>Name: Omkar Kadam</p>
          <p>Email: omkar@example.com</p>
          <p>Phone: 9876543210</p>
          <p>Address: Pune, India</p>
        </div>

        <div className="dashboard-card">
          <h3>My Orders</h3>
          <p>✔ Air Quality Kit – Delivered</p>
          <p>✔ Soil Moisture Kit – In Transit</p>
        </div>

        <div className="dashboard-card">
          <h3>Token Balance</h3>
          <p>💰 120 GreenTokens</p>
          <Link to="/redeem" className="btn">Redeem Now</Link>
        </div>
      </section>
    </div>
  );
};

export default CustomerDashboard;
