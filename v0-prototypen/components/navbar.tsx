'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Bell,
  Globe,
  Menu,
  MessageSquare,
  Plus,
  Search,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/map', label: 'World Map' },
  { href: '/trending', label: 'Trending' },
  { href: '/categories', label: 'Categories' },
  { href: '/leaderboards', label: 'Leaderboards' },
  { href: '/statistics', label: 'Statistics' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center gap-4 px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm glow-purple">
            POM
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-bold leading-tight text-foreground">People&apos;s Opinion Map</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-1 ml-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'bg-primary/15 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        {/* Search (desktop) */}
        <div className="hidden lg:flex items-center">
          {searchOpen ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-accent px-3 py-1.5 w-64">
                <Search className="size-4 text-muted-foreground shrink-0" />
                <input
                  autoFocus
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground"
                  placeholder="Search polls, topics..."
                />
              </div>
              <button onClick={() => setSearchOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="size-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-border bg-accent px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-52"
            >
              <Search className="size-4" />
              Search polls, topics...
            </button>
          )}
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-1.5">
          <button className="lg:hidden relative rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <Search className="size-5" />
          </button>

          <button className="relative rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <MessageSquare className="size-5" />
          </button>

          <button className="relative rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <Bell className="size-5" />
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-primary" />
          </button>

          <button className="relative rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <Globe className="size-5" />
          </button>

          <div className="hidden sm:flex items-center gap-2 ml-1">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-sm">
                Log in
              </Button>
            </Link>
            <Link href="/create-poll">
              <Button size="sm" className="gap-1.5 text-sm bg-primary text-primary-foreground hover:bg-primary/90 glow-purple">
                <Plus className="size-4" data-icon="inline-start" />
                Create Poll
              </Button>
            </Link>
          </div>

          <Link href="/profile" className="hidden sm:block ml-1">
            <Avatar className="size-8 ring-2 ring-primary/30 hover:ring-primary/60 transition-all cursor-pointer">
              <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">GV</AvatarFallback>
            </Avatar>
          </Link>

          {/* Mobile menu */}
          <button
            className="xl:hidden rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-border bg-background/95 backdrop-blur px-4 py-3">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex gap-2 border-t border-border pt-3">
              <Button variant="ghost" size="sm" className="flex-1">Log in</Button>
              <Button size="sm" className="flex-1 bg-primary text-primary-foreground">
                <Plus className="size-4" data-icon="inline-start" />
                Create Poll
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
