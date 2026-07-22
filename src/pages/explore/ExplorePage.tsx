import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { EmptyState } from '../../components/common/EmptyState'
import { PageHeader } from '../../components/common/PageHeader'
import { PollListCard } from '../../components/polls/PollListCard'
import { AppLayout } from '../../layouts/AppLayout'
import { categories, trendingPolls } from '../../services/homeService'
import { formatCompactNumber } from '../../lib/format'

export function ExplorePage() {
  const [params] = useSearchParams(); const [query, setQuery] = useState(() => params.get('q') ?? ''); const [category, setCategory] = useState('All')
  const list = trendingPolls.filter(poll => (category === 'All' || poll.category === category) && poll.title.toLowerCase().includes(query.toLowerCase()))
  return <AppLayout><PageHeader title="Explore Polls" subtitle="Discover opinions and join conversations from around the world." /><div className="filterbar"><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search polls, topics..." aria-label="Search polls" />{['All', ...categories.slice(0, 6).map(item => item.name)].map(item => <button onClick={() => setCategory(item)} className={category === item ? 'selected' : ''} key={item}>{item}</button>)}</div><section className="content-grid"><div className="poll-list">{list.length ? list.map(poll => <PollListCard key={poll.id} poll={poll} />) : <EmptyState title="No polls found" text="Try another search or category." />}</div><aside className="sidebar"><div className="panel"><h3>Popular categories</h3>{categories.slice(0, 6).map(item => <Link className="side-link" to={`/explore?category=${item.id}`} key={item.id}><span>{item.icon} {item.name}</span><small>{formatCompactNumber(item.polls)}</small></Link>)}</div></aside></section></AppLayout>
}
