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

export function EventCard({ event, index }: { event: Event; index: number }) {
  const isLeft = index % 2 === 0
  const color = companyColors[event.company] ?? 'from-gray-500 to-gray-600'
  const dot = companyDots[event.company] ?? 'bg-gray-500'

  return (
    <div className={`relative flex mb-8 items-start ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* 卡片 */}
      <div className="w-[46%]">
        <div className={`group relative bg-gray-900/60 border rounded-xl p-5 transition-all duration-300
          ${event.importance === 'high'
            ? 'border-gray-700 hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/10'
            : 'border-gray-800 hover:border-gray-600'
          }`}>
          {/* 重要事件左侧高亮条 */}
          {event.importance === 'high' && (
            <div className={`absolute left-0 top-4 bottom-4 w-0.5 rounded-full bg-gradient-to-b ${color}`} />
          )}
          <div className="flex items-center gap-2 mb-2.5 flex-wrap">
            <span className={`text-xs px-2.5 py-0.5 rounded-full bg-gradient-to-r ${color} text-white font-medium`}>
              {event.company}
            </span>
            <span className="text-xs text-gray-500 px-2 py-0.5 rounded-full border border-gray-700/80">
              {typeLabels[event.type]}
            </span>
          </div>
          <h3 className="text-white font-semibold text-sm mb-1.5 leading-snug">{event.title}</h3>
          <p className="text-gray-400 text-xs leading-relaxed">{event.description}</p>
          <p className="text-gray-600 text-xs mt-3 font-mono">{event.date}</p>
        </div>
      </div>

      {/* 中轴节点 */}
      <div className="w-[8%] flex justify-center pt-5">
        <div className={`w-3 h-3 rounded-full border-2 border-gray-950 z-10 transition-transform duration-300 ${dot}`} />
      </div>

      {/* 占位 */}
      <div className="w-[46%]" />
    </div>
  )
}
