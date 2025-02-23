// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
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


const firebaseConfig = {
  apiKey: "AIzaSyAuNwvEfgeTMpJdEZhVkWJpX0PjZwdXQVM",
  authDomain: "login-page-923f8.firebaseapp.com",
  projectId: "login-page-923f8",
  storageBucket: "login-page-923f8.firebasestorage.app",
  messagingSenderId: "784857233109",
  appId: "1:784857233109:web:594bb2dfe13780a0e4545c"
};

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginOptions />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};


const LoginOptions = () => {
  return (
    <div className="container">
      <h1>Welcome to Sahayog</h1>
      <div className="home-links">
        <Link className="btn" to="/user-login">Sign In as User</Link>
        <Link className="btn" to="/admin-login">Sign In as Admin</Link>
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


const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Admin login error:", error);
      alert(`Admin login failed: ${error.message}`);
    }
  };

  return (
    <div className="container form-container">
      <h2>Admin Login</h2>
      <input
        className="input-field"
        type="email"
        placeholder="Admin Email"
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
      <button className="btn" onClick={handleAdminLogin}>Login</button>
      <div className="link-container">
        <Link className="link" to="/admin-signup">Don't have an account? Sign Up</Link>
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


const AdminSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleAdminSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await setDoc(doc(db, "users", userCredential.user.uid), { role: "admin" });
      
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Admin signup error:", error);
      alert(`Admin signup failed: ${error.message}`);
    }
  };

  return (
    <div className="container form-container">
      <h2>Admin Sign Up</h2>
      <input
        className="input-field"
        type="email"
        placeholder="Admin Email"
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
      <button className="btn" onClick={handleAdminSignup}>Sign Up</button>
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


const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <h1 className="welcome-admin">Welcome, Admin!</h1>
      <p className="decorative-text">You have access to admin features.</p>
      <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default App;