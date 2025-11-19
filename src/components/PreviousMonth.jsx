import { useEffect, useMemo, useState } from 'react'
import ExpenseList from './ExpenseList'

export default function PreviousMonth({ month, baseUrl, currencyFormatter }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const [summary, setSummary] = useState({ total: 0, count: 0 })

  const prevMonth = useMemo(() => {
    if (!month) return ''
    const [y, m] = month.split('-').map(Number)
    const d = new Date(y, m - 2, 1) // previous month
    const yy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    return `${yy}-${mm}`
  }, [month])

  useEffect(() => {
    if (!open) return
    const fetchPrev = async () => {
      setLoading(true)
      try {
        const [listRes, sumRes] = await Promise.all([
          fetch(`${baseUrl}/api/expenses?month=${prevMonth}`),
          fetch(`${baseUrl}/api/summary?month=${prevMonth}`),
        ])
        const [listData, sumData] = await Promise.all([listRes.json(), sumRes.json()])
        setItems(listData)
        setSummary(sumData)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchPrev()
  }, [open, prevMonth, baseUrl])

  const title = useMemo(() => {
    const d = prevMonth ? new Date(prevMonth + '-01') : null
    return d ? d.toLocaleString(undefined, { month: 'long', year: 'numeric' }) : 'Previous Month'
  }, [prevMonth])

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-800/70 transition-colors"
      >
        <div className="text-left">
          <div className="text-slate-300 text-sm">Last month's expenses</div>
          <div className="text-white font-semibold">{title}</div>
        </div>
        <div className="text-blue-200 font-semibold">
          {currencyFormatter(summary.total || 0)}
        </div>
      </button>
      {open && (
        <div className="p-4 border-t border-slate-700">
          {loading ? (
            <div className="text-slate-300">Loading...</div>
          ) : (
            <ExpenseList items={items} currencyFormatter={currencyFormatter} />
          )}
        </div>
      )}
    </div>
  )
}
