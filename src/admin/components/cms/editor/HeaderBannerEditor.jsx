import React, { useState } from 'react';
import { 
  ArrowLeft, Monitor, Tablet, Smartphone, Undo, Redo, 
  Settings, Image as ImageIcon, Type, AlignLeft, 
  AlignCenter, AlignRight, AlignJustify, Link as LinkIcon,
  Copy, Trash2, Plus, GripVertical, MoveUp, MoveDown, Upload
} from 'lucide-react';
import HeaderBannerSection from '../../../../storefront/components/home/HeaderBannerSection';
import MediaPickerModal from './../media/MediaPickerModal';
import { useToast } from '../../../../components/ui/Toast/ToastContext';

export default function HeaderBannerEditor({ section, onSave, onCancel }) {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('Content');
  const [previewMode, setPreviewMode] = useState('desktop');
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  
  const isMockTitle = section?.content?.title === 'COMFY & BEAUTY AT ITS BEST';
  const isMockDesc = section?.content?.description?.startsWith('Explore our interior collection');
  const isMockImage = section?.content?.image === 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200';

  const [content, setContent] = React.useState({
    title: isMockTitle ? '' : (section?.content?.title || ''),
    description: isMockDesc ? '' : (section?.content?.description || ''),
    image: isMockImage ? '' : (section?.content?.image || ''),
    buttonText: section?.content?.buttonText || '',
    buttonLink: section?.content?.buttonLink || '',
    showButton: section?.content?.showButton !== undefined ? section?.content?.showButton : false,
  });

  const fileInputRef = React.useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContent({ ...content, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const [settings, setSettings] = useState({
    contentAlignment: section?.settings?.contentAlignment || 'left',
    verticalAlignment: section?.settings?.verticalAlignment || 'center',
    columnGap: section?.settings?.columnGap !== undefined ? section?.settings?.columnGap : 0,
    imageWidth: section?.settings?.imageWidth || 55,
    contentWidth: section?.settings?.contentWidth || 45,
    imageHeight: section?.settings?.imageHeight || 400,
    backgroundColor: section?.settings?.backgroundColor || '#FFFFFF',
    textColor: section?.settings?.textColor || '#111827',
    imagePosition: section?.settings?.imagePosition || 'left',
    structure: section?.settings?.structure || ['title', 'description', 'button'],
    titleSize: section?.settings?.titleSize || 'text-4xl',
    titleWeight: section?.settings?.titleWeight || 'font-bold',
    titleColor: section?.settings?.titleColor || '',
    descSize: section?.settings?.descSize || 'text-base',
    descColor: section?.settings?.descColor || '',
    paddingX: section?.settings?.paddingX !== undefined ? section?.settings?.paddingX : 40,
    paddingY: section?.settings?.paddingY !== undefined ? section?.settings?.paddingY : 40,
  });

  const moveElement = (index, direction) => {
    if ((direction === -1 && index === 0) || (direction === 1 && index === settings.structure.length - 1)) return;
    const newStructure = [...settings.structure];
    const temp = newStructure[index];
    newStructure[index] = newStructure[index + direction];
    newStructure[index + direction] = temp;
    setSettings({ ...settings, structure: newStructure });
  };

  const handleSave = () => {
    onSave({
      ...section,
      content,
      settings
    });
    addToast({ type: 'success', message: 'Header banner saved successfully!' });
  };

  const currentPreviewData = {
    ...section,
    content,
    settings
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <div className="h-14 bg-white border-b border-neutral-200 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className="font-semibold text-neutral-800">Visual Page Builder</div>
          <div className="text-neutral-400 text-sm">&gt;</div>
          <div className="text-sm text-neutral-600">Home Page</div>
          <div className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-medium ml-2">Published</div>
        </div>

        <div className="flex items-center gap-1 border border-neutral-200 rounded-md p-0.5 bg-neutral-50">
          <button 
            onClick={() => setPreviewMode('desktop')}
            className={`p-1.5 rounded ${previewMode === 'desktop' ? 'bg-white shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
          >
            <Monitor size={16} />
          </button>
          <button 
            onClick={() => setPreviewMode('tablet')}
            className={`p-1.5 rounded ${previewMode === 'tablet' ? 'bg-white shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
          >
            <Tablet size={16} />
          </button>
          <button 
            onClick={() => setPreviewMode('mobile')}
            className={`p-1.5 rounded ${previewMode === 'mobile' ? 'bg-white shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
          >
            <Smartphone size={16} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 border-r border-neutral-200 pr-3">
            <button className="p-1.5 text-neutral-400 hover:text-neutral-700"><Undo size={16} /></button>
            <button className="p-1.5 text-neutral-400 hover:text-neutral-700"><Redo size={16} /></button>
          </div>
          <button className="px-4 py-1.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded hover:bg-neutral-50">
            Preview
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar - Configuration */}
        <div className="w-[340px] bg-white border-r border-neutral-200 flex flex-col shrink-0">
          <div className="p-4 border-b border-neutral-100">
            <button 
              onClick={onCancel}
              className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-800 mb-4"
            >
              <ArrowLeft size={16} />
              Back to Sections
            </button>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg font-bold text-neutral-900">Image Text Banner</h2>
              <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-medium">Active</span>
            </div>
            <p className="text-xs text-neutral-500">Image on left, content on right</p>
          </div>

          <div className="flex border-b border-neutral-200">
            <button 
              className={`flex-1 py-3 text-sm font-medium border-b-2 ${activeTab === 'Content' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-neutral-500 hover:text-neutral-700'}`}
              onClick={() => setActiveTab('Content')}
            >
              Content
            </button>
            <button 
              className={`flex-1 py-3 text-sm font-medium border-b-2 ${activeTab === 'Style' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-neutral-500 hover:text-neutral-700'}`}
              onClick={() => setActiveTab('Style')}
            >
              Style
            </button>
            <button 
              className={`flex-1 py-3 text-sm font-medium border-b-2 ${activeTab === 'Advanced' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-neutral-500 hover:text-neutral-700'}`}
              onClick={() => setActiveTab('Advanced')}
            >
              Advanced
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-8">
            {activeTab === 'Content' && (
              <>
                {/* Images Section */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-neutral-900">Images</h3>
                  <div>
                    <label className="block text-xs text-neutral-500 mb-2">Banner Image</label>
                    <div className="border border-neutral-200 rounded overflow-hidden mb-2 relative group">
                      <div className="h-32 w-full bg-neutral-100 flex items-center justify-center">
                        {content.image ? (
                          <img src={content.image} alt="Banner Preview" className="h-full w-full object-cover" />
                        ) : (
                          <ImageIcon className="text-neutral-400" size={32} />
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setIsMediaPickerOpen(true)}
                        className="flex-1 py-2 flex items-center justify-center gap-2 text-sm font-medium border border-neutral-200 rounded hover:bg-neutral-50 transition-colors"
                      >
                        <ImageIcon size={16} />
                        Choose Media from Library
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-neutral-900">Content</h3>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs text-neutral-500">Title</label>
                      <span className="text-xs text-neutral-400">{content.title.length}/100</span>
                    </div>
                    <input 
                      type="text" 
                      className="w-full border border-neutral-300 rounded p-2 text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                      value={content.title}
                      onChange={(e) => setContent({ ...content, title: e.target.value })}
                      maxLength={100}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs text-neutral-500">Description</label>
                      <span className="text-xs text-neutral-400">{content.description.length}/300</span>
                    </div>
                    <textarea 
                      className="w-full border border-neutral-300 rounded p-2 text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 resize-none h-32"
                      value={content.description}
                      onChange={(e) => setContent({ ...content, description: e.target.value })}
                      maxLength={300}
                    />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'Style' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-neutral-900">Title Styling</h3>
                  <div>
                    <label className="block text-xs text-neutral-500 mb-1">Font Size</label>
                    <select 
                      className="w-full border border-neutral-300 rounded p-2 text-sm focus:ring-1 focus:ring-indigo-500"
                      value={settings.titleSize || 'text-4xl'}
                      onChange={(e) => setSettings({ ...settings, titleSize: e.target.value })}
                    >
                      <option value="text-2xl">Small</option>
                      <option value="text-3xl">Medium</option>
                      <option value="text-4xl">Large</option>
                      <option value="text-5xl">Extra Large</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-500 mb-1">Font Weight</label>
                    <select 
                      className="w-full border border-neutral-300 rounded p-2 text-sm focus:ring-1 focus:ring-indigo-500"
                      value={settings.titleWeight || 'font-bold'}
                      onChange={(e) => setSettings({ ...settings, titleWeight: e.target.value })}
                    >
                      <option value="font-normal">Normal</option>
                      <option value="font-medium">Medium</option>
                      <option value="font-semibold">Semi Bold</option>
                      <option value="font-bold">Bold</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-500 mb-1">Text Color (Overrides Global)</label>
                    <input 
                      type="color" 
                      className="w-full h-10 border border-neutral-300 rounded p-1 cursor-pointer"
                      value={settings.titleColor || settings.textColor}
                      onChange={(e) => setSettings({ ...settings, titleColor: e.target.value })}
                    />
                  </div>
                </div>

                <hr className="border-neutral-200" />

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-neutral-900">Description Styling</h3>
                  <div>
                    <label className="block text-xs text-neutral-500 mb-1">Font Size</label>
                    <select 
                      className="w-full border border-neutral-300 rounded p-2 text-sm focus:ring-1 focus:ring-indigo-500"
                      value={settings.descSize || 'text-base'}
                      onChange={(e) => setSettings({ ...settings, descSize: e.target.value })}
                    >
                      <option value="text-sm">Small</option>
                      <option value="text-base">Medium</option>
                      <option value="text-lg">Large</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-500 mb-1">Text Color (Overrides Global)</label>
                    <input 
                      type="color" 
                      className="w-full h-10 border border-neutral-300 rounded p-1 cursor-pointer"
                      value={settings.descColor || settings.textColor}
                      onChange={(e) => setSettings({ ...settings, descColor: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Advanced' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-neutral-900">Spacing</h3>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs text-neutral-500">Horizontal Padding</label>
                      <span className="text-xs text-neutral-400">{settings.paddingX}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" max="120" step="4"
                      className="w-full accent-indigo-600"
                      value={settings.paddingX}
                      onChange={(e) => setSettings({ ...settings, paddingX: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs text-neutral-500">Vertical Padding</label>
                      <span className="text-xs text-neutral-400">{settings.paddingY}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" max="120" step="4"
                      className="w-full accent-indigo-600"
                      value={settings.paddingY}
                      onChange={(e) => setSettings({ ...settings, paddingY: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Area - Canvas & Settings */}
        <div className="flex-1 flex flex-col p-6 overflow-y-auto custom-scrollbar gap-6">
          
          {/* Live Preview */}
          <div className="flex-shrink-0 flex flex-col min-h-[300px]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-sm font-medium text-neutral-700">Live Preview</span>
            </div>
            <div className="flex-1 bg-white shadow-sm border border-neutral-200 flex flex-col relative">
               <div className={`w-full mx-auto ${previewMode === 'mobile' ? 'max-w-[375px]' : previewMode === 'tablet' ? 'max-w-[768px]' : 'max-w-full'}`}>
                 <HeaderBannerSection data={currentPreviewData} />
               </div>
            </div>
          </div>

          {/* Bottom Panels */}
          <div className="grid grid-cols-2 gap-6">
            {/* Section Structure */}
            <div className="bg-white rounded-lg border border-neutral-200 shadow-sm flex flex-col min-h-[300px]">
              <div className="p-4 border-b border-neutral-100">
                <h3 className="font-bold text-neutral-900 text-sm">Section Structure</h3>
              </div>
              <div className="flex-1 p-4 space-y-2">
                <div className="border border-neutral-200 rounded p-3 bg-neutral-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setSettings({...settings, imagePosition: settings.imagePosition === 'left' ? 'right' : 'left'})}
                      className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-medium hover:bg-indigo-100 cursor-pointer transition-colors"
                    >
                      Image {settings.imagePosition}
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-neutral-400 hover:text-neutral-700"><Copy size={14} /></button>
                    <button className="text-danger hover:text-red-700"><Trash2 size={14} /></button>
                  </div>
                </div>
                
                <div className="pl-6 space-y-1">
                  {settings.structure.map((item, idx) => {
                    if (item === 'button' && !content.showButton) return null;
                    return (
                      <div key={item} className="flex items-center justify-between p-2 hover:bg-neutral-50 rounded group">
                        <div className="flex items-center gap-3">
                          {item === 'title' && <Type size={14} className="text-neutral-500" />}
                          {item === 'description' && <AlignLeft size={14} className="text-neutral-500" />}
                          {item === 'button' && <LinkIcon size={14} className="text-neutral-500" />}
                          <span className="text-sm text-neutral-700 capitalize">{item}</span>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => moveElement(idx, -1)} disabled={idx === 0} className="p-1 hover:bg-neutral-200 rounded text-neutral-500 disabled:opacity-30"><MoveUp size={12} /></button>
                          <button onClick={() => moveElement(idx, 1)} disabled={idx === settings.structure.length - 1} className="p-1 hover:bg-neutral-200 rounded text-neutral-500 disabled:opacity-30"><MoveDown size={12} /></button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="p-4 border-t border-neutral-100">
                <button className="w-full py-2 flex items-center justify-center gap-2 text-sm font-medium border border-indigo-200 text-indigo-700 rounded hover:bg-indigo-50 transition-colors">
                  <Plus size={16} />
                  Add Element
                </button>
              </div>
            </div>

            {/* Section Settings */}
            <div className="bg-white rounded-lg border border-neutral-200 shadow-sm flex flex-col">
              <div className="p-4 border-b border-neutral-100">
                <h3 className="font-bold text-neutral-900 text-sm">Section Settings</h3>
              </div>
              <div className="p-5 space-y-6">
                
                <div className="flex items-center justify-between">
                  <label className="text-sm text-neutral-600">Content Alignment</label>
                  <div className="flex bg-neutral-100 rounded border border-neutral-200 p-0.5">
                    <button 
                      onClick={() => setSettings({ ...settings, contentAlignment: 'left' })}
                      className={`p-1.5 rounded ${settings.contentAlignment === 'left' ? 'bg-white shadow-sm text-indigo-600' : 'text-neutral-500 hover:text-neutral-700'}`}
                    >
                      <AlignLeft size={16} />
                    </button>
                    <button 
                      onClick={() => setSettings({ ...settings, contentAlignment: 'center' })}
                      className={`p-1.5 rounded ${settings.contentAlignment === 'center' ? 'bg-white shadow-sm text-indigo-600' : 'text-neutral-500 hover:text-neutral-700'}`}
                    >
                      <AlignCenter size={16} />
                    </button>
                    <button 
                      onClick={() => setSettings({ ...settings, contentAlignment: 'right' })}
                      className={`p-1.5 rounded ${settings.contentAlignment === 'right' ? 'bg-white shadow-sm text-indigo-600' : 'text-neutral-500 hover:text-neutral-700'}`}
                    >
                      <AlignRight size={16} />
                    </button>
                    <button 
                      onClick={() => setSettings({ ...settings, contentAlignment: 'justify' })}
                      className={`p-1.5 rounded ${settings.contentAlignment === 'justify' ? 'bg-white shadow-sm text-indigo-600' : 'text-neutral-500 hover:text-neutral-700'}`}
                    >
                      <AlignJustify size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm text-neutral-600">Vertical Alignment</label>
                  <select 
                    className="border border-neutral-300 rounded p-1.5 text-sm w-40 focus:ring-1 focus:ring-indigo-500"
                    value={settings.verticalAlignment}
                    onChange={(e) => setSettings({ ...settings, verticalAlignment: e.target.value })}
                  >
                    <option value="top">Top</option>
                    <option value="center">Center</option>
                    <option value="bottom">Bottom</option>
                  </select>
                </div>

                <div className="flex items-center gap-4">
                  <label className="text-sm text-neutral-600 w-32">Column Gap</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="120" 
                    className="flex-1 h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    value={settings.columnGap}
                    onChange={(e) => setSettings({ ...settings, columnGap: Number(e.target.value) })}
                  />
                  <span className="text-xs text-neutral-500 w-10 text-right">{settings.columnGap}px</span>
                </div>

                <div className="flex items-center gap-4">
                  <label className="text-sm text-neutral-600 w-32">Image Height</label>
                  <input 
                    type="range" 
                    min="200" 
                    max="1000" 
                    step="10"
                    className="flex-1 h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    value={settings.imageHeight}
                    onChange={(e) => setSettings({ ...settings, imageHeight: Number(e.target.value) })}
                  />
                  <span className="text-xs text-neutral-500 w-10 text-right">{settings.imageHeight}px</span>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm text-neutral-600">Column Width</label>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 flex items-center border border-neutral-300 rounded bg-white">
                      <span className="text-xs text-neutral-500 px-3 bg-neutral-50 border-r border-neutral-300 h-full flex items-center rounded-l">Image</span>
                      <input 
                        type="number" 
                        className="w-full p-2 text-sm focus:outline-none focus:ring-0 text-center" 
                        value={settings.imageWidth}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setSettings({ ...settings, imageWidth: val, contentWidth: 100 - val });
                        }}
                      />
                      <span className="text-xs text-neutral-400 pr-3">%</span>
                    </div>
                    <div className="flex-1 flex items-center border border-neutral-300 rounded bg-white">
                      <span className="text-xs text-neutral-500 px-3 bg-neutral-50 border-r border-neutral-300 h-full flex items-center rounded-l">Content</span>
                      <input 
                        type="number" 
                        className="w-full p-2 text-sm focus:outline-none focus:ring-0 text-center bg-neutral-50" 
                        value={settings.contentWidth}
                        readOnly
                      />
                      <span className="text-xs text-neutral-400 pr-3">%</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Background Color */}
                    <div>
                      <label className="text-sm text-neutral-600 block mb-2">Background</label>
                      <div className="flex items-center border border-neutral-300 rounded overflow-hidden">
                        <input 
                          type="text" 
                          className="w-full p-2 text-xs focus:outline-none uppercase" 
                          value={settings.backgroundColor}
                          onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
                        />
                        <div className="p-1 border-l border-neutral-300 bg-neutral-50 relative shrink-0">
                          <input 
                            type="color"
                            className="w-6 h-6 rounded cursor-pointer p-0 border-0 opacity-0 absolute inset-0 z-10"
                            value={settings.backgroundColor}
                            onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
                          />
                          <div 
                            className="w-6 h-6 rounded border border-neutral-200 shadow-sm relative z-0"
                            style={{ backgroundColor: settings.backgroundColor }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Text Color */}
                    <div>
                      <label className="text-sm text-neutral-600 block mb-2">Text Color</label>
                      <div className="flex items-center border border-neutral-300 rounded overflow-hidden">
                        <input 
                          type="text" 
                          className="w-full p-2 text-xs focus:outline-none uppercase" 
                          value={settings.textColor}
                          onChange={(e) => setSettings({ ...settings, textColor: e.target.value })}
                        />
                        <div className="p-1 border-l border-neutral-300 bg-neutral-50 relative shrink-0">
                          <input 
                            type="color"
                            className="w-6 h-6 rounded cursor-pointer p-0 border-0 opacity-0 absolute inset-0 z-10"
                            value={settings.textColor}
                            onChange={(e) => setSettings({ ...settings, textColor: e.target.value })}
                          />
                          <div 
                            className="w-6 h-6 rounded border border-neutral-200 shadow-sm relative z-0"
                            style={{ backgroundColor: settings.textColor }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
      
      <MediaPickerModal 
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelectMedia={(selected) => {
          if (selected && selected.url) {
            setContent({ ...content, image: selected.url });
          } else if (Array.isArray(selected) && selected.length > 0) {
            setContent({ ...content, image: selected[0].url });
          }
          setIsMediaPickerOpen(false);
        }}
      />
    </div>
  );
}
