import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch services");
        }
        return res.json();
      })
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Backend not running or error fetching, using fallback data:", err);
        // Fallback data
        setServices([
          {
            name: "Private Cloud Hosting",
            description: "High-performance, secure, and scalable cloud solutions custom-tailored for demanding enterprise workloads.",
            icon: "☁️"
          },
          {
            name: "SAP Services & Modernization",
            description: "Expert SAP implementation, cloud migration, optimization, and end-to-end managed application support.",
            icon: "💼"
          },
          {
            name: "Licensing Provisioning",
            description: "Official software compliance licensing for Windows, Linux, GWS, and O365.",
            icon: "🔑"
          },
          {
            name: "Zero-Trust Cybersecurity",
            description: "Advanced cybersecurity defense, regulatory compliance auditing, and automated threat mitigation systems.",
            icon: "🛡️"
          }
        ]);
        setError(null); // Silent fallback
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">Our Core Services</h2>
          <div className="loading-spinner">Loading premium services...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="services-section">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          We empower businesses with enterprise-grade cloud architecture, SAP Basis operations, and SaaS licensing support.
        </p>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card" onClick={() => navigate("/solutions")}>
              <div className="service-icon">{service.icon || "⚙️"}</div>
              <h3 className="service-name">{service.name}</h3>
              <p className="service-description">{service.description}</p>
              <button className="service-btn">Explore Capability →</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;

