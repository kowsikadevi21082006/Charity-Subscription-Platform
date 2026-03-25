import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { Shield, Users, Trophy } from 'lucide-react';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [usersRes, winnersRes] = await Promise.all([
          api.get('/admin/users'),
          api.get('/admin/winners'),
        ]);
        setUsers(usersRes.data.users || []);
        setWinners(winnersRes.data.winners || []);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-slide-up">
      <div className="glass-panel rounded-3xl p-8 shadow-large relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-danger-500/10 to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-red-500/20 rounded-xl">
              <Shield className="w-6 h-6 text-red-500" />
            </div>
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-primary-400">Admin Dashboard</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            
            {/* Users Panel */}
            <div className="bg-secondary-900/40 border border-secondary-700/50 rounded-2xl p-6 shadow-inner flex flex-col h-[500px]">
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-primary-400" />
                <h3 className="text-xl font-bold text-secondary-200">User Directory</h3>
                <span className="ml-auto bg-primary-900/50 text-primary-300 py-0.5 px-2 rounded-full text-sm font-medium">{users.length} Users</span>
              </div>
              
              <ul className="space-y-3 overflow-y-auto pr-2 flex-1 custom-scrollbar">
                {users.map((u) => (
                  <li key={u.id} className="rounded-xl p-4 bg-secondary-800/60 border border-secondary-700/50 hover:bg-secondary-700/50 transition-colors flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                    <div>
                      <div className="font-semibold text-secondary-200">{u.name}</div>
                      <div className="text-sm text-secondary-400">{u.email}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-md font-medium uppercase tracking-wider ${u.role === 'admin' ? 'bg-red-900/50 text-red-400' : 'bg-secondary-700 text-secondary-300'}`}>
                      {u.role}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Winners Panel */}
            <div className="bg-secondary-900/40 border border-secondary-700/50 rounded-2xl p-6 shadow-inner flex flex-col h-[500px]">
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-5 h-5 text-warning-400" />
                <h3 className="text-xl font-bold text-secondary-200">Draw Winners</h3>
                <span className="ml-auto bg-warning-900/50 text-warning-300 py-0.5 px-2 rounded-full text-sm font-medium">{winners.length} Winners</span>
              </div>
              
              <ul className="space-y-3 overflow-y-auto pr-2 flex-1 custom-scrollbar">
                {winners.map((w) => (
                  <li key={w.id} className="rounded-xl p-4 bg-secondary-800/60 border border-secondary-700/50 hover:bg-secondary-700/50 transition-colors">
                    <div className="font-semibold text-secondary-200 mb-1">{w.name}</div>
                    <div className="text-sm text-secondary-400 mb-3">{w.email}</div>
                    <div className="flex flex-wrap gap-2 text-xs font-medium">
                      <span className="bg-primary-900/50 text-primary-400 px-2 py-1 rounded-md">{w.match_count} matches</span>
                      <span className="bg-success-900/50 text-success-400 px-2 py-1 rounded-md">${w.prize_amount}</span>
                      <span className="bg-secondary-700 text-secondary-300 px-2 py-1 rounded-md">{w.status}</span>
                    </div>
                  </li>
                ))}
                {winners.length === 0 && (
                  <div className="text-center py-8 text-secondary-500 h-full flex items-center justify-center flex-col">
                    <Trophy className="w-8 h-8 mb-2 opacity-50" />
                    No winners recorded yet
                  </div>
                )}
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-secondary-700/50">
            <Link to="/dashboard" className="text-sm text-secondary-400 hover:text-primary-400 transition-colors font-medium">
              &larr; Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}