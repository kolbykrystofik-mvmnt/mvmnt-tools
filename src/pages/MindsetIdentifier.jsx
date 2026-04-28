import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const C = {
  bg: "#F4F0EA", bgCard: "#FFFFFF", bgAlt: "#F9F6F2",
  border: "#DDD8D0", borderMid: "#C8C2B8",
  accent: "#AD2E21", accentBg: "#FAF0EE",
  charcoal: "#51524B", warm: "#7C6F5E",
  text: "#1A1A1A", textMid: "#3A3A35", textDim: "#7C6F5E", muted: "#A09890",
  shadow: "0 1px 3px rgba(0,0,0,0.08)",
  shadowMd: "0 6px 20px rgba(0,0,0,0.10)",
}

const os = { fontFamily: "'Oswald', sans-serif" }

const TYPES = [
  {
    id: 'perfectionist', name: 'The Perfectionist', icon: '🎯',
    tagline: 'All or nothing, no middle ground',
    desc: "You set incredibly high standards — for yourself and often for others. When you're locked in, you're unstoppable. But when things aren't going perfectly, you can shut down entirely. You'd rather not start than do something halfway. Your standards are a superpower that occasionally becomes your prison.",
    strengths: ['Elite attention to detail', 'High personal standards that drive real results', 'When committed, you go all in'],
    watchouts: ['"One missed day = the whole week is ruined"', 'Paralysis before starting imperfect things', 'Harsh inner critic that drains motivation'],
    reframes: [
      { from: '"If I can\'t do it right, I won\'t do it at all."', to: '"Something is always better than nothing. A 60% effort today keeps the streak alive."' },
      { from: '"I missed yesterday, so this week is already shot."', to: '"Missing once is an accident. Missing twice is a pattern. Get back today."' },
      { from: '"This isn\'t good enough."', to: '"Done and consistent beats perfect and sporadic — every single time."' }
    ]
  },
  {
    id: 'avoider', name: 'The Avoider', icon: '🌀',
    tagline: 'Discomfort is the exit ramp',
    desc: "You're thoughtful, self-aware, and perceptive — and you've gotten very good at knowing when something feels off. The challenge is that 'feels off' sometimes means hard or uncomfortable — not actually wrong. You tend to pull back right before breakthroughs.",
    strengths: ['Strong self-awareness and emotional intelligence', 'Good at protecting your energy', 'Observant — you see things others miss'],
    watchouts: ['Confusing discomfort with danger', 'Quitting right before momentum builds', 'Using "not feeling it" as permission to skip'],
    reframes: [
      { from: '"I don\'t feel like doing this today."', to: '"Feelings follow action, not the other way around. Start for 5 minutes."' },
      { from: '"This doesn\'t feel right."', to: '"Is this actually wrong — or just hard? Hard things are supposed to feel hard."' },
      { from: '"I\'ll wait until I\'m ready."', to: '"Ready is a myth. Repetition creates readiness — not the other way around."' }
    ]
  },
  {
    id: 'allornothing', name: 'The Sprinter', icon: '⚡',
    tagline: 'Massive starts, hard stops',
    desc: "You come out of the gates on fire. When you're motivated, there's no one more locked in. The problem is that this pace isn't sustainable, and when the fire fades, you stop as hard as you started. You've experienced more 'new beginnings' than most people.",
    strengths: ['Explosive motivation and high initial energy', 'Ability to go all-in when inspired', 'Natural leader when locked in'],
    watchouts: ['Unsustainable pace leads to crash-and-burn', 'Waiting for motivation before starting again', 'Confusing intensity with consistency'],
    reframes: [
      { from: '"I need to feel motivated to show up."', to: '"Motivation is fuel — discipline is the engine. Build the engine first."' },
      { from: '"I\'m going to completely overhaul everything starting Monday."', to: '"Pick one thing. Do it every day for 30 days. Then add one more."' },
      { from: '"I\'ve lost my momentum, so I\'m starting over."', to: '"There is no starting over. There\'s only picking back up where you left off."' }
    ]
  },
  {
    id: 'comparer', name: 'The Comparer', icon: '👁️',
    tagline: 'Your yardstick is always someone else',
    desc: "You're competitive, observant, and deeply aware of where you stand relative to others. This makes you excellent at being pushed by the people around you — but your sense of progress is constantly filtered through someone else's lens.",
    strengths: ['High competitive drive', 'Excellent at learning from others', 'Awareness of what elite looks like'],
    watchouts: ['Self-worth tied to relative performance', 'Demotivated when surrounded by high performers', 'Ignoring personal progress because others are "further ahead"'],
    reframes: [
      { from: '"They\'re so much further ahead than me."', to: '"The only race that matters is: am I better than I was last month?"' },
      { from: '"What\'s the point if I\'m not the best?"', to: '"Being better than you were yesterday is the point. That compounds into remarkable."' },
      { from: '"I\'ll never be as good as them."', to: '"You\'re seeing their highlight reel and comparing it to your behind-the-scenes."' }
    ]
  },
  {
    id: 'builder', name: 'The Steady Builder', icon: '🧱',
    tagline: 'Slow, deliberate, and quietly unstoppable',
    desc: "You're the person people underestimate — and then look up one day and can't believe how far you've come. You don't rely on motivation. You show up, do the work, and move on. Your challenge isn't consistency — it's pushing yourself hard enough.",
    strengths: ['Exceptional consistency and follow-through', 'Low drama, high output', 'Not dependent on external motivation or validation'],
    watchouts: ['Comfort can become a plateau', 'May avoid necessary discomfort or big swings', 'Can underestimate themselves — settles rather than stretches'],
    reframes: [
      { from: '"I\'m just doing what I always do."', to: '"Recognize what you\'ve built. Now ask: what would a 10% harder version of this look like?"' },
      { from: '"I don\'t want to rock the boat."', to: '"You\'ve earned the right to take a bigger swing. Comfort is great — growth lives just outside it."' },
      { from: '"I\'m not as exciting or intense as others."', to: '"You will outlast and out-compound nearly everyone around you. Stay the course — and raise the ceiling."' }
    ]
  },
  {
    id: 'seeker', name: 'The Seeker', icon: '🔍',
    tagline: 'Always learning, rarely landing',
    desc: "You're curious, intelligent, and genuinely interested in getting better — you just tend to stay in the research phase longer than necessary. You read the books, watch the content, absorb the frameworks. The missing piece is that knowledge without repetition doesn't create change.",
    strengths: ['Highly curious and open-minded', 'Strong theoretical understanding of health and performance', 'Quickly spots what the best approaches look like'],
    watchouts: ['Analysis paralysis — too much input, not enough output', 'Jumping to the next thing before mastering the last', 'Confusing learning about change with actually changing'],
    reframes: [
      { from: '"I need to find the best approach before I start."', to: '"A good plan executed consistently destroys a perfect plan executed occasionally."' },
      { from: '"I just need to understand this better."', to: '"You already know enough to start. The next level of understanding comes from doing, not reading."' },
      { from: '"There might be a better way I haven\'t found yet."', to: '"The best method is the one you\'ll actually do. Commit to it for 60 days before evaluating."' }
    ]
  }
]

