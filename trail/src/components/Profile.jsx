import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:2402/users/profile", { withCredentials: true })
      .then((res) => {
        setUserData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Bro error fetching profile:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 style={{ padding: "2rem" }}>Loading your profile, bro...</h2>;
  if (!userData) return <h2 style={{ padding: "2rem" }}>Bro, failed to load profile 😢 Try logging in first.</h2>;

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

        .profile-wrapper {
          max-width: 1200px;
          margin: 40px auto;
          padding: 0 20px;
        }

        h1 {
          font-size: 30px;
          color: #2e7d32;
          margin-bottom: 10px;
        }

        h1 span {
          color: #fe5732;
        }

        .sensor-cards {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-top: 25px;
        }

        .card {
          flex: 1 1 300px;
          background: #fff;
          padding: 20px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: 0.3s;
          cursor: pointer;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .card p {
          margin: 10px 0;
          font-size: 15px;
        }

        .card i {
          margin-right: 8px;
          color: #fe5732;
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

          .sensor-cards {
            flex-direction: column;
          }
        }
      `}</style>

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
      </header>

      <div className="profile-wrapper">
        <h1>Welcome <span>{userData.name}</span> 👋</h1>
        <p>Email: {userData.email}</p>

        <h2 style={{ marginTop: "30px", color: "#333" }}>Your Sensors:</h2>

        {userData.devices.length === 0 ? (
          <p style={{ color: "#f00", marginTop: "10px" }}>No sensors registered yet 😶</p>
        ) : (
          <div className="sensor-cards">
            {userData.devices.map((sensor) => (
              <div
                key={sensor._id}
                className="card"
                onClick={() => navigate(`/sensors/${sensor.deviceId}`)}
              >
                <p><i className="fas fa-microchip" style={{ color: "green" }}></i> <strong>Device ID:</strong> {sensor.deviceId}</p>
                <p><i className="fas fa-map-marker-alt"></i> <strong>Location:</strong> {sensor.location.lat}, {sensor.location.lng}</p>
                <p><i className="fas fa-calendar-plus" style={{ color: "#4385f5" }}></i> <strong>Registered:</strong> {new Date(sensor.registered_on).toLocaleString()}</p>
                <p><i className="fas fa-clock" style={{ color: "gray" }}></i> <strong>Last Active:</strong> {new Date(sensor.lastActive).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FontAwesome CDN for icons */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </div>
  );
};

export default Profile;
