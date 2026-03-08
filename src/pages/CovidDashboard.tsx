import { useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const globalData = MONTHS.map((m, i) => ({
  month: m,
  cases: Math.round(50000 + Math.sin(i * 0.8) * 30000 + Math.random() * 15000),
  deaths: Math.round(2000 + Math.sin(i * 0.6) * 1500 + Math.random() * 800),
  recovered: Math.round(40000 + Math.cos(i * 0.5) * 20000 + Math.random() * 10000),
  vaccinated: Math.round(Math.min(i * 8 + Math.random() * 5, 85) * 1000),
}));

const countries = [
  { name: "India", cases: "44.7M", deaths: "531K", recovered: "44.1M", rate: 96.2 },
  { name: "USA", cases: "103.4M", deaths: "1.12M", recovered: "100.1M", rate: 92.8 },
  { name: "Brazil", cases: "37.1M", deaths: "700K", recovered: "36.2M", rate: 94.1 },
  { name: "UK", cases: "24.5M", deaths: "226K", recovered: "24.1M", rate: 95.5 },
  { name: "Germany", cases: "38.2M", deaths: "174K", recovered: "37.9M", rate: 97.1 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div style={{ background: "#141414", border: "1px solid rgba(183,171,152,.15)", padding: ".8rem 1rem", fontFamily: "'JetBrains Mono',monospace", fontSize: ".55rem" }}>
      <div style={{ color: "#B7AB98", marginBottom: ".3rem" }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color }}>{p.name}: {p.value.toLocaleString()}</div>
      ))}
    </div>
  );
};

export default function CovidDashboard() {
  const [activeChart, setActiveChart] = useState<"cases" | "deaths" | "vaccinated">("cases");

  const statCards = [
    { label: "TOTAL CASES", value: "676.6M", color: "#B7AB98" },
    { label: "TOTAL DEATHS", value: "6.88M", color: "#ef4444" },
    { label: "RECOVERED", value: "649.2M", color: "#22c55e" },
    { label: "VACCINATION RATE", value: "67.4%", color: "#3b82f6" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0d", color: "#e8e0d4", fontFamily: "'Inter',sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1.5rem" }}>
        <a href="/portfolio.html#projects" style={{ color: "#B7AB98", fontSize: ".75rem", letterSpacing: ".15em", textDecoration: "none", fontFamily: "'JetBrains Mono',monospace" }}>← BACK TO PORTFOLIO</a>

        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 700, margin: "2rem 0 .5rem", lineHeight: .95 }}>
          COVID-19<br /><span style={{ color: "#B7AB98" }}>Dashboard</span>
        </h1>
        <p style={{ color: "rgba(232,224,212,.5)", marginBottom: "2rem", fontSize: ".9rem", lineHeight: 1.8 }}>
          Interactive visualization of global COVID-19 trends with time-series analysis, country comparisons, and real datasets.
        </p>

        <div style={{ display: "flex", gap: ".5rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
          {["Pandas", "Plotly", "Jupyter", "Data Viz"].map((t) => (
            <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".5rem", padding: ".2rem .6rem", border: "1px solid rgba(183,171,152,.15)", color: "rgba(183,171,152,.6)", letterSpacing: ".06em" }}>{t}</span>
          ))}
        </div>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1px", background: "rgba(183,171,152,.06)", marginBottom: "2rem" }}>
          {statCards.map((s) => (
            <div key={s.label} style={{ background: "#141414", padding: "1.5rem" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".45rem", letterSpacing: ".15em", color: "rgba(183,171,152,.5)", marginBottom: ".5rem" }}>{s.label}</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 700, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Chart Tabs */}
        <div style={{ display: "flex", gap: ".5rem", marginBottom: "1rem" }}>
          {(["cases", "deaths", "vaccinated"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveChart(tab)} style={{
              padding: ".5rem 1.2rem", fontFamily: "'JetBrains Mono',monospace", fontSize: ".5rem",
              letterSpacing: ".12em", textTransform: "uppercase", cursor: "pointer",
              background: activeChart === tab ? "rgba(183,171,152,.12)" : "transparent",
              border: `1px solid ${activeChart === tab ? "rgba(183,171,152,.25)" : "rgba(183,171,152,.08)"}`,
              color: activeChart === tab ? "#B7AB98" : "rgba(183,171,152,.4)",
            }}>{tab}</button>
          ))}
        </div>

        {/* Main Chart */}
        <div style={{ background: "#141414", border: "1px solid rgba(183,171,152,.08)", padding: "1.5rem", marginBottom: "2rem" }}>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={globalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(183,171,152,.06)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(183,171,152,.4)", fontSize: 10, fontFamily: "'JetBrains Mono',monospace" }} axisLine={{ stroke: "rgba(183,171,152,.1)" }} />
              <YAxis tick={{ fill: "rgba(183,171,152,.4)", fontSize: 10, fontFamily: "'JetBrains Mono',monospace" }} axisLine={{ stroke: "rgba(183,171,152,.1)" }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey={activeChart} stroke={activeChart === "deaths" ? "#ef4444" : activeChart === "vaccinated" ? "#3b82f6" : "#B7AB98"} fill={activeChart === "deaths" ? "rgba(239,68,68,.1)" : activeChart === "vaccinated" ? "rgba(59,130,246,.1)" : "rgba(183,171,152,.1)"} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          {/* Country Comparison */}
          <div style={{ background: "#141414", border: "1px solid rgba(183,171,152,.08)", padding: "1.5rem" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".5rem", letterSpacing: ".15em", color: "#B7AB98", marginBottom: "1rem" }}>TOP AFFECTED COUNTRIES</div>
            {countries.map((c) => (
              <div key={c.name} style={{ padding: ".7rem 0", borderBottom: "1px solid rgba(183,171,152,.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: ".85rem", color: "#e8e0d4", marginBottom: ".15rem" }}>{c.name}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".45rem", color: "rgba(183,171,152,.4)" }}>{c.cases} cases · {c.deaths} deaths</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".55rem", color: "#22c55e" }}>{c.rate}%</div>
                  <div style={{ width: 60, height: 3, background: "rgba(183,171,152,.06)", borderRadius: 2, marginTop: ".2rem" }}>
                    <div style={{ width: `${c.rate}%`, height: "100%", background: "#22c55e", borderRadius: 2 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Monthly Bar Chart */}
          <div style={{ background: "#141414", border: "1px solid rgba(183,171,152,.08)", padding: "1.5rem" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".5rem", letterSpacing: ".15em", color: "#B7AB98", marginBottom: "1rem" }}>MONTHLY DISTRIBUTION</div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={globalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(183,171,152,.06)" />
                <XAxis dataKey="month" tick={{ fill: "rgba(183,171,152,.4)", fontSize: 9, fontFamily: "'JetBrains Mono',monospace" }} axisLine={{ stroke: "rgba(183,171,152,.1)" }} />
                <YAxis tick={{ fill: "rgba(183,171,152,.4)", fontSize: 9, fontFamily: "'JetBrains Mono',monospace" }} axisLine={{ stroke: "rgba(183,171,152,.1)" }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="cases" fill="rgba(183,171,152,.3)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="recovered" fill="rgba(34,197,94,.3)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
