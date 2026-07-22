import type { HTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react'
import { Spinner } from './controls'
import { cn } from './utils'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={cn('ui-card', className)} {...props} /> }
export function Badge({ className, variant='default', ...props }: HTMLAttributes<HTMLSpanElement> & { variant?: 'default' | 'success' | 'danger' | 'outline' }) { return <span className={cn('ui-badge', `ui-badge--${variant}`, className)} {...props} /> }
export function Avatar({ className, alt='', initials, ...props }: ImgHTMLAttributes<HTMLImageElement> & { initials?: string }) { return props.src ? <img className={cn('ui-avatar', className)} alt={alt} {...props} /> : <span className={cn('ui-avatar', className)} aria-label={alt || initials}>{initials}</span> }
export function Divider({ className, label }: { className?: string; label?: ReactNode }) { return <div className={cn('ui-divider', className)} role="separator">{label && <span>{label}</span>}</div> }
export function Skeleton({ className }: { className?: string }) { return <span className={cn('ui-skeleton', className)} aria-hidden="true" /> }
export function LoadingState({ label='Loading…' }: { label?: string }) { return <div className="ui-state"><Spinner /><span>{label}</span></div> }
export function ErrorState({ title='Something went wrong', description='Please try again.' }: { title?: string; description?: string }) { return <div className="ui-state ui-state--error" role="alert"><strong>{title}</strong><span>{description}</span></div> }
export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) { return <div className="ui-state"><span className="ui-state__icon">◇</span><strong>{title}</strong><span>{description}</span>{action}</div> }
