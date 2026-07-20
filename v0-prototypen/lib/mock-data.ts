export const trendingPolls = [
  {
    id: '1',
    title: 'Is AI good for society?',
    category: 'Technology',
    votes: 125430,
    comments: 2341,
    likes: 8920,
    yesPercent: 72,
    noPercent: 28,
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=80',
    trending: true,
    timeAgo: 'Just now',
    isLive: true,
  },
  {
    id: '2',
    title: 'Which country will be the world leader in 2030?',
    category: 'Politics',
    votes: 98200,
    comments: 4120,
    likes: 6540,
    yesPercent: 68,
    noPercent: 32,
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&q=80',
    trending: false,
    timeAgo: '2m ago',
    isLive: true,
  },
  {
    id: '3',
    title: 'Who is the best football player right now?',
    category: 'Sports',
    votes: 76000,
    comments: 1890,
    likes: 5200,
    yesPercent: 85,
    noPercent: 15,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80',
    trending: false,
    timeAgo: '5m ago',
    isLive: false,
  },
  {
    id: '4',
    title: 'Pizza or Burger?',
    category: 'Food',
    votes: 68000,
    comments: 930,
    likes: 3400,
    yesPercent: 53,
    noPercent: 47,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
    trending: false,
    timeAgo: '10m ago',
    isLive: false,
  },
  {
    id: '5',
    title: 'Should taxes be higher for rich people?',
    category: 'Politics',
    votes: 45200,
    comments: 3210,
    likes: 2100,
    yesPercent: 61,
    noPercent: 39,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80',
    trending: false,
    timeAgo: '15m ago',
    isLive: false,
  },
  {
    id: '6',
    title: 'Is remote work the future?',
    category: 'Lifestyle',
    votes: 92100,
    comments: 1540,
    likes: 7300,
    yesPercent: 78,
    noPercent: 22,
    image: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=400&q=80',
    trending: true,
    timeAgo: '20m ago',
    isLive: true,
  },
]

export const categories = [
  { id: 'politics', name: 'Politics', icon: 'Landmark', polls: 12400, description: 'Elections, governance & world affairs' },
  { id: 'technology', name: 'Technology', icon: 'Monitor', polls: 8700, description: 'AI, gadgets, software & innovation' },
  { id: 'sports', name: 'Sports', icon: 'Trophy', polls: 9100, description: 'Football, basketball, Olympics & more' },
  { id: 'food', name: 'Food', icon: 'UtensilsCrossed', polls: 6200, description: 'Cuisine, recipes & food debates' },
  { id: 'lifestyle', name: 'Lifestyle', icon: 'Heart', polls: 7800, description: 'Health, relationships & daily life' },
  { id: 'entertainment', name: 'Entertainment', icon: 'Clapperboard', polls: 5600, description: 'Movies, music, gaming & culture' },
  { id: 'economy', name: 'Economy', icon: 'TrendingUp', polls: 4300, description: 'Finance, markets & business' },
  { id: 'environment', name: 'Environment', icon: 'Leaf', polls: 3900, description: 'Climate, sustainability & nature' },
  { id: 'education', name: 'Education', icon: 'GraduationCap', polls: 4700, description: 'Schools, universities & learning' },
  { id: 'science', name: 'Science', icon: 'FlaskConical', polls: 3100, description: 'Research, discoveries & space' },
  { id: 'gaming', name: 'Gaming', icon: 'Gamepad2', polls: 5200, description: 'Video games, esports & gaming culture' },
  { id: 'ai', name: 'AI', icon: 'Brain', polls: 6800, description: 'Artificial intelligence & machine learning' },
]

export const liveStats = {
  totalVotes: 2400000,
  votesToday: 1200000,
  todayGrowth: '+18.6%',
  activeUsers: 85400,
  activeGrowth: '+12.4%',
  pollsCreated: 312,
  pollsGrowth: '+7.8%',
  countriesVoting: 195,
  countriesGrowth: '+9.3%',
}

export const topCountries = [
  { rank: 1, country: 'Singapore', flag: '🇸🇬', percent: 89 },
  { rank: 2, country: 'Sweden', flag: '🇸🇪', percent: 87 },
  { rank: 3, country: 'Japan', flag: '🇯🇵', percent: 85 },
  { rank: 4, country: 'Canada', flag: '🇨🇦', percent: 82 },
  { rank: 5, country: 'Germany', flag: '🇩🇪', percent: 81 },
  { rank: 6, country: 'Australia', flag: '🇦🇺', percent: 79 },
  { rank: 7, country: 'Netherlands', flag: '🇳🇱', percent: 77 },
  { rank: 8, country: 'USA', flag: '🇺🇸', percent: 72 },
]

