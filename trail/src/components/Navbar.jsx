import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <style>{`
        .navbar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 50px;
          background: white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #333;
          text-decoration: none;
        }

        .logo span {
          color: #ff6600;
        }

        nav ul {
          list-style: none;
          display: flex;
          gap: 25px;
        }

        nav ul li a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        nav ul li a:hover {
          color: #ff6600;
        }

        .auth-buttons {
          display: flex;
          gap: 10px;
        }

        .btn {
          display: inline-block;
          background-color: #fe5732;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          font-size: 14px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
        }

        .btn:hover {
          background-color: #e64a28;
          box-shadow: 0 0 20px rgba(254, 87, 50, 0.7);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .navbar-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          nav ul {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>

      <header className="navbar-header">
        <Link to="/" className="logo"><span>P</span>lantera</Link>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/buy_kit">Buy Kits</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn">Sign up</Link>
        </div>
      </header>
    </>
  );
}

export default Navbar;
