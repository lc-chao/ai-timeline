import { useState, useMemo } from 'react'
import { events } from './data/events'
import { EventCard } from './components/EventCard'
import { FilterBar } from './components/FilterBar'

export default function App() {
  const [selectedCompany, setSelectedCompany] = useState('all')
  const [selectedType, setSelectedType] = useState('all')

  const filtered = useMemo(() => events
    .filter(e => selectedCompany === 'all' || e.company === selectedCompany)
    .filter(e => selectedType === 'all' || e.type === selectedType)
    .sort((a, b) => b.date.localeCompare(a.date)),
    [selectedCompany, selectedType]
  )

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/30 via-gray-950 to-gray-950 pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            AI Timeline
          </h1>
          <p className="text-gray-400">2023年至今 · AI领域重大事件全记录</p>
        </div>
        <FilterBar
          selectedCompany={selectedCompany}
          selectedType={selectedType}
          onCompanyChange={setSelectedCompany}
          onTypeChange={t => setSelectedType(t)}
        />
        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 py-20">暂无数据</div>
        ) : (
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-cyan-500/50" />
            {filtered.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
