import React from "react";

const About = () => {
  return (
    <div>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', sans-serif;
        }

        body {
          background-color: #fffef6;
          background-image: url("bg_sign_in.webp");
          background-size: cover;
          background-position: center;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        header {
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

        .about-section {
          max-width: 1000px;
          margin: 60px auto;
          background: rgba(255, 255, 255, 0.9);
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .about-section h2 {
          color: #2e7d32;
          font-size: 28px;
          margin-bottom: 20px;
          text-shadow: 0 0 10px rgba(0, 255, 204, 0.4);
        }

        .about-section p {
          font-size: 18px;
          line-height: 1.7;
          color: #333;
          margin-bottom: 25px;
        }

        .highlight {
          color: #fe5732;
          font-weight: bold;
        }

        footer {
          background-color: #0b1d23;
          color: #ccc;
          padding: 40px 20px 20px;
          text-align: center;
          font-size: 14px;
        }

        footer .footer-content {
          max-width: 1000px;
          margin: auto;
        }

        footer .footer-content h3 {
          color: #fff;
          margin-bottom: 10px;
        }

        .social-icons {
          margin-top: 10px;
        }

        .social-icons a {
          color: white;
          margin: 0 8px;
          font-size: 18px;
          transition: 0.3s;
        }

        .social-icons a:hover {
          color: #ff6600;
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          nav ul {
            flex-direction: column;
            gap: 10px;
          }

          .about-section {
            padding: 30px 20px;
          }
        }
      `}</style>

      {/* FontAwesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      {/* Header */}
      <header>
        <a href="/" className="logo"><span>P</span>lantera</a>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/buy_kit">Buy Kits</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/predict">Predict</a></li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <a href="/logout" className="btn">Logout</a>
        </div>
      </header>

      {/* About Section */}
      <section className="about-section">
        <h2>🚨 1.5 Million People Die Every Year Due to Poor Air Quality</h2>
        <p>
          Globally, over <span className="highlight">1.5 million people</span> lose their lives every year because of respiratory and cardiovascular conditions caused by air pollution. These are not just statistics — they're lives that could be saved with action, awareness, and smart intervention.
        </p>

        <h2>📊 Only 15% of Districts Use Smart Environmental Kits</h2>
        <p>
          Despite the crisis, less than <span className="highlight">15% of districts</span> in India have adopted smart air quality kits or green monitoring systems. That means the majority of communities remain blind to the invisible threats in the air they breathe.
        </p>

        <h2>💡 Plantera Brings Real-Time Action</h2>
        <p>
          Plantera provides intelligent, affordable sensor kits that empower users to track and report real-time AQI, temperature, humidity, and more. All data collected contributes to a decentralized network that rewards participation with tokens.
        </p>

        <h2>⚡ Your Contribution Saves Lives</h2>
        <p>
          Whether you're a student, government agency, farmer, or citizen — when you buy and deploy a kit, you're saving lives. You're filling the data gaps. You're part of the <span className="highlight">climate defense network</span>.
        </p>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <h3><span style={{ color: "#ff6600" }}>Plantera</span> — Breathe Better. Live Smarter.</h3>
          <p>&copy; 2025 Plantera. All Rights Reserved.</p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-youtube"></i></a>
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
