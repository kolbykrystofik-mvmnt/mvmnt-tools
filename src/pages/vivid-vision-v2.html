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
const lora = { fontFamily: "'Lora', serif" }

// ── SECTION DEFINITIONS ──
const SECTIONS = [
  {
    id: 'setup', chapter: 'Before We Begin', title: 'Your Vision, Your Horizon',
    desc: "A Vivid Vision is written in present tense — as if you are already living it. It's not a wish list. It's a declaration of the life you are building.",
    questions: [
      { id: 'name', label: 'Your Name', prompt: "What's your first name?", hint: 'This vision belongs to you.', type: 'text', placeholder: 'Your first name' },
      { id: 'horizon', label: 'Time Horizon', prompt: 'How far into the future?', hint: 'Cameron Herold recommends 3 years.', type: 'chips', options: ['1 year', '3 years', '5 years'] },
      { id: 'setup_word', label: 'One Word', prompt: 'If your future life had one word, what would it be?', hint: "Not what you think it should be. What it actually feels like.", type: 'text', placeholder: 'e.g. Alive. Whole. Free. Unstoppable.' },
      { id: 'setup_feeling', label: 'The Feeling', prompt: 'How do you feel when you wake up in this future life?', hint: "Write in present tense, as if it's already real.", type: 'textarea', placeholder: 'I wake up feeling...' },
      { id: 'setup_change', label: 'The Biggest Shift', prompt: 'What is the single biggest thing that has changed from where you are today?', hint: 'The one change that makes everything else possible.', type: 'textarea', placeholder: 'The biggest change is...' },
    ]
  },
  {
    id: 'health', chapter: 'Chapter 1 · Health & Body', title: 'Your Body. Your Energy.',
    desc: 'Your body is the vehicle for everything else. Describe it with honesty and ambition.',
    questions: [
      { id: 'body_looks', label: 'Physical Appearance', prompt: 'What does your body look like?', hint: 'Be specific and honest. This is your vision — claim it.', type: 'textarea', placeholder: 'My body is strong and...' },
      { id: 'body_feels', label: 'How It Feels', prompt: 'How does your body feel day to day?', hint: 'Pain-free? Energized? Capable? Describe the sensation.', type: 'textarea', placeholder: 'Every day I feel...' },
      { id: 'body_trains', label: 'Your Training', prompt: 'How do you train and move your body?', hint: 'Frequency, intensity, what you love doing.', type: 'textarea', placeholder: 'I train four days a week...' },
      { id: 'body_eats', label: 'How You Fuel', prompt: 'How do you eat and fuel your body?', hint: 'Not a diet plan — how a healthy version of you eats.', type: 'textarea', placeholder: 'I eat with intention...' },
      { id: 'body_energy', label: 'Your Energy', prompt: 'What is your energy like throughout the day?', hint: 'When do you peak? What does sustained energy feel like?', type: 'textarea', placeholder: 'My energy is...' },
    ]
  },
  {
    id: 'family', chapter: 'Chapter 2 · Family & Relationships', title: 'The People You Love.',
    desc: 'The richest life is built in relationship. Who are you to the people who matter most?',
    questions: [
      { id: 'fam_partner', label: 'Your Partner / Closest Relationship', prompt: 'What does this relationship look like?', hint: "If this doesn't apply, describe your closest bond.", type: 'textarea', placeholder: 'My relationship is...' },
      { id: 'fam_kids', label: 'Your Kids / Family', prompt: 'What kind of parent or family member are you?', hint: 'How do your people experience you? What do you model?', type: 'textarea', placeholder: 'As a parent / family member, I...' },
      { id: 'fam_friends', label: 'Your Community', prompt: 'Who are the people around you?', hint: 'Quality of friendships, community, how connected you feel.', type: 'textarea', placeholder: 'My community is...' },
      { id: 'fam_presence', label: 'Being Present', prompt: 'How present are you with the people you love?', hint: 'Not just physically — mentally and emotionally there.', type: 'textarea', placeholder: "When I'm with the people I love, I..." },
    ]
  },
  {
    id: 'career', chapter: 'Chapter 3 · Career & Purpose', title: 'The Work That Matters.',
    desc: "Work isn't just how you make money — it's how you make meaning.",
    questions: [
      { id: 'car_role', label: 'What You Do', prompt: 'What is your role or business?', hint: 'Paint the picture. Size, team, what a typical week involves.', type: 'textarea', placeholder: 'I run / lead / build...' },
      { id: 'car_impact', label: 'The Impact', prompt: 'Who do you serve, and what changes for them?', hint: 'Get specific. How many people? What shifts in their lives?', type: 'textarea', placeholder: 'My work changes lives by...' },
      { id: 'car_day', label: 'A Great Day', prompt: 'What does a great workday look like?', hint: "Where are you? Who are you with? What are you solving?", type: 'textarea', placeholder: 'A great workday starts with...' },
      { id: 'car_proud', label: "What You've Built", prompt: "What have you built that you're deeply proud of?", hint: "Don't be modest. This is your vision — claim it.", type: 'textarea', placeholder: 'I am most proud of...' },
    ]
  },
  {
    id: 'money', chapter: 'Chapter 4 · Money & Finances', title: 'Financial Freedom.',
    desc: 'Money is not the goal — but freedom is. Describe what financial health looks and feels like.',
    questions: [
      { id: 'mon_income', label: 'Your Income', prompt: 'What does your income look like?', hint: 'Be specific. Multiple streams? One focused business?', type: 'textarea', placeholder: 'My income comes from...' },
      { id: 'mon_freedom', label: 'Financial Freedom', prompt: 'What does financial freedom feel like for you?', hint: "Not a number — a feeling. What does having enough enable?", type: 'textarea', placeholder: 'Financial freedom means I...' },
      { id: 'mon_gives', label: 'How You Give', prompt: 'How do you use your resources to give back?', hint: 'Generosity is part of financial health.', type: 'textarea', placeholder: 'I use my resources to...' },
      { id: 'mon_security', label: 'Peace with Money', prompt: 'How do you feel about money — emotionally?', hint: 'Describe the emotional relationship you have with finances.', type: 'textarea', placeholder: 'When it comes to money, I feel...' },
    ]
  },
  {
    id: 'daily', chapter: 'Chapter 5 · Daily Life', title: 'How You Actually Live.',
    desc: 'The quality of your life is the quality of your average day.',
    questions: [
      { id: 'day_morning', label: 'Your Morning', prompt: 'Describe your ideal morning routine.', hint: 'What time? What do you do first? How do you set the day?', type: 'textarea', placeholder: 'I wake at 5:30am and...' },
      { id: 'day_home', label: 'Your Home & Environment', prompt: 'Describe where you live and work.', hint: "Where? What does it look like? How does it make you feel?", type: 'textarea', placeholder: 'I live in...' },
      { id: 'day_schedule', label: 'Your Week', prompt: 'What does a typical week look like?', hint: 'Work, family, training, rest — how is it structured?', type: 'textarea', placeholder: 'My week is structured around...' },
      { id: 'day_joy', label: 'Daily Joy', prompt: 'What small daily things bring you genuine joy?', hint: 'The rituals, the routines, the little things that make life rich.', type: 'textarea', placeholder: 'What brings me joy is...' },
    ]
  },
  {
    id: 'growth', chapter: 'Chapter 6 · Growth & Legacy', title: 'Who You Are Becoming.',
    desc: 'The person who lives your Vivid Vision is not who you are today. Describe who they are.',
    questions: [
      { id: 'grow_reading', label: 'How You Learn', prompt: 'How do you invest in your own growth?', hint: 'Reading, mentors, experiences — how do you keep getting better?', type: 'textarea', placeholder: 'I invest in my growth by...' },
      { id: 'grow_challenge', label: 'How You Handle Hard Things', prompt: 'How do you respond to adversity?', hint: 'Your future self has a different relationship with difficulty.', type: 'textarea', placeholder: 'When things get hard, I...' },
      { id: 'grow_identity', label: 'Who You Are', prompt: 'How do you describe yourself — your character?', hint: 'Not your job title. Who are you as a person?', type: 'textarea', placeholder: 'I am someone who...' },
      { id: 'grow_legacy', label: 'The Mark You Leave', prompt: 'What do you want people to say about you?', hint: 'What do people say about you at dinner in this future life?', type: 'textarea', placeholder: 'The people in my life know me as...' },
    ]
  },
]

