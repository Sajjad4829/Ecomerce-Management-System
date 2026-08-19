import { useState } from 'react';
import { FiMonitor, FiSmartphone, FiMoreVertical } from 'react-icons/fi';

export default function SERPPreview({ 
  title = "Example Title", 
  description = "Example description that is shown in the search engine results page. It should be concise and compelling.",
  url = "https://example.com/page",
  favicon = "https://example.com/favicon.ico"
}) {
  const [mode, setMode] = useState('desktop');

  const truncate = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="bg-surface border border-black/5 rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-black/5 bg-background">
        <h3 className="text-xs font-bold text-text-primary flex items-center gap-2">
          Search Results Preview
        </h3>
        <div className="flex bg-surface rounded-md border border-black/10 overflow-hidden">
          <button 
            onClick={() => setMode('desktop')}
            className={`p-1.5 ${mode === 'desktop' ? 'bg-[#1A1A1A] text-white' : 'text-text-muted hover:bg-background'}`}
          >
            <FiMonitor size={14} />
          </button>
          <button 
            onClick={() => setMode('mobile')}
            className={`p-1.5 ${mode === 'mobile' ? 'bg-[#1A1A1A] text-white' : 'text-text-muted hover:bg-background'}`}
          >
            <FiSmartphone size={14} />
          </button>
        </div>
      </div>
      
      <div className={`p-6 flex justify-center ${mode === 'mobile' ? 'bg-background' : 'bg-surface'}`}>
        <div className={`w-full ${mode === 'mobile' ? 'max-w-[375px] bg-surface rounded-3xl p-6 shadow-sm border border-black/5' : 'max-w-[600px]'}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
              <span className="text-[10px] font-bold text-text-muted">FAV</span>
            </div>
            <div>
              <p className="text-sm text-[#202124] leading-tight flex items-center gap-1">
                example.com <span className="text-text-muted text-xs">› page</span>
              </p>
            </div>
            <FiMoreVertical size={16} className="text-text-muted ml-auto" />
          </div>
          <h4 className="text-[20px] text-[#1a0dab] leading-[1.3] mb-1 cursor-pointer hover:underline" style={{ fontFamily: 'arial, sans-serif' }}>
            {truncate(title, 60) || 'Please enter a title'}
          </h4>
          <p className="text-[14px] text-[#4d5156] leading-[1.58]" style={{ fontFamily: 'arial, sans-serif' }}>
            {truncate(description, 160) || 'Please enter a description to see how it will appear in search results.'}
          </p>
        </div>
      </div>
    </div>
  );
}
