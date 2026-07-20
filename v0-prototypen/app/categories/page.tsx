'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Landmark, Monitor, Trophy, UtensilsCrossed, Heart, Clapperboard,
  TrendingUp, Leaf, GraduationCap, FlaskConical, Gamepad2, Brain, Search,
} from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { categories, trendingPolls } from '@/lib/mock-data'

const iconMap: Record<string, React.ElementType> = {
  Landmark, Monitor, Trophy, UtensilsCrossed, Heart, Clapperboard,
  TrendingUp, Leaf, GraduationCap, FlaskConical, Gamepad2, Brain,
}

const colorMap: Record<string, string> = {
  politics: 'oklch(0.58 0.22 280)',
  technology: 'oklch(0.62 0.18 240)',
  sports: 'oklch(0.65 0.22 27)',
  food: 'oklch(0.70 0.18 60)',
  lifestyle: 'oklch(0.65 0.20 142)',
  entertainment: 'oklch(0.68 0.20 310)',
  economy: 'oklch(0.75 0.15 80)',
  environment: 'oklch(0.65 0.20 160)',
  education: 'oklch(0.62 0.18 200)',
  science: 'oklch(0.65 0.18 220)',
  gaming: 'oklch(0.60 0.22 270)',
  ai: 'oklch(0.62 0.18 240)',
}

function formatNum(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
  return n.toString()
}

export default function CategoriesPage() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  )

  const selectedCat = categories.find((c) => c.id === selected)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-screen-2xl px-4 py-8 md:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">All Categories</h1>
          <p className="mt-1 text-sm text-muted-foreground">Browse all poll topics and find what interests you</p>
        </div>

        {/* Search */}
        <div className="mb-8 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-2.5 max-w-md">
          <Search className="size-4 text-muted-foreground shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground"
            placeholder="Search categories..."
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
          {/* Category grid */}
          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {filtered.map((cat) => {
                const Icon = iconMap[cat.icon]
                const color = colorMap[cat.id] ?? 'oklch(0.58 0.22 280)'
                const isSelected = selected === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelected(isSelected ? null : cat.id)}
                    className={`group flex flex-col gap-4 rounded-2xl border p-5 text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-primary/40 bg-primary/8 shadow-lg shadow-primary/10'
                        : 'border-border/60 bg-card hover:border-border hover:bg-card/80'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className="flex size-12 items-center justify-center rounded-xl"
                        style={{ background: `${color}20` }}
                      >
                        {Icon && <Icon className="size-6" style={{ color }} />}
                      </div>
                      <Badge variant="secondary" className="text-[10px] shrink-0">
                        {formatNum(cat.polls)} polls
                      </Badge>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">{cat.name}</div>
                      <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{cat.description}</div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full" style={{ width: `${Math.min(100, (cat.polls / 130))}%`, background: color }} />
                      </div>
                      <span className="shrink-0">{formatNum(cat.polls)}</span>
                    </div>
                  </button>
                )
              })}
            </div>
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-4xl mb-3">
                  <Search className="size-10 text-muted-foreground mx-auto" />
                </div>
                <h3 className="font-semibold text-foreground">No categories found</h3>
                <p className="text-sm text-muted-foreground mt-1">Try a different search term</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            {/* Selected category detail */}
            {selectedCat ? (
              <div className="rounded-2xl border border-primary/30 bg-card p-5">
                <div className="mb-4 flex items-center gap-3">
                  {(() => {
                    const Icon = iconMap[selectedCat.icon]
                    const color = colorMap[selectedCat.id] ?? 'oklch(0.58 0.22 280)'
                    return (
                      <>
                        <div className="flex size-10 items-center justify-center rounded-xl" style={{ background: `${color}20` }}>
                          {Icon && <Icon className="size-5" style={{ color }} />}
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground">{selectedCat.name}</h3>
                          <p className="text-xs text-muted-foreground">{formatNum(selectedCat.polls)} polls</p>
                        </div>
                      </>
                    )
                  })()}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">{selectedCat.description}</p>
                <Link href="/explore">
                  <div className="w-full rounded-xl bg-primary text-primary-foreground text-xs font-semibold px-4 py-2.5 text-center hover:bg-primary/90 transition-colors cursor-pointer">
                    Browse {selectedCat.name} Polls
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/50 p-10 text-center">
                <Landmark className="size-8 text-muted-foreground mb-2" />
                <p className="text-xs text-muted-foreground">Click a category to see more details</p>
              </div>
            )}

            {/* Category stats overview */}
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <h3 className="mb-4 font-semibold text-sm text-foreground">Category Stats</h3>
              <div className="flex flex-col gap-3">
                {categories.slice(0, 6).map((cat) => {
                  const color = colorMap[cat.id] ?? 'oklch(0.58 0.22 280)'
                  return (
                    <div key={cat.id} className="flex items-center gap-3">
                      <span className="w-20 text-xs text-muted-foreground truncate">{cat.name}</span>
                      <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${Math.min(100, cat.polls / 130)}%`, background: color }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground w-10 text-right">{formatNum(cat.polls)}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Trending in all categories */}
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <h3 className="mb-4 font-semibold text-sm text-foreground">Trending Across Categories</h3>
              <div className="flex flex-col gap-3">
                {trendingPolls.slice(0, 4).map((poll) => (
                  <Link key={poll.id} href={`/poll/${poll.id}`}>
                    <div className="flex items-center gap-3 rounded-xl p-2 hover:bg-accent transition-colors cursor-pointer group">
                      <img src={poll.image} alt={poll.title} className="size-10 rounded-lg object-cover shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-foreground group-hover:text-primary line-clamp-2 transition-colors">{poll.title}</p>
                        <div className="mt-0.5 flex items-center gap-2">
                          <Badge variant="secondary" className="text-[9px] px-1.5 py-0">{poll.category}</Badge>
                          <span className="text-[10px] text-muted-foreground">{(poll.votes / 1000).toFixed(0)}K votes</span>
                        </div>
                      </div>
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
