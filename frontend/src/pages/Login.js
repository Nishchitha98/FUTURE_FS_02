import { useState } from "react";
import API from "../services/api";

function Login({ setIsLoggedIn }) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const endpoint = isRegistering ? "/auth/register" : "/auth/login";
            const payload = isRegistering 
                ? { email, password, firstName, lastName, phone } 
                : { email, password };
            
            const res = await API.post(endpoint, payload);
            
            localStorage.setItem("token", res.data.token);
            setIsLoggedIn(true);
        } catch (err) {
            console.error("Auth error:", err.response?.data || err);
            alert("Error: " + (err.response?.data?.message || err.response?.data?.error || err.message));
            setLoading(false);
        }
    };

    return (
        <div className="crm-container light" style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
            padding: "20px"
        }}>
            <div className="reveal-init" style={{
                background: "white",
                padding: "50px 40px",
                borderRadius: "var(--radius)",
                boxShadow: "var(--shadow)",
                width: "100%",
                maxWidth: "420px",
                textAlign: "center",
                animation: "fadeIn 0.5s ease"
            }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "30px" }}>
                  <i className="fas fa-rocket" style={{ fontSize: "2rem", color: "var(--primary)" }}></i>
                  <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "#1e293b", margin: 0 }}>LeadStream</h1>
                </div>

                <p style={{ color: "var(--text-muted)", marginBottom: "35px", fontSize: "0.95rem" }}>
                    {isRegistering ? "Create a new account to get started." : "Sign in to manage your leads and contacts."}
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {isRegistering && (
                        <>
                            <div style={{ display: "flex", gap: "15px" }}>
                                <div style={{ textAlign: "left", flex: 1 }}>
                                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "var(--text-muted)", marginBottom: "8px" }}>First Name</label>
                                    <input
                                        type="text"
                                        placeholder="John"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                        style={{ 
                                            width: "100%", 
                                            padding: "12px 15px", 
                                            border: "1px solid var(--border)", 
                                            borderRadius: "8px",
                                            outline: "none",
                                            fontSize: "0.95rem",
                                            background: "#f8fafc",
                                            transition: "0.3s"
                                        }}
                                    />
                                </div>
                                <div style={{ textAlign: "left", flex: 1 }}>
                                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "var(--text-muted)", marginBottom: "8px" }}>Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Doe"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                        style={{ 
                                            width: "100%", 
                                            padding: "12px 15px", 
                                            border: "1px solid var(--border)", 
                                            borderRadius: "8px",
                                            outline: "none",
                                            fontSize: "0.95rem",
                                            background: "#f8fafc",
                                            transition: "0.3s"
                                        }}
                                    />
                                </div>
                            </div>
                            <div style={{ textAlign: "left" }}>
                                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "var(--text-muted)", marginBottom: "8px" }}>Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="+1 (555) 000-0000"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    style={{ 
                                        width: "100%", 
                                        padding: "12px 15px", 
                                        border: "1px solid var(--border)", 
                                        borderRadius: "8px",
                                        outline: "none",
                                        fontSize: "0.95rem",
                                        background: "#f8fafc",
                                        transition: "0.3s"
                                    }}
                                />
                            </div>
                        </>
                    )}
                    <div style={{ textAlign: "left" }}>
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "var(--text-muted)", marginBottom: "8px" }}>Email Address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ 
                                width: "100%", 
                                padding: "12px 15px", 
                                border: "1px solid var(--border)", 
                                borderRadius: "8px",
                                outline: "none",
                                fontSize: "0.95rem",
                                background: "#f8fafc",
                                transition: "0.3s"
                            }}
                            onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(99, 102, 241, 0.1)"; }}
                            onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                        />
                    </div>

                    <div style={{ textAlign: "left" }}>
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "var(--text-muted)", marginBottom: "8px" }}>Password</label>
                        <div style={{ position: "relative" }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{ 
                                    width: "100%", 
                                    padding: "12px 45px 12px 15px", 
                                    border: "1px solid var(--border)", 
                                    borderRadius: "8px",
                                    outline: "none",
                                    fontSize: "0.95rem",
                                    background: "#f8fafc",
                                    transition: "0.3s"
                                }}
                                onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(99, 102, 241, 0.1)"; }}
                                onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                            />
                            <i 
                                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: "absolute",
                                    right: "15px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "var(--text-muted)",
                                    cursor: "pointer"
                                }}
                            ></i>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{
                            marginTop: "10px",
                            padding: "14px",
                            background: "var(--primary)",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontWeight: "700",
                            fontSize: "1rem",
                            cursor: loading ? "not-allowed" : "pointer",
                            transition: "0.3s",
                            boxShadow: "0 4px 12px rgba(99, 102, 241, 0.25)",
                            opacity: loading ? 0.7 : 1
                        }}
                        onMouseOver={(e) => { if(!loading) e.target.style.transform = "translateY(-2px)" }}
                        onMouseOut={(e) => { if(!loading) e.target.style.transform = "translateY(0)" }}
                    >
                        {loading ? (isRegistering ? "Creating account..." : "Signing in...") : (isRegistering ? "Create Account" : "Sign In")}
                    </button>
                </form>

                <div style={{ marginTop: "25px", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                    {isRegistering ? (
                        <p>Already have an account? <span onClick={() => setIsRegistering(false)} style={{ color: "var(--primary)", fontWeight: "600", cursor: "pointer" }}>Sign in</span></p>
                    ) : (
                        <p>Don't have an account? <span onClick={() => setIsRegistering(true)} style={{ color: "var(--primary)", fontWeight: "600", cursor: "pointer" }}>Create one</span></p>
                    )}
                </div>

            </div>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

export default Login;