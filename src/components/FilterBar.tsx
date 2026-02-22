import { useEffect } from 'react'

const YEARS = ['2022', '2023', '2024', '2025', '2026']
const COMPANIES = ['OpenAI','Anthropic','Google DeepMind','Meta AI','Mistral','xAI','智谱AI','MiniMax','Kimi','阿里千问','字节豆包','OpenClaw']

export function FilterBar({
  selectedCompany, selectedYear,
  onCompanyChange, onYearChange,
}: {
  selectedCompany: string
  selectedYear: string
  onCompanyChange: (c: string) => void
  onYearChange: (y: string) => void
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onCompanyChange('all'); onYearChange('all') }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onCompanyChange, onYearChange])

  return (
    <div className="skeu-panel sticky top-0 z-20 -mx-6 px-6 py-3 mb-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-2">
        <div className="flex gap-1.5 flex-wrap items-center">
          <button
            onClick={() => onYearChange('all')}
            className={`skeu-btn px-3 py-1.5 rounded-lg text-xs ${selectedYear === 'all' ? 'skeu-btn-active' : ''}`}
            style={{ color: selectedYear === 'all' ? '#4a3728' : '#8a7a65', fontWeight: selectedYear === 'all' ? 600 : 400 }}
          >ALL</button>
          {YEARS.map(y => (
            <button
              key={y}
              onClick={() => onYearChange(selectedYear === y ? 'all' : y)}
              className={`skeu-btn px-3 py-1.5 rounded-lg text-xs ${selectedYear === y ? 'skeu-btn-active' : ''}`}
              style={{ color: selectedYear === y ? '#4a3728' : '#8a7a65', fontWeight: selectedYear === y ? 600 : 400 }}
            >{y}</button>
          ))}
        </div>
        <div className="flex gap-1.5 flex-wrap items-center">
          <button
            onClick={() => onCompanyChange('all')}
            className={`skeu-btn px-3 py-1.5 rounded-lg text-xs ${selectedCompany === 'all' ? 'skeu-btn-active' : ''}`}
            style={{ color: selectedCompany === 'all' ? '#4a3728' : '#8a7a65', fontWeight: selectedCompany === 'all' ? 600 : 400 }}
          >ALL</button>
          {COMPANIES.map(c => (
            <button
              key={c}
              onClick={() => onCompanyChange(selectedCompany === c ? 'all' : c)}
              className={`skeu-btn px-3 py-1.5 rounded-lg text-xs ${selectedCompany === c ? 'skeu-btn-active' : ''}`}
              style={{ color: selectedCompany === c ? '#4a3728' : '#8a7a65', fontWeight: selectedCompany === c ? 600 : 400 }}
            >{c}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
