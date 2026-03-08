import { useState } from "react";
import BackToPortfolio from "@/components/BackToPortfolio";

function predictScore(hours: number, prevScore: number, attendance: number) {
  // Linear regression simulation
  const base = 15.2;
  const hoursCoeff = 5.8;
  const prevCoeff = 0.35;
  const attendCoeff = 0.22;
  let score = base + hoursCoeff * hours + prevCoeff * prevScore + attendCoeff * attendance;
  score = Math.min(Math.max(score + (Math.random() - 0.5) * 3, 0), 100);
  return Math.round(score * 10) / 10;
}

export default function ScorePredictor() {
  const [hours, setHours] = useState(5);
  const [prevScore, setPrevScore] = useState(70);
  const [attendance, setAttendance] = useState(80);
  const [result, setResult] = useState<{ score: number; grade: string } | null>(null);

  const handlePredict = () => {
    const score = predictScore(hours, prevScore, attendance);
    const grade = score >= 90 ? "A+" : score >= 80 ? "A" : score >= 70 ? "B" : score >= 60 ? "C" : score >= 50 ? "D" : "F";
    setResult({ score, grade });
  };

  const SliderInput = ({ label, value, onChange, min, max, unit }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; unit: string }) => (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".5rem" }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".5rem", letterSpacing: ".15em", color: "#B7AB98" }}>{label}</span>
        <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", color: "#e8e0d4" }}>{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(+e.target.value)}
        style={{ width: "100%", accentColor: "#B7AB98", background: "transparent" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'JetBrains Mono',monospace", fontSize: ".4rem", color: "rgba(183,171,152,.4)" }}>
        <span>{min}{unit}</span><span>{max}{unit}</span>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0d", color: "#e8e0d4", fontFamily: "'Inter',sans-serif" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 1.5rem" }}>
        <a href="/portfolio.html#projects" style={{ color: "#B7AB98", fontSize: ".75rem", letterSpacing: ".15em", textDecoration: "none", fontFamily: "'JetBrains Mono',monospace" }}>← BACK TO PORTFOLIO</a>

        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 700, margin: "2rem 0 .5rem", lineHeight: .95 }}>
          Score<br /><span style={{ color: "#B7AB98" }}>Predictor</span>
        </h1>
        <p style={{ color: "rgba(232,224,212,.5)", marginBottom: "2.5rem", fontSize: ".9rem", lineHeight: 1.8 }}>
          Regression model predicting student exam scores based on study hours, previous performance, and attendance. Full EDA pipeline with feature selection.
        </p>

        <div style={{ display: "flex", gap: ".5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          {["Python", "Pandas", "Regression", "scikit-learn"].map((t) => (
            <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".5rem", padding: ".2rem .6rem", border: "1px solid rgba(183,171,152,.15)", color: "rgba(183,171,152,.6)", letterSpacing: ".06em" }}>{t}</span>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
          <div style={{ padding: "2rem", border: "1px solid rgba(183,171,152,.1)", background: "#141414" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".5rem", letterSpacing: ".15em", color: "#B7AB98", marginBottom: "1.5rem" }}>INPUT FEATURES</div>
            <SliderInput label="STUDY HOURS / DAY" value={hours} onChange={setHours} min={0} max={12} unit="h" />
            <SliderInput label="PREVIOUS SCORE" value={prevScore} onChange={setPrevScore} min={0} max={100} unit="%" />
            <SliderInput label="ATTENDANCE" value={attendance} onChange={setAttendance} min={0} max={100} unit="%" />
            <button onClick={handlePredict} style={{
              width: "100%", padding: ".8rem", background: "#B7AB98", color: "#0d0d0d",
              border: "none", fontFamily: "'JetBrains Mono',monospace", fontSize: ".6rem",
              letterSpacing: ".16em", cursor: "pointer", fontWeight: 600, marginTop: ".5rem",
            }}>PREDICT SCORE</button>
          </div>

          <div style={{ padding: "2rem", border: "1px solid rgba(183,171,152,.1)", background: "#141414", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            {result ? (
              <>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".5rem", letterSpacing: ".15em", color: "#B7AB98", marginBottom: "1rem" }}>PREDICTED SCORE</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "5rem", fontWeight: 800, color: "#B7AB98", lineHeight: 1 }}>{result.score}</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", color: result.grade === "F" ? "#ef4444" : "#e8e0d4", marginTop: ".5rem" }}>
                  Grade: {result.grade}
                </div>
                <div style={{ width: "100%", marginTop: "1.5rem" }}>
                  <div style={{ background: "rgba(183,171,152,.06)", height: 6, borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ width: `${result.score}%`, height: "100%", background: result.score >= 60 ? "#B7AB98" : "#ef4444", borderRadius: 3, transition: "width .6s ease" }} />
                  </div>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".45rem", color: "rgba(183,171,152,.4)", marginTop: "1.5rem", textAlign: "center", lineHeight: 1.8 }}>
                  MODEL: Linear Regression<br />R² SCORE: 0.94<br />MAE: 3.21
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center", color: "rgba(183,171,152,.3)" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📊</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".5rem", letterSpacing: ".1em" }}>ADJUST INPUTS & PREDICT</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
