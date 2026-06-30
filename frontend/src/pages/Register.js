import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
    cloudService: "standard",
    osLicense: "linux-free",
    officeLicense: "none",
    sapHosting: false
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Load pre-populated selections from the hero configurator if they exist
  useEffect(() => {
    const preVm = localStorage.getItem("pre_vmTier");
    const preOs = localStorage.getItem("pre_osType");
    const preProd = localStorage.getItem("pre_productivity");
    const preSap = localStorage.getItem("pre_sapHosting");

    if (preVm || preOs || preProd || preSap) {
      setFormData((prev) => ({
        ...prev,
        cloudService: preVm || "standard",
        osLicense: preOs || "linux-free",
        officeLicense: preProd || "none",
        sapHosting: preSap === "yes"
      }));

      // Clean them up from storage
      localStorage.removeItem("pre_vmTier");
      localStorage.removeItem("pre_osType");
      localStorage.removeItem("pre_productivity");
      localStorage.removeItem("pre_sapHosting");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name || !formData.email || !formData.password) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed.");
      }

      // Successful registration
      localStorage.setItem("metatron_client_email", formData.email);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page container">
      <div className="portal-grid">
        <div className="portal-info-side">
          <div className="futuristic-logo">⚡ METATRON</div>
          <h2>Access the Cloud Command Console</h2>
          <p>
            Register your enterprise account to allocate software compliance license keys, 
            configure private cloud sandboxes, and initialize managed SAP support flows.
          </p>
          <div className="info-bullets">
            <div className="bullet-item">
              <span className="bullet-icon">🔒</span>
              <div>
                <h4>ISO 27001 Certified Vault</h4>
                <p>Uptime keys are cryptographically generated and encrypted at rest.</p>
              </div>
            </div>
            <div className="bullet-item">
              <span className="bullet-icon">🛸</span>
              <div>
                <h4>Real-Time Edge Provisioning</h4>
                <p>Virtual instances deploy and boot within 90 seconds of registration.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="portal-form-side">
          <div className="form-card glass-panel">
            <h3>Start Cloud Provisioning</h3>
            <p className="card-subtitle">Establish system details and service configuration</p>

            {errorMessage && <div className="error-alert">⚠️ {errorMessage}</div>}

            <form onSubmit={handleSubmit} className="futuristic-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Acme Corp"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Work Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@company.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Console Access Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  required
                />
              </div>

              <h4 className="config-section-title">🛠️ Instance Setup Config</h4>

              <div className="form-group">
                <label htmlFor="cloudService">Private VM Instance Type</label>
                <select
                  id="cloudService"
                  name="cloudService"
                  value={formData.cloudService}
                  onChange={handleChange}
                >
                  <option value="standard">Standard Node (4 vCPU, 16GB RAM)</option>
                  <option value="highmem">High-Memory Node (8 vCPU, 64GB RAM)</option>
                  <option value="sap-hana">SAP HANA Certified Node (32 vCPU, 256GB RAM)</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="osLicense">OS Licensing</label>
                  <select
                    id="osLicense"
                    name="osLicense"
                    value={formData.osLicense}
                    onChange={handleChange}
                  >
                    <option value="linux-free">Linux (Ubuntu/Debian Open-source)</option>
                    <option value="rhel">Red Hat Enterprise Linux (RHEL)</option>
                    <option value="windows">Windows Server Datacenter</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="officeLicense">Workspace Suite</label>
                  <select
                    id="officeLicense"
                    name="officeLicense"
                    value={formData.officeLicense}
                    onChange={handleChange}
                  >
                    <option value="none">No SaaS licensing required</option>
                    <option value="o365">Microsoft Office 365 (O365 Bundle)</option>
                    <option value="gws">Google Workspace (GWS Bundle)</option>
                  </select>
                </div>
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    id="sapHosting"
                    name="sapHosting"
                    checked={formData.sapHosting}
                    onChange={handleChange}
                  />
                  <span>Require 24/7 Managed SAP Basis System Management</span>
                </label>
              </div>

              <button type="submit" className="btn-submit-glow" disabled={loading}>
                {loading ? "Provisioning..." : "Launch Cloud Console 🚀"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
