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
  pill: (active) => ({ padding: "7px 14px", borderRadius: 100, border: `1px solid ${active ? C.accentMid : C.borderActive}`, background: active ? C.accentDim : C.surface2, color: active ? C.accent : C.muted, fontSize: 12, fontFamily: "monospace", cursor: "pointer", whiteSpace: "nowrap" }),
  pillRow: { display: "flex", flexWrap: "wrap", gap: 8 },
  generateBtn: (ok) => ({ width: "100%", padding: 15, background: ok ? C.accent : C.surface2, color: ok ? "#0a0a0f" : C.muted, border: "none", borderRadius: 10, fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 15, cursor: ok ? "pointer" : "not-allowed", marginTop: 6 }),
  error: { background: "rgba(255,95,87,0.08)", border: "1px solid rgba(255,95,87,0.3)", color: C.red, borderRadius: 8, padding: "12px 16px", fontSize: 13, fontFamily: "monospace", marginTop: 10 },
  success: { background: "rgba(74,255,145,0.07)", border: "1px solid rgba(74,255,145,0.2)", borderRadius: 8, padding: "12px 16px", fontSize: 13, fontFamily: "monospace", color: "#4aff91", marginTop: 10 },
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
  subTab: (active) => ({
    flex: 1, padding: "10px 16px", borderRadius: 8, cursor: "pointer", textAlign: "center",
    background: active ? C.accentDim : "transparent",
    border: `1px solid ${active ? C.accentMid : C.border}`,
    color: active ? C.accent : C.muted,
    fontFamily: "monospace", fontSize: 12, letterSpacing: "0.5px",
  }),
  banner: { background: "rgba(255,95,87,0.06)", border: "1px solid rgba(255,95,87,0.25)", borderRadius: 10, padding: 20, marginBottom: 20 },
  bannerTitle: { fontFamily: "Georgia, serif", fontSize: 14, fontWeight: 700, color: C.red, marginBottom: 10 },
  bannerStep: { fontFamily: "monospace", fontSize: 12, color: C.muted, lineHeight: 1.8 },
  code: { background: C.surface3, border: `1px solid ${C.border}`, borderRadius: 4, padding: "2px 7px", fontFamily: "monospace", fontSize: 11, color: C.accent },
  typeBtn: (active) => ({
    flex: 1, padding: "9px 12px", borderRadius: 8, cursor: "pointer", textAlign: "center",
    background: active ? C.accentDim : C.surface2,
    border: `1px solid ${active ? C.accentMid : C.borderActive}`,
    color: active ? C.accent : C.muted,
    fontFamily: "monospace", fontSize: 11, letterSpacing: "0.3px",
  }),
};

const CONTENT_TYPES = ["LinkedIn Post", "LinkedIn Article", "My Note"];

const TOPIC_KEYWORDS = {
  "AI & Automation": ["ai", "artificial intelligence", "automation", "llm", "gpt", "machine learning", "chatgpt", "claude", "copilot", "generative"],
  "Leadership": ["leadership", "leader", "ceo", "management", "executive", "founder", "managing director"],
  "Product & Design": ["ux", "design", "product", "user experience", "prototype", "figma", "interface", "usability"],
  "Digital Transformation": ["digital transformation", "digitisation", "digitization", "digital strategy", "modernisation"],
  "CRM & Customer": ["crm", "customer", "salesforce", "hubspot", "portal", "retention", "churn", "adoption"],
  "Data & Analytics": ["data", "analytics", "metrics", "insights", "dashboard", "reporting", "kpi"],
  "Culture & People": ["culture", "people", "hiring", "talent", "team", "remote", "hybrid", "wellbeing", "burnout"],
  "Strategy": ["strategy", "strategic", "growth", "market", "competitive", "positioning", "go-to-market"],
  "Change Management": ["change management", "change", "transformation", "adoption", "resistance", "stakeholder"],
};

function autoTagTopics(text) {
  const lower = text.toLowerCase();
  return Object.entries(TOPIC_KEYWORDS)
    .filter(([, keywords]) => keywords.some((kw) => lower.includes(kw)))
    .map(([topic]) => topic);
}

// Reuse the same LinkedIn parser logic as SignalScanner
function parseLinkedInPost(raw) {
  const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) return null;

  const name = lines[0].replace(/^[•·\-]+\s*/, "").trim();
  if (!name) return null;

  const skipPattern = /^(•\s*)?(1st|2nd|3rd|follow|connect|message|\d+[smhdw]|just now|like|comment|share|repost|send|more)/i;

  let role = "";
  let contentStart = 1;

  for (let i = 1; i < Math.min(lines.length, 8); i++) {
    if (skipPattern.test(lines[i])) { contentStart = i + 1; continue; }
    if (!role && i <= 4) { role = lines[i].replace(/^[•·]+\s*/, "").trim(); contentStart = i + 1; }
    else { contentStart = i; break; }
  }

  while (contentStart < lines.length && skipPattern.test(lines[contentStart])) contentStart++;

  const content = lines.slice(contentStart).join("\n").trim();
  if (!content) return null;

  return { name, role, content };
}

