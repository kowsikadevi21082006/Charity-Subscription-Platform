import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, LogIn, UserPlus, LogOut, LayoutDashboard } from 'lucide-react';
import Button from '../ui/Button';

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-x-0 border-t-0 rounded-none bg-secondary-950/70 transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 group">
          <div className="w-11 h-11 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.3)] group-hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] transition-all">
            <span className="text-white font-black text-lg tracking-tighter">GC</span>
          </div>
          <div className="flex flex-col -gap-1">
            <span className="text-xl text-white font-black tracking-tight leading-none group-hover:text-primary-400 transition-colors">Golf Charity</span>
            <span className="text-[10px] text-primary-500 font-bold uppercase tracking-[0.2em] leading-none">Subscription</span>
          </div>
        </Link>

        <nav className="flex items-center gap-3 sm:gap-4">
          <Link to="/" className="text-secondary-300 hover:text-white transition-all font-semibold flex items-center gap-2 px-5 py-2 rounded-2xl hover:bg-white/5 active:scale-95 group">
            <Home className="w-4 h-4 text-primary-400 group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline text-sm">Home</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-3 sm:gap-4">
              <Link to="/dashboard" className="text-secondary-300 hover:text-white transition-all font-semibold flex items-center gap-2 px-5 py-2 rounded-2xl hover:bg-white/5 active:scale-95 group">
                <LayoutDashboard className="w-4 h-4 text-primary-400 group-hover:scale-110 transition-transform" />
                <span className="hidden md:inline text-sm">Dashboard</span>
              </Link>
              <div className="h-6 w-[1px] bg-secondary-800 mx-1 hidden sm:block"></div>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="rounded-xl px-5 text-secondary-400 hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20">
                <LogOut className="w-4 h-4 sm:mr-2" />
                <span className="hidden md:inline">Sign Out</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="font-bold border border-transparent hover:border-white/10">
                  <span className="hidden sm:inline">Login</span>
                  <LogIn className="w-4 h-4 ml-2 text-primary-400" />
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm" className="font-bold">
                  <span>Join now</span>
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
