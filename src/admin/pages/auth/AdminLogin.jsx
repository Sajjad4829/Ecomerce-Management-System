import { useState } from 'react';
import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../../auth/context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('pass123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password, 'admin');
    
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-[#1A1A1A] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-xl font-serif font-bold text-white tracking-wider">A</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-text-primary mb-2">Workspace Login</h1>
          <p className="text-sm text-text-muted">Sign in to the administrative console.</p>
        </div>

        <div className="bg-surface rounded-2xl shadow-sm border border-black/5 p-8">
          {error && (
            <div className="mb-6 p-4 bg-danger-soft border border-red-100 text-danger text-sm rounded-lg flex items-start gap-3">
              <FiLock className="mt-0.5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-background border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-text-primary"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-mono font-bold text-text-muted uppercase">Password</label>
                <Link to="#" className="text-xs font-medium text-text-muted hover:text-black transition-colors">Forgot?</Link>
              </div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 bg-background border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-text-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-black focus:outline-none"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input 
                id="remember_me" 
                name="remember_me" 
                type="checkbox" 
                className="h-4 w-4 rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" 
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-text-secondary cursor-pointer">
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#1A1A1A] text-white rounded-xl text-sm font-semibold hover:bg-black transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center h-12"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-black/5 text-center">
            <p className="text-xs text-text-muted">
              By signing in, you agree to the enterprise <br/><a href="#" className="hover:text-black underline decoration-gray-300">Terms of Service</a> & <a href="#" className="hover:text-black underline decoration-gray-300">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
