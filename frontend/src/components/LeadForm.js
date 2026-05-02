import { useState } from "react";
import API from "../services/api";

function LeadForm({ fetchLeads }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/leads", form);
      fetchLeads();
      setForm({ name: "", email: "", phone: "" });
    } catch (err) {
      console.error("Error adding lead:", err);
      alert(err.response?.data?.error || err.response?.data?.message || "Failed to add lead. Make sure the email is unique.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    padding: "12px 16px",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    fontSize: "0.95rem",
    background: "var(--bg-main)",
    color: "var(--text-main)",
    outline: "none",
    transition: "0.3s",
    flex: 1
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
      <input
        placeholder="Full Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        style={inputStyle}
        required
      />
      <input
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        style={inputStyle}
        required
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        style={inputStyle}
        required
      />
      <button 
        type="submit" 
        disabled={loading}
        style={{
          padding: "12px 28px",
          background: "var(--primary)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontWeight: "600",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
          transition: "0.3s"
        }}
      >
        {loading ? "Adding..." : "Confirm & Add"}
      </button>
    </form>
  );
}

export default LeadForm;