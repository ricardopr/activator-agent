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
  postBlock: { background: C.surface3, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, marginBottom: 12 },
  postHeader: { display: "flex", gap: 10, marginBottom: 12, alignItems: "center" },
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
  statRow: { display: "flex", gap: 10, marginBottom: 16 },
  stat: { background: C.surface3, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", flex: 1, textAlign: "center" },
  statVal: { fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 22, color: C.accent },
  statLabel: { fontFamily: "monospace", fontSize: 10, color: C.muted, letterSpacing: "0.8px", textTransform: "uppercase", marginTop: 3 },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
};

const FOCUS_AREAS = ["UX & Experience Design", "Digital Transformation", "CRM & Customer Portals", "AI in Business", "Leadership & Culture", "Data & Insights", "Change Management", "Product Strategy"];
const EMPTY_POST = () => ({ id: Date.now() + Math.random(), author: "", role: "", content: "" });

export default function SignalScanner() {
  const [posts, setPosts] = useState([EMPTY_POST()]);
  const [yourValue, setYourValue] = useState("");
  const [focusAreas, setFocusAreas] = useState([]);
  const [error, setError] = useState("");
  const [prompt, setPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const addPost = () => setPosts(ps => [...ps, EMPTY_POST()]);
  const removePost = (id) => setPosts(ps => ps.filter(p => p.id !== id));
  const updatePost = (id, field, val) => setPosts(ps => ps.map(p => p.id === id ? { ...p, [field]: val } : p));
  const toggleFocus = (f) => setFocusAreas(fs => fs.includes(f) ? fs.filter(x => x !== f) : [...fs, f]);

  const filled = posts.filter(p => p.author.trim() && p.content.trim());
  const ready = filled.length > 0;

  const generate = () => {
    if (!ready) { setError("→ Add at least one post with an author name and content."); return; }
    setError("");

    const postText = filled.map((p, i) =>
      `POST ${i + 1}\nAuthor: ${p.author.trim()}${p.role.trim() ? ` — ${p.role.trim()}` : ""}\n---\n${p.content.trim()}`
    ).join("\n\n===\n\n");

    const built = `You are a strategic intelligence analyst and relationship advisor trained in Matthew Dixon's "The Activator's Advantage" methodology.

I'm sharing ${filled.length} LinkedIn post${filled.length > 1 ? "s" : ""} from my feed this week. I need two things: engagement opportunities and content intelligence.

MY POSITIONING:
${yourValue.trim() || "I'm a UX leader specialising in enterprise CRM and customer portal design. I help organisations turn complex systems into experiences people actually use — with measurable adoption and real business outcomes."}
${focusAreas.length > 0 ? `\nMY FOCUS AREAS THIS WEEK:\n${focusAreas.map(f => `- ${f}`).join("\n")}` : ""}

---
THIS WEEK'S POSTS FROM MY FEED:

${postText}

---

Give me the following:

## PART 1 — ENGAGEMENT OPPORTUNITIES

For each post:

**[Author Name] — [🔴 Act Now / 🟡 Engage This Week / 🟢 Watch & Like]**
- Signal detected: (what is this person really communicating?)
- Relevance to me: (why does this connect to my world?)
- Engagement angle: (comment, DM, or both?)
- Draft comment: (2–3 sentences, sharp and genuine, no sycophancy)
- Draft DM if warranted: (60–90 words, insight-led, sign off first name only)

## PART 2 — CONTENT INTELLIGENCE

**Recurring themes:** What topics keep surfacing across these posts?
**The gap nobody's filling:** What angle could I credibly own?
**3 content ideas for me this week:** Hook line, core idea, why it'll land.
**One contrarian angle:** Something my network believes that I could respectfully challenge.`;

    setPrompt(built);
  };

  const copy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const reset = () => { setPrompt(""); setError(""); setPosts([EMPTY_POST()]); setYourValue(""); setFocusAreas([]); setCopied(false); };

  return (
    <div>
      {!prompt ? (
        <>
          <div style={s.card}>
            <div style={s.cardTitle}><div style={s.iconBox}>📡</div> Paste posts that caught your eye</div>
            <div style={s.cardSub}>Scroll your LinkedIn feed, grab anything relevant — contacts, prospects, people you follow. Paste the text and who wrote it.</div>

            {filled.length > 0 && (
              <div style={s.statRow}>
                <div style={s.stat}><div style={s.statVal}>{filled.length}</div><div style={s.statLabel}>Posts ready</div></div>
                <div style={s.stat}><div style={s.statVal}>{filled.reduce((a, p) => a + p.content.trim().split(/\s+/).length, 0)}</div><div style={s.statLabel}>Words to analyse</div></div>
              </div>
            )}

            {posts.map((post, idx) => (
              <div key={post.id} style={s.postBlock}>
                <div style={s.postHeader}>
                  <div style={{ fontFamily: "monospace", fontSize: 11, color: C.muted, letterSpacing: "1px" }}>POST {idx + 1}</div>
                  {posts.length > 1 && <button style={s.removeBtn} onClick={() => removePost(post.id)}>REMOVE</button>}
                </div>
                <div style={{ ...s.grid2, marginBottom: 12 }}>
                  <div style={s.fg}><label style={s.label}>Author name *</label><input style={s.input} value={post.author} onChange={e => updatePost(post.id, "author", e.target.value)} placeholder="e.g. Sarah Chen" /></div>
                  <div style={s.fg}><label style={s.label}>Their role / company</label><input style={s.input} value={post.role} onChange={e => updatePost(post.id, "role", e.target.value)} placeholder="e.g. Head of Digital, Westpac" /></div>
                </div>
                <div style={s.fg}>
                  <label style={s.label}>Post content * (paste from LinkedIn)</label>
                  <textarea style={{ ...s.textarea, minHeight: 100 }} value={post.content} onChange={e => updatePost(post.id, "content", e.target.value)} placeholder="Paste the full post text here..." />
                </div>
              </div>
            ))}
            <button style={s.addBtn} onClick={addPost}>+ Add another post</button>
          </div>

          <div style={s.card}>
            <div style={s.cardTitle}><div style={s.iconBox}>🔍</div> Focus areas this week</div>
            <div style={s.pillRow}>
              {FOCUS_AREAS.map(f => <div key={f} style={s.pill(focusAreas.includes(f))} onClick={() => toggleFocus(f)}>{f}</div>)}
            </div>
          </div>

          <div style={s.card}>
            <div style={s.cardTitle}><div style={s.iconBox}>🧠</div> Your positioning</div>
            <textarea style={{ ...s.textarea, minHeight: 75 }} value={yourValue} onChange={e => setYourValue(e.target.value)} placeholder="e.g. I'm a UX leader specialising in enterprise CRM and customer portal design..." />
          </div>

          {error && <div style={s.error}>{error}</div>}
          <button style={s.generateBtn(ready)} onClick={generate} disabled={!ready}>Scan for Signals →</button>
        </>
      ) : (
        <>
          <div style={s.howto}>
            <div style={s.howtoTitle}>✅ Your signal scan is ready</div>
            {[["1","Copy the prompt below"],["2","Open a new Claude chat at claude.ai"],["3",`Paste and send — engagement moves for all ${filled.length} post${filled.length>1?"s":""} + content ideas`],["4","Come back and scan again anytime"]].map(([n,t]) => (
              <div key={n} style={s.step}><div style={s.stepNum}>{n}</div><div style={s.stepText}>{t}</div></div>
            ))}
          </div>
          <div style={s.outputCard}>
            <div style={s.outputHeader}>
              <div style={s.outputTitle}><div style={s.dot} />Signal Scan — {filled.length} post{filled.length>1?"s":""}</div>
              <button style={s.copyBtn(copied)} onClick={copy}>{copied ? "COPIED ✓" : "COPY PROMPT"}</button>
            </div>
            <div style={s.promptBox}>{prompt}</div>
            <div style={s.promptNote}>Paste into Claude at claude.ai for full analysis</div>
          </div>
          <button style={s.resetBtn} onClick={reset}>← Scan a new batch</button>
        </>
      )}
    </div>
  );
}
