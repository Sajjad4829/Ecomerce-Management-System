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
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4 tracking-tight">Stay Inspired</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Get new collections, design inspiration and exclusive offers.
        </p>
        
        {status === 'success' ? (
          <div className="bg-gray-50 text-gray-900 p-4 font-medium text-sm animate-in fade-in slide-in-from-bottom-2">
            Thank you for subscribing. Welcome to Aurelia.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full sm:w-auto flex-grow max-w-sm bg-transparent border border-gray-300 py-4 px-6 outline-none text-gray-900 placeholder-gray-500 text-sm focus:border-black transition-colors"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full sm:w-auto px-10 py-4 bg-black text-white text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
