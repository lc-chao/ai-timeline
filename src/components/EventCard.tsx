import { useState } from 'react'
import type { Event } from '../types'

// 每个公司对应的色标（拟物风格用暖色调徽章）
const companyColors: Record<string, { bg: string; text: string }> = {
  'OpenAI':         { bg: 'linear-gradient(145deg, #4a7c59, #2d5a3d)', text: '#fff' },
  'Anthropic':      { bg: 'linear-gradient(145deg, #c47a3a, #8b4e1a)', text: '#fff' },
  'Google DeepMind':{ bg: 'linear-gradient(145deg, #3a6fc4, #1a3d8b)', text: '#fff' },
  'Google':         { bg: 'linear-gradient(145deg, #3a6fc4, #1a3d8b)', text: '#fff' },
  'Meta AI':        { bg: 'linear-gradient(145deg, #3a4fc4, #1a2d8b)', text: '#fff' },
  'Meta':           { bg: 'linear-gradient(145deg, #3a4fc4, #1a2d8b)', text: '#fff' },
  'Mistral':        { bg: 'linear-gradient(145deg, #7a4ac4, #4a1a8b)', text: '#fff' },
  'xAI':            { bg: 'linear-gradient(145deg, #5a5a5a, #3a3a3a)', text: '#fff' },
  '智谱AI':         { bg: 'linear-gradient(145deg, #c43a3a, #8b1a1a)', text: '#fff' },
  'MiniMax':        { bg: 'linear-gradient(145deg, #c43a8b, #8b1a5a)', text: '#fff' },
  'Kimi':           { bg: 'linear-gradient(145deg, #3aafc4, #1a6b8b)', text: '#fff' },
  '阿里千问':       { bg: 'linear-gradient(145deg, #c47a1a, #8b4a00)', text: '#fff' },
  '字节豆包':       { bg: 'linear-gradient(145deg, #3ac47a, #1a8b4a)', text: '#fff' },
  'OpenClaw':       { bg: 'linear-gradient(145deg, #8b6914, #5a4008)', text: '#fff' },
}

const typeLabels: Record<string, string> = {
  model: '🤖 模型', product: '🚀 产品', milestone: '⭐ 里程碑'
}

// Timeline 列表中的卡片（带展开）
export function EventCardFull({ event }: { event: Event }) {
  const [expanded, setExpanded] = useState(false)
  const color = companyColors[event.company] ?? { bg: 'linear-gradient(145deg, #7a6a5a, #5a4a3a)', text: '#fff' }
  const isHigh = event.importance === 'high'

  return (
    <div
      onClick={() => setExpanded(v => !v)}
      className="skeu-card p-4 cursor-pointer transition-all duration-200"
      style={isHigh ? { boxShadow: '4px 4px 12px rgba(0,0,0,0.18), -2px -2px 6px rgba(255,255,255,0.7), inset 0 1px 0 rgba(255,255,255,0.8), 0 0 0 1.5px rgba(180,140,60,0.35)' } : {}}
    >
      {/* 左侧高亮条（重要事件） */}
      {isHigh && (
        <div style={{
          position: 'absolute', left: 0, top: '12px', bottom: '12px',
          width: '3px', borderRadius: '0 2px 2px 0',
          background: 'linear-gradient(180deg, #c4a030, #8b6914)',
        }} />
      )}

      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span style={{
          fontSize: '11px', padding: '2px 10px', borderRadius: '20px',
          background: color.bg, color: color.text, fontWeight: 600,
          boxShadow: '1px 1px 3px rgba(0,0,0,0.25)',
        }}>{event.company}</span>
        <span style={{
          fontSize: '11px', padding: '2px 8px', borderRadius: '20px',
          background: 'linear-gradient(145deg, #e8e0d0, #d5cdc0)',
          color: '#6b5a45', border: '1px solid rgba(180,160,120,0.4)',
          boxShadow: '1px 1px 2px rgba(0,0,0,0.1)',
        }}>{typeLabels[event.type]}</span>
        {isHigh && <span style={{ color: '#c4a030', fontSize: '12px', marginLeft: 'auto' }}>★ 重要</span>}
      </div>

      <h3 style={{ color: '#2d1f14', fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>{event.title}</h3>

      <p style={{
        color: '#6b5a45', fontSize: '12px', lineHeight: '1.6',
        maxHeight: expanded ? '200px' : '2.8em',
        overflow: 'hidden',
        transition: 'max-height 0.25s ease',
        display: expanded ? 'block' : '-webkit-box',
        WebkitLineClamp: expanded ? undefined : 2,
        WebkitBoxOrient: 'vertical',
      }}>{event.description}</p>

      <div className="flex items-center justify-between mt-3">
        <p style={{ color: '#a09080', fontSize: '11px', fontFamily: 'monospace' }}>{event.date}</p>
        <span style={{ color: '#a09080', fontSize: '11px' }}>{expanded ? '收起 ↑' : '展开 ↓'}</span>
      </div>
    </div>
  )
}

// CompanyView 中的小卡片
export function EventCard({ event }: { event: Event }) {
  const color = companyColors[event.company] ?? { bg: 'linear-gradient(145deg, #7a6a5a, #5a4a3a)', text: '#fff' }
  const isHigh = event.importance === 'high'

  return (
    <div className="skeu-card p-3 w-52 shrink-0"
      style={isHigh ? { boxShadow: '4px 4px 12px rgba(0,0,0,0.18), -2px -2px 6px rgba(255,255,255,0.7), inset 0 1px 0 rgba(255,255,255,0.8), 0 0 0 1.5px rgba(180,140,60,0.35)' } : {}}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <span style={{
          width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
          background: color.bg, boxShadow: '1px 1px 2px rgba(0,0,0,0.2)',
        }} />
        <span style={{ fontSize: '10px', color: '#6b5a45' }} className="truncate">{event.company}</span>
        {isHigh && <span style={{ color: '#c4a030', fontSize: '10px', marginLeft: 'auto' }}>★</span>}
      </div>
      <h3 style={{ color: '#2d1f14', fontSize: '12px', fontWeight: 600, lineHeight: 1.4, marginBottom: '4px',
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {event.title}
      </h3>
      <p style={{ color: '#8a7a65', fontSize: '10px', lineHeight: 1.5,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {event.description}
      </p>
      <p style={{ color: '#b0a090', fontSize: '10px', fontFamily: 'monospace', marginTop: '8px' }}>{event.date}</p>
    </div>
  )
}
