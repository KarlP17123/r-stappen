'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Share2, Bookmark, Check, Brain, TrendingUp, MessageSquare, Map, Users, BarChart3, ThumbsUp, ChevronRight } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts'
import { voteTimelineData, pollDemographics, pollAgeGroups, recentComments, trendingPolls } from '@/lib/mock-data'

const pollData = {
  id: '1',
  title: 'Is AI good for society?',
  description: 'Artificial intelligence is advancing rapidly. Do you believe AI has a net positive impact on society as a whole, including its effects on jobs, healthcare, privacy, and human wellbeing?',
  category: 'Technology',
  scope: 'Global Poll',
  author: 'GlobalVoter',
  createdAgo: '2 days ago',
  openForAll: true,
  options: [
    { id: 'yes', label: 'Ja, AI gör världen bättre', votes: 126430, percent: 72 },
    { id: 'no', label: 'Nej, AI är ett hot mot samhället', votes: 48721, percent: 28 },
  ],
  totalVotes: 174151,
  closesIn: '5 dagar 12 timmar',
  image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
}

const topCountriesResult = [
  { rank: 1, country: 'Sweden', flag: '🇸🇪', percent: 87 },
  { rank: 2, country: 'Japan', flag: '🇯🇵', percent: 85 },
  { rank: 3, country: 'Canada', flag: '🇨🇦', percent: 82 },
  { rank: 4, country: 'Australia', flag: '🇦🇺', percent: 80 },
  { rank: 5, country: 'Germany', flag: '🇩🇪', percent: 78 },
]

const relatedPolls = [
  { title: 'Kommer AI ta över mänskliga jobb?', votes: '128K', id: '2' },
  { title: 'Bör AI regleras hårdare?', votes: '98K', id: '3' },
  { title: 'Är självkörande bilar framtiden?', votes: '76K', id: '4' },
]

function formatNum(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
  return n.toString()
}

