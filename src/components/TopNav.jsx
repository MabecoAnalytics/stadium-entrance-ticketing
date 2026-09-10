import { Link, useLocation } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'
import CFMBadge from './CFMBadge.jsx'

const LINKS = [
  { to: '/', label: 'Início' },
  { to: '/compra', label: 'Compra de Bilhete' },
  { to: '/gate', label: 'Validação na Entrada' },
  { to: '/admin', label: 'Painel Administrativo' },
  { to: '/relatorio', label: 'Relatório de Evento' },
]

export default function TopNav() {
  const location = useLocation()

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-black/5 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-6 py-3 flex items-center justify-between gap-6">
        <Link to="/">
          <CFMBadge />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 bg-cfm-bg rounded-full p-1">
          {LINKS.map((link) => {
            const active = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  active
                    ? 'bg-cfm-emerald text-white shadow-sm'
                    : 'text-cfm-dark/70 hover:text-cfm-dark hover:bg-white'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 bg-amber-50 border border-amber-300 text-cfm-amber px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap">
          <AlertTriangle size={14} />
          Demo - Não para uso operacional
        </div>
      </div>
    </header>
  )
}
