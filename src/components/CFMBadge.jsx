import cfmLogo from '../assets/cfm-logo.png'

export default function CFMBadge({ size = 'md' }) {
  const isLg = size === 'lg'
  return (
    <div className="flex items-center gap-3">
      <img
        src={cfmLogo}
        alt="CFM — ampliando horizontes"
        className={isLg ? 'h-14 w-auto' : 'h-9 w-auto'}
      />
      <div className={`flex flex-col leading-tight border-l border-black/10 ${isLg ? 'pl-4' : 'pl-3'}`}>
        <span className={`font-bold text-cfm-dark ${isLg ? 'text-lg' : 'text-sm'}`}>
          Sistema de Gestão de Entradas
        </span>
        <span className={`text-cfm-mid/70 font-medium ${isLg ? 'text-xs' : 'text-[10px]'}`}>
          Portos e Caminhos de Ferro de Moçambique
        </span>
      </div>
    </div>
  )
}
