import { motion } from 'framer-motion'
import type { Event } from '../types'
import { EventCard } from './EventCard'

export function Timeline({ events }: { events: Event[] }) {
  if (events.length === 0) {
    return <div className="text-center text-gray-500 py-20">暂无数据</div>
  }

  // 按年份分组
  const grouped: Record<string, Event[]> = {}
  for (const e of events) {
    const year = e.date.slice(0, 4)
    if (!grouped[year]) grouped[year] = []
    grouped[year].push(e)
  }
  const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a))

  return (
    <div className="relative">
      {/* 中轴线 */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/0 via-cyan-500/40 to-cyan-500/0" />

      {years.map(year => (
        <div key={year}>
          {/* 年份标签 */}
          <div className="relative flex justify-center mb-8 mt-4">
            <div className="bg-gray-950 px-4 z-10">
              <span className="text-cyan-400 font-mono font-bold text-lg tracking-widest">{year}</span>
            </div>
          </div>

          {grouped[year].map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              <EventCard event={event} index={i} />
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  )
}
