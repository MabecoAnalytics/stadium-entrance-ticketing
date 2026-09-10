import { useState } from 'react'
import { HelpCircle, X } from 'lucide-react'

export default function HelpButton({ text }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="max-w-xs bg-cfm-dark text-white text-sm rounded-xl shadow-xl p-4 animate-fade-in relative">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 text-white/60 hover:text-white"
            aria-label="Fechar"
          >
            <X size={14} />
          </button>
          <p className="pr-4">{text}</p>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-12 h-12 rounded-full bg-cfm-emerald text-white shadow-lg flex items-center justify-center hover:bg-cfm-mid transition-colors"
        aria-label="Ajuda"
      >
        <HelpCircle size={24} />
      </button>
    </div>
  )
}
