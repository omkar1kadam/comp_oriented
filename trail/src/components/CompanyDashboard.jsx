import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const CompanyDashboard = () => {
  return (
    <div className="company-dashboard">
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
          color: #00a3c4;
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
          box-shadow: 0 20px 40px rgba(52, 168, 83, 0.3);
        }

        .dashboard-card h3 {
          color: #00a3c4;
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
        <h1>🏢 Company Admin Dashboard</h1>
        <p>Manage your company, employees, and customers efficiently.</p>
      </header>

      <section className="dashboard-section">
        <div className="dashboard-card">
          <h3>Company Info</h3>
          <p>Name: Plantera Pvt Ltd</p>
          <p>Email: admin@plantera.com</p>
          <p>Wallet: 0x1234...abcd</p>
          <p>Role: Super Admin</p>
        </div>

        <div className="dashboard-card">
          <h3>Employees</h3>
          <p>👨‍💻 Employee 1 – Manager</p>
          <p>👩‍💻 Employee 2 – Developer</p>
        </div>

        <div className="dashboard-card">
          <h3>Customers</h3>
          <p>✔ 102 Active Customers</p>
          <Link to="/company/customers" className="btn">Manage Customers</Link>
        </div>
      </section>
    </div>
  );
};

export default CompanyDashboard;
