import type { Category, FeedItem, Poll } from '../types/poll'

// Temporary prototype content. Replace these exports with Supabase queries when
// the corresponding tables and access rules have been defined.
export const trendingPolls: Poll[] = [
  { id: '1', title: 'Is AI good for society?', category: 'Technology', votes: 125430, yesPercent: 72, noPercent: 28, image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80', trending: true, live: true, timeAgo: 'Just now' },
  { id: '2', title: 'Which country will be the world leader in 2030?', category: 'Politics', votes: 98200, yesPercent: 68, noPercent: 32, image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80', live: true, timeAgo: '2m ago' },
  { id: '3', title: 'Who is the best football player right now?', category: 'Sports', votes: 76000, yesPercent: 85, noPercent: 15, image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80', timeAgo: '5m ago' },
  { id: '4', title: 'Pizza or Burger?', category: 'Food', votes: 68000, yesPercent: 53, noPercent: 47, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80', timeAgo: '10m ago' },
]

export const categories: Category[] = ([
  ['politics', 'Politics', '⚖', 12400], ['technology', 'Technology', '▣', 8700], ['sports', 'Sports', '🏆', 9100], ['food', 'Food', '♨', 6200], ['lifestyle', 'Lifestyle', '♡', 7800], ['entertainment', 'Entertainment', '▶', 5600], ['economy', 'Economy', '↗', 4300], ['environment', 'Environment', '♧', 3900], ['education', 'Education', '✦', 4700], ['science', 'Science', '⚗', 3100], ['gaming', 'Gaming', '⌁', 5200], ['ai', 'AI', '◉', 6800],
] as [string, string, string, number][]).map(([id, name, icon, polls]) => ({ id, name, icon, polls }))

export const exploreFeed: FeedItem[] = [
  { id: '1', user: { name: 'GlobalVoter', username: '@globalvoter', initials: 'GV', country: '🇸🇪' }, poll: 'Is AI good for society?', category: 'Technology', result: { yes: 72, no: 28, votes: 125430 }, comments: 2341, timeAgo: '2m ago' },
  { id: '2', user: { name: 'PoliticsNerd', username: '@politicsnerd', initials: 'PN', country: '🇺🇸' }, poll: 'Which country will be the world leader in 2030?', category: 'Politics', result: { yes: 68, no: 32, votes: 98200 }, comments: 4120, timeAgo: '15m ago' },
  { id: '3', user: { name: 'SportsFan99', username: '@sportsfan99', initials: 'SF', country: '🇬🇧' }, poll: 'Is Messi the greatest of all time?', category: 'Sports', result: { yes: 83, no: 17, votes: 210000 }, comments: 5670, timeAgo: '1h ago' },
]
