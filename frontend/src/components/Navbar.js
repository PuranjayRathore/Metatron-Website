import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isRegistered, setIsRegistered] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const email = localStorage.getItem("metatron_client_email");
    setIsRegistered(!!email);
  }, [location]);

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" className="brand-link">
          <span className="brand-logo">⚡</span> Metatron Cloud
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/solutions">Solutions</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li>
          {isRegistered ? (
            <Link to="/dashboard" className="portal-btn-link">Console 🖥️</Link>
          ) : (
            <Link to="/register" className="portal-btn-link">Portal 🔑</Link>
          )}
        </li>
      </ul>
      <button onClick={toggleDarkMode} className="theme-toggle-btn" aria-label="Toggle dark/light theme">
        🌓 Theme
      </button>
    </nav>
  );
}

export default Navbar;



