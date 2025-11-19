export default function SummaryCards({ summary, currencyFormatter }) {
  const total = Number(summary?.total || 0)
  const entries = Object.entries(summary?.breakdown || {})
  entries.sort((a,b) => b[1]-a[1])
  const top = entries.slice(0,3)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
        <div className="text-slate-300 text-sm mb-1">Total this month</div>
        <div className="text-3xl font-bold text-white">{currencyFormatter(total)}</div>
        <div className="text-slate-400 text-xs">{summary?.count || 0} expenses</div>
      </div>

      <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
        <div className="text-slate-300 text-sm mb-1">Top categories</div>
        {top.length ? (
          <div className="space-y-2">
            {top.map(([cat, amt]) => (
              <div key={cat} className="flex items-center justify-between text-sm">
                <div className="text-white">{cat}</div>
                <div className="text-blue-200">{currencyFormatter(amt)}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-slate-400 text-sm">No data yet</div>
        )}
      </div>

      <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
        <div className="text-slate-300 text-sm mb-1">Average per expense</div>
        <div className="text-3xl font-bold text-white">{currencyFormatter(total / Math.max(1, summary?.count || 1))}</div>
        <div className="text-slate-400 text-xs">Based on {summary?.count || 0} items</div>
      </div>
    </div>
  )
}
