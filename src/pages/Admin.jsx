import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, Cell,
  LineChart, Line, ResponsiveContainer,
} from 'recharts'
import { Ticket, Wallet, PieChart as PieIcon, ShieldCheck, ChevronDown } from 'lucide-react'
import HelpButton from '../components/HelpButton.jsx'
import KpiCard from '../components/KpiCard.jsx'
import {
  EVENTS, ADMIN_KPIS, SALES_BY_PAYMENT_METHOD, ENTRIES_TIMELINE,
  GATES, RECENT_TRANSACTIONS, formatMTn, formatNumber,
} from '../data/mockData.js'

export default function Admin() {
  const [eventId, setEventId] = useState(EVENTS[0].id)
  const event = EVENTS.find((e) => e.id === eventId)
  const occupancy = ((event.sold / event.capacity) * 100).toFixed(1)

  return (
    <div className="max-w-[1400px] mx-auto px-6 pt-10 pb-28">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-cfm-dark">Painel Administrativo</h1>
          <p className="text-sm text-cfm-dark/50">Visão geral de vendas, ocupação e acessos.</p>
        </div>
        <div className="relative">
          <select
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            className="appearance-none bg-white border border-black/10 rounded-lg pl-4 pr-10 py-2.5 text-sm font-medium text-cfm-dark shadow-sm focus:outline-none focus:ring-2 focus:ring-cfm-emerald/40 cursor-pointer"
          >
            {EVENTS.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name} — {e.dateLabel}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-cfm-dark/40 pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard
          label="Bilhetes Vendidos"
          value={`${formatNumber(event.sold)} / ${formatNumber(event.capacity)}`}
          sub={`${occupancy}% da capacidade`}
          progress={Number(occupancy)}
          icon={Ticket}
          accent="#0A7F3C"
        />
        <KpiCard
          label="Receita Total"
          value={formatMTn(event.revenue)}
          sub="Acumulado até ao momento"
          icon={Wallet}
          accent="#2C5F2D"
        />
        <KpiCard
          label="Taxa de Ocupação"
          value={`${occupancy}%`}
          sub={`${formatNumber(event.capacity - event.sold)} lugares disponíveis`}
          icon={PieIcon}
          accent="#71BD43"
        />
        <KpiCard
          label="Entradas Validadas"
          value={formatNumber(ADMIN_KPIS.validatedEntries)}
          sub="Confirmadas nas portas de acesso"
          icon={ShieldCheck}
          accent="#1E4FA0"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Vendas por Método de Pagamento">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={SALES_BY_PAYMENT_METHOD}
              layout="vertical"
              margin={{ top: 4, right: 32, left: 8, bottom: 4 }}
              barCategoryGap={22}
            >
              <CartesianGrid horizontal={false} stroke="#e7ede9" />
              <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12, fill: '#1A3A2A99' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="label" width={70} tick={{ fontSize: 13, fill: '#1A3A2A', fontWeight: 600 }} axisLine={false} tickLine={false} />
              <Tooltip
                cursor={{ fill: 'rgba(45,138,94,0.06)' }}
                formatter={(v) => [`${v}%`, 'Quota']}
                contentStyle={{ borderRadius: 8, border: '1px solid #e7ede9', fontSize: 13 }}
              />
              <Bar dataKey="pct" radius={[0, 4, 4, 0]} maxBarSize={28}>
                {SALES_BY_PAYMENT_METHOD.map((entry) => (
                  <Cell key={entry.id} fill={entry.color} />
                ))}
                <LabelList dataKey="pct" position="right" formatter={(v) => `${v}%`} style={{ fill: '#1A3A2A', fontWeight: 700, fontSize: 12 }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Entradas por Intervalo (17:00 – 19:30)">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={ENTRIES_TIMELINE} margin={{ top: 8, right: 16, left: -16, bottom: 4 }}>
              <CartesianGrid vertical={false} stroke="#e7ede9" />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#1A3A2A99' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#1A3A2A99' }} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(v) => [formatNumber(v), 'Entradas']}
                labelFormatter={(l) => `Intervalo ${l}`}
                contentStyle={{ borderRadius: 8, border: '1px solid #e7ede9', fontSize: 13 }}
              />
              <Line type="monotone" dataKey="entries" stroke="#0A7F3C" strokeWidth={2.5} dot={{ r: 3, fill: '#0A7F3C' }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TableCard title="Actividade das Portas">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-cfm-dark/40 text-xs uppercase tracking-wide border-b border-black/5">
                <th className="py-2 pr-2 font-semibold">Porta</th>
                <th className="py-2 pr-2 font-semibold text-right">Válidas</th>
                <th className="py-2 pr-2 font-semibold text-right">Inválidas</th>
                <th className="py-2 pl-2 font-semibold text-right">Estado</th>
              </tr>
            </thead>
            <tbody>
              {GATES.map((g) => (
                <tr key={g.id} className="border-b border-black/5 last:border-0">
                  <td className="py-2.5 pr-2 font-medium text-cfm-dark">{g.label}</td>
                  <td className="py-2.5 pr-2 text-right text-cfm-dark/70">{formatNumber(g.validated)}</td>
                  <td className="py-2.5 pr-2 text-right text-cfm-dark/70">{formatNumber(g.invalid)}</td>
                  <td className="py-2.5 pl-2 text-right">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        g.status === 'Activa'
                          ? 'bg-green-50 text-cfm-success'
                          : 'bg-amber-50 text-cfm-amber'
                      }`}
                    >
                      {g.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>

        <TableCard title="Transacções Recentes">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-cfm-dark/40 text-xs uppercase tracking-wide border-b border-black/5">
                <th className="py-2 pr-2 font-semibold">Cliente</th>
                <th className="py-2 pr-2 font-semibold">Método</th>
                <th className="py-2 pr-2 font-semibold text-right">Valor</th>
                <th className="py-2 pl-2 font-semibold text-right">Hora</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_TRANSACTIONS.map((t) => (
                <tr key={t.id} className="border-b border-black/5 last:border-0">
                  <td className="py-2.5 pr-2 font-medium text-cfm-dark">{t.name}</td>
                  <td className="py-2.5 pr-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: t.methodColor }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: t.methodColor }} />
                      {t.method}
                    </span>
                  </td>
                  <td className="py-2.5 pr-2 text-right text-cfm-dark/70">{formatMTn(t.amount)}</td>
                  <td className="py-2.5 pl-2 text-right text-cfm-dark/50">{t.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>
      </div>

      <HelpButton text="Painel administrativo: vendas, ocupação, receitas e actividade das portas para o evento seleccionado." />
    </div>
  )
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white rounded-xl border border-black/10 shadow-sm p-5">
      <h3 className="text-sm font-bold text-cfm-dark mb-3">{title}</h3>
      {children}
    </div>
  )
}

function TableCard({ title, children }) {
  return (
    <div className="bg-white rounded-xl border border-black/10 shadow-sm p-5 overflow-x-auto">
      <h3 className="text-sm font-bold text-cfm-dark mb-3">{title}</h3>
      {children}
    </div>
  )
}
