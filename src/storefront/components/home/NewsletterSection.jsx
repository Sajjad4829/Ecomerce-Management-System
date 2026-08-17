import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4 tracking-tight">Stay inspired.</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Sign up for new collections, design inspiration, and exclusive offers.
        </p>
        
        {status === 'success' ? (
          <div className="bg-gray-50 text-gray-900 p-4 font-medium text-sm animate-in fade-in slide-in-from-bottom-2">
            Thank you for subscribing. Welcome to Aurelia.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex border-b border-gray-300 group focus-within:border-gray-900 transition-colors">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-grow bg-transparent py-3 px-2 outline-none text-gray-900 placeholder-gray-400 text-sm"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-4 text-gray-400 group-focus-within:text-gray-900 hover:text-gray-900 transition-colors disabled:opacity-50"
              aria-label="Subscribe"
            >
              <FiArrowRight size={20} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
