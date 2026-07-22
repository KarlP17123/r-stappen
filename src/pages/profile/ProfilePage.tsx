import { useState } from 'react'
import { EmptyState } from '../../components/common/EmptyState'
import { PollListCard } from '../../components/polls/PollListCard'
import { AppLayout } from '../../layouts/AppLayout'
import { trendingPolls } from '../../services/homeService'

export function ProfilePage() { const [tab,setTab]=useState('Polls'); return <AppLayout><section className="profile-head"><i className="profile-avatar">GV</i><div><h1>GlobalVoter</h1><p>@globalvoter · Sweden 🇸🇪</p><p>Curious about the world and its people. Always ready for a good debate.</p></div><button className="secondary-button">Edit profile</button></section><div className="profile-stats"><b>12.4K <small>Votes cast</small></b><b>342 <small>Polls created</small></b><b>8.9K <small>Followers</small></b><b>621 <small>Following</small></b></div><div className="tabs">{['Polls','Activity','About'].map(item => <button className={tab===item?'selected':''} onClick={()=>setTab(item)} key={item}>{item}</button>)}</div>{tab==='Polls'?<div className="poll-list">{trendingPolls.slice(0,3).map(poll => <PollListCard poll={poll} key={poll.id}/>)}</div>:<EmptyState title={`No ${tab.toLowerCase()} yet`} text="This profile will show more as the community grows." />}</AppLayout> }
