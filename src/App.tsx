import { useState, useMemo, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { events } from './data/events'
import { Timeline } from './components/Timeline'
import { CompanyView } from './components/CompanyView'
import { FilterBar } from './components/FilterBar'
import { Stats } from './components/Stats'

export default function App() {
  const [selectedCompany, setSelectedCompany] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [view, setView] = useState<'timeline' | 'company'>('timeline')
  const [showTop, setShowTop] = useState(false)

  const filtered = useMemo(() => events
    .filter(e => selectedCompany === 'all' || e.company === selectedCompany)
    .filter(e => selectedType === 'all' || e.type === selectedType)
    .sort((a, b) => b.date.localeCompare(a.date)),
    [selectedCompany, selectedType]
  )

  // 筛选变化时滚动回顶部
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [selectedCompany, selectedType])

  // 监听滚动，超过500px显示回顶按钮
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleCompanyChange = useCallback((c: string) => setSelectedCompany(c), [])
  const handleTypeChange = useCallback((t: string) => setSelectedType(t), [])

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(6,182,212,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-cyan-400/60 text-xs font-mono tracking-widest mb-4 border border-cyan-400/20 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            LIVE · 持续更新
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4 tracking-tight">
            AI Timeline
          </h1>
          <p className="text-gray-500 text-sm">2022年至今 · AI领域重大事件全记录 · {events.length} 个事件</p>
        </motion.div>

        <FilterBar
          selectedCompany={selectedCompany}
          selectedType={selectedType}
          view={view}
          onCompanyChange={handleCompanyChange}
          onTypeChange={handleTypeChange}
          onViewChange={setView}
        />

        <Stats events={events} />

        <div className="text-gray-600 text-xs font-mono mb-8">
          显示 {filtered.length} / {events.length} 条事件
        </div>

        {view === 'timeline'
          ? <Timeline events={filtered} />
          : <CompanyView events={filtered} />
        }
      </div>

      {/* 回顶按钮 */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 flex items-center justify-center hover:bg-cyan-500/30 transition-colors z-30"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
