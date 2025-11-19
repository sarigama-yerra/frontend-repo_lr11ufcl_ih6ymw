export default function ExpenseList({ items = [] }) {
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
        <div key={e.id} className="flex items-center justify-between p-3">
          <div>
            <div className="text-white font-medium">{e.category}</div>
            {e.note && <div className="text-slate-300 text-sm">{e.note}</div>}
          </div>
          <div className="text-right">
            <div className="text-white font-semibold">${Number(e.amount).toFixed(2)}</div>
            <div className="text-slate-400 text-xs">{e.date}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
