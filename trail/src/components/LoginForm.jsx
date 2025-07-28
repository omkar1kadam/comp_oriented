import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:2402/users/login',
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setMessage('Login successful 🎉');
        console.log('User:', response.data);
        navigate('/profile');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Login failed');
      } else {
        setError('Network error');
      }
    }
  };

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
          min-height: 100vh;
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

        .signin-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 60px 20px;
        }

        .signin-container {
          background-color: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
        }

        .signin-container h2 {
          text-align: center;
          color: #fe5732;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 30px;
          text-shadow: 0 0 10px rgba(254, 87, 50, 0.3);
        }

        .form-group {
          margin-bottom: 20px;
          position: relative;
        }

        .form-group input {
          width: 100%;
          padding: 14px 40px 14px 15px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
        }

        .form-group i {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #999;
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .form-options a {
          color: #00a3c4;
          text-decoration: none;
        }

        .form-options a:hover {
          text-decoration: underline;
        }

        .btn-signin {
          width: 100%;
          background-color: #fe5732;
          color: white;
          padding: 12px;
          font-size: 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s ease;
          font-weight: bold;
          box-shadow: 0 0 15px rgba(254, 87, 50, 0.3);
        }

        .btn-signin:hover {
          background-color: #e64a28;
          box-shadow: 0 0 20px rgba(254, 87, 50, 0.5);
        }

        .register-link {
          text-align: center;
          margin-top: 15px;
          font-size: 14px;
        }

        .register-link a {
          color: #00a3c4;
          font-weight: 500;
          text-decoration: none;
        }

        .register-link a:hover {
          text-decoration: underline;
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

          .signin-container {
            padding: 25px;
          }
        }
      `}</style>

      {/* NAVBAR */}
      <header>
        <a href="/" className="logo"><span>P</span>lantera</a>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/buy_kit">Buy Kits</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <a href="/register" className="btn">Sign Up</a>
        </div>
      </header>

      {/* SIGN IN FORM */}
      <div className="signin-wrapper">
        <div className="signin-container">
          <h2>Sign In to Plantera</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <i className="fas fa-envelope"></i>
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <i className="fas fa-lock"></i>
            </div>

            <div className="form-options">
              <a href="/">Forgot Password?</a>
            </div>

            <button type="submit" className="btn-signin">Sign In</button>
          </form>

          {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

          <div className="register-link">
            Don't have an account? <a href="/signup">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
