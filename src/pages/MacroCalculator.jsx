import { useState } from "react";

// ── LIGHT BRAND PALETTE ────────────────────────────────────────────────────
const C = {
  bg:         "#F4F0EA",   // cream background
  bgCard:     "#FFFFFF",   // white cards
  bgCardAlt:  "#F9F6F2",   // slightly warm white
  bgSection:  "#EDE9E3",   // section header bg
  border:     "#DDD8D0",   // warm grey border
  borderMid:  "#C8C2B8",   // slightly darker border
  accent:     "#AD2E21",   // brand red
  accentDark: "#8C2419",   // darker red for hover
  accentBg:   "#FAF0EE",   // very light red tint for selected state
  charcoal:   "#51524B",   // brand charcoal
  warm:       "#7C6F5E",   // warm brown
  tan:        "#BFB8A8",   // brand tan
  text:       "#1A1A1A",   // near black
  textMid:    "#3A3A35",   // dark grey text
  textDim:    "#7C6F5E",   // muted warm grey
  muted:      "#A09890",   // light muted
  gold:       "#B8922A",   // darker gold (readable on light)
  green:      "#3A6E2A",   // darker green
  blue:       "#2A5A7A",   // darker blue
  shadow:     "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
  shadowMd:   "0 4px 12px rgba(0,0,0,0.10)",
};

const mono = { fontFamily: "'Oswald', sans-serif" };

const SECTIONS = [
  { id: "basics",    label: "The Basics",       icon: "📏" },
  { id: "body",      label: "Body Composition", icon: "💪" },
  { id: "activity",  label: "Activity Level",   icon: "🏃" },
  { id: "training",  label: "Training",         icon: "🏋️" },
  { id: "goals",     label: "Your Goal",        icon: "🎯" },
  { id: "lifestyle", label: "Lifestyle",        icon: "🌙" },
  { id: "eating",    label: "Eating Habits",    icon: "🍽️" },
  { id: "results",   label: "Your Macros",      icon: "✅" },
];

// ── OPTION BUTTON ─────────────────────────────────────────────────────────
const Opt = ({ label, sublabel, selected, onClick }) => (
  <button onClick={onClick} style={{
    background: selected ? C.accentBg : C.bgCard,
    border: `1.5px solid ${selected ? C.accent : C.border}`,
    borderRadius: 8, padding: "11px 14px", cursor: "pointer",
    textAlign: "left", transition: "all 0.15s", width: "100%",
    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
    boxShadow: selected ? `0 0 0 3px rgba(173,46,33,0.10)` : C.shadow,
  }}>
    <div>
      <div style={{ fontSize: 13, color: selected ? C.accent : C.textMid, fontWeight: selected ? 600 : 400, lineHeight: 1.3 }}>{label}</div>
      {sublabel && <div style={{ ...mono, fontSize: 10, color: selected ? C.warm : C.muted, marginTop: 3 }}>{sublabel}</div>}
    </div>
    <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${selected ? C.accent : C.borderMid}`, background: selected ? C.accent : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
      {selected && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff" }} />}
    </div>
  </button>
);

// ── IMPROVED SLIDER with +/- buttons and visible thumb ────────────────────
const Slider = ({ value, onChange, min, max, step = 1, label, unit }) => {
  const pct = ((value - min) / (max - min)) * 100;
  const dec = () => onChange(Math.max(min, value - step));
  const inc = () => onChange(Math.min(max, value + step));
  return (
    <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 18px", boxShadow: C.shadow }}>
      {/* Label + value */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={{ ...mono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: C.textDim }}>{label}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={dec} style={{ width: 30, height: 30, borderRadius: "50%", border: `1.5px solid ${C.borderMid}`, background: C.bgCardAlt, color: C.charcoal, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1, fontWeight: 300 }}>−</button>
          <span style={{ ...mono, fontSize: 22, fontWeight: "bold", color: C.accent, minWidth: 60, textAlign: "center" }}>{value}<span style={{ fontSize: 11, color: C.muted, marginLeft: 3 }}>{unit}</span></span>
          <button onClick={inc} style={{ width: 30, height: 30, borderRadius: "50%", border: `1.5px solid ${C.borderMid}`, background: C.bgCardAlt, color: C.charcoal, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1, fontWeight: 300 }}>+</button>
        </div>
      </div>
      {/* Track + thumb */}
      <div style={{ position: "relative", height: 28, display: "flex", alignItems: "center" }}>
        {/* Track background */}
        <div style={{ position: "absolute", left: 0, right: 0, height: 6, background: C.border, borderRadius: 3 }}>
          {/* Filled portion */}
          <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${pct}%`, background: C.accent, borderRadius: 3, transition: "width 0.05s" }} />
        </div>
        {/* Native range input (visible and styled) */}
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer", margin: 0, zIndex: 2 }}
        />
        {/* Custom thumb */}
        <div style={{
          position: "absolute",
          left: `calc(${pct}% - 12px)`,
          top: "50%", transform: "translateY(-50%)",
          width: 24, height: 24,
          borderRadius: "50%",
          background: C.accent,
          border: "3px solid #fff",
          boxShadow: "0 2px 6px rgba(173,46,33,0.35)",
          pointerEvents: "none",
          transition: "left 0.05s",
          zIndex: 1,
        }} />
      </div>
      {/* Min/max labels */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, ...mono, fontSize: 9, color: C.muted }}>
        <span>{min}{unit}</span><span>{max}{unit}</span>
      </div>
    </div>
  );
};

