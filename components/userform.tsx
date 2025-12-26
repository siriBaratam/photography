import React, { useState } from "react";
import emailjs from "emailjs-com";

export default function PhotographyPromo() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error while typing
  };

  const validate = () => {
    const newErrors: { name?: string; phone?: string; email?: string } = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = (e: React.FormEvent) => { 
    e.preventDefault(); if (!validate()) return; // Send email via EmailJS 
    emailjs.send( "service_ed58zop", "template_4kwbgzw", 
         { name: formData.name, phone: formData.phone, email: formData.email, }, "lByzLfWZQegWOX7ze"  ) 
         .then( () => { setSubmitted(true); }, (error) => { console.error("EmailJS Error:", error);
         } 
        ); 
    };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #a855f7, #ec4899)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
          maxWidth: 1000,
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          overflow: "hidden",
        }}
      >
        {/* Left Section */}
        <div style={{ padding: 40, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: "#222", marginBottom: 20, lineHeight: 1.2 }}>
            Capture Life&apos;s Beautiful Moments
          </h1>
          <p style={{ fontSize: 16, color: "#555", marginBottom: 28 }}>
            Professional photography services for weddings, birthdays, events,
            and more. Preserve your precious memories with stunning visuals
            crafted by experts.
          </p>

          <div style={{ display: "flex", gap: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20, color: "#facc15" }}>⭐</span>
              <p style={{ fontSize: 15, fontWeight: 500, color: "#444" }}>4.9/5 Rating</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20, color: "#22c55e" }}>👥</span>
              <p style={{ fontSize: 15, fontWeight: 500, color: "#444" }}>500+ Happy Clients</p>
            </div>
          </div>
        </div>

        {/* Right Section (Form) */}
        <div style={{ background: "#f9fafb", padding: 40, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, color: "#222", marginBottom: 24 }}>Get Started Today</h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                style={{
                  padding: "12px 16px",
                  borderRadius: 10,
                  border: errors.name ? "1px solid red" : "1px solid #ddd",
                  fontSize: 15,
                  outline: "none",
                  width: "100%",
                }}
              />
              {errors.name && <p style={{ color: "red", fontSize: 13, marginTop: 4 }}>{errors.name}</p>}
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Your phone number"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  padding: "12px 16px",
                  borderRadius: 10,
                  border: errors.phone ? "1px solid red" : "1px solid #ddd",
                  fontSize: 15,
                  outline: "none",
                  width: "100%",
                }}
              />
              {errors.phone && <p style={{ color: "red", fontSize: 13, marginTop: 4 }}>{errors.phone}</p>}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com (Optional)"
                value={formData.email}
                onChange={handleChange}
                style={{
                  padding: "12px 16px",
                  borderRadius: 10,
                  border: errors.email ? "1px solid red" : "1px solid #ddd",
                  fontSize: 15,
                  outline: "none",
                  width: "100%",
                }}
              />
              {errors.email && <p style={{ color: "red", fontSize: 13, marginTop: 4 }}>{errors.email}</p>}
            </div>

            <button
              type="submit"
              style={{
                marginTop: 8,
                padding: "14px",
                borderRadius: 12,
                border: "none",
                fontWeight: 600,
                fontSize: 16,
                color: "#fff",
                background: "linear-gradient(to right, #a855f7, #ec4899)",
                cursor: "pointer",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              }}
            >
              Get My Quote
            </button>
          </form>

          {/* Greeting after submission */}
          {submitted && (
            <div style={{ marginTop: 24, fontSize: 16, color: "#333" }}>
              🎉 Hello <strong>{formData.name}</strong>, thanks for sharing your details! We’ll reach out soon.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
