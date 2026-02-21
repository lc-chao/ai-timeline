import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Event } from '../types'

const companyColors: Record<string, string> = {
  'OpenAI': 'from-green-500 to-emerald-600',
  'Anthropic': 'from-orange-500 to-amber-600',
  'Google DeepMind': 'from-blue-500 to-cyan-600',
  'Meta AI': 'from-blue-600 to-indigo-600',
  'Mistral': 'from-purple-500 to-violet-600',
  'xAI': 'from-gray-400 to-gray-500',
  '智谱AI': 'from-red-500 to-rose-600',
  'MiniMax': 'from-pink-500 to-fuchsia-600',
  'Kimi': 'from-cyan-500 to-sky-600',
  '阿里千问': 'from-orange-400 to-yellow-500',
  '字节豆包': 'from-teal-500 to-green-600',
}

const companyDots: Record<string, string> = {
  'OpenAI': 'bg-emerald-500',
  'Anthropic': 'bg-orange-500',
  'Google DeepMind': 'bg-cyan-500',
  'Meta AI': 'bg-indigo-500',
  'Mistral': 'bg-violet-500',
  'xAI': 'bg-gray-400',
  '智谱AI': 'bg-rose-500',
  'MiniMax': 'bg-fuchsia-500',
  'Kimi': 'bg-sky-500',
  '阿里千问': 'bg-yellow-500',
  '字节豆包': 'bg-teal-500',
}

const typeLabels: Record<string, string> = {
  model: '🤖 模型', product: '🚀 产品', funding: '💰 融资', policy: '📋 政策', milestone: '⭐ 里程碑'
}

function CardContent({ event }: { event: Event }) {
  const [expanded, setExpanded] = useState(false)
  const color = companyColors[event.company] ?? 'from-gray-500 to-gray-600'
  const isHigh = event.importance === 'high'

  return (
    <div
      onClick={() => setExpanded(v => !v)}
      className={`relative bg-gray-900/60 border rounded-xl p-5 cursor-pointer transition-all duration-300
        ${isHigh
          ? 'border-gray-700 hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.07)]'
          : 'border-gray-800 hover:border-gray-600'}`}
    >
      {isHigh && (
        <div className={`absolute left-0 top-4 bottom-4 w-0.5 rounded-full bg-gradient-to-b ${color}`} />
      )}
      <div className="flex items-center gap-2 mb-2.5 flex-wrap">
        <span className={`text-xs px-2.5 py-0.5 rounded-full bg-gradient-to-r ${color} text-white font-medium`}>{event.company}</span>
        <span className="text-xs text-gray-500 px-2 py-0.5 rounded-full border border-gray-700/80">{typeLabels[event.type]}</span>
        {isHigh && <span className="text-yellow-400 text-xs ml-auto">★ 重要</span>}
      </div>
      <h3 className="text-white font-semibold text-sm mb-1.5">{event.title}</h3>
      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.p
            key="full"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-gray-400 text-xs leading-relaxed overflow-hidden"
          >
            {event.description}
          </motion.p>
        ) : (
          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{event.description}</p>
        )}
      </AnimatePresence>
      <div className="flex items-center justify-between mt-3">
        <p className="text-gray-600 text-xs font-mono">{event.date}</p>
        <span className="text-gray-600 text-xs">{expanded ? '收起 ↑' : '展开 ↓'}</span>
      </div>
    </div>
  )
}

export function EventCard({ event, index }: { event: Event; index: number }) {
  const isLeft = index % 2 === 0
  const dot = companyDots[event.company] ?? 'bg-gray-500'
  const isHigh = event.importance === 'high'
  const dotSize = isHigh ? 'w-4 h-4' : 'w-3 h-3'

  return (
    <>
      {/* 桌面端：左右交替 */}
      <div className={`relative hidden md:flex mb-8 items-start ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className="w-[46%]">
          <CardContent event={event} />
        </div>
        <div className="w-[8%] flex justify-center pt-5">
          <div className={`${dotSize} rounded-full border-2 border-gray-950 z-10 ${dot} ${isHigh ? 'shadow-[0_0_8px_2px_rgba(6,182,212,0.4)]' : ''}`} />
        </div>
        <div className="w-[46%]" />
      </div>

      {/* 移动端：单列 */}
      <div className="md:hidden flex mb-5 items-start gap-3">
        <div className="flex flex-col items-center pt-1.5 shrink-0">
          <div className={`${isHigh ? 'w-3.5 h-3.5' : 'w-2.5 h-2.5'} rounded-full ${dot} ${isHigh ? 'shadow-[0_0_6px_rgba(6,182,212,0.4)]' : ''}`} />
          <div className="w-px flex-1 bg-gray-800 mt-1" />
        </div>
        <div className="flex-1 mb-1">
          <CardContent event={event} />
        </div>
      </div>
    </>
  )
}