const QUESTIONS = [
  { text: "When I miss a workout or skip a healthy habit, I feel like the whole week is already ruined.", weights: { perfectionist: 3, allornothing: 2 } },
  { text: "I often wait until I feel motivated or 'in the right headspace' before starting something hard.", weights: { avoider: 3, seeker: 1, allornothing: 1 } },
  { text: "I have started major health or fitness overhauls multiple times — and each one eventually faded out.", weights: { allornothing: 3, seeker: 2 } },
  { text: "I catch myself comparing my body, fitness, or progress to other people often.", weights: { comparer: 4 } },
  { text: "I tend to research and plan extensively before committing to a new approach.", weights: { seeker: 4, perfectionist: 1 } },
  { text: "I show up consistently even when I don't feel like it — because I've made a commitment to myself.", weights: { builder: 4, perfectionist: -1, avoider: -2 } },
  { text: "If I can't do something the 'right' way, I'd rather not do it at all.", weights: { perfectionist: 4, avoider: 1 } },
  { text: "When I'm inspired and locked in, I go harder than almost anyone — but that intensity never seems to last.", weights: { allornothing: 4, seeker: 1 } },
  { text: "I feel demotivated when people around me seem more advanced or successful than I am.", weights: { comparer: 4, avoider: 1 } },
  { text: "I've learned a lot about health and fitness but sometimes feel like I'm not applying what I know.", weights: { seeker: 4, avoider: 1 } },
  { text: "I avoid starting things when there's a chance I might not be good at them right away.", weights: { avoider: 3, perfectionist: 2 } },
  { text: "I trust the process even when results are slow, and I don't need big wins to keep going.", weights: { builder: 4, comparer: -2, allornothing: -1 } },
]

const SCALE = ['Strongly\nDisagree', 'Disagree', 'Neutral', 'Agree', 'Strongly\nAgree']

function calcResults(answers) {
  const totals = {}
  TYPES.forEach(t => totals[t.id] = 0)
  QUESTIONS.forEach((q, qi) => {
    const ans = answers[qi]
    if (ans === null) return
    const centered = ans - 3
    Object.entries(q.weights).forEach(([id, w]) => {
      totals[id] = (totals[id] || 0) + centered * w
    })
  })
  const vals = Object.values(totals)
  const minVal = Math.min(...vals)
  Object.keys(totals).forEach(k => totals[k] -= minVal)
  return TYPES.map(t => ({ ...t, score: totals[t.id] })).sort((a, b) => b.score - a.score)
}

