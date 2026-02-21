import type { Event } from '../types'

const companyColors: Record<string, string> = {
  'OpenAI': 'from-green-500 to-emerald-600',
  'Anthropic': 'from-orange-500 to-amber-600',
  'Google DeepMind': 'from-blue-500 to-cyan-600',
  'Meta AI': 'from-blue-600 to-indigo-600',
  'Mistral': 'from-purple-500 to-violet-600',
  'xAI': 'from-gray-400 to-gray-600',
  '智谱AI': 'from-red-500 to-rose-600',
  'MiniMax': 'from-pink-500 to-fuchsia-600',
  'Kimi': 'from-cyan-500 to-sky-600',
  '阿里千问': 'from-orange-400 to-yellow-500',
  '字节豆包': 'from-teal-500 to-green-600',
}

const typeLabels: Record<string, string> = {
  model: '模型', product: '产品', funding: '融资', policy: '政策', milestone: '里程碑'
}

export function EventCard({ event, index }: { event: Event; index: number }) {
  const isLeft = index % 2 === 0
  const color = companyColors[event.company] ?? 'from-gray-500 to-gray-600'

  return (
    <div className={`relative flex mb-10 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className="w-1/2 px-8">
        <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-5 hover:border-cyan-500/40 transition-colors cursor-default">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${color} text-white font-medium`}>
              {event.company}
            </span>
            <span className="text-xs text-gray-500 border border-gray-700 px-2 py-0.5 rounded-full">
              {typeLabels[event.type]}
            </span>
            {event.importance === 'high' && <span className="text-yellow-400 text-xs">⭐</span>}
          </div>
          <h3 className="text-white font-semibold mb-1">{event.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{event.description}</p>
          <p className="text-gray-600 text-xs mt-3">{event.date}</p>
        </div>
      </div>
      <div className="absolute left-1/2 top-5 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-500 border-2 border-gray-950 z-10" />
    </div>
  )
}
