import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../api';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Spinner from '../ui/Spinner';
import { showToast } from '../utils/toast';
import { Target, Calendar, TrendingUp } from 'lucide-react';

const scoreSchema = z.object({
  score: z.number().min(1, 'Score must be at least 1').max(45, 'Score must be at most 45'),
});

export default function ScoresPage() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(scoreSchema),
  });

  const loadScores = async () => {
    try {
      const res = await api.get('/scores');
      setScores(res.data.scores);
    } catch (err) {
      showToast.error('Failed to load scores');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadScores();
  }, []);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const res = await api.post('/scores', { score: data.score });
      setScores(res.data.scores);
      showToast.success('Score added successfully!');
      reset();
    } catch (err) {
      showToast.error(err.response?.data?.message || 'Could not add score');
    } finally {
      setSubmitting(false);
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
    <div className="max-w-4xl mx-auto space-y-8 animate-slide-up">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-primary-500 mb-2">Score Entry</h1>
        <p className="text-secondary-300 text-lg">Enter your golf scores (1-45) to track your progress</p>
      </div>

      {/* Score Form */}
      <div className="glass-panel rounded-3xl p-8 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-cyan-500/20 rounded-xl">
              <Target className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold text-secondary-200">Add New Score</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="max-w-md">
              <Input
                label="Score"
                type="number"
                placeholder="Enter score (1-45)"
                error={errors.score?.message}
                className="bg-secondary-900/60 border-secondary-700/50 text-secondary-200 text-lg py-3"
                {...register('score', { valueAsNumber: true })}
              />
            </div>

            <Button
              type="submit"
              loading={submitting}
              className="w-full sm:w-auto px-8 py-3 text-lg"
              variant="primary"
            >
              Add Score
            </Button>
          </form>
        </div>
      </div>

      {/* Scores Grid */}
      <div className="glass-panel rounded-3xl p-8 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-success-500/5 to-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row items-baseline gap-3 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary-500/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-primary-400" />
              </div>
              <h2 className="text-2xl font-bold text-secondary-200">Your Scores</h2>
            </div>
            <span className="text-secondary-400 font-medium bg-secondary-800/50 px-3 py-1 rounded-full">
              {scores.length} total
            </span>
          </div>

          {scores.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {scores.map((item, index) => (
                <div key={item.id} className="bg-secondary-800/40 border border-secondary-700/30 rounded-2xl p-4 text-center hover:bg-primary-900/20 hover:border-primary-500/30 transition-all duration-500 hover:-translate-y-1 shadow-soft hover:shadow-primary-500/10 group" style={{animationDelay: `${index * 0.05}s`}}>
                  <div className="text-2xl font-black text-secondary-100 group-hover:text-primary-400 transition-colors font-display tracking-tight leading-none">{item.score}</div>
                  <div className="text-[10px] text-secondary-400 mt-2 flex flex-col items-center gap-1 font-bold uppercase tracking-wider">
                    <Calendar className="w-3 h-3 opacity-70" />
                    {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-secondary-900/30 rounded-2xl border border-secondary-700/50 border-dashed">
              <div className="w-20 h-20 bg-secondary-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                <Target className="w-10 h-10 text-secondary-500" />
              </div>
              <h3 className="text-xl font-bold text-secondary-300 mb-2">No scores yet</h3>
              <p className="text-secondary-400 max-w-sm mx-auto">Start tracking your golf scores by adding your first one above to see your progress.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
