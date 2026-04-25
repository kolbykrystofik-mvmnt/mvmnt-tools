import { Routes, Route } from 'react-router-dom'
import Hub from './pages/Hub.jsx'
import MacroCalculator from './pages/MacroCalculator.jsx'
import MealPrepGenerator from './pages/MealPrepGenerator.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Hub />} />
      <Route path="/macros" element={<MacroCalculator />} />
      <Route path="/meal-prep" element={<MealPrepGenerator />} />
    </Routes>
  )
}
