import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LandingCard from '../components/LandingCard';
import Button from '../ui/Button';
import { CreditCard, Target, Gift, Heart, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen text-secondary-200 animate-fade-in bg-animated-gradient relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 -left-64 w-96 h-96 bg-primary-600/30 rounded-full mix-blend-screen filter blur-[128px] opacity-70 animate-pulse"></div>
      <div className="absolute top-0 -right-64 w-96 h-96 bg-success-600/30 rounded-full mix-blend-screen filter blur-[128px] opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute -bottom-64 left-1/2 transform -translate-x-1/2 w-[800px] h-[500px] bg-primary-800/40 rounded-full mix-blend-screen filter blur-[128px] opacity-60"></div>

      <div className="relative z-10">
        <Navbar />
        <section className="container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center max-w-5xl mx-auto mb-20">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 animate-slide-up leading-tight">
              Golf Charity
              <span className="block text-primary-400 mt-2 text-glow bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-primary-300 to-primary-500">
                Subscription Platform
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-secondary-300 mb-12 max-w-3xl mx-auto animate-slide-up font-light" style={{animationDelay: '0.2s'}}>
              Track your golf scores, enter monthly draws, win prizes, and support charities with every subscription.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 animate-slide-up" style={{animationDelay: '0.4s'}}>
              <Link to="/signup">
                <Button size="xl" className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold shadow-large hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-full px-10 py-5 text-lg">
                  Get Started Free
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="xl" className="border-secondary-600/50 hover:border-primary-400 hover:bg-primary-900/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 rounded-full px-10 py-5 text-lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mt-16 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-600/10 via-success-600/10 to-warning-600/10 filter blur-2xl rounded-3xl opacity-50"></div>
            <LandingCard
              title="Flexible Subscription"
              description="Monthly $10 or Yearly $100 with minimum 10% charity contribution. Cancel anytime."
              icon={<CreditCard className="w-10 h-10" />}
              gradient="glass-panel"
              delay="0.6s"
            />
            <LandingCard
              title="Score Tracking"
              description="Store and track your latest scores. Monitor your golf performance over time."
              icon={<Target className="w-10 h-10" />}
              gradient="glass-panel"
              delay="0.8s"
            />
            <LandingCard
              title="Monthly Draws"
              description="Enter draws automatically. Match 3/4/5 numbers to win prizes. All winners verified by admin."
              icon={<Gift className="w-10 h-10" />}
              gradient="glass-panel"
              delay="1.0s"
            />
          </div>

          {/* Additional CTA */}
          <div className="text-center mt-24 animate-slide-up" style={{animationDelay: '1.2s'}}>
            <div className="inline-flex items-center gap-4 glass-panel rounded-full px-8 py-5 shadow-large hover:scale-105 transition-transform duration-300">
              <div className="p-2 bg-accent-500/20 rounded-full">
                <Heart className="w-6 h-6 text-accent-400 animate-pulse relative z-10" />
              </div>
              <span className="text-secondary-200 font-medium text-lg tracking-wide">Every subscription supports verified charities</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
