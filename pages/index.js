import { useState } from "react";
import SignalScanner from "../components/SignalScanner";
import WeeklyBriefing from "../components/WeeklyBriefing";

const C = {
  bg: "#0a0a0f", surface: "#111118", surface2: "#1a1a24",
  border: "rgba(255,255,255,0.06)", borderActive: "rgba(255,255,255,0.13)",
  accent: "#c8f04a", accentDim: "rgba(200,240,74,0.08)", accentMid: "rgba(200,240,74,0.25)",
  text: "#e8e8f0", muted: "#6b6b80", dim: "#9999aa",
};

const TABS = [
  { id: "signals", label: "Signal Scanner", icon: "📡", desc: "Analyse feed posts for engagement opportunities + content ideas" },
  { id: "briefing", label: "Weekly Briefing", icon: "📋", desc: "Prioritise your conversations and get drafted messages" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("signals");

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "48px 48px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 20px 80px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 36 }}>
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 28, letterSpacing: "-0.5px" }}>
              Activator <span style={{ color: C.accent }}>Agent</span>
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: C.muted, marginTop: 5 }}>
              // linkedin relationship intelligence · powered by Claude
            </div>
          </div>
          <div style={{ background: C.accentDim, border: `1px solid ${C.accentMid}`, color: C.accent, fontFamily: "monospace", fontSize: 11, padding: "4px 10px", borderRadius: 100 }}>
            v1.0
          </div>
        </div>

        {/* Tab nav */}
        <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, padding: "14px 16px", borderRadius: 10, cursor: "pointer", textAlign: "left", transition: "all 0.15s",
                background: activeTab === tab.id ? C.accentDim : C.surface,
                border: `1px solid ${activeTab === tab.id ? C.accentMid : C.border}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 16 }}>{tab.icon}</span>
                <span style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 14, color: activeTab === tab.id ? C.accent : C.text }}>{tab.label}</span>
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 11, color: C.muted, lineHeight: 1.5 }}>{tab.desc}</div>
            </button>
          ))}
        </div>

        {/* How it works banner */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: C.muted, letterSpacing: "0.5px", lineHeight: 1.6 }}>
            <span style={{ color: C.accent }}>HOW IT WORKS →</span> Fill in the form · Generate a prompt · Paste it into <a href="https://claude.ai" target="_blank" rel="noreferrer" style={{ color: C.accent, textDecoration: "underline" }}>claude.ai</a> · Get your full intelligence brief
          </div>
        </div>

        {/* Tab content */}
        {activeTab === "signals" && <SignalScanner />}
        {activeTab === "briefing" && <WeeklyBriefing />}

        {/* Footer */}
        <div style={{ marginTop: 48, textAlign: "center", fontFamily: "monospace", fontSize: 11, color: C.muted }}>
          Built on Dixon's Activator methodology · Prompt engine for Claude AI
        </div>
      </div>
    </div>
  );
}
