import { Link } from 'react-router-dom'
import { PageHeader } from '../../components/common/PageHeader'
import { AppLayout } from '../../layouts/AppLayout'
import { formatCompactNumber } from '../../lib/format'

const users = ['GlobalVoter', 'PoliticsNerd', 'TechOracle', 'WorldWatcher', 'VoiceOfEurope']
export function LeaderboardsPage() { return <AppLayout><PageHeader title="Leaderboards" subtitle="The people shaping the global conversation." /><div className="leader-tabs"><button className="selected">Top Voters</button><button>Top Creators</button><button>Rising Stars</button></div><div className="table-card"><div className="table-row table-head"><span>Rank</span><span>Member</span><span>Votes</span><span>Polls</span><span>Badge</span></div>{users.map((user,index) => <Link to="/profile" className="table-row" key={user}><b>#{index+1}</b><span><i className="avatar">{user.slice(0,2)}</i>{user}<small>@{user.toLowerCase()}</small></span><b>{formatCompactNumber(12400-index*1300)}</b><span>{342-index*38}</span><em>{index === 0 ? 'Opinion Master' : 'Top Creator'}</em></Link>)}</div></AppLayout> }