function autoTitle(contentType, parsed, rawContent, yourTake) {
  if (contentType === "LinkedIn Post" || contentType === "LinkedIn Article") {
    if (parsed?.name) {
      const firstSentence = (parsed.content || rawContent).split(/[.!?\n]/)[0].trim();
      return `${parsed.name} — ${firstSentence.slice(0, 80)}${firstSentence.length > 80 ? "…" : ""}`;
    }
  }
  // My Note or fallback
  const text = yourTake?.trim() || rawContent;
  const firstLine = text.split("\n")[0].trim();
  return firstLine.slice(0, 100) + (firstLine.length > 100 ? "…" : "");
}

function autoSignal(yourTake, parsed, rawContent) {
  if (yourTake?.trim()) return yourTake.trim().slice(0, 300);
  const text = parsed?.content || rawContent;
  const firstSentence = text.split(/[.!?]/)[0].trim();
  return firstSentence.slice(0, 200) + (firstSentence.length > 200 ? "…" : "");
}

const hasEnvVars = !!(
  process.env.NEXT_PUBLIC_NOTION_API_KEY &&
  process.env.NEXT_PUBLIC_NOTION_DATABASE_ID
);

export default function IntelCollector() {
  const [view, setView] = useState("collect"); // "collect" | "analyse"

  // Collect state
  const [rawContent, setRawContent] = useState("");
  const [contentType, setContentType] = useState("LinkedIn Post");
  const [yourTake, setYourTake] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [lastSaved, setLastSaved] = useState(null); // { title }
  const [sessionCount, setSessionCount] = useState(0);

  // Analyse state
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [prompt, setPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const [weekEntries, setWeekEntries] = useState(null); // null = not fetched yet

  const parsed = (contentType === "LinkedIn Post" || contentType === "LinkedIn Article") && rawContent.trim()
    ? parseLinkedInPost(rawContent)
    : null;

  const canSave = rawContent.trim().length > 10;

  const handleSave = async () => {
    if (!canSave) return;
    setSaving(true);
    setSaveError("");
    setLastSaved(null);

    const title = autoTitle(contentType, parsed, rawContent, yourTake);
    const signal = autoSignal(yourTake, parsed, rawContent);
    const topics = autoTagTopics(rawContent + " " + (yourTake || ""));
    const author = parsed?.name || "";
    const authorRole = parsed?.role || "";

    try {
      const res = await fetch("/api/notion/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, authorRole, contentType, rawContent, topics, signal }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setLastSaved({ title: data.title });
      setSessionCount((n) => n + 1);
      setRawContent("");
      setYourTake("");
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleGenerate = async () => {
    setFetching(true);
    setFetchError("");
    setPrompt("");

    try {
      const res = await fetch("/api/notion/fetch-week");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Fetch failed");

      const { entries, weekNumber } = data;
      setWeekEntries(entries);

      if (entries.length === 0) {
        setFetchError(`No entries found for week ${weekNumber}. Add some items in the Collect view first.`);
        setFetching(false);
        return;
      }

      const entriesText = entries.map((e, i) => {
        const typeLabel = e.contentType || "Item";
        const authorLine = e.author ? `${e.author}${e.authorRole ? ` — ${e.authorRole}` : ""}` : "";
        const topicLine = e.topics.length ? `Topics: ${e.topics.join(", ")}` : "";
        const signalLine = e.signal ? `Signal: ${e.signal}` : "";
        return [
          `ITEM ${i + 1} [${typeLabel}]`,
          authorLine && `Source: ${authorLine}`,
          topicLine,
          signalLine,
          "---",
          e.rawContent.slice(0, 800) + (e.rawContent.length > 800 ? "…" : ""),
        ].filter(Boolean).join("\n");
      }).join("\n\n===\n\n");

      const built = `You are a strategic intelligence analyst trained in Matthew Dixon's "The Activator's Advantage" methodology.

I'm sharing ${entries.length} items I collected from LinkedIn and my own notes during week ${weekNumber}. Analyse them and give me a full weekly intelligence brief.

---
THIS WEEK'S COLLECTED INTEL:

${entriesText}

---

## WEEKLY INTELLIGENCE BRIEF — WEEK ${weekNumber}

### 1. TOP 3 SIGNALS OF THE WEEK
What three themes kept surfacing across these items? For each:
- **Signal:** (the theme in one sentence)
- **Why it matters:** (the strategic implication for someone in B2B relationship and CRM consulting)
- **Evidence:** (which items point to this)

### 2. PEOPLE WORTH REACHING OUT TO THIS WEEK
From the LinkedIn posts and articles, who should I engage with and why?
For each person:
- **[Name]** — [why now, what to say, engagement angle: comment / DM]

### 3. CONTENT GAPS I COULD FILL
Based on what my network is discussing, what angles are missing or underrepresented?
- List 3 content ideas I could credibly publish this week
- For each: hook line, core argument, why it'll resonate

### 4. ONE CONTRARIAN TAKE I COULD PUBLISH
Something my network broadly believes that I could respectfully challenge with evidence or a fresh lens. One paragraph, ready to post.`;

      setPrompt(built);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setFetching(false);
    }
  };

  const copy = () => { navigator.clipboard.writeText(prompt); setCopied(true); setTimeout(() => setCopied(false), 2500); };
  const resetPrompt = () => { setPrompt(""); setFetchError(""); setWeekEntries(null); };

  const missingEnvVars = typeof window !== "undefined" &&
    (!process.env.NEXT_PUBLIC_NOTION_API_KEY || !process.env.NEXT_PUBLIC_NOTION_DATABASE_ID);

  return (
    <div>
      {/* Setup banner — shown when env vars are missing */}
      {missingEnvVars && (
        <div style={s.banner}>
          <div style={s.bannerTitle}>⚠ Notion not configured</div>
          <div style={s.bannerStep}>
            To enable saving, add these to a <span style={s.code}>.env.local</span> file in the project root:<br /><br />
            <span style={s.code}>NEXT_PUBLIC_NOTION_API_KEY=secret_...</span><br />
            <span style={s.code}>NEXT_PUBLIC_NOTION_DATABASE_ID=your-database-id</span><br /><br />
            <strong style={{ color: C.dim }}>1.</strong> Go to <strong style={{ color: C.dim }}>notion.so/my-integrations</strong> → New integration → copy the Internal Integration Token<br />
            <strong style={{ color: C.dim }}>2.</strong> Create a Notion database with the schema below → open it → copy the ID from the URL (<span style={s.code}>notion.so/&lt;workspace&gt;/<strong>DATABASE_ID</strong>?v=...</span>)<br />
            <strong style={{ color: C.dim }}>3.</strong> In Notion, click ··· on your database → Connections → add your integration<br />
            <strong style={{ color: C.dim }}>4.</strong> Restart the dev server after adding the env vars<br /><br />
            <strong style={{ color: C.dim }}>Database schema:</strong> Title (title), Author (text), AuthorRole (text), ContentType (select), RawContent (text), Topics (multi-select), Signal (text), DateAdded (date), WeekNumber (number)
          </div>
        </div>
      )}

      {/* Sub-tab navigation */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <button style={s.subTab(view === "collect")} onClick={() => setView("collect")}>
          📥 COLLECT
        </button>
        <button style={s.subTab(view === "analyse")} onClick={() => setView("analyse")}>
          📊 WEEKLY ANALYSIS
        </button>
      </div>

      {/* Session counter */}
      {sessionCount > 0 && view === "collect" && (
        <div style={s.statRow}>
          <div style={s.stat}>
            <div style={s.statVal}>{sessionCount}</div>
            <div style={s.statLabel}>Items collected this session</div>
          </div>
        </div>
      )}

      {/* ── COLLECT VIEW ── */}
      {view === "collect" && (
        <>
          <div style={s.card}>
            <div style={s.cardTitle}><div style={s.iconBox}>📋</div> Content type</div>
            <div style={{ display: "flex", gap: 8 }}>
              {CONTENT_TYPES.map((t) => (
                <button key={t} style={s.typeBtn(contentType === t)} onClick={() => setContentType(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={s.card}>
            <div style={s.cardTitle}><div style={s.iconBox}>📥</div> Paste content</div>
            <div style={s.cardSub}>
              {contentType === "LinkedIn Post"
                ? "Copy the whole post block from LinkedIn and paste as-is — name, role, timestamp, content and all."
                : contentType === "LinkedIn Article"
                ? "Paste the article title, author, and key excerpts or a summary."
                : "Write your own observation, idea, or note from the week."}
            </div>
            <div style={s.fg}>
              <textarea
                style={{ ...s.textarea, minHeight: 160 }}
                value={rawContent}
                onChange={(e) => { setRawContent(e.target.value); setLastSaved(null); setSaveError(""); }}
                placeholder={
                  contentType === "LinkedIn Post"
                    ? "Paste directly from LinkedIn, e.g:\n\nGrace H.\n  • 2nd\nProduct Design & Strategy Advisor\n3h •\nAre we seeing the beginning of the systemisation of documentation?..."
                    : contentType === "LinkedIn Article"
                    ? "Paste the article title, author, and key excerpts..."
                    : "Write your observation or note here..."
                }
              />
            </div>

            {/* Parse preview for LinkedIn posts */}
            {(contentType === "LinkedIn Post" || contentType === "LinkedIn Article") && rawContent.trim() && (
              parsed ? (
                <div style={s.parsedOk ?? { display: "flex", alignItems: "flex-start", gap: 8, background: "rgba(74,255,145,0.07)", border: "1px solid rgba(74,255,145,0.2)", borderRadius: 8, padding: "9px 12px", marginTop: 10 }}>
                  <span style={{ fontSize: 14, marginTop: 1 }}>✓</span>
                  <div>
                    <div style={{ fontFamily: "monospace", fontSize: 12, color: "#4aff91", fontWeight: 500 }}>{parsed.name}</div>
                    {parsed.role && <div style={{ fontFamily: "monospace", fontSize: 11, color: C.muted, marginTop: 2 }}>{parsed.role}</div>}
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,95,87,0.07)", border: "1px solid rgba(255,95,87,0.2)", borderRadius: 8, padding: "9px 12px", marginTop: 10, fontSize: 12, color: C.red, fontFamily: "monospace" }}>
                  ⚠ Couldn't parse author — make sure the author name is the first line
                </div>
              )
            )}
          </div>

          <div style={s.card}>
            <div style={s.cardTitle}><div style={s.iconBox}>💡</div> Your take <span style={{ fontFamily: "monospace", fontSize: 11, color: C.muted, fontWeight: 400 }}>(optional)</span></div>
            <div style={s.cardSub}>Why are you saving this? What stood out?</div>
            <div style={s.fg}>
              <textarea
                style={{ ...s.textarea, minHeight: 70 }}
                value={yourTake}
                onChange={(e) => setYourTake(e.target.value)}
                placeholder="e.g. This confirms what I'm seeing with clients — adoption always stalls at the middle layer..."
              />
            </div>
          </div>

          {saveError && <div style={s.error}>{saveError}</div>}
          {lastSaved && (
            <div style={s.success}>
              ✓ Saved — <strong>{lastSaved.title}</strong>
            </div>
          )}

          <button
            style={s.generateBtn(canSave && !saving)}
            onClick={handleSave}
            disabled={!canSave || saving}
          >
            {saving ? "Saving to Notion…" : "Save to Notion →"}
          </button>
        </>
      )}

      {/* ── ANALYSE VIEW ── */}
      {view === "analyse" && (
        <>
          {!prompt ? (
            <>
              <div style={s.card}>
                <div style={s.cardTitle}><div style={s.iconBox}>📊</div> Generate weekly intelligence brief</div>
                <div style={s.cardSub}>
                  Fetches everything you've saved to Notion this ISO week and assembles a prompt for Claude to analyse across all items.
                </div>
                {fetchError && <div style={s.error}>{fetchError}</div>}
              </div>

              <button
                style={s.generateBtn(!fetching)}
                onClick={handleGenerate}
                disabled={fetching}
              >
                {fetching ? "Fetching from Notion…" : "Generate Weekly Brief →"}
              </button>
            </>
          ) : (
            <>
              <div style={s.howto}>
                <div style={s.howtoTitle}>✅ Your weekly intelligence brief is ready</div>
                {[
                  ["1", "Copy the prompt below"],
                  ["2", "Open a new Claude chat at claude.ai"],
                  ["3", `Paste and send — analysis across all ${weekEntries?.length ?? ""} items from this week`],
                  ["4", "Come back next week and repeat"],
                ].map(([n, t]) => (
                  <div key={n} style={s.step}><div style={s.stepNum}>{n}</div><div style={s.stepText}>{t}</div></div>
                ))}
              </div>

              <div style={s.outputCard}>
                <div style={s.outputHeader}>
                  <div style={s.outputTitle}>
                    <div style={s.dot} />
                    Weekly Intel — {weekEntries?.length ?? 0} item{weekEntries?.length !== 1 ? "s" : ""}
                  </div>
                  <button style={s.copyBtn(copied)} onClick={copy}>{copied ? "COPIED ✓" : "COPY PROMPT"}</button>
                </div>
                <div style={s.promptBox}>{prompt}</div>
                <div style={s.promptNote}>Paste into Claude at claude.ai for full analysis</div>
              </div>

              <button style={s.resetBtn} onClick={resetPrompt}>← Generate a new brief</button>
            </>
          )}
        </>
      )}
    </div>
  );
}
