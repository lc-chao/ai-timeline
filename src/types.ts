export type EventType = 'model' | 'product' | 'funding' | 'policy' | 'milestone'
export type Importance = 'high' | 'medium' | 'low'

export interface Event {
  id: string
  date: string
  company: string
  type: EventType
  title: string
  description: string
  importance: Importance
  link?: string
}
