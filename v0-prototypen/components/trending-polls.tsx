'use client'

import Link from 'next/link'
import { MessageSquare, ThumbsUp, Users, Flame, ArrowRight, Wifi } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { trendingPolls } from '@/lib/mock-data'

function formatVotes(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
  return n.toString()
}

export default function TrendingPolls() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
          {/* Main polls grid */}
          <div>
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="size-5 text-[oklch(0.65_0.22_27)]" />
                <div>
                  <h2 className="text-lg font-bold text-foreground">Trending Now</h2>
                  <p className="text-xs text-muted-foreground">The most voted topics right now</p>
                </div>
              </div>
              <Link href="/explore">
                <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary/80 text-xs">
                  View all
                  <ArrowRight className="size-3" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {trendingPolls.slice(0, 4).map((poll) => (
                <Link key={poll.id} href={`/poll/${poll.id}`}>
                  <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 cursor-pointer">
                    {/* Image */}
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={poll.image}
                        alt={poll.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-background/30" />
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
                        <Badge variant="secondary" className="mb-2 text-[10px] px-2 py-0.5">
                          {poll.category}
                        </Badge>
                        <h3 className="text-sm font-semibold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {poll.title}
                        </h3>
                      </div>

                      {/* Progress bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-[oklch(0.65_0.20_142)]">{poll.yesPercent}%</span>
                          <span className="text-[oklch(0.63_0.22_27)]">{poll.noPercent}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-[oklch(0.65_0.20_142)]"
                            style={{ width: `${poll.yesPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-auto">
                        <div className="flex items-center gap-1">
                          <Users className="size-3" />
                          {formatVotes(poll.votes)} votes
                        </div>
                        <span>{poll.timeAgo}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          {/* Live Stats sidebar */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <div className="mb-4 flex items-center gap-2">
                <div className="size-5 text-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground text-sm">Live Stats</h3>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Votes Today', value: '1.2M', change: '+18.6%', icon: '🗳' },
                  { label: 'Active Users', value: '85.4K', change: '+12.4%', icon: '👥' },
                  { label: 'Polls Created', value: '312', change: '+7.8%', icon: '📊' },
                  { label: 'Countries Voting', value: '195', change: '+9.3%', icon: '🌍' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{stat.icon}</span>
                      <span className="text-xs text-muted-foreground">{stat.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{stat.value}</span>
                      <span className="text-[11px] font-medium text-[oklch(0.65_0.20_142)]">{stat.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <Link href="/statistics">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    View Full Statistics
                  </Button>
                </Link>
              </div>
            </div>

            {/* Most active */}
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <h3 className="mb-4 font-semibold text-sm text-foreground">Top Countries Today</h3>
              <div className="space-y-2.5">
                {[
                  { flag: '🇸🇬', name: 'Singapore', pct: 89 },
                  { flag: '🇸🇪', name: 'Sweden', pct: 87 },
                  { flag: '🇯🇵', name: 'Japan', pct: 85 },
                  { flag: '🇨🇦', name: 'Canada', pct: 82 },
                  { flag: '🇩🇪', name: 'Germany', pct: 81 },
                ].map((c, i) => (
                  <div key={c.name} className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-4">{i + 1}.</span>
                    <span className="text-base">{c.flag}</span>
                    <span className="flex-1 text-xs text-foreground">{c.name}</span>
                    <span className="text-xs font-semibold text-[oklch(0.65_0.20_142)]">{c.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
