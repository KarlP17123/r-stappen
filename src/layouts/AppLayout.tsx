import type { ReactNode } from 'react'
import { MainContent } from '../components/layout/MainContent'
import { SiteFooter } from '../components/layout/SiteFooter'
import { AppHeader } from '../navigation/AppHeader'

interface AppLayoutProps { children: ReactNode }

export function AppLayout({ children }: AppLayoutProps) {
  return <><AppHeader /><MainContent>{children}</MainContent><SiteFooter /></>
}
