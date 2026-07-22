import { Link } from 'react-router-dom'

interface EmptyStateProps { title: string; text: string; action?: boolean }

export function EmptyState({ title, text, action }: EmptyStateProps) {
  return <div className="empty"><span>◇</span><h2>{title}</h2><p>{text}</p>{action && <Link className="primary-button" to="/">Back home</Link>}</div>
}
