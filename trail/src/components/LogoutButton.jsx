import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:2402/users/logout', {
        withCredentials: true, // must send cookies
      });
      console.log("Logged out successfully bro");
      navigate('/login'); // redirect to login page
    } catch (error) {
      console.error("Logout failed bro", error);
    }
  };

  return (
    <button onClick={handleLogout} className="bg-red-600 px-4 py-2 text-white rounded-lg">
      Logout
    </button>
  );
};

export default LogoutButton;
