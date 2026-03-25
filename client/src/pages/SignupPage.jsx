import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { showToast } from '../utils/toast';
import { UserPlus, User, Mail, Lock } from 'lucide-react';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/signup', data);
      login(res.data.user, res.data.token);
      showToast.success('Welcome to the platform!');
      navigate('/dashboard');
    } catch (err) {
      showToast.error(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-animated-gradient px-4 relative overflow-hidden animate-fade-in py-12">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-pulse"></div>
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-success-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="max-w-md w-full relative z-10 animate-slide-up">
        {/* Card */}
        <div className="glass-panel border border-secondary-700/50 rounded-3xl p-8 shadow-large relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-success-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-primary-500/20 rounded-2xl mb-4 shadow-inner">
                <UserPlus className="w-10 h-10 text-primary-400" />
              </div>
              <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-500">Create Account</h1>
              <p className="text-secondary-400 mt-2 font-medium">Join our charity subscription platform</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                error={errors.name?.message}
                className="bg-secondary-900/60 border-secondary-700/50 text-secondary-200"
                {...register('name')}
              />

              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                error={errors.email?.message}
                className="bg-secondary-900/60 border-secondary-700/50 text-secondary-200"
                {...register('email')}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Create a password"
                error={errors.password?.message}
                className="bg-secondary-900/60 border-secondary-700/50 text-secondary-200"
                {...register('password')}
              />

              <Button
                type="submit"
                loading={loading}
                className="w-full py-3 text-lg mt-4 shadow-lg hover:shadow-primary-500/25"
                size="lg"
              >
                Create Account
              </Button>
            </form>

            {/* Login link */}
            <div className="mt-8 text-center pt-6 border-t border-secondary-700/50">
              <p className="text-secondary-400 font-medium">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-400 hover:text-primary-300 font-bold ml-1 transition-colors">
                  Sign in
                </Link>
              </p>
              <div className="mt-4">
                <Link to="/" className="text-sm text-secondary-500 hover:text-secondary-300 transition-colors">
                  &larr; Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
