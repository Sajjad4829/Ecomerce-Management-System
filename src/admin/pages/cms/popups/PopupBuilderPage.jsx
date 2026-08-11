import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  FiArrowLeft, FiSave, FiEye, FiCheck, FiLayers, FiClock, FiTarget, FiImage 
} from 'react-icons/fi';
import { cn } from '../../../../utils/cn';
import PopupCanvas from '../../../components/cms/popups/PopupCanvas';
import PopupContentInspector from '../../../components/cms/popups/PopupContentInspector';
import PopupLayoutInspector from '../../../components/cms/popups/PopupLayoutInspector';
import TriggerSettings from '../../../components/cms/popups/TriggerSettings';
import DisplayRules from '../../../components/cms/popups/DisplayRules';
import PopupPreviewModal from '../../../components/cms/popups/PopupPreviewModal';
import MediaPickerModal from '../../../components/cms/media/MediaPickerModal';

export default function PopupBuilderPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const campaignId = searchParams.get('id');

  const [campaignName, setCampaignName] = useState(
    campaignId ? 'Milan Salon Private Invitation' : 'New Promotional Campaign'
  );
  const [activeTab, setActiveTab] = useState('content'); // 'content' | 'layout' | 'triggers' | 'rules'

  // Campaign State
  const [content, setContent] = useState({
    title: 'Private Milan Salon Invitation',
    description: 'Receive 10% privilege on your first bespoke velvet modular sofa order along with white-glove assembly.',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    buttonText: 'Claim Salon Privilege',
    secondaryButtonText: 'No thanks, continue browsing',
    showForm: true
  });

  const [layout, setLayout] = useState({
    popupType: 'Modal',
    backgroundColor: '#1A1A1A',
    textColor: '#FFFFFF',
    overlay: true,
    borderRadius: '16px',
    width: '600px'
  });

  const [trigger, setTrigger] = useState({
    type: 'delay',
    delaySeconds: 5,
    scrollPercent: 50,
    clickSelector: '#vip-offer-btn'
  });

  const [rules, setRules] = useState({
    targetPages: 'all',
    devices: ['desktop', 'tablet', 'mobile'],
    frequency: 'once_per_session'
  });

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSelectMedia = (asset) => {
    setContent({ ...content, imageUrl: asset.url });
    setIsMediaPickerOpen(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-4 pb-12">
      
      {/* Top Header */}
      <div className="bg-white border border-black/10 rounded-xl p-3 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/cms/popups')}
            className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            title="Back to Popups"
          >
            <FiArrowLeft size={18} />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-black/5 text-[9px] font-mono font-bold uppercase text-gray-600">
                Popup Builder
              </span>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="font-serif font-bold text-base text-[#1A1A1A] border-b border-dashed border-gray-300 focus:border-black focus:outline-none bg-transparent"
              />
            </div>
            <p className="text-xs text-gray-400 font-mono">Format: {layout.popupType} • Trigger: {trigger.type}</p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-black/5 text-xs font-bold text-gray-600">
            <button
              type="button"
              onClick={() => setActiveTab('content')}
              className={cn(
                "px-3 py-1.5 rounded-lg transition-all cursor-pointer",
                activeTab === 'content' ? "bg-white text-black shadow-2xs font-bold" : "hover:text-black"
              )}
            >
              Content
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('layout')}
              className={cn(
                "px-3 py-1.5 rounded-lg transition-all cursor-pointer",
                activeTab === 'layout' ? "bg-white text-black shadow-2xs font-bold" : "hover:text-black"
              )}
            >
              Layout
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('triggers')}
              className={cn(
                "px-3 py-1.5 rounded-lg transition-all cursor-pointer",
                activeTab === 'triggers' ? "bg-white text-black shadow-2xs font-bold" : "hover:text-black"
              )}
            >
              Triggers
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('rules')}
              className={cn(
                "px-3 py-1.5 rounded-lg transition-all cursor-pointer",
                activeTab === 'rules' ? "bg-white text-black shadow-2xs font-bold" : "hover:text-black"
              )}
            >
              Rules
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="px-3 py-2 bg-white border border-black/10 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <FiEye size={14} /> Preview
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-[#1A1A1A] hover:bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            {isSaved ? <FiCheck size={14} className="text-green-400" /> : <FiSave size={14} />}
            <span>{isSaved ? 'Campaign Saved!' : 'Save Campaign'}</span>
          </button>
        </div>
      </div>

      {/* Builder Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* Left Inspector Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {activeTab === 'content' && (
            <PopupContentInspector
              content={content}
              onChangeContent={setContent}
              onOpenMediaPicker={() => setIsMediaPickerOpen(true)}
            />
          )}

          {activeTab === 'layout' && (
            <PopupLayoutInspector
              layout={layout}
              onChangeLayout={setLayout}
            />
          )}

          {activeTab === 'triggers' && (
            <TriggerSettings
              trigger={trigger}
              onChangeTrigger={setTrigger}
            />
          )}

          {activeTab === 'rules' && (
            <DisplayRules
              rules={rules}
              onChangeRules={setRules}
            />
          )}
        </div>

        {/* Right Live Preview Canvas Column (7 cols) */}
        <div className="lg:col-span-7 bg-stone-100 border border-black/10 rounded-xl p-6 shadow-2xs min-h-[580px] flex flex-col justify-center items-center relative overflow-hidden">
          <div className="absolute top-3 left-3 text-[10px] font-mono font-bold uppercase text-gray-400">
            Realtime Canvas Rendering
          </div>

          <PopupCanvas
            popupType={layout.popupType}
            title={content.title}
            description={content.description}
            imageUrl={content.imageUrl}
            buttonText={content.buttonText}
            secondaryButtonText={content.secondaryButtonText}
            showForm={content.showForm}
            backgroundColor={layout.backgroundColor}
            textColor={layout.textColor}
            overlay={layout.overlay}
            borderRadius={layout.borderRadius}
          />
        </div>

      </div>

      {/* Preview Modal */}
      <PopupPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        campaignName={campaignName}
        popupType={layout.popupType}
        content={content}
        layout={layout}
      />

      {/* DAM Media Picker Integration */}
      {isMediaPickerOpen && (
        <MediaPickerModal
          isOpen={isMediaPickerOpen}
          onClose={() => setIsMediaPickerOpen(false)}
          onSelectMedia={handleSelectMedia}
        />
      )}

    </div>
  );
}
