import { useState, useMemo, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { events } from './data/events'
import { Timeline } from './components/Timeline'
import { FilterBar } from './components/FilterBar'

const stats = {
  total: events.length,
  companies: new Set(events.map(e => e.company)).size,
  high: events.filter(e => e.importance === 'high').length,
  models: events.filter(e => e.type === 'model').length,
}

export default function App() {
  const [selectedCompany, setSelectedCompany] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')
  const [showTop, setShowTop] = useState(false)

  const filtered = useMemo(() => events
    .filter(e => e.type === 'model' || e.type === 'product')
    .filter(e => selectedCompany === 'all' || e.company === selectedCompany)
    .filter(e => selectedYear === 'all' || e.date.startsWith(selectedYear))
    .sort((a, b) => b.date.localeCompare(a.date)),
    [selectedCompany, selectedYear]
  )

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [selectedCompany, selectedYear])
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleCompanyChange = useCallback((c: string) => setSelectedCompany(c), [])
  const handleYearChange = useCallback((y: string) => setSelectedYear(y), [])

  return (
    <div className="min-h-screen" style={{ background: '#e8e0d5' }}>
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <span style={{ fontSize: '16px', fontWeight: 600, color: '#4a3728' }}>AI Timeline</span>
          <span style={{ fontSize: '11px', color: '#8a7a65' }}>
            📋 {stats.total} 事件&nbsp;&nbsp;🏢 {stats.companies} 公司&nbsp;&nbsp;⭐ {stats.high} 重要&nbsp;&nbsp;🤖 {stats.models} 模型
          </span>
        </div>

        <FilterBar
          selectedCompany={selectedCompany}
          selectedYear={selectedYear}
          onCompanyChange={handleCompanyChange}
          onYearChange={handleYearChange}
        />

        <Timeline events={filtered} />
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="skeu-btn fixed bottom-8 right-8 w-10 h-10 rounded-full flex items-center justify-center z-30"
            style={{ color: '#6b5a45', fontSize: '16px' }}
          >↑</motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
