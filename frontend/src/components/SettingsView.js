import React, { useState, useEffect } from 'react';
import API from '../services/api';

function SettingsView({ theme, setTheme }) {
  const [activeTab, setActiveTab] = useState('Profile');
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [integrations, setIntegrations] = useState({
    slack: true,
    google: false,
    hubspot: false
  });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/profile");
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handlePasswordChange = async () => {
    if (!passwords.current || !passwords.new) {
      alert("Please fill in both current and new password");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match");
      return;
    }

    setSaving(true);
    try {
      await API.post("/auth/change-password", {
        currentPassword: passwords.current,
        newPassword: passwords.new
      });
      alert("Password updated successfully!");
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Error updating password");
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    if (activeTab === 'Security') {
      await handlePasswordChange();
      return;
    }
    setSaving(true);
    try {
      // Logic for saving profile changes could be added here
      await new Promise(resolve => setTimeout(resolve, 800));
      alert(`${activeTab} settings updated!`);
    } catch (err) {
      alert("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    if (window.confirm("Are you sure you want to discard changes?")) {
      window.location.reload();
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
        if (loading) return <div style={{ padding: "40px", textAlign: "center", color: "var(--primary)" }}><i className="fas fa-circle-notch fa-spin" style={{ fontSize: "2rem" }}></i></div>;
        return (
          <section style={{ animation: "fadeIn 0.3s ease" }}>
            <h3 style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
              <i className="fas fa-user-circle" style={{ color: "var(--primary)" }}></i>
              Personal Profile
            </h3>
            <div style={{ display: "flex", gap: "30px", alignItems: "center", marginBottom: "30px" }}>
              <div style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: "var(--primary)15",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2.5rem",
                color: "var(--primary)",
                border: "2px solid var(--primary)",
                position: "relative"
              }}>
                <i className="fas fa-camera"></i>
              </div>
              <div>
                <button 
                  onClick={() => alert("Upload feature coming soon!")}
                  style={{
                    padding: "10px 20px",
                    background: "var(--primary)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer",
                    marginBottom: "10px"
                  }}
                >Upload New Photo</button>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>JPG, GIF or PNG. Max size of 800K</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <InputGroup label="First Name" value={profile.firstName} onChange={(val) => setProfile({...profile, firstName: val})} />
              <InputGroup label="Last Name" value={profile.lastName} onChange={(val) => setProfile({...profile, lastName: val})} />
              <InputGroup label="Email" value={profile.email} onChange={(val) => setProfile({...profile, email: val})} />
              <InputGroup label="Phone" value={profile.phone} onChange={(val) => setProfile({...profile, phone: val})} />
            </div>
          </section>
        );
      case 'Security':
        return (
          <section style={{ animation: "fadeIn 0.3s ease" }}>
            <h3 style={{ marginBottom: "25px" }}>Security Settings</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              <div>
                <h4 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "15px" }}>Change Password</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "400px" }}>
                  <InputGroup 
                    label="Current Password" 
                    type="password" 
                    value={passwords.current} 
                    onChange={(val) => setPasswords({...passwords, current: val})} 
                  />
                  <InputGroup 
                    label="New Password" 
                    type="password" 
                    value={passwords.new} 
                    onChange={(val) => setPasswords({...passwords, new: val})} 
                  />
                  <InputGroup 
                    label="Confirm New Password" 
                    type="password" 
                    value={passwords.confirm} 
                    onChange={(val) => setPasswords({...passwords, confirm: val})} 
                  />
                </div>
              </div>

              <div style={{ padding: "20px", background: "var(--bg-main)", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h4 style={{ fontSize: "1rem", fontWeight: "600" }}>Two-Factor Authentication</h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Add an extra layer of security to your account.</p>
                </div>
                <Toggle active={twoFactor} onClick={() => setTwoFactor(!twoFactor)} />
              </div>
            </div>
          </section>
        );
      case 'Appearance':
        return (
          <section style={{ animation: "fadeIn 0.3s ease" }}>
            <h3 style={{ marginBottom: "20px" }}>Appearance Settings</h3>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h4 style={{ fontSize: "1rem", fontWeight: "600" }}>Workspace Theme</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Switch between light and dark modes.</p>
              </div>
              <div style={{ display: "flex", background: "var(--bg-main)", padding: "5px", borderRadius: "30px", gap: "5px" }}>
                <button 
                  onClick={() => setTheme('light')}
                  style={{
                    padding: "8px 15px",
                    borderRadius: "20px",
                    border: "none",
                    background: theme === 'light' ? 'white' : 'transparent',
                    boxShadow: theme === 'light' ? 'var(--shadow-sm)' : 'none',
                    color: theme === 'light' ? 'var(--primary)' : 'var(--text-muted)',
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    fontWeight: "600"
                  }}
                >Light</button>
                <button 
                  onClick={() => setTheme('dark')}
                  style={{
                    padding: "8px 15px",
                    borderRadius: "20px",
                    border: "none",
                    background: theme === 'dark' ? 'white' : 'transparent',
                    boxShadow: theme === 'dark' ? 'var(--shadow-sm)' : 'none',
                    color: theme === 'dark' ? 'var(--primary)' : 'var(--text-muted)',
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    fontWeight: "600"
                  }}
                >Dark</button>
              </div>
            </div>
          </section>
        );
      case 'Integrations':
        return (
          <section style={{ animation: "fadeIn 0.3s ease" }}>
            <h3 style={{ marginBottom: "25px" }}>Connect Third-Party Apps</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <IntegrationCard 
                name="Slack" 
                desc="Get notifications in your channels." 
                icon="fab fa-slack" 
                active={integrations.slack} 
                toggle={() => setIntegrations({...integrations, slack: !integrations.slack})}
              />
              <IntegrationCard 
                name="Google" 
                desc="Sync contacts and calendar." 
                icon="fab fa-google" 
                active={integrations.google} 
                toggle={() => setIntegrations({...integrations, google: !integrations.google})}
              />
              <IntegrationCard 
                name="HubSpot" 
                desc="Import and sync CRM leads." 
                icon="fab fa-hubspot" 
                active={integrations.hubspot} 
                toggle={() => setIntegrations({...integrations, hubspot: !integrations.hubspot})}
              />
            </div>
          </section>
        );
      case 'Notifications':
        return (
          <section style={{ animation: "fadeIn 0.3s ease" }}>
            <h3 style={{ marginBottom: "20px" }}>Notification Preferences</h3>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <h4 style={{ fontSize: "1rem", fontWeight: "600" }}>Push Notifications</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Receive real-time alerts for new leads.</p>
              </div>
              <Toggle active={notifications} onClick={() => setNotifications(!notifications)} />
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="reveal-init" style={{ animation: "fadeIn 0.5s ease" }}>
      <header style={{ marginBottom: "30px" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: "700" }}>System Settings</h1>
        <p style={{ color: "var(--text-muted)" }}>Customize your workspace and account preferences.</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "30px" }}>
        {/* Navigation Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <SettingsTab 
            icon="fas fa-user-circle" 
            label="Profile" 
            active={activeTab === 'Profile'} 
            onClick={() => setActiveTab('Profile')} 
          />
          <SettingsTab 
            icon="fas fa-bell" 
            label="Notifications" 
            active={activeTab === 'Notifications'} 
            onClick={() => setActiveTab('Notifications')} 
          />
          <SettingsTab 
            icon="fas fa-shield-alt" 
            label="Security" 
            active={activeTab === 'Security'} 
            onClick={() => setActiveTab('Security')} 
          />
          <SettingsTab 
            icon="fas fa-palette" 
            label="Appearance" 
            active={activeTab === 'Appearance'} 
            onClick={() => setActiveTab('Appearance')} 
          />
          <SettingsTab 
            icon="fas fa-plug" 
            label="Integrations" 
            active={activeTab === 'Integrations'} 
            onClick={() => setActiveTab('Integrations')} 
          />
        </div>

        {/* Content Area */}
        <div style={{
          background: "var(--card-bg)",
          padding: "40px",
          borderRadius: "var(--radius)",
          boxShadow: "var(--shadow-sm)",
          border: "1px solid var(--border)",
          minHeight: "450px",
          display: "flex",
          flexDirection: "column"
        }}>
          <div style={{ flex: 1 }}>
            {renderContent()}
          </div>

          <div style={{ marginTop: "40px", borderTop: "1px solid var(--border)", paddingTop: "30px", display: "flex", justifyContent: "flex-end", gap: "15px" }}>
            <button 
              onClick={handleDiscard}
              style={{ padding: "12px 25px", borderRadius: "8px", border: "1px solid var(--border)", background: "transparent", fontWeight: "600", cursor: "pointer" }}
            >Discard</button>
            <button 
              onClick={handleSave}
              disabled={saving}
              style={{ 
                padding: "12px 25px", 
                borderRadius: "8px", 
                border: "none", 
                background: "var(--primary)", 
                color: "white", 
                fontWeight: "600", 
                cursor: saving ? "not-allowed" : "pointer",
                opacity: saving ? 0.7 : 1
              }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
      <style>{`
        .crm-container.dark .settings-nav-item:hover .settings-tab-icon {
          color: var(--info) !important;
        }
        .crm-container.dark .settings-nav-item.active .settings-tab-icon {
          color: var(--primary) !important;
        }
        .crm-container.dark .settings-nav-item:hover {
          background: rgba(255, 255, 255, 0.05) !important;
        }
      `}</style>
    </div>
  );
}

