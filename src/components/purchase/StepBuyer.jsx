import { User, Phone, Mail } from 'lucide-react'

export default function StepBuyer({ buyer, onChange, onNext, onBack }) {
  const isValid = buyer.name.trim().length > 2 && buyer.phone.replace(/\D/g, '').length >= 11

  return (
    <div className="max-w-xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-bold text-cfm-dark mb-1">Dados do Comprador</h2>
      <p className="text-cfm-dark/50 text-sm mb-8">
        Estes dados serão usados para enviar o bilhete digital.
      </p>

      <div className="bg-white rounded-xl border border-black/10 p-6 space-y-5 shadow-sm">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-cfm-dark mb-2">
            <User size={15} /> Nome completo
          </label>
          <input
            type="text"
            value={buyer.name}
            onChange={(e) => onChange({ ...buyer, name: e.target.value })}
            placeholder="Ex: Armando Mussa"
            className="w-full rounded-lg border border-black/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cfm-emerald/40 focus:border-cfm-emerald"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-cfm-dark mb-2">
            <Phone size={15} /> Número de telefone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={buyer.phone}
            onChange={(e) => onChange({ ...buyer, phone: e.target.value })}
            placeholder="+258 84 XXX XXXX"
            className="w-full rounded-lg border border-black/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cfm-emerald/40 focus:border-cfm-emerald"
          />
          <p className="text-xs text-cfm-dark/40 mt-1">
            O bilhete e QR code serão enviados por WhatsApp para este número.
          </p>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-cfm-dark mb-2">
            <Mail size={15} /> Email <span className="text-cfm-dark/30 font-normal">(opcional)</span>
          </label>
          <input
            type="email"
            value={buyer.email}
            onChange={(e) => onChange({ ...buyer, email: e.target.value })}
            placeholder="nome@exemplo.co.mz"
            className="w-full rounded-lg border border-black/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cfm-emerald/40 focus:border-cfm-emerald"
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg text-cfm-dark/60 font-semibold hover:bg-black/5 transition-colors"
        >
          Voltar
        </button>
        <button
          onClick={onNext}
          disabled={!isValid}
          className="px-8 py-3 rounded-lg bg-cfm-emerald text-white font-semibold shadow-sm hover:bg-cfm-mid disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Continuar
        </button>
      </div>
    </div>
  )
}
