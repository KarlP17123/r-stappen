import { NavLink } from 'react-router-dom'
import { navigationItems } from './navigationItems'

export function DesktopNavigation() {
  return <nav className="desktop-nav" aria-label="Primary navigation">{navigationItems.map(({ to, label }) => <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>)}</nav>
}
