import React from 'react';
import { FiSearch, FiUser, FiShoppingCart } from 'react-icons/fi';

export default function NavbarPreview({ section = {} }) {
  const content = section.content || {};
  const settings = section.settings || {};

  const showSearch = content.showSearch ?? true;
  const showUser = content.showUser ?? true;
  const showCart = content.showCart ?? true;
  const isTransparent = settings.transparentOnTop ?? false;

  return (
    <div className={`w-full flex items-center justify-between px-8 py-5 ${isTransparent ? 'bg-transparent text-white' : 'bg-white border-b border-gray-100 text-[#1a1a1a]'}`}>
      <div className={`text-lg font-black tracking-widest font-serif ${isTransparent ? 'text-white' : 'text-[#1a1a1a]'}`}>AURELIAN</div>
      
      <div className={`hidden md:flex items-center gap-8 text-sm font-semibold ${isTransparent ? 'text-white/90' : 'text-gray-700'}`}>
        <span className={isTransparent ? 'text-white' : 'text-[#635BFF]'}>Home</span>
        <span className="flex items-center gap-1 cursor-pointer hover:opacity-75">Shop <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
        <span className="flex items-center gap-1 cursor-pointer hover:opacity-75">Categories <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
        <span className="cursor-pointer hover:opacity-75">About</span>
        <span className="cursor-pointer hover:opacity-75">Blog</span>
        <span className="cursor-pointer hover:opacity-75">Contact</span>
      </div>

      <div className={`flex items-center gap-5 ${isTransparent ? 'text-white' : 'text-gray-700'}`}>
        {showSearch && <FiSearch size={20} className="cursor-pointer hover:opacity-75" />}
        {showUser && <FiUser size={20} className="cursor-pointer hover:opacity-75" />}
        {showCart && (
          <div className="relative cursor-pointer hover:opacity-75">
            <FiShoppingCart size={20} />
            <span className={`absolute -top-1.5 -right-2 ${isTransparent ? 'bg-white text-black' : 'bg-[#635BFF] text-white'} text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center`}>2</span>
          </div>
        )}
      </div>
    </div>
  );
}
