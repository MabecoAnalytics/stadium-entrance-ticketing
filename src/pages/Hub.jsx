import { Link } from 'react-router-dom'
import { Ticket, ScanLine, LayoutDashboard, FileBarChart, ArrowRight } from 'lucide-react'
import HelpButton from '../components/HelpButton.jsx'

const CARDS = [
  {
    to: '/compra',
    icon: Ticket,
    title: 'Compra de Bilhete',
    description: 'Fluxo do cliente: escolha do evento, dados pessoais, pagamento móvel e emissão do bilhete digital.',
    accent: 'from-cfm-emerald to-cfm-mid',
  },
  {
    to: '/gate',
    icon: ScanLine,
    title: 'Validação na Entrada',
    description: 'Vista do operador de porta: leitura de QR code, validação em tempo real e estatísticas da entrada.',
    accent: 'from-cfm-mid to-cfm-dark',
  },
  {
    to: '/admin',
    icon: LayoutDashboard,
    title: 'Painel Administrativo',
    description: 'Vendas, ocupação, receitas, métodos de pagamento e actividade das portas em tempo real.',
    accent: 'from-cfm-dark to-cfm-mid',
  },
  {
    to: '/relatorio',
    icon: FileBarChart,
    title: 'Relatório de Evento',
    description: 'Resumo pós-jogo: assistência final, receitas líquidas, incidências e exportação do relatório.',
    accent: 'from-cfm-emerald to-cfm-light',
  },
]

export default function Hub() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 pt-14 pb-28">
      <div className="text-center mb-14 animate-fade-in">
        <p className="uppercase tracking-widest text-xs font-bold text-cfm-emerald mb-3">
          Demonstração interactiva
        </p>
        <h1 className="text-4xl font-extrabold text-cfm-dark mb-4">
          Sistema de Gestão de Entradas — CFM
        </h1>
        <p className="text-cfm-dark/60 max-w-2xl mx-auto text-base">
          Bilhética digital e controlo de acessos para o Estádio da Machava. Seleccione uma secção
          abaixo para explorar o fluxo completo, do cliente à gestão administrativa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CARDS.map(({ to, icon: Icon, title, description, accent }) => (
          <Link
            key={to}
            to={to}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 p-8 border border-black/5 hover:-translate-y-1"
          >
            <div
              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center mb-6 shadow-sm`}
            >
              <Icon size={26} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-cfm-dark mb-2">{title}</h2>
            <p className="text-sm text-cfm-dark/60 leading-relaxed mb-6">{description}</p>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-cfm-emerald">
              Explorar
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-14 text-center text-xs text-cfm-dark/40">
        Estádio da Machava · Maputo, Moçambique — demonstração com dados fictícios
      </div>

      <HelpButton text="Esta é a página inicial da demonstração. Escolha uma das quatro secções para explorar cada fluxo do sistema." />
    </div>
  )
}
