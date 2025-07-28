// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import SensorDetail from './pages/SensorDetail';
import PlanteraHome from './components/PlanteraHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlanteraHome />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sensors/:deviceId" element={<SensorDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
