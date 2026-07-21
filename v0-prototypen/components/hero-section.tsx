'use client'

import Link from 'next/link'
import { ArrowRight, Globe, MapPin, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const heroStats = [
  { label: 'Total Users', value: '250K+' },
  { label: 'Total Votes', value: '2.4M' },
  { label: 'Active Polls', value: '8.5K' },
  { label: 'Countries', value: '195' },
]

const mapBubbles = [
  { top: '30%', left: '18%', label: '72%', sub: 'Agree', color: 'bg-[oklch(0.14_0.012_265)] border-[oklch(0.65_0.20_142)]' },
  { top: '20%', left: '53%', label: '58%', sub: 'Neutral', color: 'bg-[oklch(0.14_0.012_265)] border-[oklch(0.70_0.18_220)]' },
  { top: '40%', left: '30%', label: '64%', sub: 'Agree', color: 'bg-[oklch(0.14_0.012_265)] border-[oklch(0.65_0.20_142)]' },
  { top: '22%', left: '78%', label: '81%', sub: 'Agree', color: 'bg-[oklch(0.14_0.012_265)] border-[oklch(0.65_0.20_142)]' },
  { top: '65%', left: '82%', label: '47%', sub: 'Disagree', color: 'bg-[oklch(0.14_0.012_265)] border-[oklch(0.63_0.22_27)]' },
]

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-8 pb-4 md:pt-12">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 size-96 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute right-1/4 top-20 size-64 rounded-full bg-[oklch(0.62_0.18_240)]/6 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-screen-2xl px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          {/* Left content */}
          <div className="flex flex-col gap-6">
            <Badge variant="outline" className="w-fit gap-1.5 border-primary/30 bg-primary/10 text-primary text-xs px-3 py-1">
              <Activity className="size-3" />
              Live platform · 195 countries voting
            </Badge>

            <div>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                See what the world
                <br />
                thinks.{' '}
                <span className="text-primary">In real time.</span>
              </h1>
              <p className="mt-4 max-w-md text-base text-muted-foreground leading-relaxed">
                Vote, discover opinions and see real-time results from people around the globe. Join millions already shaping global conversation.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/explore">
                <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 glow-purple px-6">
                  Explore Polls
                  <ArrowRight className="size-4" data-icon="inline-end" />
                </Button>
              </Link>
              <Link href="/map">
                <Button size="lg" variant="outline" className="gap-2 border-border/60 bg-accent/50 hover:bg-accent px-6">
                  <Globe className="size-4" data-icon="inline-start" />
                  View World Map
                </Button>
              </Link>
            </div>

            {/* User avatars + count */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['A', 'B', 'C', 'D'].map((l, i) => (
                  <Avatar key={i} className="size-8 ring-2 ring-background">
                    <AvatarFallback
                      className="text-xs font-semibold"
                      style={{
                        background: `oklch(0.58 0.22 ${280 + i * 30})`,
                        color: 'white',
                      }}
                    >
                      {l}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                Join <strong className="text-foreground">250,000+</strong> users worldwide
              </span>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 mt-2">
              {heroStats.map((stat) => (
                <div key={stat.label} className="glass rounded-xl px-4 py-3">
                  <div className="text-xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: World map illustration */}
          <div className="relative h-80 lg:h-[420px]">
            {/* Map background image */}
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border/40 glass">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a34455bc-0852-4c1c-8d69-559cd1ba0d05-oGiwmg1s8PYU0PIvOxCwgf2NYsVSJu.png"
                alt="World map showing global opinion data"
                className="h-full w-full object-cover object-center opacity-80"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-background/40" />

              {/* Bubble overlays */}
              {mapBubbles.map((bubble, i) => (
                <div
                  key={i}
                  className={`absolute border rounded-xl px-3 py-2 text-center shadow-xl ${bubble.color}`}
                  style={{ top: bubble.top, left: bubble.left, transform: 'translate(-50%, -50%)' }}
                >
                  <div className="text-sm font-bold text-foreground">{bubble.label}</div>
                  <div className={`text-[10px] font-medium ${bubble.sub === 'Disagree' ? 'text-[oklch(0.63_0.22_27)]' : bubble.sub === 'Neutral' ? 'text-[oklch(0.70_0.18_220)]' : 'text-[oklch(0.65_0.20_142)]'}`}>
                    {bubble.sub}
                  </div>
                </div>
              ))}

              {/* Live indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-full border border-border/60 bg-background/80 backdrop-blur px-4 py-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[oklch(0.65_0.20_142)] animate-pulse" />
                  Live Map
                </span>
                <span className="w-px h-3 bg-border" />
                <span>Real-time results</span>
                <span className="w-px h-3 bg-border" />
                <span>Global opinions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