function IntegrationCard({ name, desc, icon, active, toggle }) {
  return (
    <div style={{
      padding: "20px",
      background: "var(--bg-main)",
      borderRadius: "12px",
      border: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      gap: "15px"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", color: "var(--primary)" }}>
          <i className={icon}></i>
        </div>
        <h4 style={{ fontWeight: "600" }}>{name}</h4>
      </div>
      <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", flex: 1 }}>{desc}</p>
      <button 
        onClick={toggle}
        style={{
          padding: "8px",
          borderRadius: "6px",
          border: active ? "1px solid var(--primary)" : "1px solid var(--border)",
          background: active ? "var(--primary)10" : "white",
          color: active ? "var(--primary)" : "var(--text-muted)",
          fontSize: "0.8rem",
          fontWeight: "600",
          cursor: "pointer"
        }}
      >
        {active ? "Connected" : "Connect"}
      </button>
    </div>
  );
}

function SettingsTab({ icon, label, active, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`settings-nav-item ${active ? 'active' : ''}`}
      style={{
        padding: "12px 20px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        background: active ? "white" : "transparent",
        color: active ? "var(--primary)" : "var(--text-muted)",
        fontWeight: active ? "700" : "500",
        cursor: "pointer",
        boxShadow: active ? "var(--shadow-sm)" : "none",
        transition: "0.3s"
      }}
    >
      <i className={`${icon} settings-tab-icon`} style={{ width: "20px", transition: "color 0.3s" }}></i> {label}
    </div>
  );
}

function InputGroup({ label, value, onChange, type = "text" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-muted)" }}>{label}</label>
      <input 
        type={type}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        style={{
          padding: "12px",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          outline: "none",
          background: "var(--bg-main)",
          color: "var(--text-main)"
        }}
      />
    </div>
  );
}

function Toggle({ active, onClick }) {
  return (
    <div 
      onClick={onClick}
      style={{
        width: "50px",
        height: "26px",
        background: active ? "var(--success)" : "var(--border)",
        borderRadius: "30px",
        position: "relative",
        cursor: "pointer",
        transition: "0.3s"
      }}
    >
      <div style={{
        position: "absolute",
        top: "3px",
        left: active ? "26px" : "3px",
        width: "20px",
        height: "20px",
        background: "white",
        borderRadius: "50%",
        transition: "0.3s",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
      }}></div>
    </div>
  );
}

export default SettingsView;
