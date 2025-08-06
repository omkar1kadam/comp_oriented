import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaYoutube,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaShoppingCart
} from 'react-icons/fa';
import Navbar from './Navbar';

const PlanteraHome = () => {
  return (
    <div className="plantera-home">
        <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', sans-serif;
        }

        body {
          background-color: rgb(255, 255, 246);
          background-image: url('/static/images/Background_home.png');
          background-size: cover;
          background-repeat: no-repeat;
          color: #333;
        }

        .header {
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

        .btn,
        #buyBtn {
          display: inline-block;
          background-color: rgb(254, 87, 50);
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          font-size: 16px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
        }

        .btn:hover,
        #buyBtn:hover {
          background-color: rgb(220, 60, 30);
          box-shadow: 0 0 20px rgba(254, 87, 50, 0.7);
          transform: translateY(-2px);
        }

        .hero {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          padding: 100px 50px;
        }

        .hero-text {
          max-width: 600px;
        }

        .hero-text h1 {
          color: #ff5733;
          font-size: 48px;
          margin-bottom: 20px;
        }

        .hero-text p {
          color: #444;
          font-size: 18px;
          margin-bottom: 30px;
        }

        .hero-sub {
          color: #00a3c4;
          font-weight: bold;
        }

        .hero-image {
          max-width: 500px;
        }

        .hero-image img {
          width: 100%;
        }

        .feature-section {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          justify-content: center;
          align-items: stretch;
          padding: 4rem 2rem;
          background: #f7fef9;
        }

        .feature-card {
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
          padding: 2rem;
          width: 270px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          position: relative;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(52, 168, 83, 0.3);
        }

        .icon-circle {
          background: linear-gradient(45deg, #34a853, #81c784);
          color: white;
          font-size: 1.7rem;
          width: 55px;
          height: 55px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          box-shadow: 0 5px 15px rgba(52, 168, 83, 0.2);
          margin-bottom: 1rem;
          transition: transform 0.5s ease;
        }

        .feature-card:hover .icon-circle {
          transform: rotate(360deg);
        }

        .feature-card h3 {
          margin-bottom: 0.6rem;
          font-size: 1.1rem;
          color: #222;
        }

        .feature-card p {
          color: #444;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .feature-card .number {
          position: absolute;
          bottom: 15px;
          right: 20px;
          font-size: 2.5rem;
          font-weight: bold;
          color: #e0f2f1;
          user-select: none;
        }

        .footer {
          background: #0b1d23;
          color: #eee;
          padding: 60px 30px 30px;
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
        }

        .footer-bottom a {
          color: #00c4b3;
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .footer-container {
            flex-direction: column;
            text-align: center;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
          }

          .social-icons {
            justify-content: center;
          }
        }
      `}</style>
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <p className="hero-sub">BE PART OF THE AIR QUALITY REVOLUTION — LET’S CHANGE THE FUTURE TOGETHER</p>
          <h1>Grow with Plantera <br /> in the Digital Ecosystem</h1>
          <p>
            We craft strategies that help your green-tech brand flourish and lead in the digital world.
            Earn exclusive Plantera tokens as you participate and grow with us.
            <br /><br />
            Let’s Cultivate the Future Together
          </p>
          <Link to="/place_order" id="buyBtn">Buy Kits <FaShoppingCart /></Link>
        </div>
        <div className="hero-image">
          <img src="/static/images/bg_free_img.png" alt="Graphics illustration" />
        </div>
      </section>

      {/* Feature Section */}
      <section className="feature-section">
        {[
          {
            icon: '🌿',
            title: 'Environmental Monitoring',
            desc: 'Track real-time air quality, humidity, and temperature using intelligent sensor kits.',
            number: '01'
          },
          {
            icon: '🔁',
            title: 'Tokenization',
            desc: 'Every data packet you share earns you GreenTokens — rewarding your environmental impact.',
            number: '02'
          },
          {
            icon: '🌎',
            title: 'Eco-Friendly Design',
            desc: 'Built with low-power tech and sustainable materials to reduce environmental footprint.',
            number: '03'
          },
          {
            icon: '🔌',
            title: 'Easy Integration',
            desc: 'Seamlessly connect with platforms and APIs to unlock real-time environmental intelligence.',
            number: '04'
          }
        ].map((card, i) => (
          <div key={i} className="feature-card">
            <div className="icon-circle">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
            <span className="number">{card.number}</span>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-col about">
            <h2 className="footer-logo"><span>P</span>lantera</h2>
            <p>
              Plantera empowers green-tech innovation through real-time environmental tracking and tokenized incentives.
            </p>
            <div className="social-icons">
              <a href="#0"><FaYoutube /></a>
              <a href="#0"><FaFacebookF /></a>
              <a href="#0"><FaLinkedinIn /></a>
              <a href="#0"><FaInstagram /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="#">Home</Link></li>
              <li><Link to="#">About Us</Link></li>
              <li><Link to="#">Buy Kits</Link></li>
              <li><Link to="#">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Technologies</h4>
            <ul>
              <li><Link to="#">Air Quality Sensors</Link></li>
              <li><Link to="#">Blockchain Tracking</Link></li>
              <li><Link to="#">Token Reward System</Link></li>
              <li><Link to="#">Sustainability Insights</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Insights</h4>
            <ul>
              <li><Link to="#">Eco Innovation</Link></li>
              <li><Link to="#">Token Impact</Link></li>
              <li><Link to="#">Smart Cities</Link></li>
              <li><Link to="#">Sustainable Future</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PlanteraHome;
