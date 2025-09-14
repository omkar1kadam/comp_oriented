import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tokenBalance, setTokenBalance] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://comp-oriented.onrender.com/users/profile", {
        withCredentials: true,
      })
      .then((res) => {
        setUserData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Bro error fetching profile:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
  if (userData?.walletAddress) {
    axios
      .get(`https://comp-oriented.onrender.com/sensors/balance/${userData.walletAddress}`)
      .then((res) => {
        setTokenBalance(res.data.balance);
      })
      .catch((err) => {
        console.error("Bro error fetching token balance:", err);
      });
  }
}, [userData]);


  if (loading)
    return <h2 style={{ padding: "2rem" }}>Loading your profile, bro...</h2>;
  if (!userData)
    return (
      <h2 style={{ padding: "2rem" }}>
        Bro, failed to load profile 😢 Try logging in first.
      </h2>
    );

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
            .info-cards {
  display: flex;
  gap: 20px;
  margin: 30px 0;
  flex-wrap: wrap;
}

.info-card {
  flex: 1 1 250px;
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
}

.info-card i {
  font-size: 30px;
  color: #fe5732;
  margin-bottom: 10px;
}

.info-card h3 {
  font-size: 18px;
  margin-bottom: 8px;
  color: #333;
}

.info-card p {
  font-size: 15px;
  color: #555;
  word-break: break-all;
}

        }
      `}</style>

      <header>
        <a href="/" className="logo">
          <span>P</span>lantera
        </a>
        <nav>
          <ul>
            <li><a href="/place_order">Buy Kits</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>

      <div className="profile-wrapper">
        <h1>
          Welcome <span>{userData.name}</span> 👋
        </h1>
        <div className="info-cards">
  <div className="info-card">
    <i className="fas fa-envelope"></i>
    <h3>Email</h3>
    <p>{userData.email}</p>
  </div>

  <div className="info-card">
    <i className="fas fa-wallet"></i>
    <h3>Wallet</h3>
    <p>
      {userData.walletAddress
        ? userData.walletAddress
        : "Bro no wallet connected 😢"}
    </p>
  </div>

  <div className="info-card">
    <i className="fas fa-coins"></i>
    <h3>Balance</h3>
    <p>
      {tokenBalance !== null ? `${tokenBalance} Tokens` : "Fetching..."}
    </p>
  </div>
</div>



        <h2 style={{ marginTop: "30px", color: "#333" }}>Your Sensors:</h2>

        {userData.devices.length === 0 ? (
          <p style={{ color: "#f00", marginTop: "10px" }}>
            Bro No sensors registered yet 😶
          </p>
        ) : (
          <div className="sensor-cards">
            {userData.devices.map((sensor) => (
              <div
                key={sensor._id}
                className="card"
                onClick={() => navigate(`/sensors/${sensor.deviceId}`)}
              >
                <p>
                  <i className="fas fa-microchip" style={{ color: "green" }}></i>{" "}
                  <strong>Device ID:</strong> {sensor.deviceId}
                </p>
                <p>
                  <i className="fas fa-map-marker-alt"></i>{" "}
                  <strong>Location:</strong> {sensor.location.lat},{" "}
                  {sensor.location.lng}
                </p>
                <p>
                  <i
                    className="fas fa-calendar-plus"
                    style={{ color: "#4385f5" }}
                  ></i>{" "}
                  <strong>Registered:</strong>{" "}
                  {new Date(sensor.registered_on).toLocaleString()}
                </p>
                <p>
                  <i className="fas fa-clock" style={{ color: "gray" }}></i>{" "}
                  <strong>Last Active:</strong>{" "}
                  {new Date(sensor.lastActive).toLocaleString()}
                </p>
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
