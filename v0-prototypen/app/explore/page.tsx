'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, SlidersHorizontal, Users, MessageSquare, Heart, Wifi, Flame, TrendingUp, Clock } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { trendingPolls } from '@/lib/mock-data'

const allPolls = [
  ...trendingPolls,
  {
    id: '7', title: 'Should social media be regulated?', category: 'Technology',
    votes: 88200, comments: 3100, likes: 5400, yesPercent: 67, noPercent: 33,
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80',
    trending: false, timeAgo: '25m ago', isLive: true,
  },
  {
    id: '8', title: 'Is nuclear energy the future of clean power?', category: 'Environment',
    votes: 54100, comments: 1820, likes: 3900, yesPercent: 59, noPercent: 41,
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80',
    trending: false, timeAgo: '1h ago', isLive: false,
  },
  {
    id: '9', title: 'Should college education be free?', category: 'Education',
    votes: 142000, comments: 6800, likes: 9200, yesPercent: 74, noPercent: 26,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80',
    trending: true, timeAgo: '2h ago', isLive: false,
  },
]

const sortOptions = ['Most Voted', 'Trending', 'Newest', 'Most Comments']
const filterCategories = ['All', 'Politics', 'Technology', 'Sports', 'Food', 'Lifestyle', 'Environment', 'Education']

function formatNum(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
  return n.toString()
}

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeSort, setActiveSort] = useState('Most Voted')
  const [search, setSearch] = useState('')

  const filtered = allPolls.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-screen-2xl px-4 py-8 md:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Explore Polls</h1>
          <p className="mt-1 text-muted-foreground text-sm">Discover what people around the world are voting on</p>
        </div>

        {/* Search + filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 max-w-md">
            <Search className="size-4 text-muted-foreground shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground"
              placeholder="Search polls, topics or questions..."
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {sortOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setActiveSort(opt)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeSort === opt ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {opt === 'Trending' && <Flame className="size-3" />}
                {opt === 'Newest' && <Clock className="size-3" />}
                {opt === 'Most Voted' && <TrendingUp className="size-3" />}
                {opt === 'Most Comments' && <MessageSquare className="size-3" />}
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Category tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-primary/15 text-primary border border-primary/30'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((poll) => (
            <Link key={poll.id} href={`/poll/${poll.id}`}>
              <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 cursor-pointer h-full">
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={poll.image}
                    alt={poll.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-background/25" />
                  {poll.trending && (
                    <Badge className="absolute left-3 top-3 gap-1 bg-[oklch(0.63_0.22_27)] text-white border-0 text-[10px] px-2 py-0.5">
                      <Flame className="size-2.5" />
                      Trending
                    </Badge>
                  )}
                  {poll.isLive && (
                    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/80 backdrop-blur px-2 py-0.5 text-[10px] text-[oklch(0.65_0.20_142)] font-medium">
                      <Wifi className="size-2.5" />
                      Live
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div>
                    <Badge variant="secondary" className="mb-2 text-[10px] px-2 py-0.5">{poll.category}</Badge>
                    <h3 className="text-sm font-semibold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {poll.title}
                    </h3>
                  </div>

                  {/* Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-[oklch(0.65_0.20_142)]">{poll.yesPercent}%</span>
                      <span className="text-[oklch(0.63_0.22_27)]">{poll.noPercent}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-[oklch(0.65_0.20_142)]" style={{ width: `${poll.yesPercent}%` }} />
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-auto pt-1 border-t border-border/40">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1"><Users className="size-3" />{formatNum(poll.votes)}</span>
                      <span className="flex items-center gap-1"><MessageSquare className="size-3" />{formatNum(poll.comments)}</span>
                    </div>
                    <span>{poll.timeAgo}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-foreground">No polls found</h3>
            <p className="text-sm text-muted-foreground mt-1">Try a different search or category</p>
          </div>
        )}

        {/* Load more */}
        {filtered.length > 0 && (
          <div className="mt-10 flex justify-center">
            <Button variant="outline" size="lg" className="px-10">
              Load More Polls
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
