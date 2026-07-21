'use client'

import { useState } from 'react'
import { Globe, TrendingUp, Users, ChevronRight, X, Search } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { topCountries } from '@/lib/mock-data'

const countryDetails: Record<string, {
  flag: string; agreePercent: number; disagreePercent: number; neutralPercent: number;
  topPolls: string[]; activePoll: string; totalVotes: number; trend: string
}> = {
  'Sweden': { flag: '🇸🇪', agreePercent: 87, disagreePercent: 7, neutralPercent: 6, topPolls: ['Is AI good for society?', 'Should higher education be free?', 'Electric cars vs petrol?'], activePoll: 'Is AI good for society?', totalVotes: 214000, trend: '+12%' },
  'Japan': { flag: '🇯🇵', agreePercent: 85, disagreePercent: 9, neutralPercent: 6, topPolls: ['Best tech innovation of 2025?', 'Is nuclear energy safe?', 'Remote work better?'], activePoll: 'Best tech innovation of 2025?', totalVotes: 189000, trend: '+8%' },
  'Canada': { flag: '🇨🇦', agreePercent: 82, disagreePercent: 11, neutralPercent: 7, topPolls: ['Climate action urgency?', 'Universal basic income?', 'Should drugs be legal?'], activePoll: 'Climate action urgency?', totalVotes: 156000, trend: '+5%' },
  'USA': { flag: '🇺🇸', agreePercent: 72, disagreePercent: 18, neutralPercent: 10, topPolls: ['Is democracy working?', 'Should guns be banned?', 'Universal healthcare?'], activePoll: 'Is democracy working?', totalVotes: 542000, trend: '+3%' },
  'Germany': { flag: '🇩🇪', agreePercent: 81, disagreePercent: 10, neutralPercent: 9, topPolls: ['EU immigration policy?', 'Is electric car adoption fast enough?', 'Should Germany rearm?'], activePoll: 'EU immigration policy?', totalVotes: 198000, trend: '+7%' },
  'Brazil': { flag: '🇧🇷', agreePercent: 64, disagreePercent: 24, neutralPercent: 12, topPolls: ['Amazon deforestation crisis?', 'Is football still the national sport?', 'Economic inequality solutions?'], activePoll: 'Amazon deforestation crisis?', totalVotes: 310000, trend: '+11%' },
  'India': { flag: '🇮🇳', agreePercent: 76, disagreePercent: 14, neutralPercent: 10, topPolls: ['AI jobs threat?', 'India vs China tech race?', 'Digital payments future?'], activePoll: 'AI jobs threat?', totalVotes: 821000, trend: '+22%' },
  'Australia': { flag: '🇦🇺', agreePercent: 80, disagreePercent: 12, neutralPercent: 8, topPolls: ['Republic vs monarchy?', 'Climate change policies?', 'Housing affordability?'], activePoll: 'Republic vs monarchy?', totalVotes: 97000, trend: '+6%' },
}

const mapDots = [
  { cx: 20, cy: 42, country: 'USA', size: 9 },
  { cx: 27, cy: 50, country: 'Brazil', size: 7 },
  { cx: 48, cy: 35, country: 'Germany', size: 6 },
  { cx: 50, cy: 32, country: 'Sweden', size: 5 },
  { cx: 75, cy: 38, country: 'India', size: 10 },
  { cx: 82, cy: 42, country: 'Japan', size: 7 },
  { cx: 84, cy: 65, country: 'Australia', size: 6 },
  { cx: 37, cy: 32, country: 'Canada', size: 6 },
]

function formatNum(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
  return n.toString()
}

