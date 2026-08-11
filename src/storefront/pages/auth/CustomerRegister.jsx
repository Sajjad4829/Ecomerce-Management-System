import { useState } from 'react';
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser, FiCheck } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

export default function CustomerRegister() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/account/verify-email');
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

  const strength = calculatePasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex flex-col">
      <header className="px-8 py-6 bg-white border-b border-black/5 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold tracking-tight text-[#1A1A1A]">
          AURA
        </Link>
        <Link to="/account/login" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
          Sign In
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center p-6 my-8">
        <div className="w-full max-w-[480px]">
          <div className="bg-white p-10 md:p-12 shadow-2xl shadow-black/5 border border-black/5">
            <h1 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-2">Create Account</h1>
            <p className="text-sm text-gray-500 mb-8">Join to track orders, save items, and speed up checkout.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-gray-500 uppercase tracking-wider mb-2">First Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 bg-[#F7F5F2] border-transparent focus:outline-none focus:bg-white focus:border-black/20 focus:ring-1 focus:ring-black/20 text-sm font-medium text-[#1A1A1A] transition-all"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-gray-500 uppercase tracking-wider mb-2">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full px-4 py-3 bg-[#F7F5F2] border-transparent focus:outline-none focus:bg-white focus:border-black/20 focus:ring-1 focus:ring-black/20 text-sm font-medium text-[#1A1A1A] transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 bg-[#F7F5F2] border-transparent focus:outline-none focus:bg-white focus:border-black/20 focus:ring-1 focus:ring-black/20 text-sm font-medium text-[#1A1A1A] transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-gray-500 uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
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
                {formData.password && (
                  <div className="mt-2 flex gap-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full ${i * 25 <= strength ? (strength > 50 ? 'bg-green-500' : 'bg-amber-400') : 'bg-gray-200'}`} />
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2">
                <label className="flex items-start cursor-pointer group">
                  <div className="mt-0.5 relative flex items-center justify-center">
                    <input type="checkbox" className="peer sr-only" required />
                    <div className="w-5 h-5 border-2 border-gray-300 bg-white group-hover:border-black peer-checked:bg-black peer-checked:border-black transition-colors flex items-center justify-center">
                      <FiCheck size={14} className="text-white opacity-0 peer-checked:opacity-100" />
                    </div>
                  </div>
                  <span className="ml-3 text-sm text-gray-600 leading-relaxed">
                    I agree to the <a href="#" className="text-black hover:underline underline-offset-4">Terms of Service</a> and <a href="#" className="text-black hover:underline underline-offset-4">Privacy Policy</a>.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading || strength < 50}
                className="w-full py-4 bg-[#1A1A1A] text-white text-sm font-semibold hover:bg-black transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center mt-6"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
