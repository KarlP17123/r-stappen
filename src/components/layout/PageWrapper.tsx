import type { HTMLAttributes } from 'react'
import { cn } from '../ui/utils'

export function PageWrapper({ className, ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={cn('page-wrapper', className)} {...props} /> }
export function SectionWrapper({ className, ...props }: HTMLAttributes<HTMLElement>) { return <section className={cn('section-wrapper', className)} {...props} /> }
