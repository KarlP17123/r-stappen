import { useMemo, useState } from 'react'
import { PageHeader } from '../../components/common/PageHeader'
import { PollListCard } from '../../components/polls/PollListCard'
import { AppLayout } from '../../layouts/AppLayout'
import { trendingPolls } from '../../services/homeService'

export function TrendingPage() {
  const [tab, setTab] = useState('Hot'); const sorted = useMemo(() => [...trendingPolls].sort((a, b) => tab === 'Most voted' ? b.votes - a.votes : tab === 'Rising' ? b.noPercent - a.noPercent : 0), [tab])
  return <AppLayout><PageHeader icon="♨" title="Trending Now" subtitle="The hottest polls the world is voting on right now." /><div className="tabs">{['Hot', 'Rising', 'New', 'Most voted'].map(item => <button className={tab === item ? 'selected' : ''} onClick={() => setTab(item)} key={item}>{item}</button>)}</div><section className="content-grid"><div className="poll-list">{sorted.map((poll, index) => <PollListCard key={poll.id} poll={poll} rank={index + 1} />)}</div><aside className="sidebar"><div className="panel"><h3>Trending Topics</h3>{['#AIDebate', '#WorldLeaders2030', '#ClimateAction', '#MarsColony'].map((item, index) => <div className="side-link" key={item}><span>{item}</span><small>+{18-index*3}%</small></div>)}</div><div className="panel highlighted"><h3>● Live Vote Counter</h3><strong>1,241,328</strong><p>votes cast today</p></div></aside></section></AppLayout>
}
