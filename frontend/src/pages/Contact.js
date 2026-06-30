import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to submit message");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "general", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error sending your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <header className="page-header contact-hero">
        <div className="container">
          <h1>Connect With Us</h1>
          <p>Let's plan your cloud infrastructure and SAP optimization strategy today.</p>
        </div>
      </header>

      <section className="contact-content-section">
        <div className="container contact-grid">
          {/* Contact Details Column */}
          <div className="contact-info-panel">
            <h2>Contact Information</h2>
            <p>Our solutions architects are available to answer your technical questions.</p>
            
            <div className="info-detail-list">
              <div className="info-item">
                <span className="info-icon">📧</span>
                <div>
                  <h4>Email Us</h4>
                  <p>support@metatroncloud.com</p>
                  <p>sales@metatroncloud.com</p>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">📞</span>
                <div>
                  <h4>Call Us</h4>
                  <p>+1 (555) 019-2834 (Sales)</p>
                  <p>+1 (555) 019-2835 (Tech Support)</p>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">📍</span>
                <div>
                  <h4>Office Headquarters</h4>
                  <p>100 Metatron Boulevard, Suite 500</p>
                  <p>San Jose, CA 95112</p>
                </div>
              </div>
            </div>

            <div className="office-hours">
              <h4>Operating Hours</h4>
              <p>Monday - Friday: 8:00 AM - 6:00 PM PST</p>
              <p>24/7 Security Operations & Managed Basis Support</p>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="contact-form-panel">
            <h2>Send a Message</h2>
            {submitted ? (
              <div className="success-banner">
                <h3>✓ Message Sent Successfully!</h3>
                <p>Thank you for reaching out. A systems architect will review your message and respond within 24 hours.</p>
                <button className="btn-secondary" onClick={() => setSubmitted(false)}>Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Work Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your work email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Inquiry Type</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="general">General Inquiries</option>
                    <option value="sap">SAP Modernization</option>
                    <option value="cloud">Cloud Hosting & Scale</option>
                    <option value="security">Cybersecurity & Compliance</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    placeholder="Describe your requirements or questions..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? "Sending..." : "Submit Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
