import { FiMail, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function VerifyEmail() {
  return (
    <div className="min-h-screen bg-[#F7F5F2] flex flex-col">
      <header className="px-8 py-6 bg-white border-b border-black/5 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold tracking-tight text-[#1A1A1A]">
          AURA
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[420px]">
          <div className="bg-white p-10 md:p-12 shadow-2xl shadow-black/5 border border-black/5 text-center">
            <div className="w-20 h-20 bg-[#F7F5F2] text-[#1A1A1A] rounded-full flex items-center justify-center mx-auto mb-8 relative">
              <FiMail size={32} />
              <div className="absolute top-0 right-0 w-6 h-6 bg-[#1A1A1A] rounded-full flex items-center justify-center border-2 border-white">
                <span className="w-2 h-2 bg-white rounded-full animate-ping" />
              </div>
            </div>
            
            <h1 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-4">Verify your email</h1>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">
              We've sent a verification link to your email address. Please click the link to activate your account.
            </p>

            <Link 
              to="/account"
              className="inline-flex items-center justify-center gap-2 w-full py-4 bg-[#1A1A1A] text-white text-sm font-semibold hover:bg-black transition-colors mb-6"
            >
              Continue to Account <FiArrowRight size={16} />
            </Link>

            <p className="text-sm text-gray-500">
              Didn't receive the email? <button className="text-black font-medium hover:underline underline-offset-4">Resend link</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
