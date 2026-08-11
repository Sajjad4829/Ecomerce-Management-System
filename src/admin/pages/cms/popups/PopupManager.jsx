import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiPlus, FiSearch, FiEdit2, FiCopy, FiEye, FiTrash2, 
  FiGift, FiCheckCircle, FiClock, FiPercent, FiMousePointer, FiBarChart2 
} from 'react-icons/fi';
import { cn } from '../../../../utils/cn';
import PopupPreviewModal from '../../../components/cms/popups/PopupPreviewModal';

const INITIAL_POPUPS = [
  {
    id: 'pop-1',
    name: 'Milan Salon Private Invitation',
    popupType: 'Modal',
    status: 'active',
    triggerType: 'delay',
    triggerSummary: '5s Timed Delay',
    viewsCount: 14200,
    conversionsCount: 1890,
    conversionRate: '13.3%',
    updatedAt: '2025-05-18',
    content: {
      title: 'Private Milan Salon Invitation',
      description: 'Receive 10% privilege on your first bespoke velvet modular sofa order along with white-glove assembly.',
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
      buttonText: 'Claim Salon Privilege',
      secondaryButtonText: 'No thanks, continue browsing',
      showForm: true
    },
    layout: {
      backgroundColor: '#1A1A1A',
      textColor: '#FFFFFF',
      overlay: true,
      borderRadius: '16px'
    }
  },
  {
    id: 'pop-2',
    name: 'Complimentary Swatch Shipping Banner',
    popupType: 'Announcement',
    status: 'active',
    triggerType: 'load',
    triggerSummary: 'Immediate Page Load',
    viewsCount: 45100,
    conversionsCount: 4100,
    conversionRate: '9.1%',
    updatedAt: '2025-05-15',
    content: {
      title: 'Complimentary Velvet & Marble Swatch Kits',
      description: 'Dispatched via express courier within 24 hours to verified addresses.',
      buttonText: 'Order Free Swatches',
      showForm: false
    },
    layout: {
      backgroundColor: '#2D2825',
      textColor: '#FFFFFF',
      overlay: false,
      borderRadius: '0px'
    }
  },
  {
    id: 'pop-3',
    name: 'Trade & Interior Designer Exit Prompt',
    popupType: 'Slide-in',
    status: 'active',
    triggerType: 'exit_intent',
    triggerSummary: 'Exit Intent Cursor',
    viewsCount: 8900,
    conversionsCount: 1420,
    conversionRate: '15.9%',
    updatedAt: '2025-05-10',
    content: {
      title: 'Are you an Interior Designer or Architect?',
      description: 'Apply for trade pricing tiers and direct factory fabrication support.',
      imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      buttonText: 'Apply for Trade Account',
      secondaryButtonText: 'Not now',
      showForm: true
    },
    layout: {
      backgroundColor: '#0F172A',
      textColor: '#FFFFFF',
      overlay: false,
      borderRadius: '12px'
    }
  },
  {
    id: 'pop-4',
    name: 'Summer Lookbook Release Popup',
    popupType: 'Modal',
    status: 'draft',
    triggerType: 'scroll',
    triggerSummary: '50% Scroll Depth',
    viewsCount: 0,
    conversionsCount: 0,
    conversionRate: '0.0%',
    updatedAt: '2025-05-20',
    content: {
      title: 'Download 2025 Summer Villa Lookbook',
      description: 'Discover 48 pages of architectural marble and teak furniture designs.',
      buttonText: 'Download Lookbook',
      showForm: true
    },
    layout: {
      backgroundColor: '#1A1A1A',
      textColor: '#FFFFFF',
      overlay: true,
      borderRadius: '16px'
    }
  }
];

