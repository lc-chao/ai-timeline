import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { Event } from '../types'
import { EventCardFull } from './EventCard'

export function Timeline({ events }: { events: Event[] }) {
  const filtered = events.filter(e => e.type === 'model' || e.type === 'product')

  const grouped: Record<string, Record<string, Event[]>> = {}
  for (const e of filtered) {
    const year = e.date.slice(0, 4)
    const month = e.date.slice(0, 7)
    if (!grouped[year]) grouped[year] = {}
    if (!grouped[year][month]) grouped[year][month] = []
    grouped[year][month].push(e)
  }
  const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a))

  const [activeSection, setActiveSection] = useState<string>('')
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    const entries: Record<string, boolean> = {}
    Object.entries(sectionRefs.current).forEach(([key, el]) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          entries[key] = entry.isIntersecting
          const visible = Object.entries(entries).filter(([, v]) => v).map(([k]) => k)
          if (visible.length > 0) setActiveSection(visible[0])
        },
        { threshold: 0.1, rootMargin: '-10% 0px -60% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [years])

  if (filtered.length === 0) {
    return (
      <div className="text-center py-24">
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div>
        <p style={{ color: '#8a7a65', fontSize: '14px' }}>没有找到匹配的事件</p>
      </div>
    )
  }

  return (
    <div>
      <div className="space-y-2">
        {years.map(year => (
          <div key={year} ref={el => { sectionRefs.current[year] = el }}>
            {/* 年份标题 */}
            <div style={{
              color: '#6b5a45', fontFamily: 'Georgia, serif', fontWeight: 700,
              fontSize: '13px', letterSpacing: '3px',
              borderBottom: '1px solid rgba(180,160,120,0.4)',
              paddingBottom: '6px', marginBottom: '16px', marginTop: '24px',
            }}>
              {year}
            </div>

            {Object.keys(grouped[year]).sort((a, b) => b.localeCompare(a)).map(month => (
              <div
                key={month}
                ref={el => { sectionRefs.current[month] = el }}
                className="flex gap-4 mb-10 items-start"
              >
                {/* 月份标签 */}
                <div className="w-10 shrink-0 pt-2 text-right">
                  <span style={{
                    fontFamily: 'monospace', fontSize: '10px', cursor: 'pointer',
                    color: activeSection === month ? '#6b5a45' : '#b0a090',
                  }}>
                    {month.slice(5)}月
                  </span>
                </div>

                {/* 卡片网格 */}
                <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', flex: 1 }}>
                  {grouped[year][month].map((event, i) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                      style={{ position: 'relative' }}
                    >
                      <EventCardFull event={event} />
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
