import { Link } from 'react-router-dom'
import { Brand } from './Brand'

const groups = {
  Platform: [['Explore', '/explore'], ['World Map', '/map'], ['Trending', '/trending'], ['Categories', '/categories'], ['Create Poll', '/create-poll'], ['Leaderboards', '/leaderboards']],
  Resources: [['Statistics', '/statistics'], ['Profile', '/profile'], ['Community', '/explore'], ['FAQ', '/explore']],
  Company: [['About', '/'], ['Blog', '/explore'], ['Careers', '/'], ['Contact', '/']],
  Legal: [['Privacy Policy', '/'], ['Terms of Service', '/'], ['Cookie Policy', '/']],
} as const

export function Footer() {
  return <footer className="footer"><div className="footer-grid"><div className="footer-brand"><Brand /><p>The world's largest platform for global opinion voting. See what the world thinks, in real time.</p><small>◉ 195 countries · 2.4M votes</small></div>{Object.entries(groups).map(([name, items]) => <div key={name}><h3>{name}</h3>{items.map(([item, to]) => <Link key={item} to={to}>{item}</Link>)}</div>)}</div><div className="footer-bottom"><span>© 2025 People's Opinion Map. All rights reserved.</span><span><i /> Platform Online · 195 countries active</span></div></footer>
}
