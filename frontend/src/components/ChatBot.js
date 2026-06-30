import React, { useState, useEffect, useRef } from "react";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Welcome to Metatron Cloud. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:5000/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userMessage })
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (error) {
      console.error("ChatBot backend error, using offline response:", error);
      // Simulate intelligent fallback answers offline
      setTimeout(() => {
        let reply = "I am currently running in offline mode. For support, please feel free to use our Contact Page!";
        const query = userMessage.toLowerCase();
        if (query.includes("cloud")) {
          reply = "Metatron Cloud offers secure, custom-designed private cloud infrastructure and migration services.";
        } else if (query.includes("sap")) {
          reply = "We specialize in SAP migrations, HANA upgrades, and ongoing managed system management.";
        } else if (query.includes("price") || query.includes("cost")) {
          reply = "Please reach out to our team via the Contact Page for a tailored enterprise quote.";
        }
        setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
      }, 800);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Chat Bubble Button */}
      <button className={`chatbot-toggle-btn ${isOpen ? "open" : ""}`} onClick={toggleChat} aria-label="Open support chat">
        {isOpen ? "✕" : "💬"}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <span className="chatbot-status-dot"></span>
              <div>
                <h4>Metatron Assistant</h4>
                <p>Always online</p>
              </div>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chatbot-message-row ${msg.sender}`}>
                <div className="chatbot-avatar">
                  {msg.sender === "bot" ? "🤖" : "👤"}
                </div>
                <div className="chatbot-message-bubble">
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="chatbot-message-row bot">
                <div className="chatbot-avatar">🤖</div>
                <div className="chatbot-message-bubble typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input-area" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Ask about Cloud or SAP services..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" aria-label="Send message">➔</button>
          </form>
        </div>
      )}
    </>
  );
}

export default ChatBot;
