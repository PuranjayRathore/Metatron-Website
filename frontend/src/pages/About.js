import React from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <div className="container">
        <div className="about-header">
          <h1>The People Behind Metatron Cloud</h1>
          <p>
            We are a team of cloud engineers, SAP architects, and security specialists
            dedicated to transforming how enterprises build and manage their digital
            infrastructure. From private cloud sandboxes to certified software licensing,
            we engineer the backbone of tomorrow's business.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-image-mock">
            🌐
          </div>
          <div className="about-details">
            <h2>Our Mission</h2>
            <p>
              Founded with the vision of democratizing enterprise-grade cloud technology,
              Metatron Cloud bridges the gap between raw computing power and the businesses
              that need it. We believe every organization deserves a secure, scalable,
              and fully compliant technology foundation.
            </p>
            <p>
              From SAP S/4HANA migrations to OS compliance licensing for Windows, Red Hat
              Linux, Google Workspace, and Microsoft O365, we provide a complete suite
              of managed services under one roof with a guaranteed 99.99% SLA.
            </p>
            <div className="hero-cta-buttons">
              <button className="btn-primary-glow" onClick={() => navigate("/solutions")}>
                View Our Solutions →
              </button>
              <button className="btn-secondary" onClick={() => navigate("/contact")}>
                Partner With Us
              </button>
            </div>
          </div>
        </div>

        {/* Core Stats */}
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Enterprise Clients Served</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">99.99%</div>
            <div className="stat-label">Network SLA Uptime</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">SAP Basis & Cloud Support</div>
          </div>
        </div>

        {/* Timeline */}
        <div className="timeline-section">
          <h3>Our Journey</h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-date">2018</div>
              <div className="timeline-title">Founded in Silicon Valley</div>
              <p className="timeline-desc">Metatron Cloud launched with a focus on SAP managed migrations and private cloud deployments.</p>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">2020</div>
              <div className="timeline-title">ISO 27001 Certification Achieved</div>
              <p className="timeline-desc">Earned international information security certification, unlocking enterprise government and financial sector contracts.</p>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">2022</div>
              <div className="timeline-title">Software Licensing Division Launched</div>
              <p className="timeline-desc">Expanded services to include certified OS licensing for Windows, RHEL, and Google Workspace (GWS) & Microsoft O365.</p>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">2024</div>
              <div className="timeline-title">500+ Enterprise Clients Milestone</div>
              <p className="timeline-desc">Reached a global footprint with clients across finance, healthcare, manufacturing, and public sector industries.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
