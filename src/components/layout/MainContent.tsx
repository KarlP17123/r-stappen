import type { ReactNode } from 'react'
import { cn } from '../ui/utils'

export function MainContent({ children, className }: { children: ReactNode; className?: string }) { return <main className={cn('app-page', className)}>{children}</main> }
