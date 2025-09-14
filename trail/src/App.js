// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import SensorDetail from './pages/SensorDetail';
import PlanteraHome from './components/PlanteraHome';
// import Navbar from './components/Navbar';
import PlaceOrder from './components/PlaceOrder';
import About from "./components/About";
import CustomerDashboard from "./components/CustomerDashboard";
import CompanyDashboard from "./components/CompanyDashboard";
import CustomerSignIn from "./components/CustomerSignIn";
import CompanySignIn from "./components/CompanySignIn";
import "./index.css";  // 👈 this is important

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlanteraHome />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sensors/:deviceId" element={<SensorDetail />} />
        <Route path="/place_order" element={<PlaceOrder />} />
        <Route path="/about" element={<About />} />
        <Route path="/customer-login" element={<CustomerSignIn />} />
        <Route path="/company-login" element={<CompanySignIn />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/company/dashboard" element={<CompanyDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
