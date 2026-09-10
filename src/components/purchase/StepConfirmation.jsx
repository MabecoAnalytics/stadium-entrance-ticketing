import { useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Download, MessageCircle, Mail, CheckCircle2 } from 'lucide-react'
import { EVENTS, TICKET_CATEGORIES, formatMTn } from '../../data/mockData.js'

export default function StepConfirmation({ eventId, categoryId, buyer, ticketId }) {
  const canvasWrapRef = useRef(null)
  const event = EVENTS.find((e) => e.id === eventId)
  const category = TICKET_CATEGORIES.find((c) => c.id === categoryId)

  const handleDownload = () => {
    const canvas = canvasWrapRef.current?.querySelector('canvas')
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `bilhete-${ticketId}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="max-w-xl mx-auto text-center animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-cfm-success/10 flex items-center justify-center mx-auto mb-4 animate-pop-in">
        <CheckCircle2 size={36} className="text-cfm-success" />
      </div>
      <h2 className="text-2xl font-bold text-cfm-dark mb-1">Bilhete emitido com sucesso!</h2>
      <p className="text-cfm-dark/50 text-sm mb-8">
        Guarde o QR code abaixo — será solicitado na entrada do estádio.
      </p>

      <div className="bg-white rounded-2xl border border-black/10 shadow-lg p-8">
        <div ref={canvasWrapRef} className="flex justify-center mb-6">
          <div className="p-4 bg-white rounded-xl border-2 border-cfm-dark/10">
            <QRCodeCanvas value={ticketId} size={176} fgColor="#1A3A2A" level="M" />
          </div>
        </div>

        <div className="text-left space-y-3 border-t border-black/5 pt-5">
          <Row label="Nº do Bilhete" value={ticketId.split('-')[0].toUpperCase()} mono />
          <Row label="Evento" value={event.name} />
          <Row label="Data" value={`${event.dateLabel} · ${event.time}`} />
          <Row label="Categoria" value={`${category.label} — ${formatMTn(category.price)}`} />
          <Row label="Comprador" value={buyer.name} />
        </div>

        <div className="flex gap-3 mt-6">
          <div className="flex-1 flex items-center gap-2 bg-green-50 text-cfm-success text-xs font-semibold rounded-lg px-3 py-2.5 justify-center">
            <MessageCircle size={14} /> WhatsApp Enviado ✓
          </div>
          <div className="flex-1 flex items-center gap-2 bg-green-50 text-cfm-success text-xs font-semibold rounded-lg px-3 py-2.5 justify-center">
            <Mail size={14} /> Email Enviado ✓
          </div>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="mt-6 inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-cfm-dark text-white font-semibold shadow-sm hover:bg-cfm-mid transition-colors"
      >
        <Download size={18} /> Download Bilhete
      </button>
    </div>
  )
}

function Row({ label, value, mono }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-cfm-dark/50">{label}</span>
      <span className={`font-semibold text-cfm-dark ${mono ? 'font-mono tracking-wide' : ''}`}>
        {value}
      </span>
    </div>
  )
}
