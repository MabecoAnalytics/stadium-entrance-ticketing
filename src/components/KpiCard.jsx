export default function KpiCard({ label, value, sub, progress, icon: Icon, accent = '#0A7F3C' }) {
  return (
    <div className="bg-white rounded-xl border border-black/10 shadow-sm p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-cfm-dark/50">
          {label}
        </span>
        {Icon && (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${accent}1A` }}
          >
            <Icon size={16} style={{ color: accent }} />
          </div>
        )}
      </div>
      <p className="text-2xl font-extrabold text-cfm-dark mb-1">{value}</p>
      {sub && <p className="text-xs text-cfm-dark/50">{sub}</p>}
      {typeof progress === 'number' && (
        <div className="mt-3 h-1.5 rounded-full bg-black/5 overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${Math.min(progress, 100)}%`, backgroundColor: accent }}
          />
        </div>
      )}
    </div>
  )
}
