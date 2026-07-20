'use client'

import Link from 'next/link'
import {
  Landmark, Monitor, Trophy, UtensilsCrossed, Heart, Clapperboard,
  TrendingUp, Leaf, GraduationCap, FlaskConical, Gamepad2, Brain,
} from 'lucide-react'
import { categories } from '@/lib/mock-data'

const iconMap: Record<string, React.ElementType> = {
  Landmark, Monitor, Trophy, UtensilsCrossed, Heart, Clapperboard,
  TrendingUp, Leaf, GraduationCap, FlaskConical, Gamepad2, Brain,
}

function formatPolls(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
  return n.toString()
}

export default function CategoriesSection() {
  return (
    <section className="py-10 border-t border-border/40">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-foreground">Explore Categories</h2>
          <p className="text-sm text-muted-foreground mt-1">Browse all topics and find polls that interest you</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon]
            return (
              <Link
                key={cat.id}
                href="/categories"
                className="group flex flex-col items-center gap-2.5 rounded-2xl border border-border/60 bg-card px-3 py-5 text-center transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent group-hover:bg-primary/15 transition-colors">
                  {Icon && <Icon className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />}
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground leading-tight">{cat.name}</div>
                  <div className="mt-0.5 text-[10px] text-muted-foreground">{formatPolls(cat.polls)} polls</div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