export default function MapPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  const detail = selectedCountry ? countryDetails[selectedCountry] : null

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-screen-2xl px-4 py-8 md:px-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">World Opinion Map</h1>
            <p className="mt-1 text-sm text-muted-foreground">Click any country to see real-time opinion data</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="size-2 rounded-full bg-[oklch(0.65_0.20_142)] animate-pulse" />
            Live · 195 countries active
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
          {/* Map panel */}
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card" style={{ minHeight: 480 }}>
            {/* Background map image */}
            <div className="relative h-full w-full" style={{ minHeight: 480 }}>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a34455bc-0852-4c1c-8d69-559cd1ba0d05-oGiwmg1s8PYU0PIvOxCwgf2NYsVSJu.png"
                alt="World map"
                className="w-full h-full object-cover"
                style={{ minHeight: 480, objectPosition: 'center' }}
              />
              <div className="absolute inset-0 bg-background/50" />

              {/* Interactive dots */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 80" preserveAspectRatio="xMidYMid meet">
                {mapDots.map((dot) => {
                  const isSelected = selectedCountry === dot.country
                  const isHovered = hovered === dot.country
                  const d = countryDetails[dot.country]
                  return (
                    <g key={dot.country}>
                      <circle
                        cx={dot.cx}
                        cy={dot.cy}
                        r={dot.size / 2 + (isSelected || isHovered ? 1.5 : 0)}
                        fill={isSelected ? 'oklch(0.58 0.22 280)' : 'oklch(0.58 0.22 280 / 70%)'}
                        stroke="white"
                        strokeWidth="0.5"
                        className="cursor-pointer transition-all duration-200"
                        onClick={() => setSelectedCountry(dot.country === selectedCountry ? null : dot.country)}
                        onMouseEnter={() => setHovered(dot.country)}
                        onMouseLeave={() => setHovered(null)}
                      />
                      {/* Ripple for selected */}
                      {isSelected && (
                        <circle
                          cx={dot.cx}
                          cy={dot.cy}
                          r={dot.size / 2 + 3}
                          fill="none"
                          stroke="oklch(0.58 0.22 280)"
                          strokeWidth="0.4"
                          opacity="0.5"
                        />
                      )}
                      {/* Tooltip on hover */}
                      {isHovered && d && (
                        <g>
                          <rect
                            x={dot.cx - 8}
                            y={dot.cy - dot.size / 2 - 8}
                            width={16}
                            height={6}
                            rx="1"
                            fill="oklch(0.14 0.012 265)"
                            stroke="oklch(1 0 0 / 10%)"
                            strokeWidth="0.3"
                          />
                          <text
                            x={dot.cx}
                            y={dot.cy - dot.size / 2 - 3.5}
                            textAnchor="middle"
                            fontSize="2"
                            fill="white"
                          >
                            {dot.country} · {d.agreePercent}% Agree
                          </text>
                        </g>
                      )}
                    </g>
                  )
                })}
              </svg>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 flex items-center gap-4 rounded-xl border border-border/60 bg-background/80 backdrop-blur px-4 py-2.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[oklch(0.65_0.20_142)]" />
                  High agree
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-primary" />
                  Click to explore
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[oklch(0.63_0.22_27)]" />
                  High disagree
                </div>
              </div>

              {/* Select hint */}
              {!selectedCountry && (
                <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full border border-border/60 bg-background/80 backdrop-blur px-4 py-2 text-xs text-muted-foreground">
                  Click a dot to explore country data
                </div>
              )}
            </div>
          </div>

          {/* Right panel */}
          <div className="flex flex-col gap-4">
            {/* Country detail */}
            {detail && selectedCountry ? (
              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{detail.flag}</span>
                    <div>
                      <h3 className="font-bold text-foreground">{selectedCountry}</h3>
                      <div className="text-xs text-muted-foreground">{formatNum(detail.totalVotes)} votes · {detail.trend}</div>
                    </div>
                  </div>
                  <button onClick={() => setSelectedCountry(null)} className="text-muted-foreground hover:text-foreground">
                    <X className="size-4" />
                  </button>
                </div>

                {/* Opinion bars */}
                <div className="mb-4 space-y-2">
                  {[
                    { label: 'Agree', pct: detail.agreePercent, color: 'oklch(0.65 0.20 142)' },
                    { label: 'Disagree', pct: detail.disagreePercent, color: 'oklch(0.63 0.22 27)' },
                    { label: 'Neutral', pct: detail.neutralPercent, color: 'oklch(0.70 0.18 220)' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-semibold text-foreground">{item.pct}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Top polls */}
                <div>
                  <h4 className="mb-2 text-xs font-semibold text-foreground">Top Polls</h4>
                  <div className="flex flex-col gap-1.5">
                  {detail.topPolls.map((poll) => (
                    <Link key={poll} href="/explore" className="flex items-center gap-2 rounded-lg px-3 py-2 bg-accent/50 hover:bg-accent transition-colors cursor-pointer group/poll">
                      <ChevronRight className="size-3 text-primary shrink-0" />
                      <span className="text-xs text-foreground group-hover/poll:text-primary transition-colors line-clamp-1">{poll}</span>
                    </Link>
                  ))}
                  </div>
                </div>

                <Link href="/explore">
                  <Button className="mt-4 w-full text-xs bg-primary text-primary-foreground" size="sm">
                    View All {selectedCountry} Polls
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/50 p-10 text-center">
                <Globe className="size-10 text-muted-foreground mb-3" />
                <h3 className="font-semibold text-foreground text-sm">Select a Country</h3>
                <p className="text-xs text-muted-foreground mt-1">Click any dot on the map to explore that country&apos;s opinions</p>
              </div>
            )}

            {/* Top countries list */}
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="size-4 text-primary" />
                <h3 className="font-semibold text-sm text-foreground">Top Countries (% Agree)</h3>
              </div>
              <div className="flex flex-col gap-2.5">
                {topCountries.map((c) => (
                  <button
                    key={c.country}
                    onClick={() => setSelectedCountry(c.country)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-accent transition-colors text-left"
                  >
                    <span className="text-xs text-muted-foreground w-4 shrink-0">{c.rank}.</span>
                    <span className="text-lg">{c.flag}</span>
                    <span className="flex-1 text-xs font-medium text-foreground">{c.country}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-[oklch(0.65_0.20_142)]" style={{ width: `${c.percent}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-[oklch(0.65_0.20_142)] w-8">{c.percent}%</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Countries Active', value: '195', icon: Globe },
                { label: 'Users Online', value: '85.4K', icon: Users },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border/60 bg-card p-4 text-center">
                  <div className="text-xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</div>
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