export default function PollDetailPage() {
  const [voted, setVoted] = useState<string | null>(null)
  const [comment, setComment] = useState('')

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-screen-2xl px-4 py-8 md:px-6">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/explore" className="hover:text-foreground transition-colors flex items-center gap-1">
            <ChevronLeft className="size-4" />
            Back
          </Link>
          <span>/</span>
          <Link href="/categories">
            <Badge variant="secondary" className="text-[10px] cursor-pointer hover:bg-primary/15 hover:text-primary transition-colors">{pollData.category}</Badge>
          </Link>
          <span>/</span>
          <span className="text-xs">{pollData.scope}</span>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          {/* Main content */}
          <div className="flex flex-col gap-6">
            {/* Poll header card */}
            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card">
              {/* Banner image */}
              <div className="relative h-52 overflow-hidden">
                <img src={pollData.image} alt={pollData.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-background/60" />
                <div className="absolute bottom-4 left-5 flex items-center gap-2">
                  <Badge className="bg-primary text-primary-foreground text-[10px]">{pollData.category}</Badge>
                  <Badge variant="outline" className="text-[10px]">{pollData.scope}</Badge>
                </div>
              </div>

              {/* Poll content */}
              <div className="p-6">
                <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Created by <strong className="text-foreground">{pollData.author}</strong></span>
                  <span>·</span>
                  <span>{pollData.createdAgo}</span>
                  {pollData.openForAll && (
                    <>
                      <span>·</span>
                      <span className="text-[oklch(0.65_0.20_142)]">Open for all</span>
                    </>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-foreground text-balance">{pollData.title}</h1>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{pollData.description}</p>

                {/* Vote options */}
                <div className="mt-6 flex flex-col gap-3">
                  {pollData.options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setVoted(opt.id)}
                      disabled={voted !== null}
                      className={`group relative flex items-center justify-between overflow-hidden rounded-xl border px-5 py-3.5 text-left transition-all duration-200 ${
                        voted === opt.id
                          ? 'border-[oklch(0.65_0.20_142)] bg-[oklch(0.65_0.20_142)]/10'
                          : voted !== null
                          ? 'border-border/40 bg-accent/30 opacity-60'
                          : 'border-border hover:border-primary/40 hover:bg-primary/5 cursor-pointer'
                      }`}
                    >
                      {/* Progress fill */}
                      {voted !== null && (
                        <div
                          className="absolute inset-0 rounded-xl opacity-10"
                          style={{
                            width: `${opt.percent}%`,
                            background: voted === opt.id ? 'oklch(0.65 0.20 142)' : 'oklch(0.55 0.01 265)',
                          }}
                        />
                      )}
                      <div className="relative flex items-center gap-3">
                        {voted === opt.id && (
                          <div className="flex size-5 items-center justify-center rounded-full bg-[oklch(0.65_0.20_142)]">
                            <Check className="size-3 text-white" />
                          </div>
                        )}
                        <span className="text-sm font-medium text-foreground">{opt.label}</span>
                      </div>
                      {voted !== null && (
                        <span className="relative text-sm font-bold text-foreground">{opt.percent}%</span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Stats + actions */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>
                      <strong className="text-foreground">{formatNum(pollData.totalVotes)}</strong> total votes
                    </span>
                    <span>Closes in: <strong className="text-foreground">{pollData.closesIn}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                      <Share2 className="size-3.5" data-icon="inline-start" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                      <Bookmark className="size-3.5" data-icon="inline-start" />
                      Save
                    </Button>
                    {!voted && (
                      <Button size="sm" className="bg-primary text-primary-foreground text-xs" onClick={() => setVoted('yes')}>
                        Vote Now
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs: Results / Map / Demographics / Trends / Comments / AI Analysis */}
            <Tabs defaultValue="results" className="w-full">
              <TabsList className="mb-4 flex gap-1 overflow-x-auto bg-transparent p-0 border-b border-border/40 rounded-none justify-start">
                {[
                  { value: 'results', label: 'Results', icon: BarChart3 },
                  { value: 'map', label: 'Map', icon: Map },
                  { value: 'demographics', label: 'Demographics', icon: Users },
                  { value: 'trends', label: 'Trends', icon: TrendingUp },
                  { value: 'comments', label: `Comments (${formatNum(2341)})`, icon: MessageSquare },
                  { value: 'ai', label: 'AI Analysis', icon: Brain },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="shrink-0 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary pb-2 text-xs font-medium bg-transparent text-muted-foreground hover:text-foreground transition-colors px-3"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Results tab */}
              <TabsContent value="results">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                  {[
                    { label: 'Total Votes', value: '125.4K' },
                    { label: '% Yes', value: '72%', color: 'text-[oklch(0.65_0.20_142)]' },
                    { label: '% No', value: '28%', color: 'text-[oklch(0.63_0.22_27)]' },
                    { label: 'Countries', value: '195' },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-border/60 bg-card p-4 text-center">
                      <div className={`text-2xl font-bold ${s.color ?? 'text-foreground'}`}>{s.value}</div>
                      <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Demographics table */}
                <div className="rounded-xl border border-border/60 bg-card p-5 mb-4">
                  <h3 className="font-semibold text-sm text-foreground mb-4">Results by Gender</h3>
                  <div className="flex flex-col gap-3">
                    {pollDemographics.map((d) => (
                      <div key={d.group} className="flex items-center gap-3">
                        <span className="w-12 text-xs text-muted-foreground">{d.group}</span>
                        <div className="flex-1 h-2 rounded-full overflow-hidden bg-muted">
                          <div className="h-full bg-[oklch(0.65_0.20_142)] rounded-full" style={{ width: `${d.yes}%` }} />
                        </div>
                        <span className="w-8 text-xs font-semibold text-[oklch(0.65_0.20_142)]">{d.yes}%</span>
                        <div className="w-16 h-2 rounded-full overflow-hidden bg-muted">
                          <div className="h-full bg-[oklch(0.63_0.22_27)] rounded-full" style={{ width: `${d.no}%` }} />
                        </div>
                        <span className="w-8 text-xs font-semibold text-[oklch(0.63_0.22_27)]">{d.no}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Age groups */}
                <div className="rounded-xl border border-border/60 bg-card p-5">
                  <h3 className="font-semibold text-sm text-foreground mb-4">Age Groups</h3>
                  <div className="flex flex-col gap-3">
                    {pollAgeGroups.map((d) => (
                      <div key={d.group} className="flex items-center gap-3">
                        <span className="w-12 text-xs text-muted-foreground">{d.group}</span>
                        <div className="flex-1 h-2 rounded-full overflow-hidden bg-muted">
                          <div className="h-full bg-[oklch(0.65_0.20_142)] rounded-full" style={{ width: `${d.yes}%` }} />
                        </div>
                        <span className="w-8 text-xs font-semibold text-[oklch(0.65_0.20_142)]">{d.yes}%</span>
                        <div className="w-16 h-2 rounded-full overflow-hidden bg-muted">
                          <div className="h-full bg-[oklch(0.63_0.22_27)] rounded-full" style={{ width: `${d.no}%` }} />
                        </div>
                        <span className="w-8 text-xs font-semibold text-[oklch(0.63_0.22_27)]">{d.no}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Map tab */}
              <TabsContent value="map">
                <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
                  <div className="relative h-80">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a34455bc-0852-4c1c-8d69-559cd1ba0d05-oGiwmg1s8PYU0PIvOxCwgf2NYsVSJu.png"
                      alt="Results map"
                      className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-background/40" />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground bg-background/80 rounded-full px-4 py-2 backdrop-blur">
                      Green = higher agreement · Red = higher disagreement
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-sm text-foreground mb-3">Top Countries (% Agree)</h3>
                    <div className="flex flex-col gap-2">
                      {topCountriesResult.map((c) => (
                        <div key={c.country} className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground w-5">{c.rank}.</span>
                          <span>{c.flag}</span>
                          <span className="flex-1 text-xs text-foreground">{c.country}</span>
                          <div className="w-20 h-1.5 overflow-hidden rounded-full bg-muted">
                            <div className="h-full rounded-full bg-[oklch(0.65_0.20_142)]" style={{ width: `${c.percent}%` }} />
                          </div>
                          <span className="text-xs font-semibold text-[oklch(0.65_0.20_142)] w-8">{c.percent}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Demographics tab */}
              <TabsContent value="demographics">
                <div className="rounded-xl border border-border/60 bg-card p-5">
                  <h3 className="font-semibold text-sm text-foreground mb-4">Voting by Age & Gender</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={pollAgeGroups} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 5%)" />
                        <XAxis dataKey="group" tick={{ fill: 'oklch(0.55 0.01 265)', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: 'oklch(0.55 0.01 265)', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{ background: 'oklch(0.14 0.012 265)', border: '1px solid oklch(1 0 0 / 10%)', borderRadius: 8 }}
                          labelStyle={{ color: 'oklch(0.96 0.005 265)', fontSize: 12 }}
                          itemStyle={{ color: 'oklch(0.55 0.01 265)', fontSize: 11 }}
                        />
                        <Bar dataKey="yes" name="Yes %" fill="oklch(0.65 0.20 142)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="no" name="No %" fill="oklch(0.63 0.22 27)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </TabsContent>

              {/* Trends tab */}
              <TabsContent value="trends">
                <div className="rounded-xl border border-border/60 bg-card p-5">
                  <h3 className="font-semibold text-sm text-foreground mb-1">Results over time (this week)</h3>
                  <p className="text-xs text-muted-foreground mb-4">How opinions have shifted since the poll opened</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={voteTimelineData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 5%)" />
                        <XAxis dataKey="time" tick={{ fill: 'oklch(0.55 0.01 265)', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: 'oklch(0.55 0.01 265)', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{ background: 'oklch(0.14 0.012 265)', border: '1px solid oklch(1 0 0 / 10%)', borderRadius: 8 }}
                          labelStyle={{ color: 'oklch(0.96 0.005 265)', fontSize: 12 }}
                          itemStyle={{ color: 'oklch(0.55 0.01 265)', fontSize: 11 }}
                        />
                        <Line type="monotone" dataKey="yes" name="Yes %" stroke="oklch(0.65 0.20 142)" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="no" name="No %" stroke="oklch(0.63 0.22 27)" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </TabsContent>

              {/* Comments tab */}
              <TabsContent value="comments">
                <div className="flex flex-col gap-4">
                  {/* Add comment */}
                  <div className="rounded-xl border border-border/60 bg-card p-4">
                    <div className="flex gap-3">
                      <Avatar className="size-8 shrink-0">
                        <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">GV</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          rows={2}
                          className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
                          placeholder="Add a comment..."
                        />
                        <div className="mt-2 flex justify-end">
                          <Button size="sm" className="bg-primary text-primary-foreground text-xs" disabled={!comment.trim()}>
                            Post Comment
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comments list */}
                  {recentComments.map((c) => (
                    <div key={c.id} className="rounded-xl border border-border/60 bg-card p-4">
                      <div className="mb-2 flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarFallback className="bg-accent text-foreground text-xs font-bold">{c.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="text-xs font-semibold text-foreground">{c.user}</div>
                          <div className="text-[10px] text-muted-foreground">{c.time}</div>
                        </div>
                      </div>
                      <p className="text-sm text-foreground/90 leading-relaxed">{c.text}</p>
                      <div className="mt-3 flex items-center gap-3">
                        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                          <ThumbsUp className="size-3" />
                          {c.likes}
                        </button>
                        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Reply</button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* AI Analysis tab */}
              <TabsContent value="ai">
                <div className="rounded-xl border border-border/60 bg-card p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary/20">
                      <Brain className="size-4 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground text-sm">AI Summary</h3>
                        <Badge className="text-[10px] bg-primary/20 text-primary border-0 px-2">Beta</Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed mb-4">
                    Majoriteten av användare globalt (72%) anser att AI är bra för samhället. Asien och Europa visar högst positivitet, medan vissa delar av Afrika och Mellanöstern är mer skeptiska.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Younger demographics (18–34) are significantly more optimistic about AI&apos;s societal impact, with 78% agreement, compared to 65% among those 45+. Technology professionals show the highest support at 89%.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                    {[
                      { label: 'Most Positive', value: 'Asia & Europe', icon: '🌏' },
                      { label: 'Most Skeptical', value: 'Parts of Africa', icon: '🌍' },
                      { label: 'Age Consensus', value: '18–34 most pro-AI', icon: '📊' },
                    ].map((s) => (
                      <div key={s.label} className="rounded-xl bg-accent/50 p-3 text-center">
                        <div className="text-lg mb-1">{s.icon}</div>
                        <div className="text-xs font-semibold text-foreground">{s.value}</div>
                        <div className="text-[10px] text-muted-foreground">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                    Read full analysis →
                  </button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right sidebar */}
          <div className="flex flex-col gap-4">
            {/* AI insight panel */}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <div className="mb-3 flex items-center gap-2">
                <Brain className="size-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">AI Insight</h3>
                <Badge className="text-[10px] bg-primary/20 text-primary border-0 px-2">Beta</Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Most people across the world believe AI has a positive impact on society. North America and Asia show the highest positivity.
              </p>
              <div className="mt-2 text-[10px] text-muted-foreground">Generated just now</div>
            </div>

            {/* Related polls */}
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <h3 className="mb-4 font-semibold text-sm text-foreground">Related Polls</h3>
              <div className="flex flex-col gap-2">
                {relatedPolls.map((p) => (
                  <Link key={p.id} href={`/poll/${p.id}`} className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-accent transition-colors group">
                    <span className="text-xs text-foreground group-hover:text-primary transition-colors line-clamp-2 flex-1 pr-2">{p.title}</span>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-[10px] text-muted-foreground">{p.votes} votes</span>
                      <ChevronRight className="size-3 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <h3 className="mb-4 font-semibold text-sm text-foreground">Share this poll</h3>
              <div className="flex flex-wrap gap-2">
                {['Twitter', 'Facebook', 'WhatsApp', 'Copy Link'].map((s) => (
                  <button
                    key={s}
                    className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* More trending */}
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <h3 className="mb-3 font-semibold text-sm text-foreground">More Trending</h3>
              <div className="flex flex-col gap-3">
                {trendingPolls.slice(1, 4).map((p) => (
                  <Link key={p.id} href={`/poll/${p.id}`} className="flex items-start gap-3 group">
                    <img src={p.image} alt={p.title} className="size-12 rounded-lg object-cover shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-foreground group-hover:text-primary line-clamp-2 transition-colors">{p.title}</p>
                      <div className="mt-1 text-[10px] text-muted-foreground">{p.votes.toLocaleString()} votes · {p.timeAgo}</div>
                    </div>
                  </Link>
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
