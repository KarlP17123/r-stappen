'use client'

import { useState } from 'react'
import { MapPin, Calendar, Globe, Mail, Edit3, Trophy, Star, MessageSquare, TrendingUp } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { trendingPolls } from '@/lib/mock-data'
import Link from 'next/link'

const profileStats = [
  { label: 'Votes Cast', value: '12.4K' },
  { label: 'Polls Created', value: '342' },
  { label: 'Followers', value: '1.2K' },
  { label: 'Following', value: '256' },
  { label: 'Accuracy', value: '87%' },
]

const badges = [
  { icon: Trophy, label: 'Opinion Master', desc: 'Voted in 1000+ polls', color: 'text-[oklch(0.75_0.15_80)]' },
  { icon: Star, label: 'Creator', desc: 'Created 50+ polls', color: 'text-[oklch(0.70_0.18_220)]' },
  { icon: MessageSquare, label: 'Commentator', desc: 'Written 100+ comments', color: 'text-[oklch(0.65_0.20_142)]' },
  { icon: TrendingUp, label: 'Trend Spotter', desc: 'Followed 30-day trends', color: 'text-primary' },
]

const recentActivity = [
  { icon: '🗳', action: 'Voted on', target: 'Is AI good for society?', time: '2m ago', href: '/poll/1' },
  { icon: '💬', action: 'Commented on', target: 'Which country will be...', time: '1h ago', href: '/poll/2' },
  { icon: '📊', action: 'Created poll:', target: 'Best streaming service?', time: '5h ago', href: '/poll/3' },
  { icon: '🗳', action: 'Voted on', target: 'Pizza or Burger?', time: '1d ago', href: '/poll/4' },
  { icon: '❤️', action: 'Liked poll:', target: 'Is remote work the future?', time: '2d ago', href: '/poll/6' },
]

const weeklyStats = [
  { label: 'Votes Cast', value: '28', change: '+12%' },
  { label: 'Comments', value: '14', change: '+8%' },
  { label: 'Time on Platform', value: '2h 45m', change: '+15%' },
]

