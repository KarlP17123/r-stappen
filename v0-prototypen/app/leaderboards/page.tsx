'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Trophy, Medal, Users, Globe, TrendingUp, Crown, Star } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { topCountries, leaderboardUsers, trendingPolls } from '@/lib/mock-data'

const topCreators = [
  { rank: 1, name: 'GlobalVoter', username: '@globalvoter', polls: 342, votes: '2.1M', country: '🇸🇪', badge: 'Opinion Master' },
  { rank: 2, name: 'PoliticsNerd', username: '@politicsnerd', polls: 198, votes: '1.4M', country: '🇺🇸', badge: 'Top Creator' },
  { rank: 3, name: 'TechOracle', username: '@techoracle', polls: 256, votes: '1.1M', country: '🇯🇵', badge: 'Trend Spotter' },
  { rank: 4, name: 'WorldWatcher', username: '@worldwatcher', polls: 143, votes: '890K', country: '🇩🇪', badge: 'Commentator' },
  { rank: 5, name: 'VoiceOfEurope', username: '@voiceeu', polls: 87, votes: '620K', country: '🇫🇷', badge: 'Rising Star' },
  { rank: 6, name: 'SportsFan99', username: '@sportsfan99', polls: 112, votes: '540K', country: '🇧🇷', badge: 'Sports Expert' },
  { rank: 7, name: 'ScienceNow', username: '@sciencenow', polls: 94, votes: '410K', country: '🇬🇧', badge: 'Scientist' },
  { rank: 8, name: 'AsiaPulse', username: '@asiapulse', polls: 76, votes: '380K', country: '🇸🇬', badge: 'Asia Voice' },
]

const popularPolls = [
  { rank: 1, title: 'Is Messi the GOAT?', votes: '2.1M', category: 'Sports', trend: '+22%' },
  { rank: 2, title: 'Is AI good for society?', votes: '1.8M', category: 'Technology', trend: '+18%' },
  { rank: 3, title: 'Should college be free?', votes: '1.4M', category: 'Education', trend: '+14%' },
  { rank: 4, title: 'Climate change — who\'s responsible?', votes: '1.2M', category: 'Environment', trend: '+11%' },
  { rank: 5, title: 'Pizza or Burger?', votes: '980K', category: 'Food', trend: '+8%' },
  { rank: 6, title: 'Democracy vs Autocracy?', votes: '870K', category: 'Politics', trend: '+7%' },
  { rank: 7, title: 'Remote work — better or worse?', votes: '760K', category: 'Lifestyle', trend: '+6%' },
  { rank: 8, title: 'Universal Basic Income?', votes: '640K', category: 'Economy', trend: '+5%' },
]

const tabs = [
  { id: 'users', label: 'Most Active Users', icon: Users },
  { id: 'creators', label: 'Top Creators', icon: Star },
  { id: 'countries', label: 'Top Countries', icon: Globe },
  { id: 'polls', label: 'Popular Polls', icon: TrendingUp },
]

const rankColors = [
  'text-[oklch(0.75_0.15_80)]',
  'text-[oklch(0.70_0.05_265)]',
  'text-[oklch(0.63_0.12_27)]',
]

