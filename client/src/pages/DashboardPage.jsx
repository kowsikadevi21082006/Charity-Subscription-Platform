import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import { showToast } from '../utils/toast';
import { TrendingUp, Calendar, Heart, Target, Plus, Users, Trophy, Shield, LogOut, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [scores, setScores] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [scoresRes, subRes] = await Promise.all([
          api.get('/scores'),
          api.get('/subscription').catch(err => {
            if (err.response?.status === 404) {
              return { data: { subscription: null } };
            }
            throw err;
          })
        ]);
        setScores(scoresRes.data.scores);
        setSubscription(subRes.data.subscription);
      } catch (err) {
        showToast.error('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      showToast.success('Logged out successfully');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center lg:text-left pt-6 pb-4">
        <h1 className="text-5xl font-black mb-3 animate-fade-in text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-600">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-secondary-300 text-xl font-light">
          Track your scores, support charities, and enter exciting draws
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-primary-600/10 via-success-600/10 to-warning-600/10 filter blur-3xl rounded-3xl opacity-20 pointer-events-none"></div>
        <div className="glass-panel rounded-2xl p-6 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:border-primary-500/30 animate-slide-up relative z-10 group">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary-600/15 rounded-xl group-hover:bg-primary-600/25 transition-colors">
              <Shield className="w-6 h-6 text-primary-400 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <p className="text-secondary-400 uppercase tracking-widest text-[10px] font-bold">Subscription</p>
              <p className="text-xl font-bold text-secondary-100 mt-0.5">
                {subscription ? `${subscription.plan_type.charAt(0).toUpperCase() + subscription.plan_type.slice(1)} Plan` : 'Free'}
              </p>
            </div>
          </div>
          <div className="text-xs text-secondary-400 font-medium">
            {subscription ? `Renews on ${new Date(subscription.renewal_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}` : 'Upgrade for premium features'}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:border-success-500/30 animate-slide-up relative z-10 group" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-success-600/15 rounded-xl group-hover:bg-success-600/25 transition-colors">
              <Heart className="w-6 h-6 text-success-400 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <p className="text-secondary-400 uppercase tracking-widest text-[10px] font-bold">Charity Impact</p>
              <p className="text-xl font-bold text-secondary-100 mt-0.5">
                {subscription ? `$${Number(subscription.charity_amount).toFixed(2)}` : '$0.00'}
              </p>
            </div>
          </div>
          <div className="text-xs text-secondary-400 font-medium">
            Monthly contribution
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:border-warning-500/30 animate-slide-up relative z-10 group" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-warning-600/15 rounded-xl group-hover:bg-warning-600/25 transition-colors">
              <Target className="w-6 h-6 text-warning-400 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <p className="text-secondary-400 uppercase tracking-widest text-[10px] font-bold">Total Scores</p>
              <p className="text-xl font-bold text-secondary-100 mt-0.5">{scores.length}</p>
            </div>
          </div>
          <div className="text-xs text-secondary-400 font-medium">
            Total entries recorded
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:border-accent-500/30 animate-slide-up relative z-10 group" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-accent-600/15 rounded-xl group-hover:bg-accent-600/25 transition-colors">
              <Trophy className="w-6 h-6 text-accent-400 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <p className="text-secondary-400 uppercase tracking-widest text-[10px] font-bold">Draw Status</p>
              <p className="text-xl font-bold text-secondary-100 mt-0.5">Active</p>
            </div>
          </div>
          <div className="text-xs text-secondary-400 font-medium">
            Next draw in 4 days
          </div>
        </div>
      </div>


      {/* Content Grid */}
      <div className="grid gap-8 lg:grid-cols-2 mt-8">
        {/* Latest Scores */}
        <div className="glass-panel rounded-3xl p-8 animate-slide-up" style={{animationDelay: '0.4s'}}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary-600/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold text-secondary-200">Recent Scores</h3>
          </div>

          {scores.length > 0 ? (
            <div className="space-y-3">
              {scores.slice(0, 5).map((item, index) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-secondary-700/30 rounded-2xl border border-secondary-600/30 hover:border-primary-500/50 hover:bg-secondary-700/50 transition-all group animate-slide-up" style={{animationDelay: `${0.5 + index * 0.1}s`}}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-600/15 rounded-xl flex items-center justify-center border border-primary-500/20 group-hover:scale-110 transition-transform">
                      <span className="text-primary-400 font-black text-lg">{item.score}</span>
                    </div>
                    <div>
                      <div className="text-secondary-100 font-bold">Score #{scores.length - index}</div>
                      <div className="text-secondary-400 text-xs font-medium flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-secondary-400 text-[10px] uppercase tracking-tighter font-bold">Points</div>
                    <div className="text-primary-400 font-black text-xl">{item.score}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-secondary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-secondary-500" />
              </div>
              <h3 className="text-lg font-medium text-secondary-300 mb-2">No scores yet</h3>
              <p className="text-secondary-400 mb-4">Start tracking your golf performance</p>
              <Link to="/scores">
                <Button size="sm">Add Your First Score</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="glass-panel rounded-3xl p-8 animate-slide-up flex flex-col" style={{animationDelay: '0.6s'}}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-success-600/20 rounded-lg">
              <Plus className="w-5 h-5 text-success-400" />
            </div>
            <h3 className="text-xl font-semibold text-secondary-200">Quick Actions</h3>
          </div>

          <div className="space-y-4">
            <Link to="/scores" className="block">
              <Button variant="primary" size="lg" className="w-full justify-start group relative overflow-hidden transition-all duration-300">
                <Target className="w-5 h-5 mr-4 group-hover:rotate-12 transition-transform" />
                <span className="font-bold tracking-tight">Add New Score</span>
                <ArrowRight className="w-5 h-5 ml-auto opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Button>
            </Link>

            <Link to="/charity" className="block">
              <Button variant="success" size="lg" className="w-full justify-start group relative overflow-hidden transition-all duration-300">
                <Heart className="w-5 h-5 mr-4 group-hover:scale-125 transition-transform" />
                <span className="font-bold tracking-tight">Support Charity</span>
                <ArrowRight className="w-5 h-5 ml-auto opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Button>
            </Link>

            <Link to="/draw" className="block">
              <Button variant="warning" size="lg" className="w-full justify-start group relative overflow-hidden transition-all duration-300">
                <Trophy className="w-5 h-5 mr-4 group-hover:-translate-y-1 transition-transform" />
                <span className="font-bold tracking-tight">Lucky Draw Results</span>
                <ArrowRight className="w-5 h-5 ml-auto opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Button>
            </Link>

            {user?.role === 'admin' && (
              <Link to="/admin" className="block">
                <Button variant="danger" size="lg" className="w-full justify-start group relative overflow-hidden transition-all duration-300">
                  <Shield className="w-5 h-5 mr-4 group-hover:scale-110 transition-transform" />
                  <span className="font-bold tracking-tight">Administrator Panel</span>
                  <ArrowRight className="w-5 h-5 ml-auto opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Button>
              </Link>
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-secondary-800">
            <Button variant="secondary" size="md" onClick={handleLogout} className="w-full font-bold group hover:text-red-400 hover:border-red-500/20 transition-all">
              <LogOut className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Sign Out Securely
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
