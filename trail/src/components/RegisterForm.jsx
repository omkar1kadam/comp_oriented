import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "http://localhost:2402/users/register",
        {
          email,
          password,
          fullName: {
            firstName,
            lastName,
          },
        }
      );

      setSuccessMessage("Registration successful!");
      console.log("User registered:", response.data);
      navigate("/login");

      // Reset fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors.map((err) => err.msg));
      } else {
        setErrors(["Something went wrong, bro."]);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div style={styles.page}>
        <style>{`
          body {
            background-color: #fffef6;
          }

          input:focus, button:focus {
            outline: none;
          }

          ::placeholder {
            color: #aaa;
          }
        `}</style>

        <div style={styles.container}>
          <h2 style={styles.heading}>Create Your Plantera Account</h2>

          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <input
                type="password"
                placeholder="Password (min 6 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <button type="submit" style={styles.submitButton}>
              Sign Up
            </button>
          </form>

          {successMessage && (
            <p style={{ color: "green", marginTop: "15px" }}>
              {successMessage}
            </p>
          )}

          {errors.length > 0 && (
            <ul style={{ color: "red", marginTop: "15px" }}>
              {errors.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

// 💅 Inline Styles
const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#fffef6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
  },
  container: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.1)",
    maxWidth: "450px",
    width: "100%",
  },
  heading: {
    textAlign: "center",
    color: "#fe5732",
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "30px",
    textShadow: "0 0 10px rgba(254, 87, 50, 0.3)",
    fontFamily: "Segoe UI, sans-serif",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  input: {
    width: "93%",
    padding: "14px 15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
    fontFamily: "Segoe UI, sans-serif",
  },
  submitButton: {
    width: "100%",
    backgroundColor: "#fe5732",
    color: "white",
    padding: "12px",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s ease",
    fontWeight: "bold",
    boxShadow: "0 0 15px rgba(254, 87, 50, 0.3)",
  },
};

export default RegisterForm;
