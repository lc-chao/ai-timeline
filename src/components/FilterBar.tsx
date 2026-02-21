import { useEffect } from 'react'
import type { EventType } from '../types'

const COMPANIES = ['OpenAI','Anthropic','Google DeepMind','Meta AI','Mistral','xAI','智谱AI','MiniMax','Kimi','阿里千问','字节豆包']
const TYPES: { value: EventType | 'all'; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'model', label: '🤖 模型' },
  { value: 'product', label: '🚀 产品' },
  { value: 'funding', label: '💰 融资' },
  { value: 'policy', label: '📋 政策' },
  { value: 'milestone', label: '⭐ 里程碑' },
]

export function FilterBar({
  selectedCompany, selectedType, view,
  onCompanyChange, onTypeChange, onViewChange,
}: {
  selectedCompany: string
  selectedType: string
  view: 'timeline' | 'company'
  onCompanyChange: (c: string) => void
  onTypeChange: (t: string) => void
  onViewChange: (v: 'timeline' | 'company') => void
}) {
  // ESC 清除筛选
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCompanyChange('all')
        onTypeChange('all')
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onCompanyChange, onTypeChange])

  return (
    <div className="sticky top-0 z-20 bg-gray-950/90 backdrop-blur-sm border-b border-gray-800/50 -mx-6 px-6 py-3 mb-8">
      <div className="max-w-5xl mx-auto space-y-2">
        {/* 视图切换 */}
        <div className="flex gap-2">
          {(['timeline', 'company'] as const).map(v => (
            <button
              key={v}
              onClick={() => onViewChange(v)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                view === v
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                  : 'border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300'
              }`}
            >
              {v === 'timeline' ? '⏱ 时间轴' : '🏢 按公司'}
            </button>
          ))}
          {(selectedCompany !== 'all' || selectedType !== 'all') && (
            <button
              onClick={() => { onCompanyChange('all'); onTypeChange('all') }}
              className="ml-auto px-3 py-1.5 rounded-lg text-xs border border-gray-700 text-gray-500 hover:border-red-500/50 hover:text-red-400 transition-colors"
            >
              ✕ 清除筛选 <span className="opacity-40 ml-1">ESC</span>
            </button>
          )}
        </div>

        {/* 筛选行 */}
        <div className="flex flex-wrap gap-2 items-center">
          <select
            value={selectedCompany}
            onChange={e => onCompanyChange(e.target.value)}
            className="bg-gray-900 border border-gray-700 text-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-cyan-500"
          >
            <option value="all">所有公司</option>
            {COMPANIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <div className="flex gap-1.5 flex-wrap">
            {TYPES.map(t => (
              <button
                key={t.value}
                onClick={() => onTypeChange(t.value)}
                className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                  selectedType === t.value
                    ? 'bg-cyan-500 border-cyan-500 text-black font-semibold'
                    : 'border-gray-700 text-gray-400 hover:border-cyan-500/50 hover:text-cyan-400'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
