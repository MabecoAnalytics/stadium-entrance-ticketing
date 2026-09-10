import { useState } from 'react'
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
} from 'recharts'
import { FileDown, CheckCircle2, Users, Wallet, Receipt, PieChart as PieIcon, TicketX, AlertTriangle } from 'lucide-react'
import HelpButton from '../components/HelpButton.jsx'
import { PAST_EVENT, FULL_EVENT_TIMELINE, formatMTn, formatNumber } from '../data/mockData.js'

const CATEGORY_COLORS = { geral: '#0A7F3C', vip: '#D97706', camarote: '#1E4FA0' }

export default function Report() {
  const [toast, setToast] = useState(false)
  const occupancy = ((PAST_EVENT.sold / PAST_EVENT.capacity) * 100).toFixed(1)
  const netRevenue = PAST_EVENT.grossRevenue / (1 + PAST_EVENT.ivaRate)
  const ivaAmount = PAST_EVENT.grossRevenue - netRevenue

  const handleExport = () => {
    setToast(true)
    setTimeout(() => setToast(false), 3000)
  }

  const pieData = PAST_EVENT.revenueByCategory.map((c) => ({
    ...c,
    pct: ((c.amount / PAST_EVENT.grossRevenue) * 100).toFixed(0),
  }))

  return (
    <div className="max-w-[1200px] mx-auto px-6 pt-10 pb-28">
      <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-cfm-emerald mb-1">
            Relatório Pós-Evento
          </p>
          <h1 className="text-2xl font-bold text-cfm-dark">{PAST_EVENT.name}</h1>
          <p className="text-sm text-cfm-dark/50">
            {PAST_EVENT.dateLabel} · {PAST_EVENT.time} · {PAST_EVENT.stadium}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-cfm-dark/40 uppercase tracking-wide mb-1">Assistência Final</p>
          <p className="text-3xl font-extrabold text-cfm-dark">{formatNumber(PAST_EVENT.attendance)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <SummaryStat icon={Users} label="Total Bilhetes Vendidos" value={formatNumber(PAST_EVENT.sold)} accent="#0A7F3C" />
        <SummaryStat icon={Wallet} label="Receita Bruta" value={formatMTn(PAST_EVENT.grossRevenue)} accent="#2C5F2D" />
        <SummaryStat
          icon={Receipt}
          label="Receita Líquida"
          value={formatMTn(netRevenue)}
          sub={`IVA (16%): ${formatMTn(ivaAmount)}`}
          accent="#1E4FA0"
        />
        <SummaryStat icon={PieIcon} label="Taxa de Ocupação" value={`${occupancy}%`} accent="#71BD43" />
        <SummaryStat icon={TicketX} label="Bilhetes Não Utilizados" value={formatNumber(PAST_EVENT.unused)} accent="#D97706" />
        <SummaryStat icon={AlertTriangle} label="Incidências nas Entradas" value={formatNumber(PAST_EVENT.incidents)} accent="#DC2626" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-black/10 shadow-sm p-5">
          <h3 className="text-sm font-bold text-cfm-dark mb-3">Receita por Categoria</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart margin={{ top: 24, right: 24, bottom: 0, left: 24 }}>
              <Pie
                data={pieData}
                dataKey="amount"
                nameKey="label"
                innerRadius={58}
                outerRadius={84}
                paddingAngle={2}
                label={({ label, pct }) => `${label} ${pct}%`}
                labelLine={false}
              >
                {pieData.map((entry) => (
                  <Cell key={entry.id} fill={CATEGORY_COLORS[entry.id]} stroke="#fff" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => formatMTn(v)} contentStyle={{ borderRadius: 8, border: '1px solid #e7ede9', fontSize: 13 }} />
              <Legend verticalAlign="bottom" height={28} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-black/10 shadow-sm p-5">
          <h3 className="text-sm font-bold text-cfm-dark mb-3">Fluxo de Entradas - Evento Completo</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={FULL_EVENT_TIMELINE} margin={{ top: 8, right: 16, left: -16, bottom: 4 }}>
              <defs>
                <linearGradient id="entriesFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0A7F3C" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#0A7F3C" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#e7ede9" />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#1A3A2A99' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#1A3A2A99' }} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(v) => [formatNumber(v), 'Entradas']}
                labelFormatter={(l) => `Intervalo ${l}`}
                contentStyle={{ borderRadius: 8, border: '1px solid #e7ede9', fontSize: 13 }}
              />
              <Area type="monotone" dataKey="entries" stroke="#0A7F3C" strokeWidth={2.5} fill="url(#entriesFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-black/10 shadow-sm p-5 mb-8 overflow-x-auto">
        <h3 className="text-sm font-bold text-cfm-dark mb-3">Método de Pagamento - Detalhe</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-cfm-dark/40 text-xs uppercase tracking-wide border-b border-black/5">
              <th className="py-2 pr-2 font-semibold">Método</th>
              <th className="py-2 pr-2 font-semibold text-right">Transacções</th>
              <th className="py-2 pr-2 font-semibold text-right">Valor</th>
              <th className="py-2 pl-2 font-semibold text-right">Quota</th>
            </tr>
          </thead>
          <tbody>
            {PAST_EVENT.paymentBreakdown.map((p) => (
              <tr key={p.id} className="border-b border-black/5 last:border-0">
                <td className="py-2.5 pr-2 font-medium text-cfm-dark">{p.label}</td>
                <td className="py-2.5 pr-2 text-right text-cfm-dark/70">{formatNumber(p.count)}</td>
                <td className="py-2.5 pr-2 text-right text-cfm-dark/70">{formatMTn(p.amount)}</td>
                <td className="py-2.5 pl-2 text-right font-semibold text-cfm-dark">{p.pct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cfm-dark text-white font-semibold shadow-sm hover:bg-cfm-mid transition-colors"
        >
          <FileDown size={18} /> Exportar Relatório PDF
        </button>
      </div>

      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-cfm-dark text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-2 text-sm font-medium animate-fade-in z-50">
          <CheckCircle2 size={16} className="text-cfm-success" />
          Relatório gerado com sucesso
        </div>
      )}

      <HelpButton text="Relatório pós-evento: resumo financeiro, receitas por categoria e fluxo de entradas do jogo já concluído." />
    </div>
  )
}

function SummaryStat({ icon: Icon, label, value, sub, accent }) {
  return (
    <div className="bg-white rounded-xl border border-black/10 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accent}1A` }}>
          <Icon size={14} style={{ color: accent }} />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide text-cfm-dark/50">{label}</span>
      </div>
      <p className="text-xl font-extrabold text-cfm-dark">{value}</p>
      {sub && <p className="text-xs text-cfm-dark/40 mt-1">{sub}</p>}
    </div>
  )
}
