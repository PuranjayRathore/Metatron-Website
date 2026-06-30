import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  // Price Estimator state
  const [vmTier, setVmTier] = useState("standard");
  const [osType, setOsType] = useState("linux-free");
  const [productivity, setProductivity] = useState("none");
  const [sapHosting, setSapHosting] = useState(false);

  // Estimator Calculations
  const calculateTotal = () => {
    let vmPrice = 80;
    if (vmTier === "highmem") vmPrice = 220;
    if (vmTier === "sap-hana") vmPrice = 980;

    let osPrice = 0;
    if (osType === "rhel") osPrice = 45;
    if (osType === "windows") osPrice = 65;

    let prodPrice = 0;
    if (productivity === "o365") prodPrice = 150; // mock pack for 10 users
    if (productivity === "gws") prodPrice = 120; // mock pack for 10 users

    let sapPrice = sapHosting ? 500 : 0;

    return vmPrice + osPrice + prodPrice + sapPrice;
  };

  const handleProvision = () => {
    // Pre-populate selections for registration page
    localStorage.setItem("pre_vmTier", vmTier);
    localStorage.setItem("pre_osType", osType);
    localStorage.setItem("pre_productivity", productivity);
    localStorage.setItem("pre_sapHosting", sapHosting ? "yes" : "no");
    navigate("/register");
  };

  return (
    <section className="hero-section">
      <div className="hero-grid container">
        <div className="hero-text-content">
          <div className="hero-badge">ENTERPRISE HYBRID CLOUD SOLUTIONS</div>
          <h1>
            Futuristic Cloud Infrastructure <span className="highlight-text">Built for Scale</span>
          </h1>
          <p>
            Deploy secure, sandboxed private clouds, host critical SAP HANA databases, 
            and provision certified OS & Office workspace licenses instantly.
          </p>
          <div className="hero-features-preview">
            <div className="feature-chip">🛡️ Zero-Trust Architecture</div>
            <div className="feature-chip">⚡ Uptime SLA 99.99%</div>
            <div className="feature-chip">💼 24/7 Managed SAP Basis</div>
          </div>
          <div className="hero-cta-buttons">
            <button className="btn-primary-glow" onClick={() => navigate("/solutions")}>
              Explore Solutions →
            </button>
            <button className="btn-secondary" onClick={() => navigate("/contact")}>
              Talk to Architect
            </button>
          </div>
        </div>

        {/* High-Tech Estimator Panel */}
        <div className="hero-estimator-card">
          <div className="estimator-header">
            <h3>⚡ Live Instance Configurator</h3>
            <p>Select infrastructure & license configurations</p>
          </div>
          
          <div className="estimator-body">
            <div className="estimator-field">
              <label>Virtual Machine Tier</label>
              <select value={vmTier} onChange={(e) => setVmTier(e.target.value)}>
                <option value="standard">Standard VM (4 vCPU, 16GB RAM) - $80/mo</option>
                <option value="highmem">High-Memory VM (8 vCPU, 64GB RAM) - $220/mo</option>
                <option value="sap-hana">SAP HANA Certified Node (32 vCPU, 256GB RAM) - $980/mo</option>
              </select>
            </div>

            <div className="estimator-field">
              <label>Operating System License</label>
              <select value={osType} onChange={(e) => setOsType(e.target.value)}>
                <option value="linux-free">Linux (Ubuntu/Debian Open-Source) - $0/mo</option>
                <option value="rhel">Red Hat Enterprise Linux (RHEL) - $45/mo</option>
                <option value="windows">Windows Server Datacenter - $65/mo</option>
              </select>
            </div>

            <div className="estimator-field">
              <label>SaaS Workspace Licensing (10 Seat Pack)</label>
              <select value={productivity} onChange={(e) => setProductivity(e.target.value)}>
                <option value="none">No SaaS Workspace Licensing</option>
                <option value="o365">Microsoft Office 365 / O365 - $150/mo</option>
                <option value="gws">Google Workspace / GWS - $120/mo</option>
              </select>
            </div>

            <div className="estimator-field checkbox-field">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={sapHosting}
                  onChange={(e) => setSapHosting(e.target.checked)}
                />
                <span>Enable 24/7 Managed SAP Basis Support (+$500/mo)</span>
              </label>
            </div>
          </div>

          <div className="estimator-footer">
            <div className="price-display">
              <span className="price-label">Estimated Cost:</span>
              <span className="price-value">${calculateTotal()} <small>/mo</small></span>
            </div>
            <button className="estimator-btn" onClick={handleProvision}>
              Instantly Provision Environment 🔑
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

