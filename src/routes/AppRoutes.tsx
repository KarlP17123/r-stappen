import { Route, Routes } from 'react-router-dom'
import { CategoriesPage } from '../pages/categories/CategoriesPage'
import { CreatePollPage } from '../pages/create-poll/CreatePollPage'
import { NotFoundPage } from '../pages/errors/NotFoundPage'
import { ExplorePage } from '../pages/explore/ExplorePage'
import { HomePage } from '../pages/HomePage'
import { LeaderboardsPage } from '../pages/leaderboards/LeaderboardsPage'
import { MapPage } from '../pages/map/MapPage'
import { PollPage } from '../pages/poll/PollPage'
import { ProfilePage } from '../pages/profile/ProfilePage'
import { StatisticsPage } from '../pages/statistics/StatisticsPage'
import { TrendingPage } from '../pages/trending/TrendingPage'
import { LoginPage } from '../pages/auth/LoginPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/trending" element={<TrendingPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/leaderboards" element={<LeaderboardsPage />} />
      <Route path="/statistics" element={<StatisticsPage />} />
      <Route path="/create-poll" element={<CreatePollPage />} />
      <Route path="/poll/:id" element={<PollPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
