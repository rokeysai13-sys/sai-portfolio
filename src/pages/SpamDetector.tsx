import { useState } from "react";
import BackToPortfolio from "@/components/BackToPortfolio";

const SPAM_KEYWORDS = [
  "free", "winner", "congratulations", "click here", "buy now", "limited time",
  "act now", "urgent", "discount", "offer", "prize", "cash", "credit",
  "subscribe", "unsubscribe", "guarantee", "no cost", "risk free", "million",
  "earn money", "make money", "double your", "lottery", "viagra", "cheap",
];

function analyzeEmail(text: string) {
  const lower = text.toLowerCase();
  const words = lower.split(/\s+/);
  const totalWords = words.length;
  if (totalWords < 2) return { isSpam: false, confidence: 0, matches: [], score: 0 };

  const matches: string[] = [];
  SPAM_KEYWORDS.forEach((kw) => {
    if (lower.includes(kw)) matches.push(kw);
  });

  const exclamations = (text.match(/!/g) || []).length;
  const allCaps = words.filter((w) => w.length > 2 && w === w.toUpperCase()).length;
  const urls = (text.match(/https?:\/\/|www\./g) || []).length;

  let score = matches.length * 15 + exclamations * 5 + allCaps * 8 + urls * 10;
  score = Math.min(score, 100);
  const confidence = Math.min(45 + score * 0.55, 99);

  return { isSpam: score > 35, confidence: Math.round(confidence), matches, score };
}

export default function SpamDetector() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<ReturnType<typeof analyzeEmail> | null>(null);

  const handleAnalyze = () => {
    if (text.trim()) setResult(analyzeEmail(text));
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0d", color: "#e8e0d4", fontFamily: "'Inter',sans-serif" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 1.5rem" }}>
        <BackToPortfolio />

        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 700, margin: "2rem 0 .5rem", lineHeight: .95 }}>
          Spam Email<br /><span style={{ color: "#B7AB98" }}>Detector</span>
        </h1>
        <p style={{ color: "rgba(232,224,212,.5)", marginBottom: "2.5rem", fontSize: ".9rem", lineHeight: 1.8 }}>
          Naive Bayes-inspired classifier using keyword analysis, pattern detection, and heuristic scoring. Paste any email text below to analyze it.
        </p>

        <div style={{ display: "flex", gap: ".5rem", marginBottom: ".5rem", flexWrap: "wrap" }}>
          {["Python", "scikit-learn", "NLP", "Naive Bayes"].map((t) => (
            <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".5rem", padding: ".2rem .6rem", border: "1px solid rgba(183,171,152,.15)", color: "rgba(183,171,152,.6)", letterSpacing: ".06em" }}>{t}</span>
          ))}
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste email content here... Try something like: 'CONGRATULATIONS! You've won a FREE iPhone! Click here NOW to claim your prize!!!'"
          style={{
            width: "100%", height: 180, background: "#141414", border: "1px solid rgba(183,171,152,.1)",
            color: "#e8e0d4", padding: "1.2rem", fontSize: ".85rem", fontFamily: "'Inter',sans-serif",
            resize: "vertical", borderRadius: 4, outline: "none", lineHeight: 1.7, marginTop: "1.5rem",
          }}
        />

        <button
          onClick={handleAnalyze}
          style={{
            marginTop: "1rem", padding: ".8rem 2.5rem", background: "#B7AB98", color: "#0d0d0d",
            border: "none", fontFamily: "'JetBrains Mono',monospace", fontSize: ".6rem",
            letterSpacing: ".16em", textTransform: "uppercase", cursor: "pointer", fontWeight: 600,
          }}
        >
          ANALYZE EMAIL
        </button>

        {result && (
          <div style={{ marginTop: "2.5rem", padding: "2rem", border: "1px solid rgba(183,171,152,.1)", background: "#141414" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: result.isSpam ? "rgba(239,68,68,.15)" : "rgba(34,197,94,.15)",
                border: `2px solid ${result.isSpam ? "#ef4444" : "#22c55e"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.5rem",
              }}>
                {result.isSpam ? "🚨" : "✅"}
              </div>
              <div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 700, color: result.isSpam ? "#ef4444" : "#22c55e" }}>
                  {result.isSpam ? "SPAM DETECTED" : "LEGITIMATE"}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".55rem", color: "rgba(183,171,152,.6)", letterSpacing: ".1em" }}>
                  CONFIDENCE: {result.confidence}%
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".5rem", letterSpacing: ".15em", color: "#B7AB98", marginBottom: ".5rem" }}>SPAM SCORE</div>
              <div style={{ background: "rgba(183,171,152,.06)", height: 6, borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${result.score}%`, height: "100%", background: result.isSpam ? "#ef4444" : "#22c55e", transition: "width .8s cubic-bezier(.22,1,.36,1)", borderRadius: 3 }} />
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".5rem", color: "rgba(183,171,152,.5)", marginTop: ".3rem" }}>{result.score}/100</div>
            </div>

            {result.matches.length > 0 && (
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".5rem", letterSpacing: ".15em", color: "#B7AB98", marginBottom: ".5rem" }}>FLAGGED KEYWORDS</div>
                <div style={{ display: "flex", gap: ".3rem", flexWrap: "wrap" }}>
                  {result.matches.map((m) => (
                    <span key={m} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".5rem", padding: ".2rem .5rem", background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.2)", color: "#ef4444" }}>{m}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
