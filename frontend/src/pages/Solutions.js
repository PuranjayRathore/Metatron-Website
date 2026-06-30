import React from "react";
import { useNavigate } from "react-router-dom";

function Solutions() {
  const navigate = useNavigate();
  const solutionDetails = [
    {
      id: "sap",
      title: "SAP Migration & Modernization",
      subtitle: "Enterprise resource planning at scale",
      description: "We transition legacy SAP databases and architectures to SAP S/4HANA on private or hybrid clouds. Minimize downtime while improving transaction latency, analytics speeds, and overall stability.",
      features: [
        "Zero-downtime database migration methodologies",
        "SAP S/4HANA conversions and upgrades",
        "24/7 Managed Basis support and performance tuning",
        "Cost-optimized storage sizing and archiving solutions"
      ],
      badge: "Flagship Service",
      icon: "💼"
    },
    {
      id: "cloud",
      title: "Managed Cloud Infrastructure",
      subtitle: "High availability, auto-scaling compute environments",
      description: "Our high-efficiency private clouds are optimized for performance, scalability, and predictable monthly expenses. Seamlessly run your mission-critical applications in an isolated sandbox.",
      features: [
        "Automated deployment & infrastructure as code (IaC)",
        "Global edge delivery and localized data hosting",
        "Continuous performance monitoring & load-balancing",
        "Integrated backup, failover, and disaster recovery pipelines"
      ],
      badge: "High Demand",
      icon: "☁️"
    },
    {
      id: "licensing",
      title: "Workspace & System Licensing",
      subtitle: "Full compliance and auto-allocated licensing authorization keys",
      description: "Stay compliant with enterprise software provisioning. We authorize, manage, and instantly allocate licenses for Windows systems, Linux instances, and collaboration platforms.",
      features: [
        "Windows Server (Standard & Datacenter license bundles)",
        "Enterprise Linux distribution entitlements (RHEL, SUSE)",
        "Google Workspace (GWS) user accounts management",
        "Microsoft 365 / Office 365 (O365) subscription management"
      ],
      badge: "Instant Provisioning",
      icon: "🔑"
    },
    {
      id: "cyber",
      title: "Cyber Security & Audits",
      subtitle: "Zero-Trust architecture implementation",
      description: "Protect your intellectual property, financial records, and operational integrity from modern advanced threats. We implement zero-trust access controls, audit protocols, and active security firewalls.",
      features: [
        "Regular penetration testing and risk assessments",
        "SOX, ISO 27001, and GDPR compliance ready setups",
        "Identity & Access Management (IAM) controls",
        "Real-time system intrusion detection and response systems"
      ],
      badge: "Compliance Essential",
      icon: "🛡️"
    }
  ];

  return (
    <div className="solutions-page">
      <header className="page-header solutions-hero">
        <div className="container">
          <h1>Our Enterprise Solutions</h1>
          <p>
            Tailored, robust, and modern technology frameworks engineered for industry leaders.
          </p>
        </div>
      </header>

      <section className="solutions-content-section">
        <div className="container">
          <div className="solutions-list">
            {solutionDetails.map((sol) => (
              <div key={sol.id} id={sol.id} className="solution-detail-card">
                <div className="solution-card-header">
                  <span className="solution-badge">{sol.badge}</span>
                  <div className="solution-title-row">
                    <span className="solution-icon">{sol.icon}</span>
                    <div>
                      <h2>{sol.title}</h2>
                      <h3>{sol.subtitle}</h3>
                    </div>
                  </div>
                </div>
                <div className="solution-card-body">
                  <p className="solution-desc">{sol.description}</p>
                  <h4>Key Capabilities:</h4>
                  <ul className="solution-features-list">
                    {sol.features.map((feat, idx) => (
                      <li key={idx}>✓ {feat}</li>
                    ))}
                  </ul>
                  <div className="solution-card-footer">
                    <button className="btn-primary solution-cta-btn" onClick={() => navigate("/register")}>
                      Get Started with {sol.title.split(" ")[0]}
                    </button>
                    <button className="btn-secondary" onClick={() => navigate("/contact")}>
                      Request Architect consultation
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Solutions;

