import { useMemo } from 'react'

export default function TrendMiniChart({ summary }) {
  const data = useMemo(() => {
    const entries = Object.entries(summary?.trends || {})
    // sort by month key ascending
    entries.sort((a,b) => a[0].localeCompare(b[0]))
    return entries.slice(-6)
  }, [summary])

  if (!data.length) {
    return (
      <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 text-slate-400 text-sm">No trend data yet</div>
    )
  }

  const maxVal = Math.max(...data.map(([,v]) => Number(v))) || 1

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
      <div className="text-slate-300 text-sm mb-2">Last months trend</div>
      <div className="flex items-end gap-2 h-24">
        {data.map(([m,v]) => {
          const h = Math.max(4, Math.round((Number(v) / maxVal) * 90))
          const label = new Date(m + '-01').toLocaleString(undefined, { month: 'short' })
          return (
            <div key={m} className="flex flex-col items-center gap-1 w-8">
              <div className="bg-blue-500/80 hover:bg-blue-400 transition-all w-8 rounded-md" style={{ height: h }} />
              <div className="text-[10px] text-slate-400">{label}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
