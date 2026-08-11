import { useState } from 'react';
import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../../auth/context/AuthContext';

export default function CustomerLogin() {
  const [email, setEmail] = useState('eleanor@example.com');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/account";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password, 'customer');
    
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex flex-col">
      {/* Simple Header */}
      <header className="px-8 py-6 bg-white border-b border-black/5 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold tracking-tight text-[#1A1A1A]">
          AURA
        </Link>
        <Link to="/account/register" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
          Create Account
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[420px]">
          <div className="bg-white p-10 md:p-12 shadow-2xl shadow-black/5 border border-black/5">
            <h1 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-2">Welcome Back</h1>
            <p className="text-sm text-gray-500 mb-8">Sign in to access your orders and saved items.</p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm flex items-start gap-3">
                <FiLock className="mt-0.5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-mono font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-[#F7F5F2] border-transparent focus:outline-none focus:bg-white focus:border-black/20 focus:ring-1 focus:ring-black/20 text-sm font-medium text-[#1A1A1A] transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-mono font-bold text-gray-500 uppercase tracking-wider">Password</label>
                  <Link to="/account/forgot-password" className="text-xs font-medium text-gray-500 hover:text-black transition-colors underline decoration-transparent hover:decoration-black underline-offset-4">Forgot?</Link>
                </div>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 bg-[#F7F5F2] border-transparent focus:outline-none focus:bg-white focus:border-black/20 focus:ring-1 focus:ring-black/20 text-sm font-medium text-[#1A1A1A] transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black focus:outline-none"
                  >
                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center pt-2">
                <input 
                  id="remember_me" 
                  name="remember_me" 
                  type="checkbox" 
                  className="h-4 w-4 rounded-sm border-gray-300 text-[#1A1A1A] focus:ring-[#1A1A1A]" 
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-[#1A1A1A] text-white text-sm font-semibold hover:bg-black transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center mt-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account? <Link to="/account/register" className="text-[#1A1A1A] font-medium hover:underline underline-offset-4">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
