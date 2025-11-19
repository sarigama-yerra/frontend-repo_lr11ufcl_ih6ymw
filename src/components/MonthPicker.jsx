import { useMemo } from 'react'

export default function MonthPicker({ value, onChange }) {
  // value: 'YYYY-MM'
  const months = useMemo(() => {
    // generate last 24 months including current
    const arr = []
    const now = new Date()
    for (let i = 0; i < 24; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const y = d.getFullYear()
      const m = String(d.getMonth() + 1).padStart(2, '0')
      arr.push({ key: `${y}-${m}`, label: d.toLocaleString(undefined, { month: 'long', year: 'numeric' }) })
    }
    return arr
  }, [])

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-slate-300">Month</label>
      <select
        className="bg-slate-800/80 border border-slate-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {months.map(m => (
          <option key={m.key} value={m.key}>{m.label}</option>
        ))}
      </select>
    </div>
  )
}
