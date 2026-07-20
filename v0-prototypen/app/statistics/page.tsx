'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts'
import { TrendingUp, Users, Globe, BarChart3, Activity, Download } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { weeklyVotesData, categoryDistribution, topCountries, liveStats } from '@/lib/mock-data'

const periodOptions = ['Today', 'This Week', 'This Month', 'All Time']

const hourlyData = [
  { hour: '00', votes: 18000 }, { hour: '02', votes: 12000 }, { hour: '04', votes: 8000 },
  { hour: '06', votes: 22000 }, { hour: '08', votes: 58000 }, { hour: '10', votes: 95000 },
  { hour: '12', votes: 142000 }, { hour: '14', votes: 168000 }, { hour: '16', votes: 188000 },
  { hour: '18', votes: 210000 }, { hour: '20', votes: 175000 }, { hour: '22', votes: 120000 },
]

const growthData = [
  { month: 'Jan', users: 120000, polls: 3200, votes: 800000 },
  { month: 'Feb', users: 148000, polls: 4100, votes: 1100000 },
  { month: 'Mar', users: 175000, polls: 5200, votes: 1400000 },
  { month: 'Apr', users: 198000, polls: 6100, votes: 1700000 },
  { month: 'May', users: 222000, polls: 7400, votes: 2100000 },
  { month: 'Jun', users: 250000, polls: 8547, votes: 2400000 },
]

const tooltipStyle = {
  contentStyle: { background: 'oklch(0.14 0.012 265)', border: '1px solid oklch(1 0 0 / 10%)', borderRadius: 8, fontSize: 12 },
  labelStyle: { color: 'oklch(0.96 0.005 265)' },
  itemStyle: { color: 'oklch(0.55 0.01 265)' },
}

const statCards = [
  { label: 'Total Users', value: '250,678', change: '+12.5%', icon: Users, color: 'oklch(0.58 0.22 280)' },
  { label: 'Total Polls', value: '8,547', change: '+8.3%', icon: BarChart3, color: 'oklch(0.62 0.18 240)' },
  { label: 'Total Votes', value: '2.4M', change: '+15.7%', icon: TrendingUp, color: 'oklch(0.65 0.20 142)' },
  { label: 'Countries Active', value: '195', change: '+9.3%', icon: Globe, color: 'oklch(0.70 0.18 60)' },
  { label: 'Votes Today', value: '1.2M', change: '+18.6%', icon: Activity, color: 'oklch(0.65 0.22 27)' },
  { label: 'Active Users Now', value: '85.4K', change: '+12.4%', icon: Users, color: 'oklch(0.65 0.20 160)' },
]

function formatNum(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
  return n.toString()
}