export default function LeaderboardsPage() {
  const [activeTab, setActiveTab] = useState('users')

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-screen-2xl px-4 py-8 md:px-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 flex justify-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/20">
              <Trophy className="size-7 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Leaderboards</h1>
          <p className="mt-2 text-sm text-muted-foreground">The most influential voices on People&apos;s Opinion Map</p>
        </div>

        {/* Top 3 podium */}
        <div className="mb-8 flex items-end justify-center gap-4">
          {/* 2nd place */}
          <div className="flex flex-col items-center gap-2">
            <Avatar className="size-14 ring-2 ring-[oklch(0.70_0.05_265)]">
              <AvatarFallback className="bg-[oklch(0.70_0.05_265)]/20 text-[oklch(0.70_0.05_265)] font-bold">PN</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <div className="text-xs font-semibold text-foreground">PoliticsNerd</div>
              <div className="text-[10px] text-muted-foreground">1.4M votes</div>
            </div>
            <div className="flex h-16 w-20 items-center justify-center rounded-t-xl bg-[oklch(0.70_0.05_265)]/20 border border-[oklch(0.70_0.05_265)]/30">
              <div className="flex flex-col items-center">
                <Medal className="size-5 text-[oklch(0.70_0.05_265)]" />
                <span className="text-lg font-bold text-[oklch(0.70_0.05_265)]">2</span>
              </div>
            </div>
          </div>

          {/* 1st place */}
          <div className="flex flex-col items-center gap-2">
            <Crown className="size-5 text-[oklch(0.75_0.15_80)]" />
            <Avatar className="size-16 ring-2 ring-[oklch(0.75_0.15_80)]">
              <AvatarFallback className="bg-[oklch(0.75_0.15_80)]/20 text-[oklch(0.75_0.15_80)] font-bold text-lg">GV</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <div className="text-sm font-bold text-foreground">GlobalVoter</div>
              <div className="text-[10px] text-muted-foreground">2.1M votes</div>
            </div>
            <div className="flex h-24 w-24 items-center justify-center rounded-t-xl bg-[oklch(0.75_0.15_80)]/20 border border-[oklch(0.75_0.15_80)]/30">
              <div className="flex flex-col items-center">
                <Trophy className="size-6 text-[oklch(0.75_0.15_80)]" />
                <span className="text-2xl font-bold text-[oklch(0.75_0.15_80)]">1</span>
              </div>
            </div>
          </div>

          {/* 3rd place */}
          <div className="flex flex-col items-center gap-2">
            <Avatar className="size-14 ring-2 ring-[oklch(0.63_0.12_27)]">
              <AvatarFallback className="bg-[oklch(0.63_0.12_27)]/20 text-[oklch(0.63_0.12_27)] font-bold">TO</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <div className="text-xs font-semibold text-foreground">TechOracle</div>
              <div className="text-[10px] text-muted-foreground">1.1M votes</div>
            </div>
            <div className="flex h-12 w-20 items-center justify-center rounded-t-xl bg-[oklch(0.63_0.12_27)]/20 border border-[oklch(0.63_0.12_27)]/30">
              <div className="flex flex-col items-center">
                <Medal className="size-5 text-[oklch(0.63_0.12_27)]" />
                <span className="text-lg font-bold text-[oklch(0.63_0.12_27)]">3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div className="mb-6 flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="size-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <div>
            {activeTab === 'users' && (
              <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
                <div className="p-4 border-b border-border/40 grid grid-cols-12 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  <span className="col-span-1">#</span>
                  <span className="col-span-5">User</span>
                  <span className="col-span-2 text-right">Votes</span>
                  <span className="col-span-2 text-right">Polls</span>
                  <span className="col-span-2 text-right">Action</span>
                </div>
                {leaderboardUsers.map((user) => (
                  <div key={user.rank} className="grid grid-cols-12 items-center px-4 py-3.5 border-b border-border/40 last:border-0 hover:bg-accent/30 transition-colors">
                    <div className={`col-span-1 text-sm font-bold ${rankColors[user.rank - 1] ?? 'text-muted-foreground'}`}>
                      {user.rank <= 3 ? (
                        user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'
                      ) : user.rank}
                    </div>
                    <Link href="/profile" className="col-span-5 flex items-center gap-3 group/user">
                      <Avatar className="size-9">
                        <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                          {user.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-medium text-foreground group-hover/user:text-primary transition-colors">{user.name}</span>
                          <span className="text-base">{user.country}</span>
                        </div>
                        <div className="text-[10px] text-muted-foreground">{user.username}</div>
                      </div>
                    </Link>
                    <div className="col-span-2 text-right text-sm font-semibold text-foreground">{(user.votes / 1000).toFixed(1)}K</div>
                    <div className="col-span-2 text-right text-sm font-semibold text-foreground">{user.polls}</div>
                    <div className="col-span-2 text-right">
                      <Button variant="outline" size="sm" className="text-[10px] h-7 px-2">Follow</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'creators' && (
              <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
                <div className="p-4 border-b border-border/40 grid grid-cols-12 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  <span className="col-span-1">#</span>
                  <span className="col-span-5">Creator</span>
                  <span className="col-span-2 text-right">Polls</span>
                  <span className="col-span-2 text-right">Total Votes</span>
                  <span className="col-span-2 text-right">Badge</span>
                </div>
                {topCreators.map((user) => (
                  <div key={user.rank} className="grid grid-cols-12 items-center px-4 py-3.5 border-b border-border/40 last:border-0 hover:bg-accent/30 transition-colors">
                    <div className={`col-span-1 text-sm font-bold ${rankColors[user.rank - 1] ?? 'text-muted-foreground'}`}>
                      {user.rank <= 3 ? (user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉') : user.rank}
                    </div>
                    <Link href="/profile" className="col-span-5 flex items-center gap-3 group/creator">
                      <Avatar className="size-9">
                        <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                          {user.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-medium text-foreground group-hover/creator:text-primary transition-colors">{user.name}</span>
                          <span>{user.country}</span>
                        </div>
                        <div className="text-[10px] text-muted-foreground">{user.username}</div>
                      </div>
                    </Link>
                    <div className="col-span-2 text-right text-sm font-semibold text-foreground">{user.polls}</div>
                    <div className="col-span-2 text-right text-sm font-semibold text-foreground">{user.votes}</div>
                    <div className="col-span-2 text-right">
                      <Badge variant="secondary" className="text-[9px] px-1.5">{user.badge}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'countries' && (
              <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
                <div className="p-4 border-b border-border/40 grid grid-cols-12 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  <span className="col-span-1">#</span>
                  <span className="col-span-5">Country</span>
                  <span className="col-span-4 text-right">Agree %</span>
                  <span className="col-span-2 text-right">Bar</span>
                </div>
                {topCountries.map((c) => (
                  <Link key={c.rank} href="/map" className="grid grid-cols-12 items-center px-4 py-3.5 border-b border-border/40 last:border-0 hover:bg-accent/30 transition-colors cursor-pointer">
                    <div className={`col-span-1 text-sm font-bold ${rankColors[c.rank - 1] ?? 'text-muted-foreground'}`}>
                      {c.rank <= 3 ? (c.rank === 1 ? '🥇' : c.rank === 2 ? '🥈' : '🥉') : c.rank}
                    </div>
                    <div className="col-span-5 flex items-center gap-2">
                      <span className="text-xl">{c.flag}</span>
                      <span className="text-sm font-medium text-foreground">{c.country}</span>
                    </div>
                    <div className="col-span-4 text-right text-sm font-semibold text-[oklch(0.65_0.20_142)]">{c.percent}%</div>
                    <div className="col-span-2 flex justify-end">
                      <div className="w-16 h-1.5 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-[oklch(0.65_0.20_142)]" style={{ width: `${c.percent}%` }} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {activeTab === 'polls' && (
              <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
                <div className="p-4 border-b border-border/40 grid grid-cols-12 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  <span className="col-span-1">#</span>
                  <span className="col-span-5">Poll</span>
                  <span className="col-span-2 text-right">Category</span>
                  <span className="col-span-2 text-right">Votes</span>
                  <span className="col-span-2 text-right">Trend</span>
                </div>
                {popularPolls.map((poll) => (
                  <Link key={poll.rank} href={`/poll/${poll.rank}`} className="grid grid-cols-12 items-center px-4 py-3.5 border-b border-border/40 last:border-0 hover:bg-accent/30 transition-colors cursor-pointer group/poll">
                    <div className={`col-span-1 text-sm font-bold ${rankColors[poll.rank - 1] ?? 'text-muted-foreground'}`}>
                      {poll.rank <= 3 ? (poll.rank === 1 ? '🥇' : poll.rank === 2 ? '🥈' : '🥉') : poll.rank}
                    </div>
                    <div className="col-span-5">
                      <span className="text-sm font-medium text-foreground group-hover/poll:text-primary transition-colors line-clamp-1">{poll.title}</span>
                    </div>
                    <div className="col-span-2 text-right">
                      <Badge variant="secondary" className="text-[9px] px-1.5">{poll.category}</Badge>
                    </div>
                    <div className="col-span-2 text-right text-sm font-semibold text-foreground">{poll.votes}</div>
                    <div className="col-span-2 text-right text-xs font-semibold text-[oklch(0.65_0.20_142)]">{poll.trend}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <h3 className="mb-4 font-semibold text-sm text-foreground">Your Ranking</h3>
              <Link href="/profile" className="flex items-center gap-3 mb-4 rounded-xl bg-primary/10 border border-primary/20 p-3 hover:bg-primary/15 transition-colors group/profile">
                <Avatar className="size-10">
                  <AvatarFallback className="bg-primary/20 text-primary font-bold">GV</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground group-hover/profile:text-primary transition-colors">GlobalVoter</div>
                  <div className="text-[10px] text-muted-foreground">Rank #1 globally</div>
                </div>
                <Trophy className="size-6 text-[oklch(0.75_0.15_80)]" />
              </Link>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Votes Cast', value: '12.4K' },
                  { label: 'Polls Created', value: '342' },
                  { label: 'Followers', value: '1.2K' },
                  { label: 'Score', value: '98.7' },
                ].map((s) => (
                  <div key={s.label} className="text-center rounded-xl bg-accent/50 p-3">
                    <div className="text-base font-bold text-foreground">{s.value}</div>
                    <div className="text-[10px] text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <h3 className="mb-3 font-semibold text-sm text-foreground">Weekly Leaders</h3>
              <div className="flex flex-col gap-2.5">
                {leaderboardUsers.slice(0, 4).map((user) => (
                  <div key={user.rank} className="flex items-center gap-2">
                    <span className="w-5 text-xs text-muted-foreground">{user.rank}.</span>
                    <Avatar className="size-7">
                      <AvatarFallback className="bg-primary/20 text-primary text-[10px] font-bold">
                        {user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="flex-1 text-xs font-medium text-foreground truncate">{user.name}</span>
                    <span className="text-xs font-semibold text-primary">{(user.votes / 1000).toFixed(1)}K</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
