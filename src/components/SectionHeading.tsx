import type { ReactNode } from 'react'
export function SectionHeading({ icon, title, subtitle, action }: { icon?: ReactNode; title: string; subtitle?: string; action?: ReactNode }) { return <div className="section-heading"><div className="section-title">{icon && <span className="heading-icon">{icon}</span>}<div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div></div>{action}</div> }
