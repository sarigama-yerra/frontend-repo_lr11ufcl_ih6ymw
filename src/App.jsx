import { useEffect, useMemo, useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import MonthPicker from './components/MonthPicker'
import PreviousMonth from './components/PreviousMonth'
import SummaryCards from './components/SummaryCards'
import TrendMiniChart from './components/TrendMiniChart'

function App() {
  const now = new Date()
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const [month, setMonth] = useState(currentMonth)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState({ total: 0, count: 0, breakdown: {}, trends: {} })

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const currencyFormatter = (val) => {
    try {
      return new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(Number(val || 0))
    } catch {
      return `Rs ${Number(val || 0).toFixed(0)}`
    }
  }

  const refresh = async () => {
    setLoading(true)
    try {
      const [listRes, sumRes] = await Promise.all([
        fetch(`${baseUrl}/api/expenses?month=${month}`),
        fetch(`${baseUrl}/api/summary?month=${month}`),
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

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month])

  const breakdownList = useMemo(() => {
    const entries = Object.entries(summary.breakdown || {})
    entries.sort((a,b) => b[1]-a[1])
    return entries
  }, [summary])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative min-h-screen p-6 max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Monthly Expense Tracker</h1>
            <p className="text-blue-200/80">Track your spending in Pakistani Rupees and review previous months.</p>
          </div>
          <MonthPicker value={month} onChange={setMonth} />
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 space-y-4">
            <ExpenseForm onAdded={refresh} />
            {loading ? (
              <div className="text-slate-300">Loading...</div>
            ) : (
              <ExpenseList items={items} currencyFormatter={currencyFormatter} />
            )}
            <PreviousMonth month={month} baseUrl={baseUrl} currencyFormatter={currencyFormatter} />
          </section>

          <aside className="space-y-4">
            <SummaryCards summary={summary} currencyFormatter={currencyFormatter} />
            <TrendMiniChart summary={summary} />

            <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
              <div className="text-slate-300 text-sm mb-3">By category</div>
              {breakdownList.length ? (
                <div className="space-y-2">
                  {breakdownList.map(([cat, amt]) => (
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
          </aside>
        </main>
      </div>
    </div>
  )
}

export default App
