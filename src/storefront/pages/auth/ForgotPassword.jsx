import { useState } from 'react';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex flex-col">
      <header className="px-8 py-6 bg-white border-b border-black/5 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold tracking-tight text-[#1A1A1A]">
          AURA
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[420px]">
          <Link to="/account/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-6 transition-colors">
            <FiArrowLeft size={16} /> Back to Sign In
          </Link>
          
          <div className="bg-white p-10 md:p-12 shadow-2xl shadow-black/5 border border-black/5">
            {!isSubmitted ? (
              <>
                <h1 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-2">Reset Password</h1>
                <p className="text-sm text-gray-500 mb-8">Enter your email address and we'll send you a link to reset your password.</p>

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

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-[#1A1A1A] text-white text-sm font-semibold hover:bg-black transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center mt-2"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      'Send Reset Link'
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiMail size={24} />
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-3">Check Your Email</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-8">
                  We've sent password reset instructions to <br/><strong className="text-black">{email}</strong>
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-sm font-medium text-gray-500 hover:text-black underline underline-offset-4"
                >
                  Didn't receive it? Try again.
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
