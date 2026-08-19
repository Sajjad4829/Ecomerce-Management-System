import React, { useState } from 'react';
import { FiCopy, FiCheck, FiMail } from 'react-icons/fi';

export default function CustomerReferrals() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://example.com/ref/sjenkins92";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Refer a Friend</h1>
        <p className="text-sm text-gray-500 mt-1">Give your friends $20 off their first order, and get $20 in points when they shop.</p>
      </div>

      <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 text-center max-w-xl mx-auto">
           <h2 className="text-3xl font-bold mb-4">Give $20, Get $20</h2>
           <p className="text-blue-100 mb-8">
             Share your unique link. When your friend makes their first purchase over $100, you both get rewarded!
           </p>
           
           <div className="bg-white/10 p-2 rounded-lg flex items-center justify-between border border-white/20 backdrop-blur-sm">
             <span className="font-mono text-sm px-4 select-all">{referralLink}</span>
             <button 
               onClick={handleCopy}
               className="bg-white text-blue-900 px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 hover:bg-gray-100 transition-colors"
             >
               {copied ? <><FiCheck /> Copied</> : <><FiCopy /> Copy Link</>}
             </button>
           </div>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-100">
           <h3 className="font-bold text-gray-900 text-lg">Your Referrals</h3>
        </div>
        <div className="p-8 text-center text-gray-500">
          <FiMail className="mx-auto mb-3 opacity-50" size={32} />
          <p>You haven't referred any friends yet.</p>
          <p className="text-sm mt-1">Share your link above to start earning!</p>
        </div>
      </div>

    </div>
  );
}
