import { useState } from "react";

const C = {
  bg: "#0a0a0f", surface: "#111118", surface2: "#1a1a24", surface3: "#0d0d14",
  border: "rgba(255,255,255,0.06)", borderActive: "rgba(255,255,255,0.13)",
  accent: "#c8f04a", accentDim: "rgba(200,240,74,0.08)", accentMid: "rgba(200,240,74,0.25)",
  text: "#e8e8f0", muted: "#6b6b80", dim: "#9999aa", red: "#ff5f57",
};

const s = {
  card: { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 22, marginBottom: 14 },
  cardTitle: { fontFamily: "Georgia, serif", fontSize: 15, fontWeight: 700, marginBottom: 6, display: "flex", alignItems: "center", gap: 10 },
  cardSub: { fontSize: 13, color: C.muted, marginBottom: 18, lineHeight: 1.65 },
  iconBox: { width: 27, height: 27, background: C.accentDim, border: `1px solid ${C.accentMid}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 },
  fg: { display: "flex", flexDirection: "column", gap: 7 },
  label: { fontSize: 12, fontWeight: 500, color: C.dim },
  input: { background: C.surface2, border: `1px solid ${C.borderActive}`, borderRadius: 8, color: C.text, fontFamily: "inherit", fontSize: 14, padding: "10px 13px", outline: "none", width: "100%", boxSizing: "border-box" },
  textarea: { background: C.surface2, border: `1px solid ${C.borderActive}`, borderRadius: 8, color: C.text, fontFamily: "inherit", fontSize: 13, padding: "12px 14px", outline: "none", width: "100%", boxSizing: "border-box", resize: "vertical", lineHeight: 1.7 },
  convBlock: { background: C.surface3, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, marginBottom: 12 },
  convHeader: { display: "flex", gap: 10, marginBottom: 12, alignItems: "center" },
  removeBtn: { background: "transparent", border: `1px solid rgba(255,95,87,0.3)`, color: C.red, fontFamily: "monospace", fontSize: 11, padding: "3px 10px", borderRadius: 6, cursor: "pointer", marginLeft: "auto" },
  addBtn: { background: "transparent", border: `1px dashed ${C.accentMid}`, color: C.accent, fontFamily: "monospace", fontSize: 12, padding: 11, borderRadius: 10, cursor: "pointer", width: "100%", letterSpacing: "0.5px" },
  pill: (active) => ({ padding: "7px 14px", borderRadius: 100, border: `1px solid ${active ? C.accentMid : C.borderActive}`, background: active ? C.accentDim : C.surface2, color: active ? C.accent : C.muted, fontSize: 12, fontFamily: "monospace", cursor: "pointer", whiteSpace: "nowrap" }),
  pillRow: { display: "flex", flexWrap: "wrap", gap: 8 },
  generateBtn: (ok) => ({ width: "100%", padding: 15, background: ok ? C.accent : C.surface2, color: ok ? "#0a0a0f" : C.muted, border: "none", borderRadius: 10, fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 15, cursor: ok ? "pointer" : "not-allowed", marginTop: 6 }),
  error: { background: "rgba(255,95,87,0.08)", border: "1px solid rgba(255,95,87,0.3)", color: C.red, borderRadius: 8, padding: "12px 16px", fontSize: 13, fontFamily: "monospace", marginTop: 10 },
  howto: { background: C.accentDim, border: `1px solid ${C.accentMid}`, borderRadius: 10, padding: 20, marginBottom: 16 },
  howtoTitle: { fontFamily: "Georgia, serif", fontSize: 14, fontWeight: 700, color: C.accent, marginBottom: 12 },
  step: { display: "flex", gap: 12, marginBottom: 8, alignItems: "flex-start" },
  stepNum: { width: 22, height: 22, borderRadius: "50%", background: "rgba(200,240,74,0.15)", border: `1px solid ${C.accentMid}`, color: C.accent, fontFamily: "monospace", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 },
  stepText: { fontSize: 13, color: C.muted, lineHeight: 1.6 },
  outputCard: { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", marginBottom: 14 },
  outputHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: `1px solid ${C.border}`, background: C.surface2 },
  outputTitle: { fontFamily: "monospace", fontSize: 11, color: C.dim, letterSpacing: "1px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 },
  dot: { width: 6, height: 6, borderRadius: "50%", background: C.accent, flexShrink: 0 },
  copyBtn: (ok) => ({ background: "transparent", border: `1px solid ${ok ? C.accentMid : C.borderActive}`, color: ok ? C.accent : C.muted, fontFamily: "monospace", fontSize: 11, padding: "5px 13px", borderRadius: 6, cursor: "pointer" }),
  promptBox: { padding: 20, fontSize: 12.5, lineHeight: 1.85, color: "#b0f060", whiteSpace: "pre-wrap", fontFamily: "monospace", background: "#060609", maxHeight: 420, overflowY: "auto" },
  promptNote: { padding: "12px 20px", fontSize: 12, color: C.muted, fontFamily: "monospace", borderTop: `1px solid ${C.border}` },
  resetBtn: { background: "transparent", border: `1px solid ${C.borderActive}`, color: C.muted, fontFamily: "monospace", fontSize: 12, padding: "10px 20px", borderRadius: 8, cursor: "pointer", marginTop: 8 },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
};

const GOALS = ["Turn contacts into leads", "Re-engage cold conversations", "Move toward a meeting", "Build long-term relationships", "Share value / stay visible", "Ask for referrals"];
const EMPTY_CONV = () => ({ id: Date.now() + Math.random(), name: "", role: "", snippet: "" });

export default function WeeklyBriefing() {
  const [convs, setConvs] = useState([EMPTY_CONV()]);
  const [yourValue, setYourValue] = useState("");
  const [goals, setGoals] = useState([]);
  const [error, setError] = useState("");
  const [prompt, setPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const addConv = () => setConvs(cs => [...cs, EMPTY_CONV()]);
  const removeConv = (id) => setConvs(cs => cs.filter(c => c.id !== id));
  const updateConv = (id, field, val) => setConvs(cs => cs.map(c => c.id === id ? { ...c, [field]: val } : c));
  const toggleGoal = (g) => setGoals(gs => gs.includes(g) ? gs.filter(x => x !== g) : [...gs, g]);

  const filled = convs.filter(c => c.name.trim() && c.snippet.trim());
  const ready = filled.length > 0 && goals.length > 0;

  const generate = () => {
    if (!ready) { setError("→ Add at least one conversation and select a goal."); return; }
    setError("");

    const convText = filled.map((c, i) =>
      `CONVERSATION ${i + 1}\nContact: ${c.name.trim()}${c.role.trim() ? ` — ${c.role.trim()}` : ""}\n---\n${c.snippet.trim()}`
    ).join("\n\n");

    const built = `You are an expert relationship strategist trained in Matthew Dixon's "The Activator's Advantage" methodology.

I'm sharing ${filled.length} LinkedIn conversation${filled.length > 1 ? "s" : ""} from this week. Analyse them and give me a prioritised action plan.

MY GOALS THIS WEEK:
${goals.map(g => `- ${g}`).join("\n")}

MY VALUE PROPOSITION:
${yourValue.trim() || "Experience design and UX leadership for enterprise CRM and customer portals."}

---
THIS WEEK'S CONVERSATIONS:

${convText}
---

## WEEKLY BRIEFING

### PRIORITY RANKING
Rank every contact. For each: Priority tier (🔴 Act Now / 🟡 This Week / 🟢 Keep Warm) and one sentence on why.

### CONTACT BRIEFS
For each contact:

**[Name] — [Priority Tier]**
- Relationship temperature: Hot / Warm / Cold
- Key signal: (what stood out)
- Strategic read: (1–2 sentences on the real opportunity)
- Draft message: (60–100 words, insight-led, no clichés, sign off first name only)
- Next action if no reply: (one tactical follow-up with timing)

### WEEKLY SUMMARY
2–3 sentences on pipeline health and one thing to focus on.`;

    setPrompt(built);
  };

  const copy = () => { navigator.clipboard.writeText(prompt); setCopied(true); setTimeout(() => setCopied(false), 2500); };
  const reset = () => { setPrompt(""); setError(""); setConvs([EMPTY_CONV()]); setYourValue(""); setGoals([]); setCopied(false); };

  return (
    <div>
      {!prompt ? (
        <>
          <div style={s.card}>
            <div style={s.cardTitle}><div style={s.iconBox}>💬</div> Paste your LinkedIn conversations</div>
            <div style={s.cardSub}>For each conversation: who it's with, their role, and paste the message thread as-is from LinkedIn.</div>
            {convs.map((conv, idx) => (
              <div key={conv.id} style={s.convBlock}>
                <div style={s.convHeader}>
                  <div style={{ fontFamily: "monospace", fontSize: 11, color: C.muted, letterSpacing: "1px" }}>CONTACT {idx + 1}</div>
                  {convs.length > 1 && <button style={s.removeBtn} onClick={() => removeConv(conv.id)}>REMOVE</button>}
                </div>
                <div style={{ ...s.grid2, marginBottom: 12 }}>
                  <div style={s.fg}><label style={s.label}>Name *</label><input style={s.input} value={conv.name} onChange={e => updateConv(conv.id, "name", e.target.value)} placeholder="e.g. Sarah Chen" /></div>
                  <div style={s.fg}><label style={s.label}>Role / Company</label><input style={s.input} value={conv.role} onChange={e => updateConv(conv.id, "role", e.target.value)} placeholder="e.g. Head of Digital, Westpac" /></div>
                </div>
                <div style={s.fg}>
                  <label style={s.label}>Conversation snippet *</label>
                  <textarea style={{ ...s.textarea, minHeight: 110 }} value={conv.snippet} onChange={e => updateConv(conv.id, "snippet", e.target.value)} placeholder="Paste the message thread here..." />
                </div>
              </div>
            ))}
            <button style={s.addBtn} onClick={addConv}>+ Add another conversation</button>
          </div>

          <div style={s.card}>
            <div style={s.cardTitle}><div style={s.iconBox}>🎯</div> Goals this week</div>
            <div style={s.pillRow}>{GOALS.map(g => <div key={g} style={s.pill(goals.includes(g))} onClick={() => toggleGoal(g)}>{g}</div>)}</div>
          </div>

          <div style={s.card}>
            <div style={s.cardTitle}><div style={s.iconBox}>🧠</div> Your positioning</div>
            <textarea style={{ ...s.textarea, minHeight: 75 }} value={yourValue} onChange={e => setYourValue(e.target.value)} placeholder="e.g. I'm a UX leader specialising in enterprise CRM and customer portal design..." />
          </div>

          {error && <div style={s.error}>{error}</div>}
          <button style={s.generateBtn(ready)} onClick={generate} disabled={!ready}>Build My Weekly Briefing Prompt →</button>
        </>
      ) : (
        <>
          <div style={s.howto}>
            <div style={s.howtoTitle}>✅ Your weekly briefing prompt is ready</div>
            {[["1","Copy the prompt"],["2","Open a new Claude chat at claude.ai"],["3","Paste and send — full prioritised brief"],["4","Come back next week and repeat"]].map(([n,t]) => (
              <div key={n} style={s.step}><div style={s.stepNum}>{n}</div><div style={s.stepText}>{t}</div></div>
            ))}
          </div>
          <div style={s.outputCard}>
            <div style={s.outputHeader}>
              <div style={s.outputTitle}><div style={s.dot} />Weekly Brief — {filled.length} conversation{filled.length>1?"s":""}</div>
              <button style={s.copyBtn(copied)} onClick={copy}>{copied ? "COPIED ✓" : "COPY PROMPT"}</button>
            </div>
            <div style={s.promptBox}>{prompt}</div>
            <div style={s.promptNote}>Paste into Claude at claude.ai</div>
          </div>
          <button style={s.resetBtn} onClick={reset}>← Start a new briefing</button>
        </>
      )}
    </div>
  );
}
