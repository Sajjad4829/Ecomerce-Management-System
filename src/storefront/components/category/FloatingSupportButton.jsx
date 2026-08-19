import React from 'react';
import { FiMessageCircle } from 'react-icons/fi';

export default function FloatingSupportButton() {
  return (
    <button 
      className="fixed bottom-6 right-6 z-40 bg-gray-900 text-white p-4 rounded-full shadow-xl hover:bg-gray-800 hover:scale-105 transition-all duration-300"
      aria-label="Chat with support"
    >
      <FiMessageCircle size={24} />
    </button>
  );
}
