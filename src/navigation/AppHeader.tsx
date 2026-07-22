import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Brand } from '../components/Brand'
import { DesktopNavigation } from './DesktopNavigation'
import { MobileNavigation } from './MobileNavigation'

export function AppHeader() {
  const [mobileOpen, setMobileOpen] = useState(false); const [searchOpen, setSearchOpen] = useState(false); const [query, setQuery] = useState(''); const navigate = useNavigate()
  const submitSearch = (event: FormEvent) => { event.preventDefault(); navigate(`/explore?q=${encodeURIComponent(query)}`); setSearchOpen(false) }
  return <header className="navbar"><div className="nav-inner"><Brand /><DesktopNavigation /><div className="nav-actions"><form className="search-box" onSubmit={submitSearch}>{searchOpen ? <input autoFocus value={query} onChange={event => setQuery(event.target.value)} aria-label="Search polls and topics" placeholder="Search polls, topics..." /> : <button type="button" onClick={() => setSearchOpen(true)}>⌕ <span>Search polls, topics...</span></button>}</form><Link className="icon-button" to="/profile" aria-label="Messages">▢</Link><Link className="icon-button notification" to="/profile" aria-label="Notifications">♧</Link><button className="icon-button" aria-label="Language selector" title="Language: English">◎</button><Link className="login-link" to="/login">Log in</Link><Link className="create-button" to="/create-poll">＋ Create Poll</Link><Link className="avatar nav-avatar" to="/profile">GV</Link><button className="menu-button" onClick={() => setMobileOpen(open => !open)} aria-expanded={mobileOpen} aria-controls="mobile-navigation" aria-label="Open menu">{mobileOpen ? '×' : '☰'}</button></div></div>{mobileOpen && <MobileNavigation onNavigate={() => setMobileOpen(false)} />}</header>
}
