import { useNavigate } from 'react-router-dom'

const C = {
  bg: "#F4F0EA", bgCard: "#FFFFFF", bgAlt: "#F9F6F2",
  border: "#DDD8D0", borderMid: "#C8C2B8",
  accent: "#AD2E21", accentBg: "#FAF0EE",
  charcoal: "#51524B", warm: "#7C6F5E",
  text: "#1A1A1A", textMid: "#3A3A35", textDim: "#7C6F5E", muted: "#A09890",
  gold: "#B8922A", shadow: "0 1px 3px rgba(0,0,0,0.08)",
  shadowMd: "0 6px 20px rgba(0,0,0,0.10)",
}

const os = { fontFamily: "'Oswald', sans-serif" }

const TOOLS = [
  {
    path: "/macros",
    emoji: "📊",
    label: "Macro Calculator",
    tagline: "Find your exact daily targets",
    description: "7 sections of questions covering your body stats, training, sleep, stress, and eating habits. More accurate than any generic calculator.",
    color: C.accent,
    tags: ["Calories", "Protein", "Carbs", "Fats", "Per-meal breakdown"],
  },
  {
    path: "/meal-prep",
    emoji: "🥩",
    label: "Meal Prep Planner",
    tagline: "A full week of meals built for your macros",
    description: "Pick your food preferences, enter your macros, and get a 5 or 7-day meal plan with a shopping list, batch prep guide, and meal assembly instructions.",
    color: C.gold,
    tags: ["Meal Plan", "Shopping List", "Prep Guide", "Assembly Guide"],
  },
  {
    path: "/vivid-vision",
    emoji: "🔥",
    label: "Vivid Vision",
    tagline: "A written picture of the life you're building",
    description: "Answer questions across 7 areas of life — health, family, career, money, daily life, and growth. Claude reads your answers and writes your vision for you in present tense, as if you're already living it.",
    color: "#2A1A1A",
    tags: ["Life Clarity", "Goal Setting", "AI-Written", "Cameron Herold"],
  },
  // ── ADD NEW TOOLS HERE ──
  // {
  //   path: "/new-tool",
  //   emoji: "🔧",
  //   label: "Tool Name",
  //   tagline: "Short tagline",
  //   description: "Description of what it does.",
  //   color: "#2A5A7A",
  //   tags: ["Tag 1", "Tag 2"],
  // },
]

export default function Hub() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Oswald', sans-serif" }}>
      <style>{`
        * { box-sizing: border-box; }
        button:active { transform: scale(0.98); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.borderMid}; border-radius: 2px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        .tool-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.13) !important; }
        .tool-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .launch-btn:hover { opacity: 0.88; }
      `}</style>

      {/* Header */}
      <div style={{ background: C.accent, padding: "18px 28px", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 40, height: 40, background: "rgba(255,255,255,0.20)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>⚡</div>
        <div>
          <div style={{ ...os, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.35em", color: "rgba(255,255,255,0.60)" }}>MVMNT | CrossFit Ventura</div>
          <div style={{ ...os, fontSize: 20, fontWeight: "bold", color: "#fff", letterSpacing: "0.03em" }}>Member Tools</div>
        </div>
      </div>

      {/* Hero section */}
      <div style={{ background: "#1A1A1A", padding: "48px 28px 44px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ ...os, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.3em", color: C.accent, marginBottom: 12 }}>Free Resources</div>
          <div style={{ fontSize: 36, fontWeight: "bold", color: "#fff", lineHeight: 1.15, marginBottom: 14 }}>
            Tools Built for<br />Serious Athletes.
          </div>
          <div style={{ ...os, fontSize: 15, color: "#9A9890", lineHeight: 1.7, maxWidth: 500 }}>
            Free, science-backed calculators and planners to help you dial in your nutrition, training, and performance. No fluff. Just results.
          </div>
        </div>
      </div>

      {/* Tools grid */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "36px 20px 60px" }}>
        <div style={{ ...os, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.25em", color: C.muted, marginBottom: 20 }}>
          {TOOLS.length} Tools Available
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {TOOLS.map((tool) => (
            <div
              key={tool.path}
              className="tool-card"
              style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden", boxShadow: C.shadowMd }}
            >
              {/* Color accent bar */}
              <div style={{ height: 4, background: tool.color }} />

              <div style={{ padding: "22px 24px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 10, background: `${tool.color}18`, border: `1.5px solid ${tool.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>
                      {tool.emoji}
                    </div>
                    <div>
                      <div style={{ fontSize: 19, fontWeight: "bold", color: C.text, lineHeight: 1.1 }}>{tool.label}</div>
                      <div style={{ ...os, fontSize: 12, color: tool.color === "#2A1A1A" ? C.accent : tool.color, marginTop: 3, fontWeight: 500 }}>{tool.tagline}</div>
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: 13, color: C.textDim, lineHeight: 1.7, marginBottom: 16 }}>{tool.description}</div>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                  {tool.tags.map(tag => (
                    <span key={tag} style={{ ...os, fontSize: 10, background: C.bgAlt, border: `1px solid ${C.border}`, color: C.charcoal, padding: "3px 10px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  className="launch-btn"
                  onClick={() => navigate(tool.path)}
                  style={{ ...os, background: tool.color === "#2A1A1A" ? C.accent : tool.color, color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: "bold", fontSize: 12, cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase", boxShadow: `0 2px 10px ${C.accent}40` }}
                >
                  Open Tool →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Coming soon placeholder */}
        <div style={{ marginTop: 16, background: C.bgAlt, border: `1.5px dashed ${C.border}`, borderRadius: 14, padding: "28px 24px", textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 10 }}>🔧</div>
          <div style={{ ...os, fontSize: 14, fontWeight: 600, color: C.muted, marginBottom: 4 }}>More Tools Coming Soon</div>
          <div style={{ ...os, fontSize: 12, color: C.muted }}>Life Score Audit · Mindset Identifier · Habit Stack Builder</div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 40, paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
          <div style={{ ...os, fontSize: 13, fontWeight: "bold", color: C.charcoal, marginBottom: 4 }}>MVMNT Oxnard · CrossFit Ventura</div>
          <div style={{ ...os, fontSize: 11, color: C.muted }}>Tools built for our community. Free, always.</div>
        </div>
      </div>
    </div>
  )
}