export default function PopupManager() {
  const navigate = useNavigate();
  const [popups, setPopups] = useState(INITIAL_POPUPS);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [previewCampaign, setPreviewCampaign] = useState(null);

  const filteredPopups = popups.filter(p => {
    if (typeFilter !== 'all' && p.popupType !== typeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.popupType.toLowerCase().includes(q);
    }
    return true;
  });

  const handleDuplicate = (popup) => {
    const dup = {
      ...popup,
      id: `pop-${Date.now()}`,
      name: `${popup.name} (Copy)`,
      status: 'draft',
      viewsCount: 0,
      conversionsCount: 0,
      conversionRate: '0.0%',
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setPopups([dup, ...popups]);
  };

  const handleToggleStatus = (id) => {
    setPopups(popups.map(p => p.id === id ? { ...p, status: p.status === 'active' ? 'draft' : 'active' } : p));
  };

  const handleDelete = (id) => {
    setPopups(popups.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
            <span>CMS</span>
            <span className="text-gray-300">/</span>
            <span className="text-[#1A1A1A] font-semibold">Popups & Campaigns</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1A1A]">Promotional Popups & Banners</h1>
          <p className="text-sm text-gray-500 mt-1 max-w-xl">
            Create high-converting lead capture modals, exit-intent prompts, and top announcement bars.
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/cms/popups/builder')}
          className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
        >
          <FiPlus size={16} />
          <span>Create New Campaign</span>
        </button>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-black/5 rounded-xl p-4 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-gray-400 block mb-1">Active Campaigns</span>
          <div className="text-2xl font-serif font-bold text-[#1A1A1A]">
            {popups.filter(p => p.status === 'active').length} <span className="text-xs text-gray-400 font-sans font-normal">/ {popups.length} total</span>
          </div>
          <div className="text-[10px] text-green-600 font-semibold mt-1 flex items-center gap-1">
            <FiCheckCircle size={10} /> Currently serving visitors
          </div>
        </div>

        <div className="bg-white border border-black/5 rounded-xl p-4 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-gray-400 block mb-1">Total Impressions</span>
          <div className="text-2xl font-serif font-bold text-[#1A1A1A]">
            68,200 <span className="text-xs text-gray-400 font-sans font-normal">views</span>
          </div>
          <div className="text-[10px] text-gray-400 font-medium mt-1">
            Across active store routes
          </div>
        </div>

        <div className="bg-white border border-black/5 rounded-xl p-4 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-gray-400 block mb-1">Captured Leads</span>
          <div className="text-2xl font-serif font-bold text-emerald-700">
            7,410 <span className="text-xs text-gray-400 font-sans font-normal">subscribers</span>
          </div>
          <div className="text-[10px] text-green-600 font-semibold mt-1">
            +18% conversion rate average
          </div>
        </div>

        <div className="bg-white border border-black/5 rounded-xl p-4 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-gray-400 block mb-1">Trigger Engine</span>
          <div className="text-xl font-serif font-bold text-purple-800">
            Exit Intent & Delay
          </div>
          <div className="text-[10px] text-gray-400 font-medium mt-1">
            Client-side reactive triggers
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white border border-black/5 rounded-xl p-3 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Search campaign name or format..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-black/10 rounded-lg text-xs focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {['all', 'Modal', 'Slide-in', 'Announcement', 'Bottom Bar'].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={cn(
                "px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap cursor-pointer transition-all",
                typeFilter === t ? "bg-[#1A1A1A] text-white shadow-2xs" : "bg-gray-100 text-gray-600 hover:text-black"
              )}
            >
              {t === 'all' ? 'All Formats' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white border border-black/5 rounded-xl overflow-hidden shadow-2xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/80 border-b border-black/5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <th className="p-3.5">Campaign Name & Format</th>
              <th className="p-3.5 font-mono">Trigger</th>
              <th className="p-3.5 font-mono">Status</th>
              <th className="p-3.5 font-mono hidden md:table-cell">Impressions</th>
              <th className="p-3.5 font-mono hidden lg:table-cell">Conversions</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 text-xs">
            {filteredPopups.map((popup) => (
              <tr key={popup.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="p-3.5">
                  <div className="font-bold text-[#1A1A1A]">{popup.name}</div>
                  <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                    Format: <span className="text-gray-700 font-bold">{popup.popupType}</span> • Updated {popup.updatedAt}
                  </div>
                </td>

                <td className="p-3.5 text-gray-600 text-xs">
                  <span className="px-2 py-0.5 rounded bg-gray-100 text-[10px] font-mono font-semibold">
                    {popup.triggerSummary}
                  </span>
                </td>

                <td className="p-3.5">
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(popup.id)}
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase transition-colors cursor-pointer",
                      popup.status === 'active' ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                    )}
                  >
                    {popup.status}
                  </button>
                </td>

                <td className="p-3.5 font-mono hidden md:table-cell text-gray-600">
                  {popup.viewsCount.toLocaleString()}
                </td>

                <td className="p-3.5 font-mono hidden lg:table-cell">
                  <span className="font-bold text-emerald-700">{popup.conversionsCount.toLocaleString()}</span>
                  <span className="text-[10px] text-gray-400 block font-normal">({popup.conversionRate})</span>
                </td>

                <td className="p-3.5 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => setPreviewCampaign(popup)}
                      className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                      title="Live Preview"
                    >
                      <FiEye size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(`/admin/cms/popups/builder?id=${popup.id}`)}
                      className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                      title="Edit Campaign"
                    >
                      <FiEdit2 size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDuplicate(popup)}
                      className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                      title="Duplicate"
                    >
                      <FiCopy size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(popup.id)}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Preview Modal */}
      {previewCampaign && (
        <PopupPreviewModal
          isOpen={!!previewCampaign}
          onClose={() => setPreviewCampaign(null)}
          campaignName={previewCampaign.name}
          popupType={previewCampaign.popupType}
          content={previewCampaign.content}
          layout={previewCampaign.layout}
        />
      )}

    </div>
  );
}
