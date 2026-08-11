import React, { useState } from 'react';
import { FiSend, FiLock, FiPaperclip } from 'react-icons/fi';
import { useSupport } from '../../context/SupportContext';

export default function Conversation({ ticket }) {
  const { addMessage } = useSupport();
  const [message, setMessage] = useState('');
  const [isInternal, setIsInternal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      addMessage(ticket.id, message, 'Agent', 'Current Agent', isInternal);
      setMessage('');
      setIsInternal(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-bold text-gray-900">Conversation</h3>
        <span className="text-xs text-gray-500">{ticket.messages.length} messages</span>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto space-y-6 max-h-[500px]">
        {ticket.messages.map((msg) => {
          const isCustomer = msg.sender === 'Customer';
          return (
            <div key={msg.id} className={`flex flex-col ${isCustomer ? 'items-start' : 'items-end'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-gray-700">{msg.author}</span>
                <span className="text-xs text-gray-400">{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                {msg.isInternal && <span className="text-[10px] font-bold bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded flex items-center gap-1"><FiLock size={10}/> INTERNAL NOTE</span>}
              </div>
              <div className={`px-4 py-3 rounded-2xl max-w-[85%] text-sm ${
                isCustomer ? 'bg-gray-100 text-gray-800 rounded-tl-sm' : 
                msg.isInternal ? 'bg-yellow-50 border border-yellow-200 text-yellow-900 rounded-tr-sm' : 
                'bg-[#1A1A1A] text-white rounded-tr-sm'
              }`}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={isInternal} 
                onChange={(e) => setIsInternal(e.target.checked)}
                className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
              />
              <span className="flex items-center gap-1 font-medium"><FiLock size={14} className="text-yellow-600" /> Internal Note (Hidden from customer)</span>
            </label>
            <button type="button" className="text-blue-600 hover:underline">Use Canned Response</button>
          </div>
          
          <div className={`border rounded-lg overflow-hidden transition-colors ${isInternal ? 'border-yellow-300 bg-yellow-50' : 'border-gray-300 bg-white'}`}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={isInternal ? "Type an internal note..." : "Type your reply to the customer..."}
              className="w-full p-4 focus:outline-none text-sm min-h-[100px] resize-none bg-transparent"
            />
            <div className="px-4 py-2 border-t border-gray-200 flex justify-between items-center bg-white">
              <button type="button" className="text-gray-400 hover:text-gray-600 p-2">
                <FiPaperclip />
              </button>
              <button 
                type="submit" 
                disabled={!message.trim()}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors disabled:opacity-50 ${
                  isInternal ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-[#1A1A1A] text-white hover:bg-black'
                }`}
              >
                <FiSend /> {isInternal ? 'Add Note' : 'Send Reply'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