// ── NUMBER INPUT ──────────────────────────────────────────────────────────
const NumIn = ({ label, value, onChange, unit }) => (
  <div>
    <div style={{ ...mono, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.2em", color: C.textDim, marginBottom: 6 }}>{label}</div>
    <div style={{ display: "flex", alignItems: "center", background: C.bgCard, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "8px 14px", gap: 6, boxShadow: C.shadow }}>
      <input type="number" value={value} onChange={e => onChange(Number(e.target.value))} min={0}
        style={{ background: "transparent", color: C.accent, fontSize: 24, fontWeight: "bold", width: "100%", outline: "none", border: "none", ...mono }} />
      <span style={{ ...mono, color: C.muted, fontSize: 12 }}>{unit}</span>
    </div>
  </div>
);

// ── MACRO CALCULATIONS ────────────────────────────────────────────────────
function calcMacros(d) {
  const weightKg = d.unit === "imperial" ? d.weight * 0.453592 : d.weight;
  const heightCm = d.unit === "imperial" ? (d.heightFt * 30.48 + d.heightIn * 2.54) : d.heightCm;
  const age = d.age;

  let bmr;
  if (d.sex === "male") {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else if (d.sex === "female") {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  } else {
    const mBmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    const fBmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    bmr = (mBmr + fBmr) / 2;
  }

  if (d.knowsBF && d.bodyFat > 0) {
    const lbm = weightKg * (1 - d.bodyFat / 100);
    const katchBmr = 370 + 21.6 * lbm;
    bmr = bmr * 0.4 + katchBmr * 0.6;
  }

  const activityMap = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, veryActive: 1.9 };
  let tdee = bmr * (activityMap[d.activity] || 1.55);

  const trainingBonus = { 0: 0, 1: 30, 2: 50, 3: 80, 4: 110, 5: 140, 6: 170, 7: 200 };
  tdee += (trainingBonus[d.trainingDays] || 0);
  if (d.trainingIntensity === "high") tdee *= 1.05;
  if (d.trainingIntensity === "low") tdee *= 0.97;
  if (d.sleepQuality === "poor") tdee *= 0.97;
  if (d.stressLevel === "high" || d.stressLevel === "extreme") tdee *= 0.98;

  const goalMap = { aggressive_loss: -750, moderate_loss: -500, mild_loss: -250, maintain: 0, mild_gain: 200, moderate_gain: 350, aggressive_gain: 500 };
  let calories = Math.round(tdee + (goalMap[d.goal] || 0));
  const minCal = d.sex === "female" ? 1200 : 1400;
  calories = Math.max(calories, minCal);

  const weightLb = d.unit === "imperial" ? d.weight : d.weight * 2.20462;

  // ── BUILD PROTEIN MULTIPLIER FROM ALL VARIABLES ──
  let proteinPerLb = 0.75; // conservative evidence-based floor

  // 1. GOAL — deficit needs more protein to preserve muscle
  if (d.goal === "aggressive_loss")  proteinPerLb += 0.30;
  else if (d.goal === "moderate_loss")  proteinPerLb += 0.20;
  else if (d.goal === "mild_loss")      proteinPerLb += 0.10;
  else if (d.goal === "aggressive_gain") proteinPerLb += 0.15;
  else if (d.goal === "moderate_gain")   proteinPerLb += 0.10;
  else if (d.goal === "mild_gain")       proteinPerLb += 0.05;

  // 2. TRAINING TYPE — high-demand training increases muscle protein turnover
  if (d.trainingType === "strength")    proteinPerLb += 0.10;
  else if (d.trainingType === "crossfit")    proteinPerLb += 0.10;
  else if (d.trainingType === "hiit")        proteinPerLb += 0.08;
  else if (d.trainingType === "hypertrophy") proteinPerLb += 0.10;
  else if (d.trainingType === "cardio")      proteinPerLb += 0.05;
  else if (d.trainingType === "sport")       proteinPerLb += 0.07;
  else if (d.trainingType === "mixed")       proteinPerLb += 0.07;

  // 3. TRAINING INTENSITY — harder sessions = more breakdown = more repair needed
  if (d.trainingIntensity === "high")   proteinPerLb += 0.10;
  else if (d.trainingIntensity === "medium") proteinPerLb += 0.05;

  // 4. TRAINING FREQUENCY — more sessions per week = more cumulative demand
  if (d.trainingDays >= 6)      proteinPerLb += 0.10;
  else if (d.trainingDays >= 4) proteinPerLb += 0.05;
  else if (d.trainingDays >= 2) proteinPerLb += 0.02;

  // 5. AGE — anabolic resistance increases with age, older athletes need more protein
  if (d.age >= 50)      proteinPerLb += 0.15;
  else if (d.age >= 40) proteinPerLb += 0.10;

  // 6. BODY TYPE — ectomorphs (hard gainers) benefit from higher protein stimulus
  if (d.bodyType === "ectomorph") proteinPerLb += 0.05;

  // 7. DIET STYLE — enforce floors based on dietary approach
  if (d.dietStyle === "highprot") proteinPerLb = Math.max(proteinPerLb, 1.0);
  else if (d.dietStyle === "keto") proteinPerLb = Math.max(proteinPerLb, 0.8);
  else if (d.dietStyle === "lowcarb") proteinPerLb = Math.max(proteinPerLb, 0.85);

  // Cap at 1.4g/lb — beyond this there's no additional muscle-building benefit
  proteinPerLb = Math.min(proteinPerLb, 1.4);

  // ── APPLY TO LEAN BODY MASS IF BODY FAT IS KNOWN (more accurate) ──
  let protein;
  if (d.knowsBF && d.bodyFat > 0) {
    const lbmLb = weightLb * (1 - d.bodyFat / 100);
    // LBM-based uses a slightly higher multiplier since it's off lean mass not total weight
    const lbmMultiplier = Math.min(proteinPerLb * 1.15, 1.6);
    protein = Math.round(lbmLb * lbmMultiplier);
  } else {
    protein = Math.round(weightLb * proteinPerLb);
  }

  let fatPct = 0.28;
  if (d.dietStyle === "keto") fatPct = 0.70;
  else if (d.dietStyle === "lowfat") fatPct = 0.20;
  else if (d.dietStyle === "highfat") fatPct = 0.40;

  const minFatG = Math.round(weightLb * 0.3);
  let fats = Math.max(Math.round((calories * fatPct) / 9), minFatG);
  let carbs = Math.round((calories - protein * 4 - fats * 9) / 4);
  if (d.dietStyle === "keto") carbs = Math.min(carbs, 30);
  if (carbs < 0) carbs = 0;
  calories = Math.round(protein * 4 + carbs * 4 + fats * 9);

  return { calories, protein, carbs, fats, bmr: Math.round(bmr), tdee: Math.round(tdee), weightLb: Math.round(weightLb) };
}

// ── MAIN ──────────────────────────────────────────────────────────────────
export default function MacroCalc() {
  const [section, setSection] = useState(0);
  const [results, setResults] = useState(null);
  const [d, setD] = useState({
    unit: "imperial", sex: "", age: 30,
    weight: 175, heightFt: 5, heightIn: 10, heightCm: 175,
    knowsBF: false, bodyFat: 20, bodyType: "",
    activity: "", stepsPerDay: "moderate",
    trainingDays: 4, trainingType: "", trainingIntensity: "", trainingDuration: 60,
    goal: "", goalTimeline: "",
    sleepHours: 7, sleepQuality: "", stressLevel: "",
    mealsPerDay: 3, dietStyle: "balanced", eatingWindow: "",
  });

  const set = (k, v) => setD(prev => ({ ...prev, [k]: v }));

  const goNext = () => {
    if (section === SECTIONS.length - 2) setResults(calcMacros(d));
    setSection(s => Math.min(s + 1, SECTIONS.length - 1));
  };
  const goBack = () => setSection(s => Math.max(s - 1, 0));
  const restart = () => { setSection(0); setResults(null); };

  const canProceed = () => {
    if (section === 0) return d.sex !== "" && d.age > 0 && d.weight > 0;
    if (section === 1) return d.bodyType !== "";
    if (section === 2) return d.activity !== "";
    if (section === 3) return d.trainingType !== "" && d.trainingIntensity !== "";
    if (section === 4) return d.goal !== "";
    if (section === 5) return d.sleepQuality !== "" && d.stressLevel !== "";
    if (section === 6) return d.dietStyle !== "" && d.eatingWindow !== "";
    return true;
  };

  const progress = (section / (SECTIONS.length - 1)) * 100;

  const card = { background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 12, boxShadow: C.shadow };
  const primaryBtn = { ...mono, width: "100%", background: C.accent, color: "#fff", border: "none", borderRadius: 8, padding: "15px 0", fontWeight: "bold", fontSize: 12, cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase", boxShadow: "0 2px 8px rgba(173,46,33,0.30)" };
  const q = { ...mono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: C.textDim, marginBottom: 10, display: "block" };

  const bfOptions = d.sex === "female"
    ? [
        ["10", "Athletic — very lean, visible abs (10–15%)"],
        ["18", "Fit — lean and toned (16–20%)"],
        ["25", "Average — some definition (21–28%)"],
        ["33", "Above average — soft midsection (29–37%)"],
        ["40", "High — significant fat storage (38%+)"],
      ]
    : [
        ["7",  "Athletic — very lean, visible abs (6–9%)"],
        ["13", "Fit — lean and defined (10–15%)"],
        ["20", "Average — some definition (16–24%)"],
        ["28", "Above average — soft midsection (25–31%)"],
        ["35", "High — significant fat storage (32%+)"],
      ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Oswald', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body, input, button { font-family: 'Oswald', sans-serif; }
        input[type=range] { -webkit-appearance: none; appearance: none; background: transparent; }
        input[type=number]::-webkit-inner-spin-button { opacity: 0.4; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: ${C.bg}; } ::-webkit-scrollbar-thumb { background: ${C.borderMid}; border-radius: 2px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .fade { animation: fadeUp 0.25s ease forwards; }
        button:active { transform: scale(0.98); }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ background: C.accent, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 34, height: 34, background: "rgba(255,255,255,0.20)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📊</div>
        <div>
          <div style={{ ...mono, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(255,255,255,0.65)" }}>MVMNT | CrossFit Ventura</div>
          <div style={{ fontSize: 16, fontWeight: "bold", color: "#fff", letterSpacing: "0.01em" }}>Macro Calculator</div>
        </div>
      </div>

      {/* ── PROGRESS BAR ── */}
      <div style={{ height: 4, background: C.border }}>
        <div style={{ height: "100%", width: `${progress}%`, background: C.accent, transition: "width 0.4s ease" }} />
      </div>

      {/* ── SECTION NAV ── */}
      <div style={{ display: "flex", gap: 4, padding: "10px 14px", overflowX: "auto", background: C.bgCardAlt, borderBottom: `1px solid ${C.border}` }}>
        {SECTIONS.slice(0, -1).map((s, i) => (
          <button key={s.id} onClick={() => i < section && setSection(i)}
            style={{ ...mono, fontSize: 9, padding: "5px 10px", borderRadius: 20, border: `1.5px solid ${i === section ? C.accent : i < section ? C.borderMid : "transparent"}`, background: i === section ? C.accentBg : i < section ? C.bgCard : "transparent", color: i === section ? C.accent : i < section ? C.charcoal : C.muted, cursor: i < section ? "pointer" : "default", flexShrink: 0, textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: i === section ? 600 : 400 }}>
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 540, margin: "0 auto", padding: "24px 18px 60px" }} className="fade" key={section}>

        {/* ════ SECTION 0: BASICS ════ */}
        {section === 0 && (
          <div>
            <div style={{ ...mono, fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 4 }}>Section 1 of 7</div>
            <div style={{ fontSize: 22, fontWeight: "bold", color: C.text, marginBottom: 4 }}>The Basics</div>
            <div style={{ fontSize: 13, color: C.textDim, marginBottom: 22 }}>Used to calculate your basal metabolic rate with precision.</div>

            <div style={{ marginBottom: 18 }}>
              <span style={q}>Measurement Units</span>
              <div style={{ display: "flex", gap: 8 }}>
                {[["imperial", "Imperial (lbs, ft)"], ["metric", "Metric (kg, cm)"]].map(([v, l]) => (
                  <Opt key={v} label={l} selected={d.unit === v} onClick={() => set("unit", v)} />
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <span style={q}>Biological Sex <span style={{ color: C.muted, fontSize: 9 }}>(affects BMR formula)</span></span>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  ["male",   "Male",                     "Mifflin-St Jeor male formula"],
                  ["female", "Female",                   "Mifflin-St Jeor female formula"],
                  ["other",  "Other / Prefer not to say","We'll average both formulas"],
                ].map(([v, l, s]) => (
                  <Opt key={v} label={l} sublabel={s} selected={d.sex === v} onClick={() => set("sex", v)} />
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <Slider label="Age" value={d.age} onChange={v => set("age", v)} min={16} max={80} unit=" yrs" />
            </div>

            <div style={{ marginBottom: 18 }}>
              <Slider
                label="Current Body Weight"
                value={d.weight}
                onChange={v => set("weight", v)}
                min={d.unit === "imperial" ? 90 : 40}
                max={d.unit === "imperial" ? 400 : 180}
                unit={d.unit === "imperial" ? " lbs" : " kg"}
              />
            </div>

            {d.unit === "imperial" ? (
              <div style={{ marginBottom: 18 }}>
                <span style={q}>Height</span>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <NumIn label="Feet" value={d.heightFt} onChange={v => set("heightFt", v)} unit="ft" />
                  <NumIn label="Inches" value={d.heightIn} onChange={v => set("heightIn", v)} unit="in" />
                </div>
              </div>
            ) : (
              <div style={{ marginBottom: 18 }}>
                <Slider label="Height" value={d.heightCm} onChange={v => set("heightCm", v)} min={140} max={220} unit=" cm" />
              </div>
            )}
          </div>
        )}

        {/* ════ SECTION 1: BODY COMP ════ */}
        {section === 1 && (
          <div>
            <div style={{ ...mono, fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 4 }}>Section 2 of 7</div>
            <div style={{ fontSize: 22, fontWeight: "bold", color: C.text, marginBottom: 4 }}>Body Composition</div>
            <div style={{ fontSize: 13, color: C.textDim, marginBottom: 22 }}>Fine-tunes protein targets using lean body mass — more accurate than weight alone.</div>

            <div style={{ marginBottom: 18 }}>
              <span style={q}>How would you describe your body type?</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  ["ectomorph", "Lean / Hard Gainer",    "Naturally thin, fast metabolism, difficulty adding muscle"],
                  ["mesomorph", "Athletic / Muscular",   "Naturally muscular, responds well to training"],
                  ["endomorph", "Heavier / Easy Gainer", "Tends to store fat more easily, slower metabolism"],
                ].map(([v, l, s]) => (
                  <Opt key={v} label={l} sublabel={s} selected={d.bodyType === v} onClick={() => set("bodyType", v)} />
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <span style={q}>Do you know your body fat percentage?</span>
              <div style={{ display: "flex", gap: 8 }}>
                <Opt label="Yes, I know it" selected={d.knowsBF === true} onClick={() => set("knowsBF", true)} />
                <Opt label="No / Not sure" selected={d.knowsBF === false} onClick={() => set("knowsBF", false)} />
              </div>
            </div>

            {d.knowsBF && (
              <div style={{ marginBottom: 18 }}>
                <Slider label="Body Fat Percentage" value={d.bodyFat} onChange={v => set("bodyFat", v)} min={4} max={50} unit="%" />
                <div style={{ ...mono, fontSize: 10, color: C.warm, marginTop: 10, padding: "10px 14px", background: "#FFF8EC", borderRadius: 8, border: `1px solid #E8D8A8`, borderLeft: `3px solid ${C.gold}` }}>
                  Knowing your BF% lets us calculate protein from lean body mass — significantly more accurate for muscle building and fat loss.
                </div>
              </div>
            )}

            {!d.knowsBF && (
              <div style={{ marginBottom: 18 }}>
                <span style={q}>Estimate your body fat range</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {bfOptions.map(([v, l]) => (
                    <Opt key={v} label={l} selected={d.bodyFat === Number(v)} onClick={() => set("bodyFat", Number(v))} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ════ SECTION 2: ACTIVITY ════ */}
        {section === 2 && (
          <div>
            <div style={{ ...mono, fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 4 }}>Section 3 of 7</div>
            <div style={{ fontSize: 22, fontWeight: "bold", color: C.text, marginBottom: 4 }}>Activity Level</div>
            <div style={{ fontSize: 13, color: C.textDim, marginBottom: 22 }}>Your NEAT — Non-Exercise Activity Thermogenesis. Often underestimated and critically important.</div>

            <div style={{ marginBottom: 18 }}>
              <span style={q}>Outside of workouts, how active is your daily life?</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  ["sedentary",  "Sedentary",          "Desk job, minimal walking, mostly sitting all day"],
                  ["light",      "Lightly Active",     "Some walking, on your feet a few hours"],
                  ["moderate",   "Moderately Active",  "On your feet most of the day — teacher, retail, light labor"],
                  ["active",     "Very Active",        "Physical job — construction, warehouse, on feet 8+ hours"],
                  ["veryActive", "Extremely Active",   "Hard labor, farm work, or multiple physical jobs daily"],
                ].map(([v, l, s]) => (
                  <Opt key={v} label={l} sublabel={s} selected={d.activity === v} onClick={() => set("activity", v)} />
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <span style={q}>Average daily steps</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  ["low",      "Under 5,000 steps",   "Mostly sedentary day"],
                  ["moderate", "5,000–10,000 steps",  "Average active day"],
                  ["high",     "10,000–15,000 steps", "High movement day"],
                  ["veryHigh", "15,000+ steps",        "Very high movement or manual labor"],
                  ["unknown",  "I don't track steps", ""],
                ].map(([v, l, s]) => (
                  <Opt key={v} label={l} sublabel={s || undefined} selected={d.stepsPerDay === v} onClick={() => set("stepsPerDay", v)} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════ SECTION 3: TRAINING ════ */}
        {section === 3 && (
          <div>
            <div style={{ ...mono, fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 4 }}>Section 4 of 7</div>
            <div style={{ fontSize: 22, fontWeight: "bold", color: C.text, marginBottom: 4 }}>Training Details</div>
            <div style={{ fontSize: 13, color: C.textDim, marginBottom: 22 }}>Training type and intensity dramatically shift your calorie and macro needs.</div>

            <div style={{ marginBottom: 18 }}>
              <Slider label="Training Days per Week" value={d.trainingDays} onChange={v => set("trainingDays", v)} min={0} max={7} unit=" days" />
            </div>

            <div style={{ marginBottom: 18 }}>
              <span style={q}>Primary Training Style</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  ["strength",    "Strength / Powerlifting",      "Heavy compound lifts, low reps, long rest periods"],
                  ["crossfit",    "CrossFit / Functional Fitness", "Mixed modal, high intensity, varied movements"],
                  ["hypertrophy", "Bodybuilding / Hypertrophy",   "Moderate weight, higher reps, muscle growth focus"],
                  ["cardio",      "Cardio / Endurance",           "Running, cycling, swimming, aerobic focus"],
                  ["hiit",        "HIIT / Circuit Training",      "High intensity intervals, metabolic conditioning"],
                  ["yoga",        "Yoga / Pilates / Mobility",    "Low intensity, flexibility and recovery focus"],
                  ["sport",       "Sport / Team Sport",           "Basketball, soccer, tennis, recreational sports"],
                  ["mixed",       "Mixed / General Fitness",      "Combination of the above"],
                ].map(([v, l, s]) => (
                  <Opt key={v} label={l} sublabel={s} selected={d.trainingType === v} onClick={() => set("trainingType", v)} />
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <span style={q}>Training Intensity</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  ["low",    "Low",    "Going through the motions, comfortable effort"],
                  ["medium", "Medium", "Challenging but manageable, solid effort most sessions"],
                  ["high",   "High",   "Consistently pushing hard, regularly hitting PRs or max effort"],
                ].map(([v, l, s]) => (
                  <Opt key={v} label={l} sublabel={s} selected={d.trainingIntensity === v} onClick={() => set("trainingIntensity", v)} />
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <Slider label="Average Session Duration" value={d.trainingDuration} onChange={v => set("trainingDuration", v)} min={15} max={180} step={5} unit=" min" />
            </div>
          </div>
        )}

        {/* ════ SECTION 4: GOALS ════ */}
        {section === 4 && (
          <div>
            <div style={{ ...mono, fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 4 }}>Section 5 of 7</div>
            <div style={{ fontSize: 22, fontWeight: "bold", color: C.text, marginBottom: 4 }}>Your Goal</div>
            <div style={{ fontSize: 13, color: C.textDim, marginBottom: 22 }}>This determines the calorie surplus or deficit built into your targets.</div>

            <div style={{ marginBottom: 18 }}>
              <span style={q}>What is your primary goal?</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  ["aggressive_loss", "Aggressive Fat Loss",  "~750 cal deficit — faster results, higher muscle loss risk"],
                  ["moderate_loss",   "Moderate Fat Loss",    "~500 cal deficit — ~1 lb/week, most recommended approach"],
                  ["mild_loss",       "Mild Fat Loss",        "~250 cal deficit — slow cut, great for body recomposition"],
                  ["maintain",        "Maintain Weight",      "Eat at TDEE — improve performance and body composition"],
                  ["mild_gain",       "Lean Bulk",            "~200 cal surplus — slow muscle gain with minimal fat"],
                  ["moderate_gain",   "Moderate Bulk",        "~350 cal surplus — steady muscle building phase"],
                  ["aggressive_gain", "Aggressive Bulk",      "~500+ cal surplus — maximum muscle gain phase"],
                ].map(([v, l, s]) => (
                  <Opt key={v} label={l} sublabel={s} selected={d.goal === v} onClick={() => set("goal", v)} />
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <span style={q}>Timeline for this goal</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  ["short",   "Short term (4–8 weeks)",   "Event, competition, or short-term commitment"],
                  ["medium",  "Medium term (3–6 months)", "Consistent phase, building real progress"],
                  ["long",    "Long term (6+ months)",    "Lifestyle change, building sustainable habits"],
                  ["ongoing", "Ongoing / No deadline",    "Just want to feel and perform my best"],
                ].map(([v, l, s]) => (
                  <Opt key={v} label={l} sublabel={s} selected={d.goalTimeline === v} onClick={() => set("goalTimeline", v)} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════ SECTION 5: LIFESTYLE ════ */}
        {section === 5 && (
          <div>
            <div style={{ ...mono, fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 4 }}>Section 6 of 7</div>
            <div style={{ fontSize: 22, fontWeight: "bold", color: C.text, marginBottom: 4 }}>Lifestyle Factors</div>
            <div style={{ fontSize: 13, color: C.textDim, marginBottom: 22 }}>Sleep and stress directly affect cortisol, metabolism, and body composition. Most calculators ignore these.</div>

            <div style={{ marginBottom: 18 }}>
              <Slider label="Average Hours of Sleep per Night" value={d.sleepHours} onChange={v => set("sleepHours", v)} min={4} max={10} step={0.5} unit=" hrs" />
            </div>

            <div style={{ marginBottom: 18 }}>
              <span style={q}>Sleep quality</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  ["great", "Great", "Fall asleep easily, rarely wake, feel rested every morning"],
                  ["good",  "Good",  "Usually solid sleep with occasional rough nights"],
                  ["fair",  "Fair",  "Inconsistent, sometimes struggle to fall or stay asleep"],
                  ["poor",  "Poor",  "Regularly poor sleep — affects how I feel and function daily"],
                ].map(([v, l, s]) => (
                  <Opt key={v} label={l} sublabel={s} selected={d.sleepQuality === v} onClick={() => set("sleepQuality", v)} />
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <span style={q}>Current stress level</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  ["low",     "Low",     "Feeling calm and in control most of the time"],
                  ["medium",  "Medium",  "Normal life stress, manageable but present"],
                  ["high",    "High",    "Significant stress — work, relationships, or life events"],
                  ["extreme", "Extreme", "Overwhelmed regularly, affects daily function"],
                ].map(([v, l, s]) => (
                  <Opt key={v} label={l} sublabel={s} selected={d.stressLevel === v} onClick={() => set("stressLevel", v)} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════ SECTION 6: EATING ════ */}
        {section === 6 && (
          <div>
            <div style={{ ...mono, fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 4 }}>Section 7 of 7</div>
            <div style={{ fontSize: 22, fontWeight: "bold", color: C.text, marginBottom: 4 }}>Eating Habits</div>
            <div style={{ fontSize: 13, color: C.textDim, marginBottom: 22 }}>How you eat shapes how we distribute your macros across the day.</div>

            <div style={{ marginBottom: 18 }}>
              <span style={q}>Diet style preference</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  ["balanced", "Balanced",          "Mix of proteins, carbs, and fats — no major restrictions"],
                  ["highprot", "High Protein",      "More protein, moderate carbs and fats"],
                  ["lowcarb",  "Lower Carb",        "Reduced carbs, higher fat and protein"],
                  ["keto",     "Ketogenic",         "Very low carb (under 30g), high fat, moderate protein"],
                  ["lowfat",   "Lower Fat",         "Higher carbs, lean proteins, minimal fat"],
                  ["highfat",  "High Fat / Paleo",  "Whole foods, higher fat, moderate protein and carbs"],
                ].map(([v, l, s]) => (
                  <Opt key={v} label={l} sublabel={s} selected={d.dietStyle === v} onClick={() => set("dietStyle", v)} />
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <span style={q}>Meals per day</span>
              <div style={{ display: "flex", gap: 8 }}>
                {[["1–2", 2], ["3", 3], ["4", 4], ["5+", 5]].map(([l, v]) => (
                  <button key={v} onClick={() => set("mealsPerDay", v)} style={{ flex: 1, padding: "11px 0", borderRadius: 8, border: `1.5px solid ${d.mealsPerDay === v ? C.accent : C.border}`, background: d.mealsPerDay === v ? C.accentBg : C.bgCard, color: d.mealsPerDay === v ? C.accent : C.charcoal, cursor: "pointer", fontSize: 14, fontWeight: d.mealsPerDay === v ? 700 : 400, boxShadow: C.shadow }}>
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <span style={q}>Intermittent fasting / eating window</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  ["none", "No — I eat throughout the day", ""],
                  ["16:8", "16:8 — 8-hour eating window",  "e.g. eating 12pm–8pm"],
                  ["18:6", "18:6 — 6-hour eating window",  "e.g. eating 1pm–7pm"],
                  ["20:4", "20:4 — 4-hour eating window",  "More advanced IF approach"],
                  ["omad", "OMAD — One meal per day",       "Extreme, not for everyone"],
                ].map(([v, l, s]) => (
                  <Opt key={v} label={l} sublabel={s || undefined} selected={d.eatingWindow === v} onClick={() => set("eatingWindow", v)} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════ SECTION 7: RESULTS ════ */}
        {section === 7 && results && (
          <div>
            <div style={{ fontSize: 22, fontWeight: "bold", color: C.text, marginBottom: 4 }}>Your Macros</div>
            <div style={{ fontSize: 13, color: C.textDim, marginBottom: 20 }}>
              Calculated using {d.knowsBF ? "lean body mass (Katch-McArdle blend)" : "Mifflin-St Jeor"} — personalized for your body, training, and goal.
            </div>

            {/* Hero calorie card */}
            <div style={{ background: C.accent, borderRadius: 12, padding: 22, marginBottom: 14, boxShadow: "0 4px 16px rgba(173,46,33,0.25)" }}>
              <div style={{ ...mono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>Daily Targets</div>
              <div style={{ textAlign: "center", marginBottom: 18 }}>
                <div style={{ ...mono, fontSize: 56, fontWeight: "bold", color: "#fff", lineHeight: 1 }}>{results.calories}</div>
                <div style={{ ...mono, fontSize: 11, color: "rgba(255,255,255,0.7)", marginTop: 4, letterSpacing: "0.15em" }}>CALORIES / DAY</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                {[["Protein", results.protein, "g"], ["Carbs", results.carbs, "g"], ["Fats", results.fats, "g"]].map(([l, v, u]) => (
                  <div key={l} style={{ textAlign: "center", padding: "12px 6px", background: "rgba(255,255,255,0.15)", borderRadius: 8 }}>
                    <div style={{ ...mono, fontSize: 30, fontWeight: "bold", color: "#fff" }}>{v}</div>
                    <div style={{ ...mono, fontSize: 9, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>{u} · {l}</div>
                  </div>
                ))}
              </div>
              {/* Macro bar */}
              {(() => {
                const total = results.protein * 4 + results.carbs * 4 + results.fats * 9 || 1;
                const pp = Math.round((results.protein * 4 / total) * 100);
                const cp = Math.round((results.carbs * 4 / total) * 100);
                const fp = 100 - pp - cp;
                return (
                  <div style={{ marginTop: 14 }}>
                    <div style={{ display: "flex", gap: 2, height: 5, borderRadius: 3, overflow: "hidden", background: "rgba(255,255,255,0.2)" }}>
                      <div style={{ width: `${pp}%`, background: "rgba(255,255,255,0.9)" }} />
                      <div style={{ width: `${cp}%`, background: "rgba(255,255,255,0.55)" }} />
                      <div style={{ width: `${fp}%`, background: "rgba(255,255,255,0.30)" }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, ...mono, fontSize: 10, color: "rgba(255,255,255,0.70)" }}>
                      <span>Protein {pp}%</span><span>Carbs {cp}%</span><span>Fats {fp}%</span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* How we got here */}
            <div style={card}>
              <div style={{ ...mono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: C.muted, marginBottom: 12 }}>How We Got Here</div>
              {[
                ["Basal Metabolic Rate (BMR)",     `${results.bmr} kcal`,     "Calories burned at complete rest"],
                ["Total Daily Energy Expenditure", `${results.tdee} kcal`,    "BMR + activity + training"],
                ["Goal Adjustment",                `${results.calories - results.tdee >= 0 ? "+" : ""}${results.calories - results.tdee} kcal`, d.goal.includes("loss") ? "Calorie deficit for fat loss" : d.goal === "maintain" ? "Maintenance — no adjustment" : "Calorie surplus for muscle gain"],
                ["Final Target",                   `${results.calories} kcal`, "Your daily calorie goal"],
              ].map(([l, v, s]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                  <div>
                    <div style={{ fontSize: 13, color: C.textMid, fontWeight: 500 }}>{l}</div>
                    <div style={{ ...mono, fontSize: 10, color: C.muted, marginTop: 2 }}>{s}</div>
                  </div>
                  <div style={{ ...mono, fontSize: 14, fontWeight: "bold", color: C.accent, flexShrink: 0, marginLeft: 12 }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Per meal */}
            <div style={card}>
              <div style={{ ...mono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: C.muted, marginBottom: 12 }}>Per Meal Targets ({d.mealsPerDay} meals/day)</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
                {[
                  ["Cal",  Math.round(results.calories / d.mealsPerDay), "kcal", C.text],
                  ["Pro",  Math.round(results.protein  / d.mealsPerDay), "g",    C.accent],
                  ["Carb", Math.round(results.carbs    / d.mealsPerDay), "g",    C.gold],
                  ["Fat",  Math.round(results.fats     / d.mealsPerDay), "g",    C.blue],
                ].map(([l, v, u, clr]) => (
                  <div key={l} style={{ textAlign: "center", padding: "10px 4px", background: C.bgCardAlt, borderRadius: 8, border: `1px solid ${C.border}` }}>
                    <div style={{ ...mono, fontSize: 22, fontWeight: "bold", color: clr }}>{v}</div>
                    <div style={{ ...mono, fontSize: 8, color: C.muted, marginTop: 2 }}>{u} · {l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Personalization notes */}
            {(() => {
              const notes = [
                d.knowsBF ? `Protein calculated from lean body mass (${Math.round(results.weightLb * (1 - d.bodyFat / 100))} lbs LBM) with anabolic resistance factor` : null,
                !d.knowsBF ? `Protein calculated at ~${((results.protein / results.weightLb) * 10 / 10).toFixed(2)}g per lb of bodyweight` : null,
                d.dietStyle === "highprot" ? "High protein diet — minimum 1.0g/lb floor applied" : null,
                d.dietStyle === "keto" ? "Carbs capped at 30g · ketogenic fat distribution applied" : null,
                d.dietStyle === "lowcarb" ? "Low carb — protein minimum 0.85g/lb applied" : null,
                (d.trainingType === "strength" || d.trainingType === "crossfit" || d.trainingType === "hypertrophy") ? `${d.trainingType === "crossfit" ? "CrossFit" : d.trainingType === "strength" ? "Strength" : "Hypertrophy"} training protein premium applied (+0.10g/lb)` : null,
                d.trainingIntensity === "high" ? "High training intensity — additional protein for muscle repair (+0.10g/lb)" : null,
                d.trainingDays >= 6 ? "6–7 training days — high frequency protein bonus applied (+0.10g/lb)" : d.trainingDays >= 4 ? "4–5 training days — moderate frequency protein bonus applied (+0.05g/lb)" : null,
                d.age >= 50 ? "Age 50+ — anabolic resistance adjustment applied, higher protein needed (+0.15g/lb)" : d.age >= 40 ? "Age 40+ — early anabolic resistance adjustment applied (+0.10g/lb)" : null,
                d.bodyType === "ectomorph" ? "Ectomorph body type — higher protein stimulus applied (+0.05g/lb)" : null,
                d.goal.includes("loss") ? `${d.goal === "aggressive_loss" ? "Aggressive" : d.goal === "moderate_loss" ? "Moderate" : "Mild"} deficit — protein elevated to preserve lean muscle mass` : null,
                (d.goal === "aggressive_gain" || d.goal === "moderate_gain") ? "Muscle gain goal — protein surplus applied to support hypertrophy" : null,
                d.sleepQuality === "poor" ? "Poor sleep — metabolic efficiency reduced slightly" : null,
                (d.stressLevel === "high" || d.stressLevel === "extreme") ? "High stress — cortisol adjustment applied to TDEE" : null,
                (d.eatingWindow && d.eatingWindow !== "none") ? `IF protocol (${d.eatingWindow}) — distribute across ${d.mealsPerDay} meals within your eating window` : null,
              ].filter(Boolean);
              return notes.length > 0 ? (
                <div style={{ ...card, borderLeft: `3px solid ${C.gold}`, background: "#FFFBF2" }}>
                  <div style={{ ...mono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: C.gold, marginBottom: 10 }}>Personalization Notes</div>
                  {notes.map((note, i) => (
                    <div key={i} style={{ fontSize: 12, color: C.warm, lineHeight: 1.6, marginBottom: 5, display: "flex", gap: 6 }}>
                      <span style={{ color: C.gold, flexShrink: 0 }}>✓</span>{note}
                    </div>
                  ))}
                </div>
              ) : null;
            })()}

            <div style={{ ...mono, fontSize: 10, color: C.muted, lineHeight: 1.7, padding: "12px 14px", background: C.bgCardAlt, borderRadius: 8, border: `1px solid ${C.border}`, marginBottom: 16 }}>
              These are evidence-based estimates. Adjust by ±100–200 kcal based on real-world results after 2–3 weeks. Track consistently and reassess monthly as your weight and activity change.
            </div>

            <button onClick={restart} style={{ ...primaryBtn, background: "transparent", border: `1.5px solid ${C.borderMid}`, color: C.charcoal, boxShadow: "none" }}>
              ↺ Start Over
            </button>
          </div>
        )}

        {/* ── NAVIGATION ── */}
        {section < 7 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24 }}>
            <button onClick={goNext} disabled={!canProceed()}
              style={{ ...primaryBtn, opacity: canProceed() ? 1 : 0.35, cursor: canProceed() ? "pointer" : "not-allowed" }}>
              {section === SECTIONS.length - 2 ? "Calculate My Macros →" : "Continue →"}
            </button>
            {section > 0 && (
              <button onClick={goBack} style={{ background: "transparent", border: "none", color: C.muted, cursor: "pointer", fontSize: 12, padding: "8px 0", ...mono }}>
                ← Back
              </button>
            )}
            {!canProceed() && (
              <div style={{ ...mono, fontSize: 10, color: C.warm, textAlign: "center" }}>Complete all questions above to continue</div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