const interests = ['Technology', 'Politics', 'Economy', 'Education', 'Environment', 'Sports']

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-screen-2xl px-4 py-8 md:px-6">
        {/* Profile header banner */}
        <div className="relative mb-6 overflow-hidden rounded-2xl border border-border/60">
          {/* Banner */}
          <div className="relative h-40 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=60"
              alt="Profile banner"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-background/50" />
          </div>

          {/* Profile info */}
          <div className="bg-card px-6 pb-6">
            <div className="relative flex flex-col sm:flex-row sm:items-end gap-4 -mt-10">
              <Avatar className="size-20 ring-4 ring-card shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">GV</AvatarFallback>
              </Avatar>

              <div className="flex flex-1 flex-col sm:flex-row sm:items-end justify-between gap-4 pt-2 sm:pt-0">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold text-foreground">GlobalVoter</h1>
                    <div className="size-5 rounded-full bg-primary flex items-center justify-center">
                      <svg className="size-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">@globalvoter</div>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="size-3" /> Stockholm, Sweden</span>
                    <span className="flex items-center gap-1"><Calendar className="size-3" /> Joined Jan 2024</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="gap-1.5 text-xs self-start sm:self-auto">
                  <Edit3 className="size-3.5" data-icon="inline-start" />
                  Edit Profile
                </Button>
              </div>
            </div>

            {/* Bio + stats row */}
            <div className="mt-4 flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  &quot;Curious about the world and human opinions.&quot;
                </p>
                {/* Stats */}
                <div className="mt-4 flex flex-wrap gap-5">
                  {profileStats.map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="text-base font-bold text-foreground">{s.value}</div>
                      <div className="text-[10px] text-muted-foreground">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
          {/* Main tabs */}
          <div>
            <Tabs defaultValue="overview" onValueChange={setActiveTab}>
              <TabsList className="mb-6 flex gap-1 overflow-x-auto bg-transparent p-0 border-b border-border/40 rounded-none justify-start">
                {['Overview', 'Activity', 'Created Polls', 'Following', 'Saved', 'Settings'].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab.toLowerCase().replace(' ', '-')}
                    className="shrink-0 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary pb-2 text-xs font-medium bg-transparent text-muted-foreground hover:text-foreground transition-colors px-3"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Overview */}
              <TabsContent value="overview">
                {/* Recent activity */}
                <div className="rounded-2xl border border-border/60 bg-card p-5 mb-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-foreground">Recent Activity</h3>
                    <Link href="/explore" className="text-xs text-primary hover:text-primary/80 transition-colors">View all activity →</Link>
                  </div>
                  <div className="flex flex-col gap-3">
                    {recentActivity.map((item, i) => (
                      <Link key={i} href={item.href} className="flex items-center gap-3 py-2 border-b border-border/40 last:border-0 hover:bg-accent/30 rounded-lg px-2 transition-colors group/item">
                        <span className="text-base shrink-0">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs text-muted-foreground">{item.action} </span>
                          <span className="text-xs font-medium text-foreground group-hover/item:text-primary transition-colors line-clamp-1">{item.target}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground shrink-0">{item.time}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Created polls preview */}
                <div className="rounded-2xl border border-border/60 bg-card p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-foreground">Created Polls</h3>
                    <Link href="/explore" className="text-xs text-primary hover:text-primary/80 transition-colors">View all →</Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {trendingPolls.slice(0, 4).map((poll) => (
                      <Link key={poll.id} href={`/poll/${poll.id}`}>
                        <div className="group flex items-center gap-3 rounded-xl border border-border/40 p-3 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer">
                          <img src={poll.image} alt={poll.title} className="size-12 rounded-lg object-cover shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">{poll.title}</p>
                            <div className="mt-1 text-[10px] text-muted-foreground">{(poll.votes / 1000).toFixed(0)}K votes</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activity">
                <div className="rounded-2xl border border-border/60 bg-card p-5">
                  <h3 className="font-semibold text-sm text-foreground mb-4">Full Activity Log</h3>
                  <div className="flex flex-col gap-2">
                    {[...recentActivity, ...recentActivity].map((item, i) => (
                      <Link key={i} href={item.href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-accent transition-colors group/act">
                        <span className="text-base shrink-0">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs text-muted-foreground">{item.action} </span>
                          <span className="text-xs font-medium text-foreground group-hover/act:text-primary transition-colors">{item.target}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground shrink-0">{item.time}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="created-polls">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trendingPolls.map((poll) => (
                    <Link key={poll.id} href={`/poll/${poll.id}`}>
                      <article className="group rounded-2xl border border-border/60 bg-card overflow-hidden hover:border-primary/30 transition-all cursor-pointer">
                        <img src={poll.image} alt={poll.title} className="h-32 w-full object-cover" />
                        <div className="p-4">
                          <Badge variant="secondary" className="text-[10px] mb-2">{poll.category}</Badge>
                          <h4 className="text-sm font-semibold text-foreground group-hover:text-primary line-clamp-2 transition-colors">{poll.title}</h4>
                          <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
                            <span>{(poll.votes / 1000).toFixed(0)}K votes</span>
                            <span>{poll.timeAgo}</span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="following">
                <div className="rounded-2xl border border-border/60 bg-card p-5">
                  <div className="flex flex-col gap-3">
                    {['PoliticsNerd', 'TechOracle', 'WorldWatcher', 'VoiceOfEurope', 'SportsAnalyst'].map((name, i) => (
                      <div key={name} className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-accent transition-colors">
                        <Avatar className="size-9">
                          <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                            {name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-foreground">{name}</div>
                          <div className="text-[10px] text-muted-foreground">{[198, 256, 143, 87, 112][i]} polls created</div>
                        </div>
                        <Button variant="outline" size="sm" className="text-xs h-7 px-3">Unfollow</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="saved">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trendingPolls.slice(0, 4).map((poll) => (
                    <Link key={poll.id} href={`/poll/${poll.id}`}>
                      <article className="group rounded-2xl border border-border/60 bg-card overflow-hidden hover:border-primary/30 transition-all cursor-pointer">
                        <img src={poll.image} alt={poll.title} className="h-28 w-full object-cover" />
                        <div className="p-3">
                          <p className="text-xs font-semibold text-foreground group-hover:text-primary line-clamp-2 transition-colors">{poll.title}</p>
                          <div className="mt-1.5 text-[10px] text-muted-foreground">{poll.category} · {(poll.votes / 1000).toFixed(0)}K votes</div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="settings">
                <div className="rounded-2xl border border-border/60 bg-card p-6">
                  <h3 className="font-semibold text-foreground mb-4">Profile Settings</h3>
                  <div className="flex flex-col gap-4 max-w-md">
                    {['Display Name', 'Username', 'Email', 'Bio', 'Location'].map((field) => (
                      <div key={field}>
                        <label className="text-xs font-medium text-foreground block mb-1">{field}</label>
                        <input
                          className="w-full rounded-lg border border-border bg-accent px-3 py-2 text-sm text-foreground outline-none focus:border-primary/50 transition-colors"
                          placeholder={`Your ${field.toLowerCase()}`}
                        />
                      </div>
                    ))}
                    <Button className="bg-primary text-primary-foreground w-fit mt-2">Save Changes</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right sidebar */}
          <div className="flex flex-col gap-4">
            {/* About */}
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <h3 className="mb-3 font-semibold text-sm text-foreground">About</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                Loves technology, politics and social issues. Goal is to understand the world better through data and human opinions.
              </p>
              <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-2"><Mail className="size-3" /> globalvoter@email.com</span>
                <span className="flex items-center gap-2"><Globe className="size-3" /> www.globalvoter.com</span>
              </div>
              <div className="mt-3 flex gap-2">
                {['X', 'IG', 'in'].map((s) => (
                  <button key={s} className="size-7 rounded-lg border border-border flex items-center justify-center text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors font-bold">
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <h3 className="mb-3 font-semibold text-sm text-foreground">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <Badge key={interest} variant="secondary" className="text-xs cursor-pointer hover:bg-primary/15 hover:text-primary transition-colors">
                    {interest}
                  </Badge>
                ))}
              </div>
              <button className="mt-3 text-xs text-primary hover:text-primary/80 transition-colors">Edit interests</button>
            </div>

            {/* Achievements */}
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <h3 className="mb-3 font-semibold text-sm text-foreground">Achievements</h3>
              <div className="grid grid-cols-2 gap-3">
                {badges.map((badge) => (
                  <div key={badge.label} className="flex flex-col items-center gap-1.5 rounded-xl border border-border/40 bg-accent/40 p-3 text-center">
                    <badge.icon className={`size-6 ${badge.color}`} />
                    <div className="text-[10px] font-semibold text-foreground">{badge.label}</div>
                    <div className="text-[9px] text-muted-foreground">{badge.desc}</div>
                  </div>
                ))}
              </div>
              <button className="mt-3 text-xs text-primary hover:text-primary/80 transition-colors w-full text-center">View all badges</button>
            </div>

            {/* Weekly stats */}
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-sm text-foreground">Weekly Stats</h3>
                <span className="text-[10px] text-muted-foreground">This week</span>
              </div>
              <div className="flex flex-col gap-3">
                {weeklyStats.map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-foreground">{s.value}</span>
                      <span className="text-[10px] font-medium text-[oklch(0.65_0.20_142)]">{s.change}</span>
                    </div>
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