export default function MindsetIdentifier() {
  const navigate = useNavigate()
  const [screen, setScreen] = useState('assessment')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState(new Array(QUESTIONS.length).fill(null))
  const [results, setResults] = useState(null)

  const pct = ((current + 1) / QUESTIONS.length) * 100

  const selectAnswer = (val) => {
    const next = [...answers]
    next[current] = val
    setAnswers(next)
  }

  const goNext = () => {
    if (answers[current] === null) return
    if (current < QUESTIONS.length - 1) {
      setCurrent(c => c + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setResults(calcResults(answers))
      setScreen('results')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goBack = () => {
    if (current > 0) setCurrent(c => c - 1)
  }

  const retake = () => {
    setAnswers(new Array(QUESTIONS.length).fill(null))
    setCurrent(0)
    setResults(null)
    setScreen('assessment')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const top = results?.[0]

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Oswald', sans-serif" }}>
      <style>{`
        * { box-sizing: border-box; }
        .scale-btn:hover { border-color: #AD2E21 !important; color: #AD2E21 !important; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(173,46,33,0.15) !important; }
        .scale-btn { transition: all 0.18s ease; }
        .nav-btn:hover { opacity: 0.85; }
        .back-btn:hover { background: #EAE4DB !important; }
      `}</style>

      {/* Header */}
      <div style={{ background: C.accent, padding: "18px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 40, height: 40, background: "rgba(255,255,255,0.20)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🧠</div>
          <div>
            <div style={{ ...os, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.35em", color: "rgba(255,255,255,0.60)" }}>MVMNT | CrossFit Ventura</div>
            <div style={{ ...os, fontSize: 20, fontWeight: "bold", color: "#fff", letterSpacing: "0.03em" }}>Mindset Pattern Identifier</div>
          </div>
        </div>
        <button onClick={() => navigate('/')} style={{ ...os, background: "rgba(255,255,255,0.15)", color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", fontSize: 11, cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          ← Hub
        </button>
      </div>

      {screen === 'assessment' && (
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "32px 20px 80px" }}>

          {/* Progress */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ ...os, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: C.muted }}>Progress</span>
              <span style={{ ...os, fontSize: 13, fontWeight: 700, color: C.accent }}>{current + 1} / {QUESTIONS.length}</span>
            </div>
            <div style={{ height: 2, background: C.border, borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: C.accent, borderRadius: 2, transition: "width 0.4s ease" }} />
            </div>
          </div>

          {/* Question card */}
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: "28px 24px 32px", marginBottom: 16, boxShadow: C.shadowMd }}>
            <div style={{ ...os, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.accent, marginBottom: 10 }}>
              Statement {current + 1} of {QUESTIONS.length}
            </div>
            <div style={{ fontSize: 20, fontWeight: "bold", color: C.text, lineHeight: 1.2, marginBottom: 28, textTransform: "uppercase", letterSpacing: "0.02em" }}>
              "{QUESTIONS[current].text}"
            </div>

            {/* Scale labels */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ ...os, fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>Strongly Disagree</span>
              <span style={{ ...os, fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>Strongly Agree</span>
            </div>

            {/* Scale buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
              {[1, 2, 3, 4, 5].map(val => (
                <div
                  key={val}
                  className="scale-btn"
                  onClick={() => selectAnswer(val)}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                    cursor: "pointer", padding: "14px 6px", borderRadius: 10,
                    border: `1.5px solid ${answers[current] === val ? C.accent : C.border}`,
                    background: answers[current] === val ? "rgba(173,46,33,0.07)" : C.bg,
                    boxShadow: answers[current] === val ? `0 4px 16px rgba(173,46,33,0.15)` : "none",
                  }}
                >
                  <div style={{
                    width: 26, height: 26, borderRadius: "50%",
                    border: `2px solid ${answers[current] === val ? C.accent : C.borderMid}`,
                    background: answers[current] === val ? C.accent : C.bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {answers[current] === val && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#fff" }} />}
                  </div>
                  <div style={{ ...os, fontSize: 9, color: answers[current] === val ? C.accent : C.muted, textAlign: "center", lineHeight: 1.3, textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: answers[current] === val ? 700 : 500 }}>
                    {SCALE[val - 1]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            {current > 0 && (
              <button className="back-btn" onClick={goBack} style={{ ...os, background: C.bgCard, color: C.textDim, border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 24px", fontWeight: 700, fontSize: 13, cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase", transition: "all 0.2s" }}>
                ← Back
              </button>
            )}
            <button
              className="nav-btn"
              onClick={goNext}
              style={{ ...os, flex: 1, background: answers[current] !== null ? C.accent : C.borderMid, color: "#fff", border: "none", borderRadius: 8, padding: "14px 24px", fontWeight: 700, fontSize: 13, cursor: answers[current] !== null ? "pointer" : "default", letterSpacing: "0.08em", textTransform: "uppercase", boxShadow: answers[current] !== null ? `0 2px 12px rgba(173,46,33,0.35)` : "none", transition: "all 0.2s" }}>
              {current === QUESTIONS.length - 1 ? 'See My Results →' : 'Next →'}
            </button>
          </div>
        </div>
      )}

      {screen === 'results' && top && (
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 20px 80px" }}>

          {/* Type hero */}
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 20, padding: "36px 28px", marginBottom: 20, boxShadow: C.shadowMd, textAlign: "center" }}>
            <div style={{ ...os, fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: C.accent, background: "rgba(173,46,33,0.08)", border: "1px solid rgba(173,46,33,0.15)", borderRadius: 20, padding: "5px 14px", display: "inline-block", marginBottom: 18 }}>
              Your Mindset Pattern
            </div>
            <div style={{ fontSize: 52, marginBottom: 12, lineHeight: 1 }}>{top.icon}</div>
            <div style={{ fontSize: 40, fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.02em", color: C.text, lineHeight: 0.95, marginBottom: 6 }}>{top.name}</div>
            <div style={{ ...os, fontSize: 14, fontWeight: 600, color: C.accent, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>{top.tagline}</div>
            <div style={{ fontSize: 14, color: C.textDim, lineHeight: 1.7, textAlign: "left", maxWidth: 480, margin: "0 auto" }}>{top.desc}</div>
          </div>

          {/* Strengths + Watchouts */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px", boxShadow: C.shadow }}>
              <div style={{ ...os, fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#5a8f5a", marginBottom: 12 }}>Your Strengths</div>
              {top.strengths.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 13, color: C.textDim, lineHeight: 1.45, alignItems: "flex-start" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#5a8f5a", flexShrink: 0, marginTop: 5 }} />
                  <span>{s}</span>
                </div>
              ))}
            </div>
            <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px", boxShadow: C.shadow }}>
              <div style={{ ...os, fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.accent, marginBottom: 12 }}>Watch Out For</div>
              {top.watchouts.map((w, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 13, color: C.textDim, lineHeight: 1.45, alignItems: "flex-start" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, flexShrink: 0, marginTop: 5 }} />
                  <span>{w}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reframes */}
          <div style={{ background: C.bgCard, border: `1px solid rgba(173,46,33,0.25)`, borderRadius: 16, padding: "28px 24px", marginBottom: 20, boxShadow: `0 4px 20px rgba(173,46,33,0.07)` }}>
            <div style={{ ...os, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.accent, marginBottom: 6 }}>Your 3 Reframes</div>
            <div style={{ fontSize: 22, fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.04em", color: C.text, marginBottom: 22, lineHeight: 1 }}>Shift How You Think</div>
            {top.reframes.map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 16, paddingTop: 16, paddingBottom: 16, borderBottom: i < top.reframes.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: C.accent, flexShrink: 0, marginTop: 1, width: 24 }}>→</div>
                <div>
                  <div style={{ fontSize: 12, color: C.muted, fontStyle: "italic", marginBottom: 4, textDecoration: "line-through", textDecorationColor: "rgba(173,46,33,0.35)" }}>{r.from}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.text, lineHeight: 1.45 }}>{r.to}</div>
                </div>
              </div>
            ))}
          </div>

          {/* All 6 types */}
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: "20px 20px 12px", marginBottom: 20, boxShadow: C.shadow }}>
            <div style={{ ...os, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted, marginBottom: 14 }}>The 6 Mindset Patterns</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {results.map(t => (
                <div key={t.id} style={{ ...os, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${t.id === top.id ? C.accent : C.border}`, background: t.id === top.id ? "rgba(173,46,33,0.08)" : C.bg, color: t.id === top.id ? C.accent : C.muted }}>
                  {t.icon} {t.name.replace('The ', '')}
                </div>
              ))}
            </div>
          </div>

          {/* Retake */}
          <button onClick={retake} style={{ ...os, width: "100%", background: "none", border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, cursor: "pointer", marginBottom: 8 }}>
            ↺ Retake the Identifier
          </button>

          <div style={{ textAlign: "center", marginTop: 32, paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
            <div style={{ ...os, fontSize: 13, fontWeight: "bold", color: C.charcoal, marginBottom: 4 }}>MVMNT Oxnard · CrossFit Ventura</div>
            <div style={{ ...os, fontSize: 11, color: C.muted }}>Tools built for our community. Free, always.</div>
          </div>
        </div>
      )}
    </div>
  )
}
