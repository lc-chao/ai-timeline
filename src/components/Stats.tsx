import { useMemo, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { Event } from '../types'

function CountUp({ target }: { target: number }) {
  const [val, setVal] = useState(0)
  const ref = useRef(false)
  useEffect(() => {
    if (ref.current) return
    ref.current = true
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / 800, 1)
      setVal(Math.round(p * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target])
  return <>{val}</>
}

export function Stats({ events }: { events: Event[] }) {
  const stats = useMemo(() => ({
    total: events.length,
    companies: new Set(events.map(e => e.company)).size,
    high: events.filter(e => e.importance === 'high').length,
    models: events.filter(e => e.type === 'model').length,
  }), [events])

  const items = [
    { label: '事件总数', value: stats.total, icon: '📋' },
    { label: '覆盖公司', value: stats.companies, icon: '🏢' },
    { label: '重大事件', value: stats.high, icon: '⭐' },
    { label: '模型发布', value: stats.models, icon: '🤖' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.05 }}
          className="skeu-card px-4 py-4 text-center"
        >
          <div style={{ fontSize: '20px', marginBottom: '4px' }}>{item.icon}</div>
          <div style={{ fontSize: '26px', fontWeight: '700', color: '#4a3728', fontFamily: 'Georgia, serif' }}>
            <CountUp target={item.value} />
          </div>
          <div style={{ color: '#8a7a65', fontSize: '11px', marginTop: '2px' }}>{item.label}</div>
        </motion.div>
      ))}
    </div>
  )
}
