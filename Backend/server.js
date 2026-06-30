// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { dbRun, dbAll, dbGet } = require("./database");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// --- Chatbot Route ---
app.post("/api/chatbot", (req, res) => {
  const userMessage = req.body.message || "";
  const query = userMessage.toLowerCase();

  let reply;
  if (query.includes("cloud") || query.includes("hosting") || query.includes("private")) {
    reply = "Metatron Private Cloud offers fully isolated, high-performance compute environments. We guarantee a 99.99% uptime SLA, active load balancing, automated daily backups, and customizable edge security firewalls tailored to your workloads.";
  } else if (query.includes("sap") || query.includes("hana") || query.includes("basis") || query.includes("migration")) {
    reply = "Our premium SAP Services cover migration to SAP S/4HANA using zero-downtime methodologies. We also offer 24/7 Managed Basis support, system health monitoring, database sizing optimization, and ongoing performance tuning.";
  } else if (query.includes("license") || query.includes("licensing") || query.includes("windows") || query.includes("linux") || query.includes("gws") || query.includes("o365") || query.includes("microsoft") || query.includes("office")) {
    reply = "We are certified licensing providers for:\n- Windows Server (Standard & Datacenter)\n- Enterprise Linux (RHEL, SUSE)\n- Google Workspace (GWS Starter/Standard/Enterprise)\n- Microsoft 365 / Office 365 (Business & Enterprise E3/E5 suites)\nAll license assignments and authorization keys can be managed in real-time through your Client Dashboard after registration.";
  } else if (query.includes("register") || query.includes("signup") || query.includes("sign up") || query.includes("account") || query.includes("create")) {
    reply = "You can easily set up a secure client profile by clicking 'Client Portal' in the navigation bar. You will be able to select your desired OS, office productivity suites, and submit your registration to immediately receive active license keys.";
  } else if (query.includes("dashboard") || query.includes("portal") || query.includes("console")) {
    reply = "The Client Dashboard is your central control center. From there, you can view real-time virtual machine resource graphs, download software license authorization files, view API keys, and manage active service support tickets.";
  } else if (query.includes("contact") || query.includes("support") || query.includes("help") || query.includes("email") || query.includes("phone")) {
    reply = "Need expert help? Reach us at support@metatroncloud.com or call +1 (555) 019-2835. You can also send an online request directly via our Contact page, and a solutions architect will get back to you within 24 hours.";
  } else if (query.includes("price") || query.includes("cost") || query.includes("quote") || query.includes("estimator")) {
    reply = "Pricing is based on computing resources and software licenses. You can use our Cloud Estimator on the home page for general pricing or register to create a customized setup. For bespoke enterprise deployments, please contact our sales desk.";
  } else {
    reply = "Thank you for reaching out to Metatron Cloud! I am here to help you with questions about Private Cloud, SAP Hosting, Windows/Linux/O365/GWS Licensing, and Client Registrations. What details can I provide for you today?";
  }

  res.json({ reply });
});

// --- Services Route ---
app.get("/api/services", (req, res) => {
  res.json([
    { name: "Private Cloud Hosting", description: "Fully isolated, high-performance computing clusters with 99.99% SLA.", icon: "☁️" },
    { name: "SAP Modernization", description: "SAP S/4HANA migrations, performance tuning, and 24/7 Managed Basis support.", icon: "💼" },
    { name: "Licensing Provisioning", description: "Official software compliance licensing for Windows, Linux, GWS, and O365.", icon: "🔑" },
    { name: "Zero-Trust Cybersecurity", description: "Intrusion protection, identity management, and active vulnerability audits.", icon: "🛡️" }
  ]);
});

// --- Register User Route ---
app.post("/api/register", async (req, res) => {
  const { name, email, company, password, cloudService, osLicense, officeLicense, sapHosting } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required fields." });
  }

  try {
    const sapVal = sapHosting ? 1 : 0;
    const result = await dbRun(
      `INSERT INTO registrations (name, email, company, password, cloud_service, os_license, office_license, sap_hosting) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, company, password, cloudService, osLicense, officeLicense, sapVal]
    );

    res.status(201).json({
      message: "Client registration successful!",
      registrationId: result.id
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    if (error.message.includes("UNIQUE")) {
      return res.status(409).json({ error: "Email address is already registered." });
    }
    res.status(500).json({ error: "Internal server error. Please try again." });
  }
});

// --- Contact Form Submission (Leads) Route ---
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required fields." });
  }

  try {
    const result = await dbRun(
      `INSERT INTO leads (name, email, subject, message) VALUES (?, ?, ?, ?)`,
      [name, email, subject, message]
    );
    res.status(200).json({
      message: "Your message has been received. Thank you!",
      leadId: result.id
    });
  } catch (error) {
    console.error("Lead submission error:", error.message);
    res.status(500).json({ error: "Internal server error. Please try again." });
  }
});

// --- Get Client Dashboard Data ---
app.get("/api/dashboard", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email query parameter is required." });
  }

  try {
    const user = await dbGet(
      `SELECT id, name, email, company, cloud_service, os_license, office_license, sap_hosting, created_at 
       FROM registrations WHERE email = ?`,
      [email]
    );

    if (!user) {
      return res.status(404).json({ error: "Client profile not found." });
    }

    // Generate high-tech dashboard info
    const keyPrefix = user.name.substring(0, 3).toUpperCase();
    const mockLicenseKey = `${keyPrefix}-METATRON-${Math.floor(100000 + Math.random() * 900000)}-${user.id}`;
    const mockServerIp = `10.150.${Math.floor(10 + Math.random() * 200)}.${Math.floor(10 + Math.random() * 200)}`;
    const systemLoad = `${Math.floor(12 + Math.random() * 28)}%`;
    const memoryUsage = `${Math.floor(40 + Math.random() * 30)}%`;

    res.json({
      client: {
        name: user.name,
        email: user.email,
        company: user.company,
        cloudService: user.cloud_service,
        osLicense: user.os_license,
        officeLicense: user.office_license,
        sapHosting: user.sap_hosting === 1,
        createdAt: user.created_at
      },
      infrastructure: {
        serverIp: mockServerIp,
        status: "ACTIVE",
        uptime: "99.998%",
        cpuLoad: systemLoad,
        ramUsage: memoryUsage,
        licenseKey: mockLicenseKey,
        apiKey: `mt_live_key_${mockLicenseKey.toLowerCase()}`
      }
    });
  } catch (error) {
    console.error("Dashboard data load error:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});

