import { motion } from 'framer-motion'
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

const typeLabels: Record<string, string> = {
  model: '🤖 模型', product: '🚀 产品', funding: '💰 融资', policy: '📋 政策', milestone: '⭐ 里程碑'
}

export function CompanyView({ events }: { events: Event[] }) {
  const grouped: Record<string, Event[]> = {}
  for (const e of events) {
    if (!grouped[e.company]) grouped[e.company] = []
    grouped[e.company].push(e)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.entries(grouped)
        .sort((a, b) => b[1].length - a[1].length)
        .map(([company, evts], ci) => (
          <motion.div
            key={company}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: ci * 0.05 }}
            className="bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden"
          >
            <div className={`px-5 py-3 bg-gradient-to-r ${companyColors[company] ?? 'from-gray-500 to-gray-600'} flex items-center justify-between`}>
              <span className="font-bold text-white">{company}</span>
              <span className="text-white/70 text-xs">{evts.length} 个事件</span>
            </div>
            <div className="divide-y divide-gray-800/60">
              {evts.sort((a, b) => b.date.localeCompare(a.date)).map(e => (
                <div key={e.id} className="px-5 py-3 hover:bg-gray-800/40 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-600 text-xs font-mono">{e.date}</span>
                    <span className="text-gray-600 text-xs">{typeLabels[e.type]}</span>
                    {e.importance === 'high' && <span className="text-yellow-400 text-xs">★</span>}
                  </div>
                  <p className="text-white text-sm font-medium">{e.title}</p>
                  <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{e.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
    </div>
  )
}
