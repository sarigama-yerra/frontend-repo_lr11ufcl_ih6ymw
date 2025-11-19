export default function ExpenseList({ items = [], currencyFormatter = (v) => `$${Number(v).toFixed(2)}` }) {
  if (!items.length) {
    return (
      <div className="text-slate-300 text-sm bg-slate-800/40 border border-slate-700 rounded-xl p-4">
        No expenses yet for this month.
      </div>
    )
  }

  return (
    <div className="bg-slate-800/40 border border-slate-700 rounded-xl divide-y divide-slate-700">
      {items.map((e) => (
        <div key={e.id} className="flex items-center justify-between p-3 gap-3">
          <div className="min-w-0">
            <div className="text-white font-medium truncate">{e.category}</div>
            {e.note && <div className="text-slate-300 text-sm truncate" title={e.note}>{e.note}</div>}
          </div>
          <div className="text-right min-w-0">
            <div className="text-white font-semibold tabular-nums whitespace-nowrap overflow-hidden text-ellipsis max-w-[45vw] sm:max-w-none text-base sm:text-lg" title={currencyFormatter(e.amount)}>
              {currencyFormatter(e.amount)}
            </div>
            <div className="text-slate-400 text-xs">{e.date}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
