import React from 'react';

function AnalyticsView({ leads }) {
  const total = leads.length;
  const contacted = leads.filter(l => l.status === 'contacted').length;
  const converted = leads.filter(l => l.status === 'converted').length;
  const newLeads = leads.filter(l => l.status === 'new').length;

  const conversionRate = total > 0 ? ((converted / total) * 100).toFixed(1) : 0;
  const contactedRate = total > 0 ? ((contacted / total) * 100).toFixed(1) : 0;

  return (
    <div className="reveal-init" style={{ animation: "fadeIn 0.5s ease" }}>
      <header style={{ marginBottom: "30px" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: "700" }}>Performance Analytics</h1>
        <p style={{ color: "var(--text-muted)" }}>Visual insights into your lead conversion and team productivity.</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "25px", marginBottom: "25px" }}>
        {/* Conversion Progress */}
        <div style={{
          background: "var(--card-bg)",
          padding: "30px",
          borderRadius: "var(--radius)",
          boxShadow: "var(--shadow-sm)",
          border: "1px solid var(--border)"
        }}>
          <h3 style={{ marginBottom: "25px", fontSize: "1.1rem" }}>Lead Status Distribution</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <ProgressItem label="New Leads" count={newLeads} total={total} color="var(--text-muted)" />
            <ProgressItem label="Contacted" count={contacted} total={total} color="var(--info)" />
            <ProgressItem label="Converted" count={converted} total={total} color="var(--success)" />
          </div>

          <div style={{ marginTop: "40px", paddingTop: "20px", borderTop: "1px solid var(--border)", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", textAlign: "center" }}>
            <div>
              <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--primary)" }}>{conversionRate}%</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Conversion Rate</div>
            </div>
            <div>
              <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--info)" }}>{contactedRate}%</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Engagement Rate</div>
            </div>
            <div>
              <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--success)" }}>+{Math.floor(Math.random() * 20)}%</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Monthly Growth</div>
            </div>
          </div>
        </div>

        {/* Circular Chart Placeholder */}
        <div style={{
          background: "var(--sidebar-bg)",
          color: "white",
          padding: "30px",
          borderRadius: "var(--radius)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center"
        }}>
          <div style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "conic-gradient(var(--primary) 0% 70%, rgba(255,255,255,0.1) 70% 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            position: "relative"
          }}>
            <div style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "var(--sidebar-bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            }}>
              <span style={{ fontSize: "1.5rem", fontWeight: "700" }}>{conversionRate}%</span>
              <span style={{ fontSize: "0.7rem", opacity: 0.6 }}>Target Met</span>
            </div>
          </div>
          <h3 style={{ fontSize: "1rem", marginBottom: "10px" }}>Annual Goal</h3>
          <p style={{ fontSize: "0.8rem", opacity: 0.6 }}>You are 70% towards reaching your annual sales target. Keep it up!</p>
        </div>
      </div>

      {/* Activity Timeline Placeholder */}
      <div style={{
        background: "var(--card-bg)",
        padding: "30px",
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow-sm)",
        border: "1px solid var(--border)"
      }}>
        <h3 style={{ marginBottom: "20px", fontSize: "1.1rem" }}>Recent Activity Trends</h3>
        <div style={{ height: "150px", display: "flex", alignItems: "flex-end", gap: "10px", paddingBottom: "10px" }}>
          {[40, 60, 35, 90, 55, 75, 45, 85, 30, 95, 65, 50].map((h, i) => (
            <div key={i} style={{ 
              flex: 1, 
              height: `${h}%`, 
              background: i === 9 ? 'var(--primary)' : 'var(--border)', 
              borderRadius: "4px",
              transition: "0.5s"
            }}></div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", fontSize: "0.7rem", color: "var(--text-muted)" }}>
          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
        </div>
      </div>
    </div>
  );
}

function ProgressItem({ label, count, total, color }) {
  const percent = total > 0 ? (count / total) * 100 : 0;
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.9rem" }}>
        <span style={{ fontWeight: "500" }}>{label}</span>
        <span style={{ color: "var(--text-muted)" }}>{count} ({percent.toFixed(0)}%)</span>
      </div>
      <div style={{ height: "8px", background: "var(--bg-main)", borderRadius: "10px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${percent}%`, background: color, borderRadius: "10px", transition: "1s ease" }}></div>
      </div>
    </div>
  );
}

export default AnalyticsView;
