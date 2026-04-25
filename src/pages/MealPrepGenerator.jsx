import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CUISINE_OPTIONS = ["American", "Mediterranean", "Asian", "Mexican", "Italian", "Indian", "Middle Eastern", "Greek"];
const PROTEIN_OPTIONS = ["Chicken", "Beef", "Pork", "Fish", "Shrimp", "Tofu", "Tempeh", "Eggs", "Turkey"];
const ALLERGY_OPTIONS = ["Gluten", "Dairy", "Nuts", "Soy", "Eggs", "Shellfish", "Nightshades", "Corn"];
const DIET_OPTIONS = ["None", "Vegetarian", "Vegan", "Keto", "Paleo", "Whole30", "Low-FODMAP"];

// ── LIGHT BRAND PALETTE (matching macro calculator) ────────────────────────
const C = {
  bg:         "#F4F0EA",
  bgCard:     "#FFFFFF",
  bgCardAlt:  "#F9F6F2",
  bgSection:  "#EDE9E3",
  border:     "#DDD8D0",
  borderMid:  "#C8C2B8",
  accent:     "#AD2E21",
  accentDark: "#8C2419",
  accentBg:   "#FAF0EE",
  charcoal:   "#51524B",
  warm:       "#7C6F5E",
  tan:        "#BFB8A8",
  cream:      "#F4F0EA",
  text:       "#1A1A1A",
  textMid:    "#3A3A35",
  textDim:    "#7C6F5E",
  muted:      "#A09890",
  gold:       "#B8922A",
  green:      "#3A6E2A",
  blue:       "#2A5A7A",
  shadow:     "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
  shadowMd:   "0 4px 12px rgba(0,0,0,0.10)",
};

const os = { fontFamily: "'Oswald', sans-serif" };

// ── TAG (preference chips) ─────────────────────────────────────────────────
const Tag = ({ label, selected, onClick, variant = "default" }) => {
  let bg, color, border;
  if (variant === "danger") {
    bg = selected ? "#FAF0EE" : "transparent";
    color = selected ? C.accent : C.muted;
    border = `1.5px solid ${selected ? C.accent : C.border}`;
  } else if (variant === "blue") {
    bg = selected ? "#EEF4FA" : "transparent";
    color = selected ? C.blue : C.muted;
    border = `1.5px solid ${selected ? C.blue : C.border}`;
  } else {
    bg = selected ? C.accentBg : "transparent";
    color = selected ? C.accent : C.muted;
    border = `1.5px solid ${selected ? C.accent : C.border}`;
  }
  return (
    <button onClick={onClick} style={{
      ...os, background: bg, color, border,
      padding: "5px 14px", borderRadius: 20, fontSize: 12,
      fontWeight: selected ? 600 : 400, cursor: "pointer",
      letterSpacing: "0.04em", transition: "all 0.15s",
      boxShadow: selected ? `0 0 0 3px rgba(173,46,33,0.08)` : "none",
    }}>
      {label}
    </button>
  );
};

// ── NUMBER INPUT ───────────────────────────────────────────────────────────
const NumInput = ({ label, value, onChange, unit }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    <label style={{ ...os, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.25em", color: C.textDim }}>{label}</label>
    <div style={{ display: "flex", alignItems: "center", background: C.bgCardAlt, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "8px 14px", gap: 6, boxShadow: C.shadow }}>
      <input type="number" value={value} min={0} onChange={e => onChange(Number(e.target.value))}
        style={{ ...os, background: "transparent", color: C.accent, fontSize: 24, fontWeight: "bold", width: "100%", outline: "none", border: "none" }} />
      <span style={{ ...os, color: C.muted, fontSize: 12 }}>{unit}</span>
    </div>
  </div>
);

// ── MACRO BAR ──────────────────────────────────────────────────────────────
const MacroBar = ({ protein, carbs, fats }) => {
  const total = protein * 4 + carbs * 4 + fats * 9 || 1;
  const pp = Math.round((protein * 4 / total) * 100);
  const cp = Math.round((carbs * 4 / total) * 100);
  const fp = 100 - pp - cp;
  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ display: "flex", gap: 2, height: 6, borderRadius: 3, overflow: "hidden", background: C.border }}>
        <div style={{ width: `${pp}%`, background: C.accent }} />
        <div style={{ width: `${cp}%`, background: C.gold }} />
        <div style={{ width: `${fp}%`, background: C.blue }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, ...os, fontSize: 11 }}>
        <span style={{ color: C.accent }}>P {pp}%</span>
        <span style={{ color: C.gold }}>C {cp}%</span>
        <span style={{ color: C.blue }}>F {fp}%</span>
      </div>
    </div>
  );
};

