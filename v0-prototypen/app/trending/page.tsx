'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Flame, TrendingUp, Clock, Users, MessageSquare, Wifi, ArrowUp } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { trendingPolls } from '@/lib/mock-data'

const allTrending = [
  ...trendingPolls,
  {
    id: '7', title: 'Should social media be regulated?', category: 'Technology',
    votes: 88200, comments: 3100, likes: 5400, yesPercent: 67, noPercent: 33,
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80',
    trending: true, timeAgo: '25m ago', isLive: true,
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

const tabOptions = [
  { id: 'hot', label: 'Hot', icon: Flame },
  { id: 'rising', label: 'Rising', icon: ArrowUp },
  { id: 'new', label: 'New', icon: Clock },
  { id: 'most-voted', label: 'Most Voted', icon: TrendingUp },
]

function formatNum(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
  return n.toString()
}

export default function TrendingPage() {
  const [activeTab, setActiveTab] = useState('hot')

  const sorted = [...allTrending].sort((a, b) => {
    if (activeTab === 'most-voted') return b.votes - a.votes
    if (activeTab === 'new') return a.timeAgo.localeCompare(b.timeAgo)
    if (activeTab === 'rising') return b.comments - a.comments
    return b.votes - a.votes
  })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-screen-2xl px-4 py-8 md:px-6">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-[oklch(0.63_0.22_27)]/15">
            <Flame className="size-6 text-[oklch(0.63_0.22_27)]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Trending Now</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">The hottest polls the world is voting on right now</p>
          </div>
        </div>

        {/* Tab bar */}
        <div className="mb-6 flex gap-2">
          {tabOptions.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="size-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
          {/* Polls list */}
          <div className="flex flex-col gap-4">
            {sorted.map((poll, i) => (
              <Link key={poll.id} href={`/poll/${poll.id}`}>
                <article className="group flex gap-5 rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 cursor-pointer">
                  {/* Rank */}
                  <div className="flex shrink-0 size-10 items-center justify-center rounded-xl bg-accent text-lg font-bold text-muted-foreground">
                    {i + 1}
                  </div>

                  {/* Image */}
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
                    <img src={poll.image} alt={poll.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    {poll.isLive && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-background/80 backdrop-blur px-1.5 py-0.5 text-[9px] text-[oklch(0.65_0.20_142)] font-medium">
                        <Wifi className="size-2" />
                        Live
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-1.5 flex items-center gap-2">
                      <Badge variant="secondary" className="text-[10px] px-2">{poll.category}</Badge>
                      {poll.trending && (
                        <span className="flex items-center gap-1 text-[10px] font-medium text-[oklch(0.63_0.22_27)]">
                          <Flame className="size-3" />
                          Trending
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {poll.title}
                    </h3>

                    {/* Progress */}
                    <div className="my-2.5 space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-[oklch(0.65_0.20_142)]">{poll.yesPercent}%</span>
                        <span className="text-[oklch(0.63_0.22_27)]">{poll.noPercent}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-[oklch(0.65_0.20_142)]" style={{ width: `${poll.yesPercent}%` }} />
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="size-3" />{formatNum(poll.votes)}</span>
                      <span className="flex items-center gap-1"><MessageSquare className="size-3" />{formatNum(poll.comments)}</span>
                      <span className="ml-auto">{poll.timeAgo}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            {/* Trending topics */}
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <h3 className="mb-4 font-semibold text-sm text-foreground">Trending Topics</h3>
              <div className="flex flex-col gap-2">
                {[
                  { tag: '#AIDebate', votes: '125K', change: '+18%' },
                  { tag: '#WorldLeaders2030', votes: '98K', change: '+14%' },
                  { tag: '#ClimateAction', votes: '72K', change: '+11%' },
                  { tag: '#MarsColony', votes: '61K', change: '+8%' },
                  { tag: '#ElectricVehicles', votes: '54K', change: '+6%' },
                  { tag: '#FreeCollege', votes: '49K', change: '+5%' },
                ].map((item) => (
                  <div key={item.tag} className="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-accent transition-colors cursor-pointer">
                    <div>
                      <div className="text-xs font-semibold text-primary">{item.tag}</div>
                      <div className="text-[10px] text-muted-foreground">{item.votes} votes today</div>
                    </div>
                    <span className="text-[10px] font-semibold text-[oklch(0.65_0.20_142)]">{item.change}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live vote counter */}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="size-2 rounded-full bg-[oklch(0.65_0.20_142)] animate-pulse" />
                <span className="text-sm font-semibold text-foreground">Live Vote Counter</span>
              </div>
              <div className="text-3xl font-bold text-foreground">1,241,328</div>
              <div className="text-xs text-muted-foreground mt-1">votes cast today</div>
              <div className="mt-3 flex items-center gap-2 text-xs text-[oklch(0.65_0.20_142)] font-medium">
                <TrendingUp className="size-3.5" />
                +18.6% vs yesterday
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
