
import './App.css';

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import "./App.css";


// INSERT API DETAILS HERE
//
//

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginOptions />} />
        <Route path="/user-login" element={<UserLogin />} />
        
        <Route path="/user-signup" element={<UserSignup />} />
        
        <Route path="/user-dashboard" element={<UserDashboard />} />
        
      </Routes>
    </Router>
  );
};


const LoginOptions = () => {
  return (
    <div className="container">
      <h1>Welcome to Sahayog</h1>
      <div className="home-links">
        <Link className="btn" to="/user-login">Sign In </Link>
        
      </div>
    </div>
  );
};


const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUserLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/user-dashboard");
    } catch (error) {
      console.error("User login error:", error);
      alert(`User login failed: ${error.message}`);
    }
  };

  return (
    <div className="container form-container">
      <h2>User Login</h2>
      <input
        className="input-field"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input-field"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn" onClick={handleUserLogin}>Login</button>
      <div className="link-container">
        <Link className="link" to="/user-signup">Don't have an account? Sign Up</Link>
      </div>
    </div>
  );
};




const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleUserSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      
      navigate("/user-dashboard");
    } catch (error) {
      console.error("User signup error:", error);
      alert(`User signup failed: ${error.message}`);
    }
  };

  return (
    <div className="container form-container">
      <h2>User Sign Up</h2>
      <input
        className="input-field"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input-field"
        type="password"
        placeholder="Password (min 6 characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="input-field"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button className="btn" onClick={handleUserSignup}>Sign Up</button>
    </div>
  );
};





const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <h1 className="welcome-user">Welcome, User!</h1>
      <p className="decorative-text">We're delighted to have you here.</p>
      <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};




export default App;