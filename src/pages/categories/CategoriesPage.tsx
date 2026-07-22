import { useState } from 'react'
import { Link } from 'react-router-dom'
import { EmptyState } from '../../components/common/EmptyState'
import { PageHeader } from '../../components/common/PageHeader'
import { AppLayout } from '../../layouts/AppLayout'
import { formatCompactNumber } from '../../lib/format'
import { categories } from '../../services/homeService'

const descriptions: Record<string, string> = { Politics: 'Elections, governance & world affairs', Technology: 'AI, gadgets, software & innovation', Sports: 'Football, basketball, Olympics & more', Food: 'Cuisine, recipes & food debates', Lifestyle: 'Health, relationships & daily life', Entertainment: 'Movies, music, gaming & culture', Economy: 'Finance, markets & business', Environment: 'Climate, sustainability & nature', Education: 'Schools, universities & learning', Science: 'Research, discoveries & space', Gaming: 'Video games, esports & gaming culture', AI: 'Artificial intelligence & machine learning' }

export function CategoriesPage() {
  const [search, setSearch] = useState(''); const [selected, setSelected] = useState<string | null>(null); const filtered = categories.filter(category => category.name.toLowerCase().includes(search.toLowerCase()))
  return <AppLayout><PageHeader title="All Categories" subtitle="Browse all poll topics and find what interests you." /><input className="wide-search" value={search} onChange={event => setSearch(event.target.value)} placeholder="⌕  Search categories..." /><section className="content-grid"><div className="category-page-grid">{filtered.map(category => <button className={`category-detail ${selected === category.id ? 'selected' : ''}`} onClick={() => setSelected(selected === category.id ? null : category.id)} key={category.id}><span>{category.icon}</span><b>{category.name}</b><small>{descriptions[category.name] ?? 'Discover polls and global conversations'}</small><em>{formatCompactNumber(category.polls)} polls</em></button>)}</div><aside className="sidebar">{selected ? <div className="panel"><h3>{categories.find(category => category.id === selected)?.name}</h3><p>Explore the latest opinions, trends and discussions in this category.</p><Link className="primary-button" to="/explore">Browse polls</Link></div> : <EmptyState title="Choose a category" text="Select a card to see more details." />}</aside></section></AppLayout>
}
