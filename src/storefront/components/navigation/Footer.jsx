import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube } from 'react-icons/fi';
import { useCMS } from '../../../admin/context/cms/CMSContext';

export default function Footer() {
  const { headerConfig, pages } = useCMS();
  
  return (
    <footer className="bg-[#111] text-white pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <span className="text-3xl font-serif font-bold tracking-tight block mb-6">{headerConfig?.logoText || 'Store'}</span>
            <p className="text-sm text-gray-400 max-w-sm mb-8 leading-relaxed">
              Premium furniture and homeware designed for the modern lifestyle.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors">
                <FiInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors">
                <FiTwitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors">
                <FiFacebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors">
                <FiYoutube size={18} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-bold mb-6 text-xs uppercase tracking-widest text-gray-300">Pages</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-500">
              {pages && pages.filter(p => p.status === 'Published' && p.slug !== '/').map(page => (
                <li key={page.id}><Link to={page.slug} className="hover:text-white transition-colors">{page.name}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} {headerConfig?.logoText || 'Store'}. All rights reserved.
          </div>
          <div className="flex w-full md:w-auto max-w-md">
            <input 
              type="email" 
              placeholder="Join our world (Newsletter)" 
              className="bg-transparent border border-gray-700 px-4 py-3 text-sm w-full focus:outline-none focus:border-white transition-colors text-white" 
            />
            <button className="bg-white text-black px-6 py-3 text-sm font-bold tracking-wide hover:bg-gray-200 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