export default function StatisticsPage() {
  const [period, setPeriod] = useState('This Week')

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-screen-2xl px-4 py-8 md:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Platform Statistics</h1>
            <p className="mt-1 text-sm text-muted-foreground">Real-time data from across the People&apos;s Opinion Map platform</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex rounded-xl border border-border overflow-hidden">
              {periodOptions.map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                    period === p ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Download className="size-3.5" data-icon="inline-start" />
              Export
            </Button>
          </div>
        </div>

        {/* Live pulse indicator */}
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-border/40 bg-card px-4 py-3 w-fit">
          <span className="size-2 rounded-full bg-[oklch(0.65_0.20_142)] animate-pulse" />
          <span className="text-xs text-muted-foreground">
            Live data · Updated <strong className="text-foreground">just now</strong> · 195 countries reporting
          </span>
        </div>

        {/* Stats grid */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {statCards.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border/60 bg-card p-4">
              <div className="mb-3 flex items-center justify-between">
                <stat.icon className="size-4" style={{ color: stat.color }} />
                <span className="text-[10px] font-semibold text-[oklch(0.65_0.20_142)]">{stat.change}</span>
              </div>
              <div className="text-xl font-bold text-foreground">{stat.value}</div>
              <div className="mt-0.5 text-[10px] text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Charts row 1 */}
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Weekly votes bar chart */}
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-sm text-foreground">Votes This Week</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">Daily vote volume over the last 7 days</p>
              </div>
              <Badge variant="secondary" className="text-[10px]">+18.6%</Badge>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyVotesData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 5%)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: 'oklch(0.55 0.01 265)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'oklch(0.55 0.01 265)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => formatNum(v)} />
                  <Tooltip {...tooltipStyle} formatter={(v: number) => [formatNum(v), 'Votes']} />
                  <Bar dataKey="votes" fill="oklch(0.58 0.22 280)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Hourly activity line chart */}
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-sm text-foreground">Today&apos;s Activity</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">Votes per hour over the last 24 hours</p>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-[oklch(0.65_0.20_142)]">
                <span className="size-2 rounded-full bg-[oklch(0.65_0.20_142)] animate-pulse" />
                Live
              </div>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 5%)" />
                  <XAxis dataKey="hour" tick={{ fill: 'oklch(0.55 0.01 265)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'oklch(0.55 0.01 265)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => formatNum(v)} />
                  <Tooltip {...tooltipStyle} formatter={(v: number) => [formatNum(v), 'Votes']} />
                  <Line type="monotone" dataKey="votes" stroke="oklch(0.65 0.20 142)" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Growth over time */}
          <div className="rounded-2xl border border-border/60 bg-card p-5 lg:col-span-2">
            <div className="mb-4">
              <h3 className="font-semibold text-sm text-foreground">Platform Growth (6 Months)</h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">Users, polls created, and total votes over time</p>
            </div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 5%)" />
                  <XAxis dataKey="month" tick={{ fill: 'oklch(0.55 0.01 265)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'oklch(0.55 0.01 265)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => formatNum(v)} />
                  <Tooltip {...tooltipStyle} formatter={(v: number) => [formatNum(v)]} />
                  <Legend wrapperStyle={{ fontSize: 11, color: 'oklch(0.55 0.01 265)' }} />
                  <Line type="monotone" dataKey="users" name="Users" stroke="oklch(0.58 0.22 280)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="votes" name="Total Votes" stroke="oklch(0.65 0.20 142)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="polls" name="Polls Created" stroke="oklch(0.65 0.22 27)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category distribution pie */}
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <div className="mb-4">
              <h3 className="font-semibold text-sm text-foreground">Polls by Category</h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">Distribution of all active polls</p>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={44}
                    outerRadius={72}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryDistribution.map((entry, i) => (
                      <Cell key={`cell-${i}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: 'oklch(0.14 0.012 265)', border: '1px solid oklch(1 0 0 / 10%)', borderRadius: 8, fontSize: 11 }}
                    formatter={(v: number) => [`${v}%`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex flex-col gap-1.5">
              {categoryDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span className="size-2 rounded-full shrink-0" style={{ background: item.fill }} />
                  <span className="flex-1 text-[11px] text-muted-foreground">{item.name}</span>
                  <span className="text-[11px] font-semibold text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row: Top countries + recent milestones */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Top countries table */}
          <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
            <div className="border-b border-border/40 p-5">
              <h3 className="font-semibold text-sm text-foreground">Top Countries by Agreement Rate</h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">Percentage of users voting &quot;Yes&quot; on the top poll</p>
            </div>
            <div className="p-3">
              {topCountries.map((c) => (
                <Link
                  key={c.country}
                  href="/map"
                  className="grid grid-cols-12 items-center rounded-xl px-3 py-2.5 hover:bg-accent/30 transition-colors cursor-pointer"
                >
                  <span className="col-span-1 text-xs text-muted-foreground">{c.rank}.</span>
                  <div className="col-span-4 flex items-center gap-2">
                    <span className="text-lg">{c.flag}</span>
                    <span className="text-xs font-medium text-foreground">{c.country}</span>
                  </div>
                  <div className="col-span-5 flex items-center gap-2">
                    <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-[oklch(0.65_0.20_142)]"
                        style={{ width: `${c.percent}%` }}
                      />
                    </div>
                  </div>
                  <div className="col-span-2 text-right text-xs font-bold text-[oklch(0.65_0.20_142)]">
                    {c.percent}%
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Key milestones */}
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <h3 className="mb-4 font-semibold text-sm text-foreground">Key Milestones</h3>
            <div className="relative flex flex-col gap-0">
              {[
                { date: 'Jun 2025', title: 'Reached 250K users', detail: 'Global community milestone', color: 'oklch(0.58 0.22 280)' },
                { date: 'May 2025', title: '2 Million votes cast', detail: 'Crossed 2M total votes in a single month', color: 'oklch(0.65 0.20 142)' },
                { date: 'Apr 2025', title: '195 Countries active', detail: 'All UN-recognized countries now represented', color: 'oklch(0.62 0.18 240)' },
                { date: 'Mar 2025', title: 'AI Analysis launched', detail: 'Automated AI insights for every poll', color: 'oklch(0.65 0.22 27)' },
                { date: 'Feb 2025', title: '100K users milestone', detail: 'First major community growth milestone', color: 'oklch(0.70 0.18 60)' },
                { date: 'Jan 2025', title: 'POM Platform launched', detail: 'People\'s Opinion Map goes live', color: 'oklch(0.65 0.20 160)' },
              ].map((m, i) => (
                <div key={i} className="flex gap-4 pb-5 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="size-3 rounded-full shrink-0 mt-0.5" style={{ background: m.color }} />
                    {i < 5 && <div className="w-px flex-1 bg-border/60 mt-1.5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-muted-foreground mb-0.5">{m.date}</div>
                    <div className="text-xs font-semibold text-foreground">{m.title}</div>
                    <div className="text-[10px] text-muted-foreground leading-relaxed">{m.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
