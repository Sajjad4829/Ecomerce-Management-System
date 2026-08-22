import React from 'react';
import { FiSearch, FiUser, FiShoppingCart } from 'react-icons/fi';

export default function NavbarPreview() {
  return (
    <div className="w-full bg-white border-b border-gray-100 flex items-center justify-between px-8 py-5">
      <div className="text-lg font-black tracking-widest text-[#1a1a1a] font-serif">AURELIAN</div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
        <span className="text-[#635BFF]">Home</span>
        <span className="flex items-center gap-1 cursor-pointer hover:text-[#635BFF]">Shop <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
        <span className="flex items-center gap-1 cursor-pointer hover:text-[#635BFF]">Categories <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
        <span className="cursor-pointer hover:text-[#635BFF]">About</span>
        <span className="cursor-pointer hover:text-[#635BFF]">Blog</span>
        <span className="cursor-pointer hover:text-[#635BFF]">Contact</span>
      </div>

      <div className="flex items-center gap-5 text-gray-700">
        <FiSearch size={20} className="cursor-pointer hover:text-[#635BFF]" />
        <FiUser size={20} className="cursor-pointer hover:text-[#635BFF]" />
        <div className="relative cursor-pointer hover:text-[#635BFF]">
          <FiShoppingCart size={20} />
          <span className="absolute -top-1.5 -right-2 bg-[#635BFF] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">2</span>
        </div>
      </div>
    </div>
  );
}
