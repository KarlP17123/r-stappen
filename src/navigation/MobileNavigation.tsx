import { NavLink } from 'react-router-dom'
import { navigationItems } from './navigationItems'

interface MobileNavigationProps { onNavigate: () => void }
export function MobileNavigation({ onNavigate }: MobileNavigationProps) {
  return <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{navigationItems.map(({ to, label }) => <NavLink key={to} to={to} onClick={onNavigate}>{label}</NavLink>)}</nav>
}
