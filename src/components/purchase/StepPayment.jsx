import { useState } from 'react'
import { Smartphone, Loader2, ShieldCheck } from 'lucide-react'
import { PAYMENT_METHODS, TICKET_CATEGORIES, formatMTn } from '../../data/mockData.js'

export default function StepPayment({ methodId, onSelectMethod, categoryId, onBack, onPaid }) {
  const [processing, setProcessing] = useState(false)
  const method = PAYMENT_METHODS.find((m) => m.id === methodId)
  const category = TICKET_CATEGORIES.find((c) => c.id === categoryId)

  const handlePay = () => {
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      onPaid()
    }, 3000)
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-bold text-cfm-dark mb-1">Pagamento</h2>
      <p className="text-cfm-dark/50 text-sm mb-8">Escolha o método de pagamento móvel.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {PAYMENT_METHODS.map((m) => {
          const selected = m.id === methodId
          return (
            <button
              key={m.id}
              disabled={processing}
              onClick={() => onSelectMethod(m.id)}
              className={`relative rounded-xl border-2 p-5 text-center transition-all bg-white ${
                selected ? 'shadow-lg ring-2' : 'border-black/10 hover:shadow-md'
              }`}
              style={selected ? { borderColor: m.color, boxShadow: `0 0 0 3px ${m.color}22` } : {}}
            >
              {m.highlight && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-cfm-success text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                  {m.highlight}
                </span>
              )}
              <div
                className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: `${m.color}1A` }}
              >
                <Smartphone size={22} style={{ color: m.color }} />
              </div>
              <p className="font-bold text-cfm-dark">{m.label}</p>
            </button>
          )
        })}
      </div>

      {method && (
        <div className="bg-cfm-dark rounded-xl p-5 mb-8 font-mono text-sm text-green-300 shadow-inner animate-fade-in">
          <div className="flex items-center gap-2 text-white/70 mb-2 font-sans font-semibold text-xs uppercase tracking-wide">
            <ShieldCheck size={14} /> Simulação USSD — {method.label}
          </div>
          <p className="leading-relaxed break-words">
            <span className="text-white">{method.ussd}</span> → Confirmar pagamento de{' '}
            <span className="text-white">{formatMTn(category.price)}</span> para CFM Bilhética → PIN: ****
          </p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          disabled={processing}
          className="px-6 py-3 rounded-lg text-cfm-dark/60 font-semibold hover:bg-black/5 transition-colors disabled:opacity-30"
        >
          Voltar
        </button>
        <button
          onClick={handlePay}
          disabled={!methodId || processing}
          className="px-8 py-3 rounded-lg bg-cfm-emerald text-white font-semibold shadow-sm hover:bg-cfm-mid disabled:opacity-60 transition-colors flex items-center gap-2 min-w-[220px] justify-center"
        >
          {processing ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              A processar via {method?.label}...
            </>
          ) : (
            'Processar Pagamento'
          )}
        </button>
      </div>
    </div>
  )
}
