import { Link } from 'react-router-dom'

export interface BreadcrumbItem { label: string; to?: string }
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return <nav className="ui-breadcrumbs" aria-label="Breadcrumb">{items.map((item, index) => <span key={`${item.label}-${index}`}>{index > 0 && <i aria-hidden="true">/</i>}{item.to ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</span>)}</nav>
}
