import type { EventType } from '../types'

const COMPANIES = ['OpenAI','Anthropic','Google DeepMind','Meta AI','Mistral','xAI','智谱AI','MiniMax','Kimi','阿里千问','字节豆包']
const TYPES: { value: EventType | 'all'; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'model', label: '模型' },
  { value: 'product', label: '产品' },
  { value: 'funding', label: '融资' },
  { value: 'policy', label: '政策' },
  { value: 'milestone', label: '里程碑' },
]

export function FilterBar({
  selectedCompany, selectedType,
  onCompanyChange, onTypeChange,
}: {
  selectedCompany: string
  selectedType: string
  onCompanyChange: (c: string) => void
  onTypeChange: (t: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-3 mb-10">
      <select
        value={selectedCompany}
        onChange={e => onCompanyChange(e.target.value)}
        className="bg-gray-900 border border-gray-700 text-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-cyan-500"
      >
        <option value="all">所有公司</option>
        {COMPANIES.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <div className="flex gap-2 flex-wrap">
        {TYPES.map(t => (
          <button
            key={t.value}
            onClick={() => onTypeChange(t.value)}
            className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
              selectedType === t.value
                ? 'bg-cyan-500 border-cyan-500 text-black font-medium'
                : 'border-gray-700 text-gray-400 hover:border-cyan-500 hover:text-cyan-400'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}
