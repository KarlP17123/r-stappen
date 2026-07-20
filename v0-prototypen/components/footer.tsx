import Link from 'next/link'
import { Globe } from 'lucide-react'

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Platform: [
    { label: 'Explore', href: '/explore' },
    { label: 'World Map', href: '/map' },
    { label: 'Trending', href: '/trending' },
    { label: 'Categories', href: '/categories' },
    { label: 'Create Poll', href: '/create-poll' },
    { label: 'Leaderboards', href: '/leaderboards' },
  ],
  Company: [
    { label: 'About', href: '/' },
    { label: 'Blog', href: '/' },
    { label: 'Careers', href: '/' },
    { label: 'Press', href: '/' },
    { label: 'Advertise', href: '/' },
    { label: 'Contact', href: '/' },
  ],
  Resources: [
    { label: 'API', href: '/' },
    { label: 'Developers', href: '/' },
    { label: 'Statistics', href: '/statistics' },
    { label: 'FAQ', href: '/' },
    { label: 'Community', href: '/' },
    { label: 'Profile', href: '/profile' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/' },
    { label: 'Terms of Service', href: '/' },
    { label: 'Cookie Policy', href: '/' },
    { label: 'GDPR', href: '/' },
  ],
}

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border/40 bg-card/50">
      <div className="mx-auto max-w-screen-2xl px-4 py-12 md:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                POM
              </div>
              <div className="text-sm font-bold text-foreground">People&apos;s Opinion Map</div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              The world&apos;s largest platform for global opinion voting. See what the world thinks, in real time.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Globe className="size-3.5" />
              <span>195 countries · 2.4M votes</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">{section}</h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; 2025 People&apos;s Opinion Map. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[oklch(0.65_0.20_142)] animate-pulse" />
              Platform Online · 195 countries active
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
