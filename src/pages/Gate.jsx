import { useEffect, useRef, useState } from 'react'
import { ScanLine, CheckCircle2, XCircle, Clock, Activity } from 'lucide-react'
import HelpButton from '../components/HelpButton.jsx'
import { SCAN_VALID_SAMPLES, INVALID_SCAN_REASONS } from '../data/mockData.js'

const GATE_LABEL = 'Entrada Norte - Porta 3'

export default function Gate() {
  const [result, setResult] = useState(null) // { type: 'valid'|'invalid', ...details }
  const [stats, setStats] = useState({ scans: 0, valid: 0, invalid: 0, lastScan: null })
  const resetTimer = useRef(null)

  useEffect(() => () => clearTimeout(resetTimer.current), [])

  const runScan = (isValid) => {
    if (result) return // ignore while a result is showing
    const now = new Date()
    const timeLabel = now.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

    if (isValid) {
      const sample = SCAN_VALID_SAMPLES[Math.floor(Math.random() * SCAN_VALID_SAMPLES.length)]
      setResult({ type: 'valid', ...sample, time: timeLabel })
    } else {
      const reason = INVALID_SCAN_REASONS[Math.floor(Math.random() * INVALID_SCAN_REASONS.length)]
      setResult({ type: 'invalid', reason, time: timeLabel })
    }

    setStats((s) => ({
      scans: s.scans + 1,
      valid: s.valid + (isValid ? 1 : 0),
      invalid: s.invalid + (isValid ? 0 : 1),
      lastScan: timeLabel,
    }))

    resetTimer.current = setTimeout(() => setResult(null), 3000)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 pt-10 pb-28 relative">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div className="bg-white rounded-2xl border border-black/10 shadow-md p-10 flex flex-col items-center justify-center min-h-[520px] relative overflow-hidden">
          <p className="text-xs font-bold uppercase tracking-widest text-cfm-emerald mb-1">
            {GATE_LABEL}
          </p>
          <h2 className="text-xl font-bold text-cfm-dark mb-8">Scanner de Bilhetes</h2>

          <div className="relative w-64 h-64 rounded-3xl border-4 border-cfm-emerald/40 flex items-center justify-center animate-pulse-border">
            <ScanLine size={72} className="text-cfm-emerald/70" />
            <div className="absolute inset-4 border-2 border-dashed border-cfm-emerald/30 rounded-2xl" />
          </div>

          <p className="text-cfm-dark/40 text-sm mt-8 mb-6">Aguardando leitura do código QR...</p>

          <div className="flex gap-4">
            <button
              onClick={() => runScan(true)}
              className="px-6 py-3 rounded-lg bg-cfm-success text-white font-semibold shadow-sm hover:brightness-95 transition"
            >
              Simular Leitura Válida
            </button>
            <button
              onClick={() => runScan(false)}
              className="px-6 py-3 rounded-lg bg-red-600 text-white font-semibold shadow-sm hover:brightness-95 transition"
            >
              Simular Leitura Inválida
            </button>
          </div>

          {result && (
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center text-white ${
                result.type === 'valid' ? 'animate-flash-green' : 'animate-flash-red'
              }`}
            >
              <div className="animate-pop-in flex flex-col items-center text-center px-8">
                {result.type === 'valid' ? (
                  <CheckCircle2 size={88} className="mb-4" />
                ) : (
                  <XCircle size={88} className="mb-4" />
                )}
                {result.type === 'valid' ? (
                  <>
                    <h3 className="text-2xl font-extrabold mb-1">Entrada Autorizada</h3>
                    <p className="font-semibold">{result.name}</p>
                    <p className="text-sm opacity-90">{result.event}</p>
                    <p className="text-sm opacity-90 mb-3">Categoria: {result.category}</p>
                    <p className="text-xs opacity-80">
                      {result.time} · {GATE_LABEL}
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-extrabold mb-1">Entrada Recusada</h3>
                    <p className="font-semibold">{result.reason}</p>
                    <p className="text-xs opacity-80 mt-3">
                      {result.time} · {GATE_LABEL}
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <aside className="bg-white rounded-2xl border border-black/10 shadow-md p-6 h-fit">
          <div className="flex items-center gap-2 mb-5">
            <Activity size={16} className="text-cfm-emerald" />
            <h3 className="font-bold text-cfm-dark text-sm">Estatísticas da Sessão</h3>
          </div>

          <div className="space-y-4">
            <StatRow label="Leituras totais" value={stats.scans} />
            <StatRow label="Válidas" value={stats.valid} valueClass="text-cfm-success" />
            <StatRow label="Inválidas" value={stats.invalid} valueClass="text-red-600" />
          </div>

          <div className="mt-5 pt-5 border-t border-black/5 flex items-center gap-2 text-xs text-cfm-dark/50">
            <Clock size={13} />
            Última leitura: {stats.lastScan ?? '-'}
          </div>

          <div className="mt-5 pt-5 border-t border-black/5">
            <p className="text-xs text-cfm-dark/40 mb-1">Porta</p>
            <p className="text-sm font-bold text-cfm-dark">{GATE_LABEL}</p>
            <span className="inline-block mt-2 text-xs font-semibold text-cfm-success bg-green-50 px-2.5 py-1 rounded-full">
              ● Activa
            </span>
          </div>
        </aside>
      </div>

      <HelpButton text="Vista do operador de porta: simule leituras válidas e inválidas de bilhetes e acompanhe as estatísticas da sessão." />
    </div>
  )
}

function StatRow({ label, value, valueClass = 'text-cfm-dark' }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-cfm-dark/60">{label}</span>
      <span className={`text-lg font-extrabold ${valueClass}`}>{value}</span>
    </div>
  )
}
