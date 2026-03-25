import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import Button from '../ui/Button';
import { Heart } from 'lucide-react';

export default function CharityPage() {
  const [charities, setCharities] = useState([]);
  const [selected, setSelected] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/charity');
        setCharities(res.data.charities || []);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  const selectCharity = async () => {
    try {
      await api.post('/charity/select', { charity_id: Number(selected) });
      setMessage('Charity selected successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Selection failed');
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 animate-slide-up">
      <div className="glass-panel rounded-3xl p-8 shadow-large hover:shadow-[0_0_40px_rgba(20,184,166,0.2)] transition-shadow duration-500 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-success-500/10 to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-success-500/20 rounded-xl">
              <Heart className="w-6 h-6 text-success-400" />
            </div>
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-success-400 to-primary-400">Charity Selection</h2>
          </div>
          
          <div className="space-y-4">
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="w-full p-4 rounded-xl bg-secondary-900/60 border border-secondary-700/50 text-secondary-200 focus:outline-none focus:ring-2 focus:ring-success-500/50 transition-all cursor-pointer appearance-none"
            >
              <option value="">Pick a charity</option>
              {charities.map((c) => (
                <option key={c.id} value={c.id} className="bg-secondary-900">{c.name}</option>
              ))}
            </select>
            
            <Button
              onClick={selectCharity}
              disabled={!selected}
              variant="success"
              className="w-full justify-center text-lg"
              size="lg"
            >
              Save Charity
            </Button>
            
            {message && (
              <p className="text-center font-medium mt-4 text-success-400 bg-success-900/20 p-3 rounded-lg border border-success-700/30">
                {message}
              </p>
            )}
          </div>
          
          <div className="mt-8 text-center border-t border-secondary-700/50 pt-4">
            <Link to="/dashboard" className="text-sm text-secondary-400 hover:text-primary-400 transition-colors font-medium">
              &larr; Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
