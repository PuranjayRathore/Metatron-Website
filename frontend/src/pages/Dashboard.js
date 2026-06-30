import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedKey, setCopiedKey] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("metatron_client_email");
    if (!email) {
      navigate("/register");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/dashboard?email=${encodeURIComponent(email)}`);
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.error || "Failed to load console data.");
        }

        setData(result);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("metatron_client_email");
    navigate("/");
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(type);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (loading) {
    return (
      <div className="dashboard-loading container">
        <div className="loader-spinner"></div>
        <p>Loading secure cloud telemetry charts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error container">
        <div className="error-card glass-panel">
          <h3>⚠️ Secure Session Failed</h3>
          <p>{error}</p>
          <button className="btn-primary" onClick={() => navigate("/register")}>Return to Portal</button>
        </div>
      </div>
    );
  }

  const { client, infrastructure } = data;

  return (
    <div className="dashboard-page container">
      {/* Console Header */}
      <div className="dashboard-header-row">
        <div>
          <span className="dashboard-badge">⚡ COMMAND CENTER</span>
          <h2>Cloud Administration Console</h2>
          <p>Real-time telemetry and subscription workspace metrics for <strong>{client.company || "Your Enterprise"}</strong></p>
        </div>
        <button onClick={handleLogout} className="btn-terminate">Tear Down Session ❌</button>
      </div>

      {/* Grid of Telemetry */}
      <div className="dashboard-grid">
        
        {/* Panel 1: Instance Status (Telemetry) */}
        <div className="dashboard-panel glass-panel">
          <div className="panel-header">
            <h3>🛸 Virtual Instance Status</h3>
            <span className="status-badge-active"><span className="pulse-dot"></span>{infrastructure.status}</span>
          </div>
          <div className="panel-body telemetry-body">
            <div className="telemetry-item">
              <span className="telemetry-label">Virtual IP Address:</span>
              <span className="telemetry-value text-mono">{infrastructure.serverIp}</span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">Network SLA Uptime:</span>
              <span className="telemetry-value text-glow">{infrastructure.uptime}</span>
            </div>
            <hr className="panel-divider" />
            
            {/* Telemetry sliders / progress bars */}
            <div className="gauge-group">
              <div className="gauge-header">
                <span>CPU Workload</span>
                <span>{infrastructure.cpuLoad}</span>
              </div>
              <div className="gauge-bar-bg">
                <div className="gauge-bar-fill fill-cpu" style={{ width: infrastructure.cpuLoad }}></div>
              </div>
            </div>

            <div className="gauge-group">
              <div className="gauge-header">
                <span>RAM Usage</span>
                <span>{infrastructure.ramUsage}</span>
              </div>
              <div className="gauge-bar-bg">
                <div className="gauge-bar-fill fill-ram" style={{ width: infrastructure.ramUsage }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 2: Soft Licensing Provisioning */}
        <div className="dashboard-panel glass-panel">
          <div className="panel-header">
            <h3>🔑 Provisioned Licensing & SaaS</h3>
          </div>
          <div className="panel-body licensing-body">
            <div className="license-card-mini">
              <div className="license-info">
                <span className="lic-icon">💿</span>
                <div>
                  <h4>OS Platform</h4>
                  <p className="text-mono">
                    {client.osLicense === "linux-free" && "Linux Standard (Ubuntu/Debian)"}
                    {client.osLicense === "rhel" && "Red Hat Enterprise Linux (RHEL)"}
                    {client.osLicense === "windows" && "Windows Server Datacenter"}
                  </p>
                </div>
              </div>
              <span className="lic-status">Active</span>
            </div>

            <div className="license-card-mini">
              <div className="license-info">
                <span className="lic-icon">🏢</span>
                <div>
                  <h4>Workspace Licensing</h4>
                  <p className="text-mono">
                    {client.officeLicense === "none" && "No Productivity Suite Allocated"}
                    {client.officeLicense === "o365" && "Microsoft Office 365 (O365 Pack - 10 Seats)"}
                    {client.officeLicense === "gws" && "Google Workspace (GWS Pack - 10 Seats)"}
                  </p>
                </div>
              </div>
              <span className={`lic-status ${client.officeLicense === "none" ? "status-disabled" : ""}`}>
                {client.officeLicense === "none" ? "Inactive" : "Allocated"}
              </span>
            </div>

            {client.sapHosting && (
              <div className="license-card-mini sap-active-card">
                <div className="license-info">
                  <span className="lic-icon">💼</span>
                  <div>
                    <h4>SAP S/4HANA Basis support</h4>
                    <p>Managed monitoring, migrations, Basis support 24/7</p>
                  </div>
                </div>
                <span className="lic-status-sap">Active Basis</span>
              </div>
            )}
          </div>
        </div>

        {/* Panel 3: Cryptographic Access Keys */}
        <div className="dashboard-panel glass-panel span-cols">
          <div className="panel-header">
            <h3>🔐 Security & API Authentication Credentials</h3>
            <p className="panel-subtitle-meta">Use these authorization credentials to access servers and connect APIs.</p>
          </div>
          <div className="panel-body keys-body">
            <div className="credential-row">
              <div className="cred-details">
                <span className="cred-label">Software Compliance License Activation Key:</span>
                <span className="cred-value text-mono">{infrastructure.licenseKey}</span>
              </div>
              <button 
                onClick={() => copyToClipboard(infrastructure.licenseKey, "license")} 
                className="btn-copy"
              >
                {copiedKey === "license" ? "Copied! ✓" : "Copy Key 📋"}
              </button>
            </div>

            <div className="credential-row">
              <div className="cred-details">
                <span className="cred-label">Metatron Cloud API Integration Uptime Token:</span>
                <span className="cred-value text-mono">{infrastructure.apiKey}</span>
              </div>
              <button 
                onClick={() => copyToClipboard(infrastructure.apiKey, "api")} 
                className="btn-copy"
              >
                {copiedKey === "api" ? "Copied! ✓" : "Copy Token 📋"}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