// ── JSON EXTRACTOR ─────────────────────────────────────────────────────────
function extractJSON(text) {
  if (!text) throw new Error("Empty response from API");
  try { return JSON.parse(text.trim()); } catch {}
  const stripped = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "").trim();
  try { return JSON.parse(stripped); } catch {}
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end > start) {
    try { return JSON.parse(text.slice(start, end + 1)); } catch {}
  }
  throw new Error("Could not parse JSON. Raw: " + text.slice(0, 200));
}

// ── APP ────────────────────────────────────────────────────────────────────
export default function App() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [prefs, setPrefs] = useState({ cuisines: [], proteins: [], allergies: [], diet: "None", dislikes: "", meals: 3, days: 7 });
  const [macros, setMacros] = useState({ calories: 2000, protein: 150, carbs: 200, fats: 65 });
  const [result, setResult] = useState(null);
  const [activeDay, setActiveDay] = useState(0);
  const [activeTab, setActiveTab] = useState("meals");
  const [loadingMsg, setLoadingMsg] = useState("Building your plan...");
  const [error, setError] = useState(null);

  const toggle = (arr, val) => arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];

  const generate = async () => {
    setStep(2);
    setError(null);
    const msgs = ["Building your meal plan...", "Calculating your macros...", "Writing prep instructions...", "Assembling your shopping list...", "Almost there..."];
    let mi = 0;
    setLoadingMsg(msgs[0]);
    const iv = setInterval(() => { mi = (mi + 1) % msgs.length; setLoadingMsg(msgs[mi]); }, 2200);

    const perMealCalories = Math.round(macros.calories / prefs.meals);
    const perMealProtein  = Math.round(macros.protein  / prefs.meals);
    const perMealCarbs    = Math.round(macros.carbs    / prefs.meals);
    const perMealFats     = Math.round(macros.fats     / prefs.meals);

    const prompt = `You are a professional nutritionist and meal prep coach. Generate a ${prefs.days}-day meal prep plan with exactly ${prefs.meals} meals per day.

CRITICAL MACRO REQUIREMENTS — YOU MUST HIT THESE EXACTLY:
- Daily Calories: ${macros.calories} kcal (EACH day must total ${macros.calories} kcal ± 50 kcal MAX)
- Daily Protein: ${macros.protein}g
- Daily Carbs: ${macros.carbs}g
- Daily Fats: ${macros.fats}g

Each day has ${prefs.meals} meals. Target per meal:
- Calories: ~${perMealCalories} kcal per meal
- Protein: ~${perMealProtein}g per meal
- Carbs: ~${perMealCarbs}g per meal
- Fats: ~${perMealFats}g per meal

BEFORE writing each day's JSON, mentally verify: meal1.calories + meal2.calories + ... = ${macros.calories} kcal.
Use larger portions, calorie-dense ingredients, or add a side to ensure every day hits ${macros.calories} kcal.
DO NOT under-count. If a meal seems low, add olive oil, nuts, avocado, cheese, an extra serving of protein or carbs to hit the number.
The "totals" field for every day MUST show calories close to ${macros.calories}.

Food Preferences:
- Diet: ${prefs.diet}
- Cuisines: ${prefs.cuisines.length ? prefs.cuisines.join(", ") : "Any"}
- Proteins: ${prefs.proteins.length ? prefs.proteins.join(", ") : "Any"}
- Allergies: ${prefs.allergies.length ? prefs.allergies.join(", ") : "None"}
- Avoid: ${prefs.dislikes || "Nothing specific"}

You MUST respond with ONLY a raw JSON object. No markdown. No code fences. No explanation. No text before or after. Start with { and end with }.

Required JSON structure:
{
  "days": [
    {
      "day": "Monday",
      "meals": [
        {
          "name": "Grilled Chicken Bowl",
          "type": "Lunch",
          "calories": 520,
          "protein": 45,
          "carbs": 48,
          "fats": 14,
          "ingredients": ["6oz chicken breast", "1 cup brown rice", "1 cup broccoli", "1 tbsp olive oil"],
          "prepTime": "10 min",
          "cookTime": "20 min"
        }
      ],
      "totals": { "calories": 2010, "protein": 152, "carbs": 198, "fats": 66 }
    }
  ],
  "shoppingList": {
    "Produce": ["Broccoli - 3 heads"],
    "Proteins": ["Chicken breast - 5 lbs"],
    "Grains & Pantry": ["Brown rice - 2 lbs"],
    "Dairy & Eggs": ["Eggs - 1 dozen"],
    "Condiments & Oils": ["Olive oil - 1 bottle"]
  },
  "prepGuide": [
    { "title": "Cook Grains", "duration": "30 min", "instructions": "Cook 4 cups of brown rice in a large pot. While rice cooks, prep vegetables." }
  ],
  "assemblyGuide": [
    {
      "mealName": "Grilled Chicken Bowl",
      "type": "Lunch",
      "servings": "1 serving",
      "time": "2 min",
      "components": ["6oz portioned chicken from fridge", "1 cup cooked brown rice", "1 cup steamed broccoli"],
      "steps": ["Scoop rice into bowl.", "Add portioned chicken on top.", "Add broccoli.", "Drizzle with sauce and serve cold or microwave 90 seconds."],
      "tip": "Tastes great cold — no reheating needed if eating on the go."
    }
  ]
}`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "PLACEHOLDER",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 16000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      clearInterval(iv);
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(`API ${res.status}: ${data.error?.message || JSON.stringify(data)}`);

      const raw = data.content?.find(b => b.type === "text")?.text;
      if (!raw) throw new Error("No text in API response: " + JSON.stringify(data).slice(0, 300));

      const parsed = extractJSON(raw);
      if (!parsed.days || !Array.isArray(parsed.days) || parsed.days.length === 0)
        throw new Error("Response missing days. Got: " + JSON.stringify(parsed).slice(0, 200));

      setResult(parsed);
      setActiveDay(0);
      setActiveTab("meals");
      setStep(3);
    } catch (e) {
      clearInterval(iv);
      setError(e.message);
      setStep(1);
    }
  };

  const macroColor = (val, target) => {
    const r = val / (target || 1);
    if (r < 0.85) return C.blue;
    if (r > 1.15) return C.gold;
    return C.green;
  };

  // ── SHARED STYLES ──
  const card = { background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 10, boxShadow: C.shadow };
  const primaryBtn = { ...os, width: "100%", background: C.accent, color: "#fff", border: "none", borderRadius: 8, padding: "15px 0", fontWeight: "bold", fontSize: 13, cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase", boxShadow: "0 2px 8px rgba(173,46,33,0.30)" };
  const pill = (active) => ({ ...os, padding: "7px 14px", borderRadius: 20, border: `1.5px solid ${active ? C.accent : C.border}`, background: active ? C.accentBg : C.bgCard, color: active ? C.accent : C.charcoal, cursor: "pointer", fontSize: 12, fontWeight: active ? 600 : 400, flexShrink: 0, boxShadow: C.shadow });
  const tab = (active) => ({ ...os, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", padding: "13px 16px", border: "none", borderBottom: `2.5px solid ${active ? C.accent : "transparent"}`, background: "transparent", color: active ? C.accent : C.muted, cursor: "pointer", fontWeight: active ? 600 : 400 });
  const lbl = { ...os, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.25em", color: C.textDim, marginBottom: 10, display: "block" };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Oswald', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body, input, button { font-family: 'Oswald', sans-serif; }
        input[type=number]::-webkit-inner-spin-button { opacity: 0.4; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.borderMid}; border-radius: 2px; }
        @keyframes pulse { 0%,100%{opacity:.2;transform:scale(.7)} 50%{opacity:1;transform:scale(1)} }
        button:active { transform: scale(0.98); }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ background: C.accent, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => navigate("/")} style={{ ...os, background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", borderRadius: 6, padding: "6px 12px", cursor: "pointer", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", flexShrink: 0 }}>← Tools</button>
          <div>
            <div style={{ ...os, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(255,255,255,0.65)" }}>MVMNT | CrossFit Ventura</div>
            <div style={{ ...os, fontSize: 16, fontWeight: "bold", color: "#fff", letterSpacing: "0.04em" }}>Meal Prep Planner</div>
          </div>
        </div>
        {step === 3 && (
          <button onClick={() => { setStep(0); setResult(null); }} style={{ ...os, fontSize: 11, color: "rgba(255,255,255,0.80)", border: "1.5px solid rgba(255,255,255,0.35)", background: "transparent", padding: "6px 14px", borderRadius: 20, cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            ↺ New Plan
          </button>
        )}
      </div>

      {/* ── PROGRESS BAR ── */}
      {step < 3 && (
        <div style={{ height: 4, background: C.border }}>
          <div style={{ height: "100%", width: `${(step / 2) * 100}%`, background: C.accent, transition: "width 0.35s ease" }} />
        </div>
      )}

      {/* ════ STEP 0 — PREFERENCES ════ */}
      {step === 0 && (
        <div style={{ maxWidth: 580, margin: "0 auto", padding: "28px 20px" }}>
          <div style={{ ...os, fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 4 }}>Step 1 of 2</div>
          <div style={{ fontSize: 24, fontWeight: "bold", color: C.text, marginBottom: 4 }}>Your Food Preferences</div>
          <div style={{ fontSize: 14, color: C.textDim, marginBottom: 26 }}>Tell us what you love and what to avoid.</div>

          {/* Dietary Style */}
          <div style={{ marginBottom: 22 }}>
            <span style={lbl}>Dietary Style</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {DIET_OPTIONS.map(d => (
                <Tag key={d} label={d} selected={prefs.diet === d} onClick={() => setPrefs(p => ({ ...p, diet: d }))} />
              ))}
            </div>
          </div>

          {/* Cuisines */}
          <div style={{ marginBottom: 22 }}>
            <span style={lbl}>Favorite Cuisines <span style={{ color: C.muted, fontWeight: 300 }}>(pick any)</span></span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {CUISINE_OPTIONS.map(c => (
                <Tag key={c} label={c} selected={prefs.cuisines.includes(c)} onClick={() => setPrefs(p => ({ ...p, cuisines: toggle(p.cuisines, c) }))} />
              ))}
            </div>
          </div>

          {/* Proteins */}
          <div style={{ marginBottom: 22 }}>
            <span style={lbl}>Preferred Proteins <span style={{ color: C.muted, fontWeight: 300 }}>(pick any)</span></span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {PROTEIN_OPTIONS.map(p => (
                <Tag key={p} label={p} variant="blue" selected={prefs.proteins.includes(p)} onClick={() => setPrefs(pr => ({ ...pr, proteins: toggle(pr.proteins, p) }))} />
              ))}
            </div>
          </div>

          {/* Allergies */}
          <div style={{ marginBottom: 22 }}>
            <span style={lbl}>Allergies & Restrictions</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {ALLERGY_OPTIONS.map(a => (
                <Tag key={a} label={a} variant="danger" selected={prefs.allergies.includes(a)} onClick={() => setPrefs(p => ({ ...p, allergies: toggle(p.allergies, a) }))} />
              ))}
            </div>
          </div>

          {/* Dislikes */}
          <div style={{ marginBottom: 22 }}>
            <span style={lbl}>Foods You Dislike</span>
            <input
              value={prefs.dislikes}
              onChange={e => setPrefs(p => ({ ...p, dislikes: e.target.value }))}
              placeholder="e.g. mushrooms, cilantro, olives..."
              style={{ ...os, width: "100%", background: C.bgCard, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", color: C.text, fontSize: 13, outline: "none", boxShadow: C.shadow }}
            />
          </div>

          {/* Meals & Days */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
            <div>
              <span style={lbl}>Meals per Day</span>
              <div style={{ display: "flex", gap: 6 }}>
                {[2, 3, 4, 5].map(n => (
                  <button key={n} onClick={() => setPrefs(p => ({ ...p, meals: n }))} style={pill(prefs.meals === n)}>{n}</button>
                ))}
              </div>
            </div>
            <div>
              <span style={lbl}>Days to Plan</span>
              <div style={{ display: "flex", gap: 6 }}>
                {[5, 7].map(n => (
                  <button key={n} onClick={() => setPrefs(p => ({ ...p, days: n }))} style={pill(prefs.days === n)}>{n}d</button>
                ))}
              </div>
            </div>
          </div>

          <button onClick={() => setStep(1)} style={primaryBtn}>Set My Macros →</button>
        </div>
      )}

      {/* ════ STEP 1 — MACROS ════ */}
      {step === 1 && (
        <div style={{ maxWidth: 480, margin: "0 auto", padding: "28px 20px" }}>
          <button onClick={() => setStep(0)} style={{ ...os, fontSize: 12, color: C.muted, background: "transparent", border: "none", cursor: "pointer", marginBottom: 20, padding: 0 }}>← Back</button>
          <div style={{ ...os, fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 4 }}>Step 2 of 2</div>
          <div style={{ fontSize: 24, fontWeight: "bold", color: C.text, marginBottom: 4 }}>Your Daily Targets</div>
          <div style={{ fontSize: 14, color: C.textDim, marginBottom: 24 }}>Set your macro goals. We'll hit them every day.</div>

          {error && (
            <div style={{ ...os, fontSize: 12, color: C.accent, background: C.accentBg, border: `1px solid ${C.accent}`, borderRadius: 8, padding: "12px 14px", marginBottom: 16, lineHeight: 1.6, wordBreak: "break-word" }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          <div style={{ ...card, marginBottom: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div style={{ gridColumn: "1/-1" }}>
                <NumInput label="Daily Calories" value={macros.calories} onChange={v => setMacros(m => ({ ...m, calories: v }))} unit="kcal" />
              </div>
              <NumInput label="Protein" value={macros.protein} onChange={v => setMacros(m => ({ ...m, protein: v }))} unit="g" />
              <NumInput label="Carbs" value={macros.carbs} onChange={v => setMacros(m => ({ ...m, carbs: v }))} unit="g" />
              <NumInput label="Fats" value={macros.fats} onChange={v => setMacros(m => ({ ...m, fats: v }))} unit="g" />
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: 4 }}>
                <div style={{ ...os, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: C.muted, marginBottom: 4 }}>From Macros</div>
                <div style={{ ...os, fontSize: 22, fontWeight: "bold", color: C.charcoal }}>{macros.protein * 4 + macros.carbs * 4 + macros.fats * 9} kcal</div>
              </div>
            </div>
            <MacroBar {...macros} />
          </div>

          <div style={{ ...os, fontSize: 12, color: C.warm, marginBottom: 20, lineHeight: 1.7, padding: "10px 14px", background: "#FFFBF2", border: `1px solid #E8D8A8`, borderRadius: 8, borderLeft: `3px solid ${C.gold}` }}>
            The AI will build meals as close to these targets as possible while keeping food varied and enjoyable.
          </div>

          <button onClick={generate} style={primaryBtn}>Generate My Week →</button>
        </div>
      )}

      {/* ════ STEP 2 — LOADING ════ */}
      {step === 2 && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "65vh", padding: 24 }}>
          <div style={{ fontSize: 48, marginBottom: 24 }}>🥩</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: C.accent, animation: `pulse 1.2s ease-in-out ${i * 0.22}s infinite` }} />
            ))}
          </div>
          <div style={{ ...os, color: C.charcoal, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}>{loadingMsg}</div>
          <div style={{ ...os, color: C.muted, fontSize: 12, marginTop: 12, textAlign: "center", lineHeight: 1.8 }}>
            {prefs.days} days × {prefs.meals} meals = {prefs.days * prefs.meals} total meals<br />
            + full shopping list + prep guide
          </div>
        </div>
      )}

      {/* ════ STEP 3 — RESULTS ════ */}
      {step === 3 && result && (
        <div>
          {/* Tab bar */}
          <div style={{ display: "flex", borderBottom: `1px solid ${C.border}`, padding: "0 20px", background: C.bgCard, boxShadow: C.shadow, overflowX: "auto" }}>
            {[["meals", "Meal Plan"], ["shopping", "Shopping List"], ["prep", "Prep Guide"], ["assembly", "Meal Assembly"]].map(([id, lbl]) => (
              <button key={id} onClick={() => setActiveTab(id)} style={tab(activeTab === id)}>{lbl}</button>
            ))}
          </div>

          {/* ── MEAL PLAN TAB ── */}
          {activeTab === "meals" && (
            <div>
              {/* Day selector */}
              <div style={{ display: "flex", gap: 6, padding: "14px 20px", overflowX: "auto", background: C.bgCardAlt, borderBottom: `1px solid ${C.border}` }}>
                {result.days.map((day, i) => {
                  const dayTotal = day.totals?.calories || 0;
                  const isOff = Math.abs(dayTotal - macros.calories) > 100;
                  return (
                    <button key={i} onClick={() => setActiveDay(i)} style={{ ...pill(i === activeDay), position: "relative" }}>
                      {day.day.slice(0, 3).toUpperCase()}
                      {isOff && (
                        <span style={{ position: "absolute", top: -3, right: -3, width: 8, height: 8, borderRadius: "50%", background: C.gold, border: `1.5px solid ${C.bgCardAlt}` }} />
                      )}
                    </button>
                  );
                })}
              </div>

              <div style={{ padding: "16px 20px 40px" }}>
                {/* Daily totals */}
                {result.days[activeDay]?.totals && (() => {
                  const t = result.days[activeDay].totals;
                  const calDiff = t.calories - macros.calories;
                  const isOff = Math.abs(calDiff) > 100;
                  return (
                    <div style={{ background: C.accent, borderRadius: 10, padding: 16, marginBottom: 12, boxShadow: "0 4px 14px rgba(173,46,33,0.20)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <div style={{ ...os, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.70)" }}>
                          {result.days[activeDay].day} — Daily Totals
                        </div>
                        {isOff && (
                          <div style={{ ...os, fontSize: 10, background: "rgba(255,255,255,0.20)", color: "#fff", padding: "2px 10px", borderRadius: 20, letterSpacing: "0.05em" }}>
                            {calDiff > 0 ? `+${calDiff}` : calDiff} kcal vs target
                          </div>
                        )}
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>
                        {[["Cal", t.calories, macros.calories, "kcal"], ["Pro", t.protein, macros.protein, "g"], ["Carb", t.carbs, macros.carbs, "g"], ["Fat", t.fats, macros.fats, "g"]].map(([l, v, tgt, u]) => (
                          <div key={l} style={{ textAlign: "center", padding: "8px 4px", background: "rgba(255,255,255,0.15)", borderRadius: 8 }}>
                            <div style={{ ...os, fontSize: 22, fontWeight: "bold", color: "#fff" }}>{v}</div>
                            <div style={{ ...os, fontSize: 9, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>{l}</div>
                            <div style={{ ...os, fontSize: 9, color: "rgba(255,255,255,0.45)" }}>/{tgt}{u}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Meal cards */}
                {result.days[activeDay]?.meals?.map((meal, mi) => (
                  <div key={mi} style={card}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <div>
                        <span style={{ ...os, fontSize: 10, background: C.accent, color: "#fff", padding: "2px 10px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.1em", display: "inline-block", marginBottom: 6 }}>{meal.type}</span>
                        <div style={{ fontSize: 16, fontWeight: "bold", color: C.text, marginTop: 4 }}>{meal.name}</div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                        <div style={{ ...os, fontSize: 20, fontWeight: "bold", color: C.accent }}>{meal.calories}</div>
                        <div style={{ ...os, fontSize: 10, color: C.muted }}>kcal</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 14, marginBottom: 10, ...os, fontSize: 12 }}>
                      <span style={{ color: C.accent }}>P {meal.protein}g</span>
                      <span style={{ color: C.gold }}>C {meal.carbs}g</span>
                      <span style={{ color: C.blue }}>F {meal.fats}g</span>
                      <span style={{ color: C.muted, marginLeft: "auto" }}>⏱ {meal.prepTime} prep · {meal.cookTime} cook</span>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {meal.ingredients?.map((ing, ii) => (
                        <span key={ii} style={{ ...os, fontSize: 11, background: C.bgCardAlt, border: `1px solid ${C.border}`, color: C.charcoal, padding: "3px 10px", borderRadius: 20 }}>{ing}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SHOPPING LIST TAB ── */}
          {activeTab === "shopping" && result.shoppingList && (
            <div style={{ padding: 20 }}>
              <div style={{ ...os, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: C.muted, marginBottom: 4 }}>Full week · {prefs.days} days · {prefs.days * prefs.meals} meals</div>
              <div style={{ fontSize: 14, color: C.textDim, marginBottom: 18 }}>Everything you need, organized by section.</div>
              {Object.entries(result.shoppingList).map(([cat, items]) =>
                Array.isArray(items) && items.length > 0 && (
                  <div key={cat} style={card}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                      <div style={{ width: 3, height: 18, background: C.accent, borderRadius: 2 }} />
                      <div style={{ ...os, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", color: C.text, fontWeight: "bold" }}>{cat}</div>
                    </div>
                    {items.map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, flexShrink: 0, marginTop: 5 }} />
                        <span style={{ ...os, fontSize: 13, color: C.textMid, lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          )}

          {/* ── PREP GUIDE TAB ── */}
          {activeTab === "prep" && result.prepGuide && (
            <div style={{ padding: 20 }}>
              <div style={{ ...os, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: C.muted, marginBottom: 4 }}>Batch Cooking Guide</div>
              <div style={{ fontSize: 14, color: C.textDim, marginBottom: 18 }}>Follow in order — prep your whole week in one session.</div>
              {result.prepGuide.map((s, i) => (
                <div key={i} style={card}>
                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 6, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", ...os, fontSize: 14, fontWeight: "bold", flexShrink: 0, boxShadow: "0 2px 6px rgba(173,46,33,0.25)" }}>{i + 1}</div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: "bold", color: C.text }}>{s.title}</div>
                      <div style={{ ...os, fontSize: 11, color: C.gold, marginTop: 2 }}>⏱ {s.duration}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.7, paddingLeft: 46 }}>{s.instructions}</div>
                </div>
              ))}
            </div>
          )}

          {/* ── MEAL ASSEMBLY TAB ── */}
          {activeTab === "assembly" && result.assemblyGuide && (
            <div style={{ padding: 20 }}>
              <div style={{ ...os, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: C.muted, marginBottom: 4 }}>Meal Assembly Guide</div>
              <div style={{ fontSize: 14, color: C.textDim, marginBottom: 18 }}>Everything is prepped — here's how to put each meal together in minutes.</div>
              {result.assemblyGuide.map((meal, i) => (
                <div key={i} style={card}>
                  {/* Meal header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div>
                      <span style={{ ...os, fontSize: 10, background: C.accent, color: "#fff", padding: "2px 10px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.1em", display: "inline-block", marginBottom: 6 }}>{meal.type}</span>
                      <div style={{ fontSize: 15, fontWeight: "bold", color: C.text }}>{meal.mealName}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3, flexShrink: 0, marginLeft: 12 }}>
                      <span style={{ ...os, fontSize: 11, color: C.charcoal, background: C.bgCardAlt, border: `1px solid ${C.border}`, padding: "2px 10px", borderRadius: 20 }}>⏱ {meal.time}</span>
                      <span style={{ ...os, fontSize: 10, color: C.muted }}>{meal.servings}</span>
                    </div>
                  </div>

                  {/* Components needed */}
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ ...os, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: C.textDim, marginBottom: 7 }}>Grab from fridge</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {meal.components?.map((comp, ci) => (
                        <span key={ci} style={{ ...os, fontSize: 11, background: "#EEF4FA", border: `1px solid #C0D4E8`, color: C.blue, padding: "3px 10px", borderRadius: 20 }}>{comp}</span>
                      ))}
                    </div>
                  </div>

                  {/* Assembly steps */}
                  <div style={{ marginBottom: meal.tip ? 12 : 0 }}>
                    <div style={{ ...os, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: C.textDim, marginBottom: 8 }}>Assembly Steps</div>
                    {meal.steps?.map((step, si) => (
                      <div key={si} style={{ display: "flex", gap: 10, marginBottom: 7, alignItems: "flex-start" }}>
                        <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.accentBg, border: `1.5px solid ${C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          <span style={{ ...os, fontSize: 9, fontWeight: "bold", color: C.accent }}>{si + 1}</span>
                        </div>
                        <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6 }}>{step}</div>
                      </div>
                    ))}
                  </div>

                  {/* Pro tip */}
                  {meal.tip && (
                    <div style={{ ...os, fontSize: 11, color: C.warm, background: "#FFFBF2", border: `1px solid #E8D8A8`, borderLeft: `3px solid ${C.gold}`, borderRadius: 6, padding: "8px 12px", marginTop: 4 }}>
                      💡 {meal.tip}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Fallback if assemblyGuide missing */}
          {activeTab === "assembly" && !result.assemblyGuide && (
            <div style={{ padding: 40, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🔄</div>
              <div style={{ ...os, fontSize: 13, color: C.muted }}>Assembly guide not available. Try generating a new plan.</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
