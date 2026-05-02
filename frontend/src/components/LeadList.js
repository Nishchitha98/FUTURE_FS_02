import API from "../services/api";

function LeadList({ leads, fetchLeads }) {

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/leads/${id}`, { status });
      fetchLeads();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const addNote = async (id, text) => {
    if (!text.trim()) return;
    try {
      await API.post(`/leads/${id}/notes`, { text });
      fetchLeads();
    } catch (err) {
      console.error("Error adding note:", err);
    }
  };

  const deleteNote = async (id, noteId) => {
    try {
      await API.delete(`/leads/${id}/notes/${noteId}`);
      fetchLeads();
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  const getStatusBadge = (status) => {
    let styles = {
      padding: "5px 12px",
      borderRadius: "20px",
      fontSize: "0.75rem",
      fontWeight: "700",
      textTransform: "uppercase"
    };

    if (status === "new") return <span style={{ ...styles, background: "transparent", color: "var(--text-muted)", border: "1px solid var(--text-muted)" }}>New</span>;
    if (status === "contacted") return <span style={{ ...styles, background: "transparent", color: "var(--info)", border: "1px solid var(--info)" }}>Contacted</span>;
    if (status === "converted") return <span style={{ ...styles, background: "transparent", color: "var(--success)", border: "1px solid var(--success)" }}>Converted</span>;
    return <span style={{ ...styles, background: "transparent", color: "var(--text-muted)", border: "1px solid var(--border)" }}>{status}</span>;
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid var(--border)", background: "var(--card-bg)" }}>
            <th style={{ padding: "18px 25px", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px" }}>Lead Name</th>
            <th style={{ padding: "18px 25px", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px" }}>Contact Info</th>
            <th style={{ padding: "18px 25px", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px" }}>Status</th>
            <th style={{ padding: "18px 25px", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px" }}>Actions</th>
            <th style={{ padding: "18px 25px", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px" }}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {leads.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)" }}>No leads found.</td>
            </tr>
          ) : (
            leads.map((lead) => (
              <tr key={lead._id} style={{ borderBottom: "1px solid var(--border)", transition: "0.2s" }} className="table-row">
                <td style={{ padding: "20px 25px" }}>
                  <div style={{ fontWeight: "600", fontSize: "1rem" }}>{lead.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>ID: {lead._id.slice(-6)}</div>
                </td>
                <td style={{ padding: "20px 25px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <i className="fas fa-envelope" style={{ color: "var(--primary)", fontSize: "0.8rem" }}></i>
                    <span style={{ fontSize: "0.9rem" }}>{lead.email}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <i className="fas fa-phone" style={{ color: "var(--success)", fontSize: "0.8rem" }}></i>
                    <span style={{ fontSize: "0.9rem" }}>{lead.phone}</span>
                  </div>
                </td>
                <td style={{ padding: "20px 25px" }}>
                  {getStatusBadge(lead.status)}
                </td>
                <td style={{ padding: "20px 25px" }}>
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead._id, e.target.value)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid var(--border)",
                      background: "var(--bg-main)",
                      color: "var(--text-main)",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      outline: "none"
                    }}
                  >
                    <option value="new">Mark as New</option>
                    <option value="contacted">Mark as Contacted</option>
                    <option value="converted">Mark as Converted</option>
                  </select>
                </td>
                <td style={{ padding: "20px 25px", minWidth: "250px" }}>
                  <div style={{ maxHeight: "100px", overflowY: "auto", marginBottom: "10px" }}>
                    {lead.notes.map((note) => (
                      <div key={note._id} style={{ 
                        fontSize: "0.85rem", 
                        background: "var(--bg-main)", 
                        padding: "6px 10px", 
                        borderRadius: "6px", 
                        marginBottom: "5px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        border: "1px solid var(--border)"
                      }}>
                        <i className="fas fa-sticky-note" style={{ color: "var(--warning)", fontSize: "0.7rem" }}></i>
                        <span style={{ flex: 1 }}>{note.text}</span>
                        <button 
                          onClick={() => deleteNote(lead._id, note._id)}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "#ff4d4d",
                            cursor: "pointer",
                            fontSize: "0.75rem",
                            padding: "0 2px",
                            opacity: 0.6,
                            transition: "0.2s"
                          }}
                          className="note-delete-btn"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Add a note..."
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid var(--border)",
                      background: "var(--bg-main)",
                      color: "var(--text-main)",
                      fontSize: "0.85rem",
                      outline: "none"
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addNote(lead._id, e.target.value);
                        e.target.value = "";
                      }
                    }}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <style>{`
        .table-row:hover {
          background-color: var(--bg-main);
        }
        .note-delete-btn:hover {
          opacity: 1 !important;
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}

export default LeadList;