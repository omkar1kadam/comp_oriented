import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const SensorDetail = () => {
  const { deviceId } = useParams();
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    const fetchReadings = async () => {
      try {
        const res = await fetch(`http://localhost:2402/sensors/${deviceId}/data`);
        const data = await res.json();
        console.log("📦 Full response from backend:", data);
        setReadings(data.readings);
      } catch (error) {
        console.error("❌ Failed to load readings:", error);
      }
    };

    fetchReadings();
  }, [deviceId]);

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

        .container {
          max-width: 900px;
          margin: 40px auto;
          padding: 0 20px;
        }

        h2 {
          color: #2e7d32;
          margin-bottom: 10px;
        }

        h3 {
          margin-top: 10px;
          color: #444;
        }

        .reading-card {
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          padding: 20px;
          margin: 20px 0;
          transition: 0.3s;
        }

        .reading-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .reading-card p {
          margin: 8px 0;
          font-size: 16px;
        }

        .reading-card i {
          margin-right: 8px;
          color: #fe5732;
        }

        footer {
          margin-top: auto;
          background: #0b1d23;
          color: #ccc;
          padding: 40px 30px;
          font-size: 14px;
          text-align: center;
        }

        @media (max-width: 768px) {
          header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          nav ul {
            flex-direction: column;
            gap: 10px;
          }

          .footer-container {
            flex-direction: column;
            text-align: center;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
          }
        }

        .footer-container {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          justify-content: space-between;
          max-width: 1200px;
          margin: auto;
        }

        .footer-col {
          flex: 1 1 220px;
        }

        .footer-logo {
          font-size: 28px;
          font-weight: bold;
          color: #fff;
          margin-bottom: 10px;
        }

        .footer-logo span {
          color: #ff6600;
        }

        .footer-col h4 {
          color: #fff;
          margin-bottom: 1rem;
        }

        .footer-col ul {
          list-style: none;
          padding: 0;
        }

        .footer-col ul li {
          margin-bottom: 8px;
        }

        .footer-col ul li a {
          text-decoration: none;
          color: #ff9366;
          transition: 0.3s;
        }

        .footer-col ul li a:hover {
          color: #fff;
        }

        .footer-col p {
          margin-bottom: 1rem;
          color: #ccc;
          line-height: 1.6;
        }

        .social-icons {
          margin-top: 15px;
        }

        .social-icons a {
          color: white;
          margin-right: 10px;
          font-size: 18px;
          display: inline-block;
          transition: transform 0.3s;
        }

        .social-icons a:hover {
          color: #ff6600;
          transform: scale(1.2);
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 40px;
          padding-top: 15px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          color: #ccc;
          font-size: 14px;
          max-width: 1200px;
          margin: 40px auto 0;
        }

        .footer-bottom a {
          color: #00c4b3;
          text-decoration: none;
        }
      `}</style>

      {/* FontAwesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      <Navbar />
      {/* Header
      <header>
        <div className="logo"><span>P</span>lantera</div>
        <nav>
          <ul>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Buy Kits</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header> */}

      {/* Sensor Data */}
      <div className="container">
        <h2>📟 Sensor: <span style={{ color: "#fe5732" }}>{deviceId}</span></h2>
        <h3>📊 Readings (latest first):</h3>

        {readings.length === 0 ? (
          <p style={{ marginTop: "15px", fontSize: "16px" }}>No readings available bro 🥲</p>
        ) : (
          readings.map((reading, index) => (
            <div className="reading-card" key={index}>
              <p><i className="fas fa-temperature-high"></i> <strong>Temperature:</strong> {reading.data.temperature} °C</p>
              <p><i className="fas fa-tint"></i> <strong>Humidity:</strong> {reading.data.humidity} %</p>
              <p><i className="fas fa-wind"></i> <strong>MQ135 Raw:</strong> {reading.data.mq135_raw}</p>
              <p><i className="fas fa-clock"></i> <strong>Timestamp:</strong> {new Date(reading.timestamp).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <footer>
        <div className="footer-container">
          <div className="footer-col about">
            <h2 className="footer-logo"><span>P</span>lantera</h2>
            <p>Plantera empowers green-tech innovation through real-time environmental tracking and tokenized incentives.</p>
            <div className="social-icons">
              <a href="#"><i className="fab fa-youtube"></i></a>
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Buy Kits</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Technologies</h4>
            <ul>
              <li><a href="#">Air Quality Sensors</a></li>
              <li><a href="#">Blockchain Tracking</a></li>
              <li><a href="#">Token Reward System</a></li>
              <li><a href="#">Sustainability Insights</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Insights</h4>
            <ul>
              <li><a href="#0">Eco Innovation</a></li>
              <li><a href="#">Token Impact</a></li>
              <li><a href="#">Smart Cities</a></li>
              <li><a href="#">Sustainable Future</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Copyright © 2025 Plantera. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SensorDetail;