export const leaderboardUsers = [
  { rank: 1, name: 'GlobalVoter', username: '@globalvoter', votes: 12400, polls: 342, country: '🇸🇪', badge: 'Opinion Master' },
  { rank: 2, name: 'PoliticsNerd', username: '@politicsnerd', votes: 9800, polls: 198, country: '🇺🇸', badge: 'Top Creator' },
  { rank: 3, name: 'TechOracle', username: '@techoracle', votes: 8300, polls: 256, country: '🇯🇵', badge: 'Trend Spotter' },
  { rank: 4, name: 'WorldWatcher', username: '@worldwatcher', votes: 7100, polls: 143, country: '🇩🇪', badge: 'Commentator' },
  { rank: 5, name: 'VoiceOfEurope', username: '@voiceeu', votes: 6500, polls: 87, country: '🇫🇷', badge: 'Rising Star' },
]

export const recentComments = [
  { id: '1', user: 'Alex_M', avatar: 'AM', time: '2h ago', text: 'AI can revolutionize healthcare and education. The potential is endless!', likes: 128 },
  { id: '2', user: 'WorldVoice', avatar: 'WV', time: '3h ago', text: 'We need regulations before it\'s too late. AI poses real risks.', likes: 96 },
  { id: '3', user: 'TechLover', avatar: 'TL', time: '4h ago', text: 'The future is AI, and we must adapt. No turning back now.', likes: 74 },
  { id: '4', user: 'ScienceFan', avatar: 'SF', time: '5h ago', text: 'Mixed bag - great potential but serious ethical concerns need addressing.', likes: 52 },
]

export const voteTimelineData = [
  { time: '00:00', yes: 65, no: 35 },
  { time: '04:00', yes: 68, no: 32 },
  { time: '08:00', yes: 71, no: 29 },
  { time: '12:00', yes: 69, no: 31 },
  { time: '16:00', yes: 73, no: 27 },
  { time: '20:00', yes: 72, no: 28 },
  { time: 'Now', yes: 72, no: 28 },
]

export const weeklyVotesData = [
  { day: 'Mon', votes: 320000 },
  { day: 'Tue', votes: 480000 },
  { day: 'Wed', votes: 550000 },
  { day: 'Thu', votes: 620000 },
  { day: 'Fri', votes: 710000 },
  { day: 'Sat', votes: 890000 },
  { day: 'Sun', votes: 1200000 },
]

export const categoryDistribution = [
  { name: 'Politics', value: 28, fill: 'var(--color-chart-1)' },
  { name: 'Technology', value: 22, fill: 'var(--color-chart-2)' },
  { name: 'Sports', value: 18, fill: 'var(--color-chart-3)' },
  { name: 'Food', value: 12, fill: 'var(--color-chart-4)' },
  { name: 'Other', value: 20, fill: 'var(--color-chart-5)' },
]

export const pollDemographics = [
  { group: 'Male', yes: 74, no: 26 },
  { group: 'Female', yes: 70, no: 30 },
  { group: 'Other', yes: 68, no: 32 },
]

export const pollAgeGroups = [
  { group: '13-17', yes: 65, no: 35 },
  { group: '18-24', yes: 71, no: 29 },
  { group: '25-34', yes: 73, no: 27 },
  { group: '35-44', yes: 74, no: 26 },
  { group: '45+', yes: 69, no: 31 },
]

export const exploreFeed = [
  {
    id: '1',
    user: { name: 'GlobalVoter', username: '@globalvoter', avatar: 'GV', country: '🇸🇪' },
    poll: 'Is AI good for society?',
    category: 'Technology',
    result: { yes: 72, no: 28, votes: 125430 },
    comments: 2341,
    liked: false,
    timeAgo: '2m ago',
  },
  {
    id: '2',
    user: { name: 'PoliticsNerd', username: '@politicsnerd', avatar: 'PN', country: '🇺🇸' },
    poll: 'Which country will be the world leader in 2030?',
    category: 'Politics',
    result: { yes: 68, no: 32, votes: 98200 },
    comments: 4120,
    liked: true,
    timeAgo: '15m ago',
  },
  {
    id: '3',
    user: { name: 'SportsFan99', username: '@sportsfan99', avatar: 'SF', country: '🇧🇷' },
    poll: 'Is Messi the greatest of all time?',
    category: 'Sports',
    result: { yes: 83, no: 17, votes: 210000 },
    comments: 5670,
    liked: false,
    timeAgo: '1h ago',
  },
]
