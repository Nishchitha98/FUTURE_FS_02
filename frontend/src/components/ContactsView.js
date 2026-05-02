import React, { useState } from 'react';
import API from '../services/api';

function ContactsView({ leads, fetchLeads }) {
  const [selectedLead, setSelectedLead] = useState(null);

  const deleteLead = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await API.delete(`/leads/${id}`);
        alert("Contact successfully deleted!");
        fetchLeads();
      } catch (err) {
        console.error("Error deleting lead:", err);
        alert("Failed to delete contact: " + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div className="reveal-init" style={{ animation: "fadeIn 0.5s ease" }}>
      <header style={{ marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: "700" }}>Contact Directory</h1>
          <p style={{ color: "var(--text-muted)" }}>Manage your primary business contacts and their details.</p>
        </div>
        <div style={{ 
          background: "var(--card-bg)", 
          color: "var(--text-main)",
          padding: "10px 20px", 
          borderRadius: "10px", 
          boxShadow: "var(--shadow-sm)", 
          fontSize: "0.9rem", 
          fontWeight: "600",
          border: "1px solid var(--border)"
        }}>
          Total Contacts: <span style={{ color: "var(--info)" }}>{leads.length}</span>
        </div>
      </header>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", 
        gap: "25px" 
      }}>
        {leads.map(contact => (
          <div key={contact._id} style={{
            background: "var(--card-bg)",
            padding: "25px",
            borderRadius: "var(--radius)",
            boxShadow: "var(--shadow-sm)",
            border: "1px solid var(--border)",
            transition: "0.3s",
            position: "relative",
            overflow: "hidden"
          }} className="contact-card">
            <button 
              onClick={() => deleteLead(contact._id)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                padding: "8px",
                background: "transparent",
                border: "none",
                color: "#ff4d4d",
                cursor: "pointer",
                fontSize: "1.2rem",
                zIndex: 100,
                opacity: 0.8
              }}
              title="Delete Contact"
            >
              <i className="fas fa-trash-alt"></i>
            </button>

            <div style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "4px",
              height: "100%",
              background: contact.status === 'converted' ? 'var(--success)' : (contact.status === 'contacted' ? 'var(--info)' : 'var(--primary)')
            }}></div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
              <div style={{
                width: "55px",
                height: "55px",
                background: "var(--primary)15",
                color: "var(--primary)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.3rem",
                fontWeight: "700"
              }}>
                {contact.name.charAt(0)}
              </div>
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "700" }}>{contact.name}</h3>
                <span style={{ 
                  fontSize: "0.75rem", 
                  padding: "2px 8px", 
                  background: "var(--bg-main)", 
                  borderRadius: "20px",
                  color: "var(--text-muted)",
                  textTransform: "capitalize",
                  fontWeight: "600"
                }}>{contact.status}</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem" }}>
                <i className="fas fa-envelope" style={{ color: "var(--primary)", width: "15px" }}></i>
                <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>{contact.email}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem" }}>
                <i className="fas fa-phone" style={{ color: "var(--success)", width: "15px" }}></i>
                {contact.phone}
              </div>
            </div>

            <div style={{ marginTop: "25px", display: "flex", gap: "12px" }}>
              <a 
                href={`mailto:${contact.email}`}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "transparent",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "var(--text-main)",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px"
                }}
              >
                <i className="fas fa-paper-plane"></i> Message
              </a>
              <button 
                onClick={() => setSelectedLead(contact)}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "var(--primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px"
                }}
              >
                <i className="fas fa-user-tie"></i> Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Profile Modal */}
      {selectedLead && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          backdropFilter: "blur(4px)"
        }}>
          <div style={{
            background: "var(--card-bg)",
            width: "500px",
            padding: "40px",
            borderRadius: "var(--radius)",
            boxShadow: "var(--shadow)",
            position: "relative",
            border: "1px solid var(--border)"
          }}>
            <button 
              onClick={() => setSelectedLead(null)}
              style={{ position: "absolute", top: "20px", right: "20px", border: "none", background: "none", fontSize: "1.2rem", cursor: "pointer" }}
            >
              <i className="fas fa-times"></i>
            </button>
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <div style={{ width: "80px", height: "80px", background: "var(--primary)15", color: "var(--primary)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", margin: "0 auto 15px" }}>
                {selectedLead.name.charAt(0)}
              </div>
              <h2 style={{ fontSize: "1.5rem" }}>{selectedLead.name}</h2>
              <p style={{ color: "var(--text-muted)" }}>{selectedLead.email}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" }}>
              <div>
                <label style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Phone</label>
                <p style={{ fontWeight: "600" }}>{selectedLead.phone}</p>
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Status</label>
                <p style={{ fontWeight: "600", textTransform: "capitalize" }}>{selectedLead.status}</p>
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Notes History</label>
                <div style={{ maxHeight: "150px", overflowY: "auto", marginTop: "10px", padding: "10px", background: "var(--bg-main)", borderRadius: "8px" }}>
                  {selectedLead.notes.length > 0 ? selectedLead.notes.map(note => (
                    <div key={note._id} style={{ fontSize: "0.85rem", padding: "5px 0", borderBottom: "1px solid var(--border)" }}>
                      • {note.text}
                    </div>
                  )) : <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>No notes available.</p>}
                </div>
              </div>
            </div>
            <button 
              onClick={() => setSelectedLead(null)}
              style={{ width: "100%", padding: "12px", background: "var(--primary)", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}
            >
              Close Profile
            </button>
          </div>
        </div>
      )}

      <style>{`
        .contact-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow);
          border-color: var(--primary);
        }
        .contact-card:hover button {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

export default ContactsView;
