import { useMemo } from 'react'
import { motion } from 'framer-motion'
import type { Event } from '../types'

export function Stats({ events }: { events: Event[] }) {
  const stats = useMemo(() => ({
    total: events.length,
    companies: new Set(events.map(e => e.company)).size,
    high: events.filter(e => e.importance === 'high').length,
    models: events.filter(e => e.type === 'model').length,
  }), [events])

  const items = [
    { label: '事件总数', value: stats.total },
    { label: '覆盖公司', value: stats.companies },
    { label: '重大事件', value: stats.high },
    { label: '模型发布', value: stats.models },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.05 }}
          className="bg-gray-900/60 border border-gray-800 rounded-xl px-4 py-3 text-center"
        >
          <div className="text-2xl font-bold text-cyan-400 font-mono">{item.value}</div>
          <div className="text-gray-500 text-xs mt-0.5">{item.label}</div>
        </motion.div>
      ))}
    </div>
  )
}
