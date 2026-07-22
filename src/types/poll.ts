export interface Poll {
  id: string
  title: string
  category: string
  votes: number
  yesPercent: number
  noPercent: number
  image: string
  trending?: boolean
  live?: boolean
  timeAgo: string
}

export interface Category {
  id: string
  name: string
  icon: string
  polls: number
}

export interface FeedItem {
  id: string
  user: { name: string; username: string; initials: string; country: string }
  poll: string
  category: string
  result: { yes: number; no: number; votes: number }
  comments: number
  timeAgo: string
}
