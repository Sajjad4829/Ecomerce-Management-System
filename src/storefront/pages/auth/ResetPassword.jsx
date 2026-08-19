import { useState } from 'react';
import { FiEye, FiEyeOff, FiLock, FiCheckCircle } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1000);
  };

  const calculatePasswordStrength = (pass) => {
    if (pass.length === 0) return 0;
    let score = 0;
    if (pass.length > 7) score += 25;
    if (pass.length > 11) score += 25;
    if (/[A-Z]/.test(pass)) score += 25;
    if (/[0-9]/.test(pass)) score += 25;
    return score;
  };

  const strength = calculatePasswordStrength(password);

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex flex-col">
      <header className="px-8 py-6 bg-white border-b border-black/5 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold tracking-tight text-[#1A1A1A]">
          AURA
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[420px]">
          <div className="bg-white p-10 md:p-12 shadow-2xl shadow-black/5 border border-black/5">
            {!isSuccess ? (
              <>
                <h1 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-2">Set New Password</h1>
                <p className="text-sm text-gray-500 mb-8">Please enter your new password below.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-mono font-bold text-gray-500 uppercase tracking-wider mb-2">New Password</label>
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
                    {password && (
                      <div className="mt-2 flex gap-1">
                        {[1,2,3,4].map(i => (
                          <div key={i} className={`h-1 flex-1 rounded-full ${i * 25 <= strength ? (strength > 50 ? 'bg-green-500' : 'bg-amber-400') : 'bg-gray-200'}`} />
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-gray-500 uppercase tracking-wider mb-2">Confirm Password</label>
                    <div className="relative">
                      <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full pl-11 pr-4 py-3 bg-[#F7F5F2] border focus:outline-none focus:bg-white focus:ring-1 focus:ring-black/20 text-sm font-medium text-[#1A1A1A] transition-all ${
                          confirmPassword && password !== confirmPassword ? 'border-red-300' : 'border-transparent focus:border-black/20'
                        }`}
                        required
                      />
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                      <p className="text-xs text-red-500 mt-2">Passwords do not match</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || strength < 50 || password !== confirmPassword}
                    className="w-full py-4 bg-[#1A1A1A] text-white text-sm font-semibold hover:bg-black transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center mt-2"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      'Update Password'
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiCheckCircle size={32} />
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-3">Password Updated</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-8">
                  Your password has been successfully reset. You can now use your new password to sign in.
                </p>
                <Link 
                  to="/account/login"
                  className="w-full py-4 bg-[#1A1A1A] text-white text-sm font-semibold hover:bg-black transition-colors rounded block"
                >
                  Return to Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
