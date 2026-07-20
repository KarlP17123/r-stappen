import Navbar from '@/components/navbar'
import HeroSection from '@/components/hero-section'
import TrendingPolls from '@/components/trending-polls'
import CategoriesSection from '@/components/categories-section'
import ExploreFeed from '@/components/explore-feed'
import Footer from '@/components/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <TrendingPolls />
        <CategoriesSection />
        <ExploreFeed />
      </main>
      <Footer />
    </div>
  )
}
