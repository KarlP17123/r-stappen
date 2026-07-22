import { Link } from 'react-router-dom'
import { formatCompactNumber } from '../../lib/format'
import type { Poll } from '../../types/poll'

interface PollListCardProps { poll: Poll; rank?: number }

export function PollListCard({ poll, rank }: PollListCardProps) {
  return <Link to={`/poll/${poll.id}`} className="list-poll">{rank && <b className="rank">{rank}</b>}<img src={poll.image} alt="" /><div className="list-poll-copy"><span className="category-badge">{poll.category}</span><h3>{poll.title}</h3><div className="vote-line"><span>Yes {poll.yesPercent}%</span><span>No {poll.noPercent}%</span></div><div className="progress"><i style={{ width: `${poll.yesPercent}%` }} /></div><small>{formatCompactNumber(poll.votes)} votes · {poll.timeAgo}</small></div></Link>
}
