import { useNavigate } from 'react-router-dom'
import { AppLayout } from '../../layouts/AppLayout'

export function LoginPage() { const navigate = useNavigate(); return <AppLayout><section className="auth-card"><h1>Welcome back</h1><p>Sign in to continue sharing your opinion.</p><form onSubmit={event => { event.preventDefault(); navigate('/profile') }}><label>Email<input type="email" placeholder="you@example.com" required /></label><label>Password<input type="password" placeholder="••••••••" required /></label><button className="primary-button">Log in</button></form><small>Demo mode — authentication will connect to Supabase later.</small></section></AppLayout> }
