// src/pages/Profile.jsx
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

  if (loading) return <h2>Loading your profile, bro...</h2>;
  if (!userData) return <h2>Bro, failed to load profile 😢</h2>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome {userData.name} 👋</h1>
      <p className="text-gray-700 mb-6">Email: {userData.email}</p>

      <h2 className="text-xl font-semibold mb-2">Your Sensors:</h2>
      {userData.devices.length === 0 ? (
        <p className="text-red-600">No sensors registered yet 😶</p>
      ) : (
        <div className="space-y-4">
          {userData.devices.map((sensor) => (
            <button
              key={sensor._id}
              onClick={() => navigate(`/sensors/${sensor.deviceId}`)} // ✅ FIXED HERE
              className="block w-full text-left border rounded-2xl p-4 bg-white shadow-md hover:bg-blue-50 transition-all"
            >
              <p className="text-lg font-semibold">
                📟 Device ID: {sensor.deviceId}
              </p>
              <p>
                📍 Location: {sensor.location.lat}, {sensor.location.lng}
              </p>
              <p>
                📅 Registered On:{" "}
                {new Date(sensor.registered_on).toLocaleString()}
              </p>
              <p>
                🕒 Last Active: {new Date(sensor.lastActive).toLocaleString()}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
