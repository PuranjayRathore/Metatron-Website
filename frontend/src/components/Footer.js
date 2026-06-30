import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="container footer-grid">
        <div className="footer-brand-section">
          <h3>⚡ Metatron Cloud</h3>
          <p>
            Enterprise-grade private cloud infrastructure, SAP S/4HANA managed migrations,
            and certified OS &amp; workspace licensing for modern businesses worldwide.
          </p>
          <p className="copyright-text">
            &copy; {currentYear} Metatron Cloud Technologies. All rights reserved.
          </p>
        </div>

        <div className="footer-links-column">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/solutions">Solutions</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/register">Client Portal</Link></li>
          </ul>
        </div>

        <div className="footer-links-column">
          <h4>Solutions</h4>
          <ul>
            <li><Link to="/solutions#sap">SAP Migration &amp; Modernization</Link></li>
            <li><Link to="/solutions#cloud">Managed Cloud Infrastructure</Link></li>
            <li><Link to="/solutions#licensing">Workspace &amp; Licensing</Link></li>
            <li><Link to="/solutions#cyber">Zero-Trust Cybersecurity</Link></li>
          </ul>
        </div>

        <div className="footer-links-column">
          <h4>Contact</h4>
          <ul>
            <li>support@metatroncloud.com</li>
            <li>sales@metatroncloud.com</li>
            <li>+1 (555) 019-2834 (Sales)</li>
            <li>+1 (555) 019-2835 (Support)</li>
            <li>San Jose, CA 95112, USA</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom-bar">
        <div className="container">
          <p>Built for enterprise excellence · ISO 27001 Certified · 99.99% SLA Guaranteed · Powered by Metatron Cloud Technologies</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
