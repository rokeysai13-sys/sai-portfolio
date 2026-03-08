import { useState, useRef, useEffect } from "react";
import BackToPortfolio from "@/components/BackToPortfolio";

interface Task { id: number; text: string; priority: "high" | "medium" | "low"; done: boolean; date: string }

const PRIORITIES: Record<string, string> = { high: "#ef4444", medium: "#B7AB98", low: "#64748b" };

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Train MNIST model", priority: "high", done: true, date: "2025-03-01" },
    { id: 2, text: "Write portfolio content", priority: "medium", done: true, date: "2025-03-02" },
    { id: 3, text: "Debug NLP pipeline", priority: "high", done: false, date: "2025-03-05" },
    { id: 4, text: "Setup Docker container", priority: "low", done: false, date: "2025-03-07" },
    { id: 5, text: "Review pull requests", priority: "medium", done: false, date: "2025-03-08" },
  ]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
  const [lines, setLines] = useState<string[]>([]);
  const termRef = useRef<HTMLDivElement>(null);

  const addLine = (line: string) => setLines((prev) => [...prev, line]);

  useEffect(() => {
    setLines([
      "┌─────────────────────────────────────┐",
      "│  SK Task Manager v1.0               │",
      "│  Type 'help' for commands            │",
      "└─────────────────────────────────────┘",
      "",
      `> Loaded ${tasks.length} tasks from storage`,
      "",
    ]);
  }, []);

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [lines]);

  const handleCommand = () => {
    const cmd = input.trim().toLowerCase();
    addLine(`$ ${input}`);
    setInput("");

    if (cmd === "help") {
      addLine("  list     — Show all tasks");
      addLine("  add      — Add task (type text after)");
      addLine("  done <n> — Mark task #n as done");
      addLine("  del <n>  — Delete task #n");
      addLine("  stats    — Show statistics");
      addLine("  clear    — Clear terminal");
      addLine("");
    } else if (cmd === "list") {
      addLine("  ┌── TASKS ──────────────────────────┐");
      tasks.forEach((t, i) => {
        const status = t.done ? "✓" : "○";
        const pColor = t.priority.toUpperCase().padEnd(6);
        addLine(`  │ ${i + 1}. [${status}] ${t.text.padEnd(24)} ${pColor} │`);
      });
      addLine("  └──────────────────────────────────┘");
      addLine("");
    } else if (cmd.startsWith("add ")) {
      const text = input.trim().slice(4);
      if (text) {
        const newTask: Task = { id: Date.now(), text, priority, done: false, date: new Date().toISOString().slice(0, 10) };
        setTasks((prev) => [...prev, newTask]);
        addLine(`  ✓ Added: "${text}" [${priority}]`);
        addLine("");
      }
    } else if (cmd.startsWith("done ")) {
      const n = parseInt(cmd.slice(5)) - 1;
      if (n >= 0 && n < tasks.length) {
        setTasks((prev) => prev.map((t, i) => i === n ? { ...t, done: true } : t));
        addLine(`  ✓ Completed: "${tasks[n].text}"`);
      } else addLine("  ✗ Invalid task number");
      addLine("");
    } else if (cmd.startsWith("del ")) {
      const n = parseInt(cmd.slice(4)) - 1;
      if (n >= 0 && n < tasks.length) {
        const name = tasks[n].text;
        setTasks((prev) => prev.filter((_, i) => i !== n));
        addLine(`  ✓ Deleted: "${name}"`);
      } else addLine("  ✗ Invalid task number");
      addLine("");
    } else if (cmd === "stats") {
      const done = tasks.filter((t) => t.done).length;
      addLine(`  Total: ${tasks.length} | Done: ${done} | Pending: ${tasks.length - done}`);
      addLine(`  High: ${tasks.filter((t) => t.priority === "high").length} | Med: ${tasks.filter((t) => t.priority === "medium").length} | Low: ${tasks.filter((t) => t.priority === "low").length}`);
      addLine(`  Completion: ${tasks.length ? Math.round((done / tasks.length) * 100) : 0}%`);
      addLine("");
    } else if (cmd === "clear") {
      setLines([]);
    } else if (cmd) {
      addLine(`  ✗ Unknown command: "${cmd}". Type 'help'.`);
      addLine("");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0d", color: "#e8e0d4", fontFamily: "'Inter',sans-serif" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 1.5rem" }}>
        <BackToPortfolio />

        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 700, margin: "2rem 0 .5rem", lineHeight: .95 }}>
          Terminal<br /><span style={{ color: "#B7AB98" }}>Task Manager</span>
        </h1>
        <p style={{ color: "rgba(232,224,212,.5)", marginBottom: "2rem", fontSize: ".9rem", lineHeight: 1.8 }}>
          Command-line productivity tool with priorities, color-coded output, and JSON persistence. Try typing <code style={{ color: "#B7AB98" }}>help</code> to get started.
        </p>

        <div style={{ display: "flex", gap: ".5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          {["Python", "OOP", "CLI", "JSON"].map((t) => (
            <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".5rem", padding: ".2rem .6rem", border: "1px solid rgba(183,171,152,.15)", color: "rgba(183,171,152,.6)", letterSpacing: ".06em" }}>{t}</span>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem" }}>
          {/* Terminal */}
          <div style={{ background: "#0a0a0a", border: "1px solid rgba(183,171,152,.1)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ padding: ".6rem 1rem", background: "#141414", display: "flex", gap: ".4rem", alignItems: "center" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#B7AB98" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".5rem", color: "rgba(183,171,152,.5)", marginLeft: ".5rem" }}>sk-task-manager</span>
            </div>
            <div ref={termRef} style={{ padding: "1rem", height: 400, overflowY: "auto", fontFamily: "'JetBrains Mono',monospace", fontSize: ".7rem", lineHeight: 1.7, color: "rgba(232,224,212,.7)" }}>
              {lines.map((l, i) => <div key={i}>{l || "\u00a0"}</div>)}
              <div style={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
                <span style={{ color: "#B7AB98" }}>$</span>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCommand()}
                  style={{ flex: 1, background: "transparent", border: "none", color: "#e8e0d4", fontFamily: "'JetBrains Mono',monospace", fontSize: ".7rem", outline: "none" }}
                  placeholder="type a command..."
                  autoFocus
                />
              </div>
            </div>
          </div>

          {/* Task List GUI */}
          <div style={{ border: "1px solid rgba(183,171,152,.1)", background: "#141414", padding: "1.2rem" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".5rem", letterSpacing: ".15em", color: "#B7AB98", marginBottom: "1rem" }}>TASK LIST</div>
            {tasks.map((t, i) => (
              <div key={t.id} style={{
                padding: ".6rem .5rem", borderBottom: "1px solid rgba(183,171,152,.06)",
                display: "flex", alignItems: "center", gap: ".5rem",
                opacity: t.done ? 0.4 : 1,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: PRIORITIES[t.priority], flexShrink: 0 }} />
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".6rem", textDecoration: t.done ? "line-through" : "none", flex: 1 }}>{t.text}</span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".4rem", color: "rgba(183,171,152,.3)" }}>#{i + 1}</span>
              </div>
            ))}
            <div style={{ marginTop: "1rem", display: "flex", gap: ".3rem" }}>
              {(["high", "medium", "low"] as const).map((p) => (
                <button key={p} onClick={() => setPriority(p)} style={{
                  flex: 1, padding: ".3rem", fontFamily: "'JetBrains Mono',monospace", fontSize: ".45rem",
                  background: priority === p ? "rgba(183,171,152,.15)" : "transparent",
                  border: `1px solid ${priority === p ? "rgba(183,171,152,.3)" : "rgba(183,171,152,.08)"}`,
                  color: PRIORITIES[p], cursor: "pointer", letterSpacing: ".05em",
                }}>{p.toUpperCase()}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
