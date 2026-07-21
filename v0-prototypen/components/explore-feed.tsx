'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, MessageSquare, Share2, Bookmark, MoreHorizontal } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { exploreFeed } from '@/lib/mock-data'

function formatNum(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
  return n.toString()
}

export default function ExploreFeed() {
  const [liked, setLiked] = useState<Record<string, boolean>>({})

  return (
    <section className="py-10 border-t border-border/40">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
          <div>
            <h2 className="mb-5 text-lg font-bold text-foreground">Explore Feed</h2>
            <div className="flex flex-col gap-4">
              {exploreFeed.map((item) => (
                <article key={item.id} className="rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-border">
                  {/* User row */}
                  <div className="mb-4 flex items-center justify-between">
                    <Link href="/profile" className="flex items-center gap-3 group/user">
                      <Avatar className="size-9">
                        <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
                          {item.user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold text-foreground group-hover/user:text-primary transition-colors">{item.user.name}</span>
                          <span className="text-base">{item.user.country}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">{item.user.username} · {item.timeAgo}</div>
                      </div>
                    </Link>
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="size-4" />
                    </button>
                  </div>

                  {/* Poll question */}
                  <Link href={`/poll/${item.id}`} className="block mb-4 group/poll">
                    <Badge variant="secondary" className="mb-2 text-[10px]">{item.category}</Badge>
                    <h3 className="text-base font-semibold text-foreground group-hover/poll:text-primary transition-colors">{item.poll}</h3>
                  </Link>

                  {/* Results */}
                  <Link href={`/poll/${item.id}`} className="block mb-4 rounded-xl border border-border/60 bg-background/50 p-4 hover:border-primary/30 transition-colors">
                    <div className="mb-2 flex justify-between text-sm font-semibold">
                      <span className="text-[oklch(0.65_0.20_142)]">Yes — {item.result.yes}%</span>
                      <span className="text-[oklch(0.63_0.22_27)]">No — {item.result.no}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-[oklch(0.65_0.20_142)]"
                        style={{ width: `${item.result.yes}%` }}
                      />
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">{formatNum(item.result.votes)} total votes</div>
                  </Link>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setLiked((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-colors ${liked[item.id] ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`}
                    >
                      <Heart className={`size-3.5 ${liked[item.id] ? 'fill-current' : ''}`} />
                      Like
                    </button>
                    <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                      <MessageSquare className="size-3.5" />
                      {formatNum(item.comments)}
                    </button>
                    <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                      <Share2 className="size-3.5" />
                      Share
                    </button>
                    <button className="ml-auto flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                      <Bookmark className="size-3.5" />
                      Save
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar: Who to follow / top polls */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <h3 className="mb-4 font-semibold text-sm text-foreground">Top Creators This Week</h3>
              <div className="flex flex-col gap-3">
                {[
                  { name: 'GlobalVoter', username: '@globalvoter', polls: 342, avatar: 'GV' },
                  { name: 'PoliticsNerd', username: '@politicsnerd', polls: 198, avatar: 'PN' },
                  { name: 'TechOracle', username: '@techoracle', polls: 156, avatar: 'TO' },
                  { name: 'WorldWatcher', username: '@worldwatcher', polls: 143, avatar: 'WW' },
                ].map((user) => (
                  <div key={user.username} className="flex items-center gap-3">
                    <Link href="/profile">
                      <Avatar className="size-8 cursor-pointer hover:ring-2 hover:ring-primary/40 transition-all">
                        <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">{user.avatar}</AvatarFallback>
                      </Avatar>
                    </Link>
                    <Link href="/profile" className="flex-1 min-w-0 group/creator">
                      <div className="text-xs font-semibold text-foreground group-hover/creator:text-primary transition-colors truncate">{user.name}</div>
                      <div className="text-[10px] text-muted-foreground">{user.polls} polls created</div>
                    </Link>
                    <Button variant="outline" size="sm" className="text-xs h-7 px-3 shrink-0">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <h3 className="mb-4 font-semibold text-sm text-foreground">Trending Topics</h3>
              <div className="flex flex-col gap-2">
                {['#AIDebate', '#WorldLeaders2030', '#ClimateAction', '#MarsColony', '#ElectricVehicles'].map((tag, i) => (
                  <Link
                    key={tag}
                    href="/trending"
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-xs hover:bg-accent transition-colors text-left"
                  >
                    <div>
                      <div className="font-semibold text-primary">{tag}</div>
                      <div className="text-muted-foreground">{[125, 98, 72, 61, 54][i]}K votes today</div>
                    </div>
                    <div className="text-[10px] text-[oklch(0.65_0.20_142)] font-medium">
                      {['+18%', '+14%', '+11%', '+8%', '+6%'][i]}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
