import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import Button from '../ui/Button';
import { Trophy, Gift } from 'lucide-react';

export default function DrawPage() {
  const [draw, setDraw] = useState(null);
  const [winners, setWinners] = useState([]);
  const [message, setMessage] = useState('');

  const load = async () => {
    try {
      const res = await api.get('/draw/results');
      setDraw(res.data.draws?.[0] || null);
      setWinners(res.data.winners || []);
    } catch (err) {
      setMessage('Unable to load draws.');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const runDraw = async () => {
    try {
      const res = await api.post('/draw/run');
      setDraw(res.data.draw);
      setWinners(res.data.winners);
      setMessage('Draw executed successfully');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Draw failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">
      <div className="glass-panel rounded-3xl p-8 shadow-large relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-warning-500/10 to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-warning-500/20 rounded-xl">
                <Trophy className="w-6 h-6 text-warning-400" />
              </div>
              <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-warning-400 to-primary-400">Monthly Draw</h2>
            </div>
            <Button onClick={runDraw} variant="warning" className="shadow-lg hover:shadow-xl transition-all">
              <Gift className="w-5 h-5 mr-2" /> Run Draw
            </Button>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              {draw ? (
                <div className="bg-secondary-800/60 p-6 rounded-2xl border border-secondary-700/50 shadow-inner">
                  <h3 className="text-lg font-medium text-secondary-300 mb-4">Latest Draw Numbers</h3>
                  <div className="flex flex-wrap gap-3">
                    {draw.draw_numbers.map((n, i) => (
                      <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg font-bold text-lg text-white transform hover:scale-110 transition-transform">
                        {n}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-secondary-800/40 p-8 rounded-2xl border border-secondary-700/50 text-center border-dashed">
                  <Trophy className="w-12 h-12 text-secondary-600 mx-auto mb-3" />
                  <p className="text-secondary-400">No draw available yet.</p>
                </div>
              )}

              {message && (
                <div className="p-4 rounded-xl bg-primary-900/30 border border-primary-500/30 text-primary-300 font-medium">
                  {message}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-bold text-secondary-200">Winners</h3>
                <span className="bg-secondary-700 text-secondary-300 py-0.5 px-2 rounded-full text-sm">{winners.length}</span>
              </div>
              
              <ul className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {winners.length > 0 ? winners.map((w) => (
                  <li key={w.id} className="rounded-xl border border-secondary-600/50 p-4 bg-secondary-800/50 hover:bg-secondary-700/50 transition-colors">
                    <div className="font-semibold text-secondary-200 mb-1">{w.name}</div>
                    <div className="text-sm text-secondary-400 mb-2">{w.email}</div>
                    <div className="flex flex-wrap gap-2 text-xs font-medium">
                      <span className="bg-primary-900/50 text-primary-400 px-2 py-1 rounded-md">{w.match_count} matches</span>
                      <span className="bg-success-900/50 text-success-400 px-2 py-1 rounded-md">${w.prize_amount}</span>
                      <span className="bg-secondary-700 text-secondary-300 px-2 py-1 rounded-md">{w.status}</span>
                    </div>
                  </li>
                )) : (
                  <div className="text-center py-8 text-secondary-500">
                    No winners to display
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