const SECTION_SPECS = [
  { key: 'intro',   label: 'Opening narrative' },
  { key: 'health',  label: 'Health & Body' },
  { key: 'family',  label: 'Family & Relationships' },
  { key: 'career',  label: 'Career & Purpose' },
  { key: 'money',   label: 'Money & Finances' },
  { key: 'daily',   label: 'Daily Life' },
  { key: 'growth',  label: 'Growth & Legacy' },
]

const CHAPTERS = [
  { key: 'health',  icon: '⚡', chapter: 'Chapter 1', title: 'Health & Body' },
  { key: 'family',  icon: '🤝', chapter: 'Chapter 2', title: 'Family & Relationships' },
  { key: 'career',  icon: '🔥', chapter: 'Chapter 3', title: 'Career & Purpose' },
  { key: 'money',   icon: '💰', chapter: 'Chapter 4', title: 'Money & Finances' },
  { key: 'daily',   icon: '🌿', chapter: 'Chapter 5', title: 'Daily Life' },
  { key: 'growth',  icon: '🧠', chapter: 'Chapter 6', title: 'Growth & Legacy' },
]

function buildPrompt(key, data) {
  const name = data.name || 'this person'
  const horizon = data.horizon || '3 years'
  const yr = data.horizonYear || String(new Date().getFullYear() + 3)

  const prompts = {
    intro: `You are writing the opening narrative of a personal "Vivid Vision" document for ${name}.
Their answers:
- How they feel waking up: "${data.setup_feeling}"
- The biggest shift in their life: "${data.setup_change}"
- One word for their future life: "${data.setup_word}"
- Time horizon: ${horizon} from now (the year ${yr})
Write 2-3 powerful, emotionally resonant paragraphs in present tense as if it's already ${yr}. Write in first person ("I"). Use their exact words woven naturally into the narrative. Make it something they'd want to read every morning. Specific, vivid, deeply personal. No bullet points or headers — flowing prose only.`,

    health: `You are writing the "Health & Body" chapter of a personal Vivid Vision for ${name} set in ${yr}.
Their answers — Body looks: "${data.body_looks}" · Feels: "${data.body_feels}" · Training: "${data.body_trains}" · Nutrition: "${data.body_eats}" · Energy: "${data.body_energy}"
Write 2-3 paragraphs in present tense, first person ("I"). Weave their answers into vivid prose. Don't repeat answers back — interpret, elevate, connect the dots between their physical life and how it makes them feel. No bullet points or headers.`,

    family: `You are writing the "Family & Relationships" chapter of a personal Vivid Vision for ${name} set in ${yr}.
Their answers — Partner: "${data.fam_partner}" · Parent/family: "${data.fam_kids}" · Community: "${data.fam_friends}" · Presence: "${data.fam_presence}"
Write 2-3 paragraphs in present tense, first person ("I"). Make it emotional and personal — the feeling of being deeply connected, present, and loved. No bullet points or headers.`,

    career: `You are writing the "Career & Purpose" chapter of a personal Vivid Vision for ${name} set in ${yr}.
Their answers — Role: "${data.car_role}" · Impact: "${data.car_impact}" · Great day: "${data.car_day}" · Proud of: "${data.car_proud}"
Write 2-3 paragraphs in present tense, first person ("I"). Make the work sound like a calling, not a job description. Capture what they do and why it matters. No bullet points or headers.`,

    money: `You are writing the "Money & Finances" chapter of a personal Vivid Vision for ${name} set in ${yr}.
Their answers — Income: "${data.mon_income}" · Freedom: "${data.mon_freedom}" · Gives: "${data.mon_gives}" · Emotional relationship: "${data.mon_security}"
Write 2 paragraphs in present tense, first person ("I"). Capture the feeling of security, freedom, and generosity. Connect money to the deeper things it enables. No bullet points or headers.`,

    daily: `You are writing the "Daily Life" chapter of a personal Vivid Vision for ${name} set in ${yr}.
Their answers — Morning: "${data.day_morning}" · Home: "${data.day_home}" · Week: "${data.day_schedule}" · Joy: "${data.day_joy}"
Write 2-3 paragraphs in present tense, first person ("I"). Capture the texture and rhythm of their life — the small moments, the rituals. Make the ordinary feel extraordinary because it's the life they designed. No bullet points or headers.`,

    growth: `You are writing the "Growth & Legacy" chapter of a personal Vivid Vision for ${name} set in ${yr}.
Their answers — Growth: "${data.grow_reading}" · Adversity: "${data.grow_challenge}" · Identity: "${data.grow_identity}" · Legacy: "${data.grow_legacy}"
Write 2-3 paragraphs in present tense, first person ("I"). This is the deepest chapter — about who they truly are, not what they do. Capture their character, resilience, and the legacy they're quietly building. End with something powerful. No bullet points or headers.`,
  }
  return prompts[key]
}

