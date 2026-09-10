import { Calendar, MapPin, Check } from 'lucide-react'
import { EVENTS, TICKET_CATEGORIES, formatMTn } from '../../data/mockData.js'

export default function StepEvent({ eventId, categoryId, onSelectEvent, onSelectCategory, onNext }) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-cfm-dark mb-1">Escolher Evento</h2>
      <p className="text-cfm-dark/50 text-sm mb-6">Seleccione o jogo e a categoria de bilhete.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {EVENTS.map((evt) => {
          const selected = evt.id === eventId
          return (
            <button
              key={evt.id}
              onClick={() => onSelectEvent(evt.id)}
              className={`text-left rounded-xl border-2 p-5 transition-all bg-white ${
                selected
                  ? 'border-cfm-emerald shadow-lg ring-2 ring-cfm-emerald/15'
                  : 'border-black/10 hover:border-cfm-emerald/40 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wide text-cfm-emerald">
                  Jogo
                </span>
                {selected && (
                  <div className="w-5 h-5 rounded-full bg-cfm-emerald flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
              </div>
              <h3 className="font-bold text-cfm-dark text-base mb-3 leading-snug">{evt.name}</h3>
              <div className="space-y-1.5 text-sm text-cfm-dark/60">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  {evt.dateLabel} · {evt.time}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  {evt.section}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-black/5 text-xs text-cfm-dark/50">
                Desde <span className="font-bold text-cfm-dark">{formatMTn(TICKET_CATEGORIES[0].price)}</span>
              </div>
            </button>
          )
        })}
      </div>

      <h3 className="font-bold text-cfm-dark mb-3">Escolha a categoria</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {TICKET_CATEGORIES.map((cat) => {
          const selected = cat.id === categoryId
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`rounded-xl border-2 p-5 text-left transition-all bg-white ${
                selected
                  ? 'border-cfm-emerald shadow-lg ring-2 ring-cfm-emerald/15'
                  : 'border-black/10 hover:border-cfm-emerald/40 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-cfm-dark">{cat.label}</span>
                {selected && (
                  <div className="w-5 h-5 rounded-full bg-cfm-emerald flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
              </div>
              <p className="text-2xl font-extrabold text-cfm-mid mt-2">{formatMTn(cat.price)}</p>
            </button>
          )
        })}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!eventId || !categoryId}
          className="px-8 py-3 rounded-lg bg-cfm-emerald text-white font-semibold shadow-sm hover:bg-cfm-mid disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Continuar
        </button>
      </div>
    </div>
  )
}
