import type { ReactNode } from 'react'

interface PageHeaderProps { title: string; subtitle: string; icon?: ReactNode }

export function PageHeader({ title, subtitle, icon }: PageHeaderProps) {
  if (icon) return <header className="page-head icon-head"><span>{icon}</span><div><h1>{title}</h1><p>{subtitle}</p></div></header>
  return <header className="page-head"><h1>{title}</h1><p>{subtitle}</p></header>
}