// ── MAIN COMPONENT ──
export default function VividVision() {
  const navigate = useNavigate()

  const [screen, setScreen] = useState('landing') // landing | builder | generating | results
  const [currentSection, setCurrentSection] = useState(0)
  const [data, setData] = useState({
    name: '', horizon: '', horizonYear: '',
    setup_word: '', setup_feeling: '', setup_change: '',
    body_looks: '', body_feels: '', body_trains: '', body_eats: '', body_energy: '',
    fam_partner: '', fam_kids: '', fam_friends: '', fam_presence: '',
    car_role: '', car_impact: '', car_day: '', car_proud: '',
    mon_income: '', mon_freedom: '', mon_gives: '', mon_security: '',
    day_morning: '', day_home: '', day_schedule: '', day_joy: '',
    grow_reading: '', grow_challenge: '', grow_identity: '', grow_legacy: '',
  })
  const [generated, setGenerated] = useState({})
  const [genStep, setGenStep] = useState(0)
  const [toast, setToast] = useState('')

  const set = (field, val) => setData(d => ({ ...d, [field]: val }))

  const horizonYear = data.horizonYear || String(new Date().getFullYear() + 3)

  // ── GENERATING ──
  async function startGenerating() {
    setScreen('generating')
    setGenStep(0)
    const result = {}
    for (let i = 0; i < SECTION_SPECS.length; i++) {
      setGenStep(i)
      const key = SECTION_SPECS[i].key
      try {
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            messages: [{ role: 'user', content: buildPrompt(key, data) }]
          })
        })
        const json = await res.json()
        result[key] = json.content?.find(b => b.type === 'text')?.text?.trim() || ''
      } catch {
        result[key] = 'Could not generate this section. Please try again.'
      }
    }
    setGenerated(result)
    setScreen('results')
  }

  // ── COPY ──
  function copyVision() {
    const clean = t => (t || '').replace(/<[^>]*>/g, '').trim()
    const yr = horizonYear
    let text = `══════════════════════════════════════\nVIVID VISION — ${(data.name || 'MY').toUpperCase()}\nWritten: ${new Date().getFullYear()} · Living It: ${yr}\nOne Word: ${data.setup_word || ''}\n══════════════════════════════════════\n\nTHE VISION\n\n${clean(generated['intro'])}\n\n`
    CHAPTERS.forEach(c => {
      text += `──────────────────────────────────────\n${c.title.toUpperCase()}\n──────────────────────────────────────\n\n${clean(generated[c.key])}\n\n`
    })
    text += `══════════════════════════════════════\nThis is not a dream. This is a direction.\nRead it daily. Let it pull you forward.\n\nMVMNT Oxnard · CrossFit Ventura\n══════════════════════════════════════`
    navigator.clipboard.writeText(text).then(() => showToast('Vision copied ✓'))
  }

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2800)
  }

  function startOver() {
    setData({ name: '', horizon: '', horizonYear: '', setup_word: '', setup_feeling: '', setup_change: '', body_looks: '', body_feels: '', body_trains: '', body_eats: '', body_energy: '', fam_partner: '', fam_kids: '', fam_friends: '', fam_presence: '', car_role: '', car_impact: '', car_day: '', car_proud: '', mon_income: '', mon_freedom: '', mon_gives: '', mon_security: '', day_morning: '', day_home: '', day_schedule: '', day_joy: '', grow_reading: '', grow_challenge: '', grow_identity: '', grow_legacy: '' })
    setGenerated({})
    setCurrentSection(0)
    setScreen('landing')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const fmt = text => {
    if (!text) return <p style={{ color: C.muted }}>—</p>
    return text.split('\n\n').filter(p => p.trim()).map((p, i) => (
      <p key={i} style={{ marginBottom: 14, lineHeight: 1.85, ...lora, fontSize: 16, color: C.textDim }}>{p.trim()}</p>
    ))
  }

  // ── SHARED HEADER ──
  const Header = () => (
    <div style={{ background: C.accent, padding: "18px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 40, height: 40, background: "rgba(255,255,255,0.20)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🔥</div>
        <div>
          <div style={{ ...os, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.35em", color: "rgba(255,255,255,0.60)" }}>MVMNT | CrossFit Ventura</div>
          <div style={{ ...os, fontSize: 20, fontWeight: "bold", color: "#fff", letterSpacing: "0.03em" }}>Vivid Vision</div>
        </div>
      </div>
      <button onClick={() => navigate('/')} style={{ ...os, background: "rgba(255,255,255,0.15)", color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", fontSize: 11, cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        ← Hub
      </button>
    </div>
  )

  // ══════════════ LANDING ══════════════
  if (screen === 'landing') return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Oswald', sans-serif" }}>
      <style>{`
        * { box-sizing: border-box; }
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;1,400;1,600&display=swap');
        .start-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .start-btn { transition: all 0.2s; }
      `}</style>

      <Header />

      {/* Hero */}
      <div style={{ background: "#1A1A1A", padding: "52px 28px 48px", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ ...lora, fontStyle: "italic", fontSize: 15, color: "#9A9890", marginBottom: 16 }}>A tool for the life you're building toward</div>
          <div style={{ fontSize: 52, fontWeight: "bold", color: "#fff", lineHeight: 0.9, marginBottom: 20, letterSpacing: "-0.01em" }}>
            VIVID<br /><span style={{ color: C.accent }}>VISION</span>
          </div>
          <div style={{ ...lora, fontSize: 15, color: "#9A9890", lineHeight: 1.75, maxWidth: 440, margin: "0 auto 32px" }}>
            Most people live by default — reacting, adjusting, hoping things improve. <strong style={{ color: "#C8C2B8" }}>A Vivid Vision changes that.</strong> Answer honestly. Your vision will be written for you in present tense, as if you're already living it.
          </div>
          <button
            className="start-btn"
            onClick={() => setScreen('builder')}
            style={{ ...os, background: C.accent, color: "#fff", border: "none", borderRadius: 10, padding: "16px 44px", fontWeight: "bold", fontSize: 14, cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase", boxShadow: `0 4px 20px ${C.accent}60` }}
          >
            Begin Your Vision →
          </button>
          <div style={{ ...lora, fontStyle: "italic", fontSize: 12, color: "#6A6460", marginTop: 14 }}>Takes about 15–20 minutes. Your answers will be shaped into your vision.</div>
        </div>
      </div>

      {/* Info cards */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "36px 20px 60px" }}>
        <div style={{ ...os, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.25em", color: C.muted, marginBottom: 20 }}>Inspired by Cameron Herold's Vivid Vision Framework</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 32 }}>
          {[
            { icon: "✍️", label: "7 Life Areas", desc: "Health, family, career, money, daily life, and growth" },
            { icon: "🤖", label: "AI-Written", desc: "Claude reads your answers and writes your vision for you" },
            { icon: "📋", label: "Copy & Keep", desc: "Export your full vision to read every morning" },
          ].map(card => (
            <div key={card.label} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 16px", textAlign: "center", boxShadow: C.shadow }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ ...os, fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 4 }}>{card.label}</div>
              <div style={{ ...os, fontSize: 11, color: C.muted, lineHeight: 1.5 }}>{card.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
          <div style={{ ...os, fontSize: 13, fontWeight: "bold", color: C.charcoal, marginBottom: 4 }}>MVMNT Oxnard · CrossFit Ventura</div>
          <div style={{ ...os, fontSize: 11, color: C.muted }}>Tools built for our community. Free, always.</div>
        </div>
      </div>
    </div>
  )

  // ══════════════ BUILDER ══════════════
  if (screen === 'builder') {
    const sec = SECTIONS[currentSection]
    const pct = Math.round((currentSection / SECTIONS.length) * 100)

    const handleNext = () => {
      if (currentSection < SECTIONS.length - 1) {
        setCurrentSection(c => c + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        startGenerating()
      }
    }

    const handleBack = () => {
      if (currentSection > 0) {
        setCurrentSection(c => c - 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    return (
      <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Oswald', sans-serif" }}>
        <style>{`
          * { box-sizing: border-box; }
          @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;1,400;1,600&display=swap');
          textarea:focus, input:focus { outline: none; border-color: ${C.accent} !important; box-shadow: 0 0 0 3px ${C.accent}18 !important; }
          .chip-opt:hover { border-color: ${C.accent} !important; color: ${C.accent} !important; }
          .nav-btn:hover { opacity: 0.85; }
          .back-btn:hover { background: ${C.bgAlt} !important; }
        `}</style>

        <Header />

        {/* Sticky progress bar */}
        <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(244,240,234,0.96)", backdropFilter: "blur(8px)", borderBottom: `1px solid ${C.border}`, padding: "10px 24px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ ...os, fontSize: 11, color: C.muted, whiteSpace: "nowrap", textTransform: "uppercase", letterSpacing: "0.1em" }}>{sec.chapter}</div>
            <div style={{ flex: 1, height: 2, background: C.border, borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: C.accent, borderRadius: 2, transition: "width 0.5s ease" }} />
            </div>
            <div style={{ ...os, fontSize: 11, color: C.accent, fontWeight: 700, whiteSpace: "nowrap" }}>{pct}%</div>
          </div>
        </div>

        {/* Section dots */}
        <div style={{ display: "flex", gap: 6, justifyContent: "center", padding: "20px 0 28px" }}>
          {SECTIONS.map((_, i) => (
            <div key={i} style={{ height: 6, borderRadius: 3, background: i === currentSection ? C.accent : i < currentSection ? C.charcoal : C.border, width: i === currentSection ? 20 : 6, transition: "all 0.3s" }} />
          ))}
        </div>

        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px 80px" }}>
          {/* Section intro */}
          <div style={{ paddingBottom: 32, borderBottom: `1px solid ${C.border}`, marginBottom: 32 }}>
            <div style={{ ...os, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.28em", color: C.accent, marginBottom: 10, display: "flex", alignItems: "center", gap: 10 }}>
              {sec.chapter}
              <span style={{ flex: 1, height: 1, background: `${C.accent}30`, display: "block" }} />
            </div>
            <div style={{ fontSize: 32, fontWeight: "bold", color: C.text, lineHeight: 1.05, marginBottom: 10 }}>{sec.title}</div>
            <div style={{ ...lora, fontStyle: "italic", fontSize: 14, color: C.textDim, lineHeight: 1.7 }}>{sec.desc}</div>
          </div>

          {/* Questions */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 36 }}>
            {sec.questions.map(q => (
              <div key={q.id} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: "22px 22px 24px", boxShadow: C.shadow }}>
                <div style={{ ...os, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: C.accent, marginBottom: 6 }}>{q.label}</div>
                <div style={{ fontSize: 18, fontWeight: "bold", color: C.text, lineHeight: 1.15, marginBottom: 6 }}>{q.prompt}</div>
                <div style={{ ...lora, fontStyle: "italic", fontSize: 13, color: C.textDim, lineHeight: 1.6, marginBottom: 14 }}>{q.hint}</div>

                {q.type === 'text' && (
                  <input
                    type="text"
                    placeholder={q.placeholder}
                    value={data[q.id] || ''}
                    onChange={e => set(q.id, e.target.value)}
                    style={{ width: "100%", background: C.bg, border: `1px solid ${C.borderMid}`, borderRadius: 8, padding: "12px 14px", fontFamily: "'Oswald', sans-serif", fontSize: 14, color: C.text, transition: "border-color 0.2s" }}
                  />
                )}

                {q.type === 'textarea' && (
                  <textarea
                    placeholder={q.placeholder}
                    value={data[q.id] || ''}
                    onChange={e => set(q.id, e.target.value)}
                    rows={3}
                    style={{ width: "100%", background: C.bg, border: `1px solid ${C.borderMid}`, borderRadius: 8, padding: "12px 14px", fontFamily: "'Oswald', sans-serif", fontSize: 14, color: C.text, resize: "none", lineHeight: 1.6, transition: "border-color 0.2s" }}
                  />
                )}

                {q.type === 'chips' && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {q.options.map(opt => (
                      <div
                        key={opt}
                        className="chip-opt"
                        onClick={() => {
                          set(q.id, opt)
                          if (q.id === 'horizon') {
                            set('horizonYear', String(new Date().getFullYear() + parseInt(opt)))
                          }
                        }}
                        style={{ ...os, fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "10px 18px", borderRadius: 8, border: `1.5px solid ${data[q.id] === opt ? C.accent : C.border}`, background: data[q.id] === opt ? `${C.accent}12` : C.bg, color: data[q.id] === opt ? C.accent : C.textDim, cursor: "pointer", transition: "all 0.15s" }}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Nav buttons */}
          <div style={{ display: "flex", gap: 12 }}>
            {currentSection > 0 && (
              <button className="back-btn" onClick={handleBack} style={{ ...os, background: C.bgCard, color: C.textDim, border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 24px", fontWeight: 700, fontSize: 13, cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase", transition: "all 0.2s" }}>
                ← Back
              </button>
            )}
            <button className="nav-btn" onClick={handleNext} style={{ ...os, flex: 1, background: C.accent, color: "#fff", border: "none", borderRadius: 8, padding: "14px 24px", fontWeight: 700, fontSize: 13, cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase", boxShadow: `0 2px 12px ${C.accent}40`, transition: "opacity 0.2s" }}>
              {currentSection === SECTIONS.length - 1 ? 'Generate My Vision →' : 'Continue →'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ══════════════ GENERATING ══════════════
  if (screen === 'generating') return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "40px 24px", fontFamily: "'Oswald', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@1,400&display=swap'); @keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div style={{ ...os, fontSize: 11, letterSpacing: "0.3em", color: C.accent, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 10, marginBottom: 48 }}>
        <span style={{ height: 1, width: 32, background: C.accent, opacity: 0.4, display: "block" }} />
        MVMNT
        <span style={{ height: 1, width: 32, background: C.accent, opacity: 0.4, display: "block" }} />
      </div>

      <div style={{ width: 52, height: 52, borderRadius: "50%", border: `2px solid ${C.border}`, borderTopColor: C.accent, animation: "spin 1s linear infinite", marginBottom: 28 }} />

      <div style={{ fontSize: 36, fontWeight: "bold", color: C.text, marginBottom: 12 }}>Writing Your Vision</div>
      <div style={{ ...lora, fontStyle: "italic", fontSize: 15, color: C.textDim, maxWidth: 360, lineHeight: 1.7, marginBottom: 40 }}>
        Your answers are being shaped into something worth reading every morning.
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 300 }}>
        {SECTION_SPECS.map((s, i) => (
          <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 12, opacity: i <= genStep ? 1 : 0.35, transition: "opacity 0.4s" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: i < genStep ? C.charcoal : i === genStep ? C.accent : C.border, boxShadow: i === genStep ? `0 0 8px ${C.accent}60` : "none", transition: "all 0.4s", flexShrink: 0 }} />
            <div style={{ ...os, fontSize: 13, color: i === genStep ? C.text : C.textDim }}>{s.label}</div>
            {i < genStep && <div style={{ ...os, fontSize: 11, color: C.muted, marginLeft: "auto" }}>✓</div>}
          </div>
        ))}
      </div>
    </div>
  )

  // ══════════════ RESULTS ══════════════
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Oswald', sans-serif" }}>
      <style>{`
        * { box-sizing: border-box; }
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;1,400;1,600&display=swap');
        .act-btn:hover { opacity: 0.85; }
      `}</style>

      {/* Sticky results nav */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(244,240,234,0.96)", backdropFilter: "blur(8px)", borderBottom: `1px solid ${C.border}`, padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ ...os, fontSize: 13, fontWeight: 700, letterSpacing: "0.22em", color: C.accent, textTransform: "uppercase" }}>MVMNT</div>
        <div style={{ ...os, fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.14em" }}>Your Vivid Vision</div>
        <button onClick={copyVision} style={{ ...os, background: C.accent, color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", fontSize: 11, cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          📋 Copy Vision
        </button>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px 100px" }}>

        {/* Cover */}
        <div style={{ padding: "60px 0 48px", textAlign: "center", borderBottom: `1px solid ${C.border}`, marginBottom: 52 }}>
          <div style={{ ...lora, fontStyle: "italic", fontSize: 15, color: C.textDim, marginBottom: 16 }}>A declaration of the life being built by</div>
          <div style={{ fontSize: 72, fontWeight: "bold", color: C.text, lineHeight: 0.9, textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: 8 }}>{(data.name || 'YOU').toUpperCase()}</div>
          <div style={{ ...os, fontSize: 12, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: C.accent, marginBottom: 28 }}>Vivid Vision · MVMNT</div>
          <div style={{ display: "inline-flex", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
            {[
              { label: "Written in", val: String(new Date().getFullYear()), red: false },
              { label: "Living it in", val: horizonYear, red: true },
              { label: "One word", val: data.setup_word || "—", red: false },
              { label: "Horizon", val: data.horizon || "3 years", red: false },
            ].map((m, i, arr) => (
              <div key={m.label} style={{ padding: "14px 22px", textAlign: "center", borderRight: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ ...os, fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: C.muted, marginBottom: 4 }}>{m.label}</div>
                <div style={{ ...os, fontSize: 18, fontWeight: 900, color: m.red ? C.accent : C.text, textTransform: "uppercase" }}>{m.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Narrative card */}
        <div style={{ background: "#1A1A1A", borderRadius: 20, padding: "40px 36px", marginBottom: 44, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 95% 5%, rgba(173,46,33,0.28) 0%, transparent 55%)", pointerEvents: "none" }} />
          <div style={{ ...lora, fontSize: 80, color: "rgba(173,46,33,0.18)", lineHeight: 0.7, marginBottom: 16, display: "block", position: "relative", zIndex: 1 }}>"</div>
          <div style={{ ...os, fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 18, position: "relative", zIndex: 1 }}>
            The Vision · {horizonYear} · Written in Present Tense
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            {(generated['intro'] || '').split('\n\n').filter(p => p.trim()).map((p, i) => (
              <p key={i} style={{ ...lora, fontStyle: "italic", fontSize: 18, color: "rgba(255,255,255,0.88)", lineHeight: 1.8, marginBottom: 16 }}>{p.trim()}</p>
            ))}
          </div>
          <div style={{ ...os, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginTop: 24, position: "relative", zIndex: 1 }}>
            — {(data.name || 'YOU').toUpperCase()} · {horizonYear}
          </div>
        </div>

        {/* Chapters */}
        {CHAPTERS.map(c => (
          <div key={c.key} style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 14, marginBottom: 18, paddingBottom: 14, borderBottom: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 30, lineHeight: 1 }}>{c.icon}</div>
              <div>
                <div style={{ ...os, fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: C.accent, marginBottom: 4 }}>{c.chapter}</div>
                <div style={{ fontSize: 32, fontWeight: "bold", color: C.text, lineHeight: 0.95, textTransform: "uppercase" }}>{c.title}</div>
              </div>
            </div>
            <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: "26px 28px", boxShadow: C.shadow, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: C.accent, opacity: 0.5 }} />
              {fmt(generated[c.key])}
            </div>
          </div>
        ))}

        {/* Closing */}
        <div style={{ background: C.accent, borderRadius: 20, padding: "40px 32px", textAlign: "center", marginBottom: 24, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
          <div style={{ ...os, fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 14, position: "relative", zIndex: 1 }}>Read This Daily</div>
          <div style={{ fontSize: 28, fontWeight: "bold", color: "#fff", lineHeight: 1.2, marginBottom: 16, position: "relative", zIndex: 1 }}>THIS IS NOT A DREAM.<br />THIS IS A DIRECTION.</div>
          <div style={{ ...lora, fontStyle: "italic", fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.65, maxWidth: 420, margin: "0 auto", position: "relative", zIndex: 1 }}>
            Your mind moves toward what it can clearly see. Read this every morning. Let it pull you forward. The person who wrote this already knows the way.
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <button className="act-btn" onClick={copyVision} style={{ ...os, flex: 1, background: C.accent, color: "#fff", border: "none", borderRadius: 8, padding: "14px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase", transition: "opacity 0.2s" }}>
            📋 Copy Full Vision
          </button>
          <button className="act-btn" onClick={startOver} style={{ ...os, flex: 1, background: C.bgCard, color: C.textDim, border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase", transition: "opacity 0.2s" }}>
            ↺ Start Over
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: 40, paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
          <div style={{ ...os, fontSize: 13, fontWeight: "bold", color: C.charcoal, marginBottom: 4 }}>MVMNT Oxnard · CrossFit Ventura</div>
          <div style={{ ...os, fontSize: 11, color: C.muted }}>Tools built for our community. Free, always.</div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", background: C.text, color: C.bg, ...os, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "11px 24px", borderRadius: 20, zIndex: 999 }}>
          {toast}
        </div>
      )}
    </div>
  )
}
