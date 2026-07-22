import { PageHeader } from '../../components/common/PageHeader'
import { ChartCard } from '../../components/statistics/ChartCard'
import { AppLayout } from '../../layouts/AppLayout'

const stats = [['2.4M', 'Total Votes', '+18.6%'], ['250K', 'Active Users', '+12.4%'], ['8.5K', 'Active Polls', '+7.8%'], ['195', 'Countries', '+9.3%']]
export function StatisticsPage() { return <AppLayout><PageHeader title="Platform Statistics" subtitle="Real-time insights from the People's Opinion Map community." /><section className="stat-grid">{stats.map(([value,label,change]) => <div className="stat-card" key={label}><small>{label}</small><strong>{value}</strong><em>{change} vs last month</em></div>)}</section><section className="chart-grid"><ChartCard title="Votes This Week" bars /><ChartCard title="Today's Activity" /><ChartCard title="Platform Growth (6 Months)" wide /><div className="panel"><h3>Polls by Category</h3><div className="donut">28%</div><p>Politics leads all active conversations.</p></div></section></AppLayout> }
