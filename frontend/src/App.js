import { useEffect, useState } from "react";
import API from "./services/api";
import LeadForm from "./components/LeadForm";
import LeadList from "./components/LeadList";
import ContactsView from "./components/ContactsView";
import AnalyticsView from "./components/AnalyticsView";
import SettingsView from "./components/SettingsView";
import Login from "./pages/Login";

function App() {
  // ✅ MUST be inside component
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const [theme, setTheme] = useState("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 🔄 Fetch leads
  const fetchLeads = async () => {
    try {
      const res = await API.get("/leads");
      setLeads(res.data);
    } catch (err) {
      console.error("Error fetching leads:", err);
      if (err.response && err.response.status === 401) {
        logout();
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchLeads();
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
    document.head.appendChild(link);
  }, [isLoggedIn]);

  // 📊 Stats
  const totalLeads = leads.length;
  const contactedLeads = leads.filter((l) => l.status === "contacted").length;
  const convertedLeads = leads.filter((l) => l.status === "converted").length;

  // 🔍 Filter
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // 🔐 Protect app
  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const renderView = () => {
    switch (activeView) {
      case "contacts":
        return <ContactsView leads={leads} fetchLeads={fetchLeads} />;
      case "analytics":
        return <AnalyticsView leads={leads} />;
      case "settings":
        return <SettingsView theme={theme} setTheme={setTheme} />;
      default:
        return (
          <>
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
              <div>
                <h1 style={{ fontSize: "1.8rem", fontWeight: "700" }}>Dashboard Overview</h1>
                <p style={{ color: "var(--text-muted)" }}>Welcome back, Manage your leads effectively.</p>
              </div>
              <button 
                onClick={() => setShowForm(!showForm)}
                style={{
                  padding: "12px 24px",
                  background: "var(--primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  transition: "0.3s"
                }}
              >
                <i className={showForm ? "fas fa-times" : "fas fa-plus"}></i>
                {showForm ? "Cancel" : "Add New Lead"}
              </button>
            </header>

            {showForm && (
              <section style={{
                background: "var(--card-bg)",
                padding: "30px",
                borderRadius: "var(--radius)",
                boxShadow: "var(--shadow)",
                marginBottom: "30px",
                animation: "fadeIn 0.3s ease"
              }}>
                <h3 style={{ marginBottom: "20px" }}>Enter Lead Details</h3>
                <LeadForm fetchLeads={() => { fetchLeads(); setShowForm(false); }} />
              </section>
            )}

            {/* Stats Grid */}
            <section className="dashboard-stats" style={{ marginBottom: "40px" }}>
              <StatCard title="Total Leads" count={totalLeads} icon="fas fa-user-friends" color="var(--primary)" />
              <StatCard title="Contacted" count={contactedLeads} icon="fas fa-phone-alt" color="var(--info)" />
              <StatCard title="Converted" count={convertedLeads} icon="fas fa-check-circle" color="var(--success)" />
            </section>

            {/* Filter Bar */}
            <section className="filter-bar" style={{ 
              marginBottom: "30px",
              background: "var(--card-bg)",
              padding: "15px",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow-sm)"
            }}>
              <div style={{ flex: 1, position: "relative" }}>
                <i className="fas fa-search" style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}></i>
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 12px 12px 45px",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    background: "var(--bg-main)",
                    color: "var(--text-main)",
                    outline: "none"
                  }}
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: "12px 20px",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  background: "var(--bg-main)",
                  color: "var(--text-main)",
                  outline: "none",
                  cursor: "pointer"
                }}
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
              </select>
            </section>

            {/* Lead Table */}
            <section className="table-container" style={{ 
              background: "var(--card-bg)",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow)"
            }}>
              <LeadList leads={filteredLeads} fetchLeads={fetchLeads} />
            </section>
          </>
        );
    }
  };

  return (
    <div className={`crm-container app-layout ${theme}`} style={{ background: "var(--bg-main)" }}>
      {/* Mobile Header */}
      <div className="mobile-header">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <i className="fas fa-rocket" style={{ color: "var(--primary)" }}></i>
          <h2 style={{ fontSize: "1.2rem", fontWeight: "700" }}>LeadStream</h2>
        </div>
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`sidebar-overlay ${mobileMenuOpen ? 'open' : ''}`} 
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside className={`sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <i className="fas fa-rocket" style={{ fontSize: "1.5rem", color: "var(--primary)" }}></i>
            <h2 style={{ fontSize: "1.4rem", fontWeight: "700" }}>LeadStream</h2>
          </div>
          {/* Close button for mobile inside sidebar */}
          <button 
            className="mobile-menu-btn" 
            style={{ display: mobileMenuOpen ? 'block' : 'none', marginRight: 0 }} 
            onClick={() => setMobileMenuOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <SidebarItem 
            icon="fas fa-th-large" 
            label="Dashboard" 
            active={activeView === "dashboard"} 
            onClick={() => { setActiveView("dashboard"); setMobileMenuOpen(false); }} 
          />
          <SidebarItem 
            icon="fas fa-users" 
            label="Contacts" 
            active={activeView === "contacts"} 
            onClick={() => { setActiveView("contacts"); setMobileMenuOpen(false); }} 
          />
          <SidebarItem 
            icon="fas fa-chart-pie" 
            label="Analytics" 
            active={activeView === "analytics"} 
            onClick={() => { setActiveView("analytics"); setMobileMenuOpen(false); }} 
          />
          <SidebarItem 
            icon="fas fa-cog" 
            label="Settings" 
            active={activeView === "settings"} 
            onClick={() => { setActiveView("settings"); setMobileMenuOpen(false); }} 
          />
        </nav>

        <div style={{ marginTop: "auto" }}>
          <button 
            onClick={logout}
            style={{
              width: "100%",
              padding: "12px",
              background: "rgba(255, 77, 77, 0.1)",
              color: "#ff4d4d",
              border: "1px solid rgba(255, 77, 77, 0.3)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "0.3s"
            }}
          >
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {renderView()}
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <div 
      onClick={onClick}
      style={{ 
        padding: "12px 15px", 
        background: active ? "var(--primary)" : "transparent", 
        borderRadius: "8px", 
        display: "flex", 
        alignItems: "center", 
        gap: "12px", 
        cursor: "pointer",
        transition: "0.3s",
        opacity: active ? 1 : 0.6
      }}
    >
      <i className={icon} style={{ width: "20px", textAlign: "center" }}></i> {label}
    </div>
  );
}

function StatCard({ title, count, icon, color }) {
  return (
    <div style={{
      background: "var(--card-bg)",
      padding: "25px",
      borderRadius: "var(--radius)",
      boxShadow: "var(--shadow-sm)",
      display: "flex",
      alignItems: "center",
      gap: "20px",
      borderLeft: `5px solid ${color}`
    }}>
      <div style={{
        width: "50px",
        height: "50px",
        background: `${color}15`,
        color: color,
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.2rem"
      }}>
        <i className={icon}></i>
      </div>
      <div>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: "500", textTransform: "uppercase", letterSpacing: "0.5px" }}>{title}</p>
        <h3 style={{ fontSize: "1.8rem", fontWeight: "700" }}>{count}</h3>
      </div>
    </div>
  );
}

export default App;