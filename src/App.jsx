import { Routes, Route } from 'react-router-dom'
import TopNav from './components/TopNav.jsx'
import Hub from './pages/Hub.jsx'
import Purchase from './pages/Purchase.jsx'
import Gate from './pages/Gate.jsx'
import Admin from './pages/Admin.jsx'
import Report from './pages/Report.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-cfm-bg">
      <TopNav />
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/compra" element={<Purchase />} />
        <Route path="/gate" element={<Gate />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/relatorio" element={<Report />} />
      </Routes>
    </div>
  )
}
