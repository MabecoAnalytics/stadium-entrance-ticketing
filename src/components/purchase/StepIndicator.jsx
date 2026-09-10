import { Check } from 'lucide-react'

const STEPS = ['Evento', 'Comprador', 'Pagamento', 'Confirmação']

export default function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {STEPS.map((label, idx) => {
        const stepNum = idx + 1
        const done = stepNum < current
        const active = stepNum === current
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  done
                    ? 'bg-cfm-emerald text-white'
                    : active
                    ? 'bg-cfm-dark text-white ring-4 ring-cfm-emerald/20'
                    : 'bg-white text-cfm-dark/40 border border-black/10'
                }`}
              >
                {done ? <Check size={16} /> : stepNum}
              </div>
              <span
                className={`text-xs font-medium ${
                  active ? 'text-cfm-dark' : 'text-cfm-dark/40'
                }`}
              >
                {label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`w-16 h-0.5 mx-2 mb-5 transition-colors ${
                  done ? 'bg-cfm-emerald' : 'bg-black/10'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
