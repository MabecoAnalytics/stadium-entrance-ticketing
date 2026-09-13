import { useState } from 'react'
import { Settings2, Cpu, LayoutGrid, ToggleLeft, ToggleRight } from 'lucide-react'
import HelpButton from '../components/HelpButton.jsx'
import { BLOCKS, EQUIPMENT_CATALOG, getGatesForBlock, formatNumber } from '../data/mockData.js'

const TOGGLE_DEFAULTS = [
  { id: 'whatsapp', label: 'Envio de bilhetes por WhatsApp', on: true },
  { id: 'email', label: 'Envio de bilhetes por Email', on: true },
  { id: 'facial', label: 'Reconhecimento facial nas catracas', on: true },
  { id: 'contingencia', label: 'Modo de contingência (POS manual em todas as portas)', on: false },
]

export default function Settings() {
  const [toggles, setToggles] = useState(TOGGLE_DEFAULTS)

  const toggle = (id) => {
    setToggles((list) => list.map((t) => (t.id === id ? { ...t, on: !t.on } : t)))
  }

  return (
    <div className="max-w-[1100px] mx-auto px-6 pt-10 pb-28">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-cfm-dark">Parametrização</h1>
        <p className="text-sm text-cfm-dark/50">
          Configuração de blocos, portas de acesso e equipamento do estádio.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-black/10 shadow-sm p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <LayoutGrid size={16} className="text-cfm-emerald" />
          <h3 className="text-sm font-bold text-cfm-dark">Blocos e Portas Associadas</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-cfm-dark/40 text-xs uppercase tracking-wide border-b border-black/5">
                <th className="py-2 pr-2 font-semibold">Bloco</th>
                <th className="py-2 pr-2 font-semibold text-right">Capacidade</th>
                <th className="py-2 pl-2 font-semibold">Portas de acesso</th>
              </tr>
            </thead>
            <tbody>
              {BLOCKS.map((block) => (
                <tr key={block.id} className="border-b border-black/5 last:border-0">
                  <td className="py-2.5 pr-2 font-medium text-cfm-dark">{block.name}</td>
                  <td className="py-2.5 pr-2 text-right text-cfm-dark/70">{formatNumber(block.capacity)}</td>
                  <td className="py-2.5 pl-2 text-cfm-dark/60 text-xs">
                    {getGatesForBlock(block.id).map((g) => g.label).join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-black/10 shadow-sm p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Cpu size={16} className="text-cfm-emerald" />
          <h3 className="text-sm font-bold text-cfm-dark">Equipamento de Controlo de Acesso</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {EQUIPMENT_CATALOG.map((eq) => (
            <div key={eq.id} className="border border-black/5 rounded-lg p-4">
              <p className="font-semibold text-cfm-dark text-sm mb-1">{eq.name}</p>
              <p className="text-xs text-cfm-dark/60 mb-2">{eq.type}</p>
              <p className="text-xs text-cfm-dark/40">{eq.usage}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-black/10 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <Settings2 size={16} className="text-cfm-emerald" />
          <h3 className="text-sm font-bold text-cfm-dark">Parâmetros Gerais</h3>
        </div>
        <div className="space-y-3">
          {toggles.map((t) => (
            <button
              key={t.id}
              onClick={() => toggle(t.id)}
              className="w-full flex items-center justify-between py-2 border-b border-black/5 last:border-0"
            >
              <span className="text-sm text-cfm-dark/80">{t.label}</span>
              {t.on ? (
                <ToggleRight size={28} className="text-cfm-success" />
              ) : (
                <ToggleLeft size={28} className="text-cfm-dark/30" />
              )}
            </button>
          ))}
        </div>
      </div>

      <HelpButton text="Ecrã de parametrização: configuração ilustrativa de blocos, portas e equipamento do sistema." />
    </div>
  )
}
