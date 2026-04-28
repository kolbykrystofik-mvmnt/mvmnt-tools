import { Routes, Route } from 'react-router-dom'
import Hub from './pages/Hub.jsx'
import MacroCalculator from './pages/MacroCalculator.jsx'
import MealPrepGenerator from './pages/MealPrepGenerator.jsx'
import VividVision from './pages/VividVision.jsx'
import LifeScoreAudit from './pages/LifeScoreAudit.jsx'
import MindsetIdentifier from './pages/MindsetIdentifier.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Hub />} />
      <Route path="/macros" element={<MacroCalculator />} />
      <Route path="/meal-prep" element={<MealPrepGenerator />} />
      <Route path="/vivid-vision" element={<VividVision />} />
      <Route path="/life-score" element={<LifeScoreAudit />} />
      <Route path="/mindset" element={<MindsetIdentifier />} />

      {/* ── ADD NEW TOOLS HERE ──
      <Route path="/new-tool" element={<NewTool />} />
      */}
    </Routes>
  )
}
