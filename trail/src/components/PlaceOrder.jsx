import React, { useState } from "react";
import { Helmet } from "react-helmet";

const PlaceOrder = () => {
  const [email, setEmail] = useState("");
  const [kit, setKit] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      deviceId: kit,
      location: {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
      },
    };

    try {
      const res = await fetch("https://comp-oriented.onrender.com/sensors/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Sensor registered successfully!");
        // Clear fields
        setEmail("");
        setKit("");
        setLatitude("");
        setLongitude("");
        setAddress("");
      } else {
        alert("❌ Error: " + data.error);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("❌ Server error, try again later.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Place Order - Plantera</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <style>{`*{margin:0;padding:0;box-sizing:border-box;font-family:'Segoe UI',sans-serif;}body{background-color:#fffef6;display:flex;flex-direction:column;min-height:100vh;}header{display:flex;justify-content:space-between;align-items:center;padding:20px 50px;background:white;box-shadow:0 2px 10px rgba(0,0,0,0.05);} .logo{font-size:24px;font-weight:bold;color:#333;text-decoration:none;} .logo span{color:#ff6600;} nav ul{list-style:none;display:flex;gap:25px;} nav ul li a{text-decoration:none;color:#333;font-weight:500;transition:color 0.3s ease;} nav ul li a:hover{color:#ff6600;} .container{flex:1;padding:40px 20px;display:flex;justify-content:center;align-items:center;} .order-form{background:#fff;padding:40px;border-radius:16px;box-shadow:0 15px 30px rgba(0,0,0,0.1);width:100%;max-width:500px;} .order-form h2{text-align:center;margin-bottom:30px;color:#fe5732;text-shadow:0 0 10px rgba(254,87,50,0.3);} .form-group{margin-bottom:20px;} .form-group label{display:block;margin-bottom:6px;font-weight:500;color:#333;} .form-group input,.form-group textarea{width:100%;padding:12px;border:1px solid #ccc;border-radius:8px;font-size:16px;} .form-group textarea{resize:vertical;min-height:80px;} .btn-submit{width:100%;background-color:#fe5732;color:white;padding:14px;font-size:16px;border:none;border-radius:8px;cursor:pointer;font-weight:bold;transition:0.3s ease;box-shadow:0 0 15px rgba(254,87,50,0.3);} .btn-submit:hover{background-color:#e64a28;box-shadow:0 0 20px rgba(254,87,50,0.5);} footer{background:#0b1d23;color:#eee;padding:60px 30px 30px;margin-top:60px;} .footer-container{display:flex;flex-wrap:wrap;gap:2rem;justify-content:space-between;max-width:1200px;margin:auto;} .footer-col{flex:1 1 220px;} .footer-logo{font-size:28px;font-weight:bold;color:#fff;margin-bottom:10px;} .footer-logo span{color:#ff6600;} .footer-col h4{color:#fff;margin-bottom:1rem;} .footer-col ul{list-style:none;padding:0;} .footer-col ul li{margin-bottom:8px;} .footer-col ul li a{text-decoration:none;color:#ff9366;transition:0.3s;} .footer-col ul li a:hover{color:#fff;} .footer-col p{margin-bottom:1rem;color:#ccc;line-height:1.6;} .social-icons{margin-top:15px;} .social-icons a{color:white;margin-right:10px;font-size:18px;display:inline-block;transition:transform 0.3s;} .social-icons a:hover{color:#ff6600;transform:scale(1.2);} .footer-bottom{border-top:1px solid rgba(255,255,255,0.1);margin-top:40px;padding-top:15px;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;color:#ccc;font-size:14px;max-width:1200px;margin:40px auto 0;} @media (max-width:768px){header{flex-direction:column;gap:10px;} .footer-container{flex-direction:column;text-align:center;} .footer-bottom{flex-direction:column;gap:0.5rem;text-align:center;}}`}</style>
      </Helmet>

      {/* NAVBAR */}
      <header>
        <a href="/" className="logo"><span>P</span>lantera</a>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* ORDER FORM */}
      <div className="container">
        <form className="order-form" onSubmit={handleSubmit}>
          <h2>Enter Order Details</h2>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>

          <div className="form-group">
            <label htmlFor="kit">Kit Name</label>
            <input type="text" id="kit" value={kit} onChange={(e) => setKit(e.target.value)} placeholder="e.g., sensor_your name" required />
          </div>

          <div className="form-group">
            <label htmlFor="latitude">Latitude</label>
            <input type="number" id="latitude" step="any" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="e.g., 18.5204" required />
          </div>

          <div className="form-group">
            <label htmlFor="longitude">Longitude</label>
            <input type="number" id="longitude" step="any" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="e.g., 73.8567" required />
          </div>

          <div className="form-group">
            <label htmlFor="address">Shipping Address</label>
            <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your full address" required></textarea>
          </div>

          <button type="submit" className="btn-submit">Place Order</button>
        </form>
      </div>

      {/* FOOTER */}
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
              <li><a href="#">Eco Innovation</a></li>
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
    </>
  );
};

export default PlaceOrder;
