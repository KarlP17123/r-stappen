interface ChartCardProps { title: string; bars?: boolean; wide?: boolean }

export function ChartCard({ title, bars, wide }: ChartCardProps) {
  return <div className={`panel chart ${wide ? 'wide' : ''}`}><h3>{title}</h3><div className={bars ? 'bars' : 'line-chart'}>{bars ? [35,55,48,70,64,85,96].map((height, index) => <i style={{ height: `${height}%` }} key={index} />) : <svg viewBox="0 0 300 100" aria-label={title}><polyline points="0,78 38,65 76,70 114,40 152,55 190,25 228,35 300,8" /></svg>}</div></div>
}
