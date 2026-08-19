import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCMS } from '../../context/cms/CMSContext';
import { FileText, Layers, Navigation, Search, ArrowLeft, MoveUp, MoveDown, Copy, Eye, EyeOff, Trash2 } from 'lucide-react';
import { SectionRenderer } from './SectionRenderer';

export const CMSDashboard = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">CMS Dashboard</h1>
        <div className="space-x-2">
          <Link to="pages/create" className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Create Page</Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-sm text-neutral-500 mb-1">Total Pages</div>
            <div className="text-2xl font-bold text-neutral-900">3</div>
          </div>
          <FileText className="w-8 h-8 text-neutral-300" />
        </div>
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-sm text-neutral-500 mb-1">Total Sections</div>
            <div className="text-2xl font-bold text-neutral-900">14</div>
          </div>
          <Layers className="w-8 h-8 text-neutral-300" />
        </div>
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-sm text-neutral-500 mb-1">Navigation Menus</div>
            <div className="text-2xl font-bold text-neutral-900">3</div>
          </div>
          <Navigation className="w-8 h-8 text-neutral-300" />
        </div>
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-sm text-neutral-500 mb-1">SEO Issues</div>
            <div className="text-2xl font-bold text-warning">1</div>
          </div>
          <Search className="w-8 h-8 text-amber-300" />
        </div>
      </div>

      <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
        <h3 className="font-medium text-neutral-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="text-sm text-neutral-600 border-l-2 border-neutral-200 pl-4 py-1">
            <strong>Admin</strong> updated page <span className="font-medium">Homepage</span>
            <div className="text-xs text-neutral-400 mt-1">2 hours ago</div>
          </div>
          <div className="text-sm text-neutral-600 border-l-2 border-neutral-200 pl-4 py-1">
            <strong>Marketing</strong> created page <span className="font-medium">Summer Campaign</span>
            <div className="text-xs text-neutral-400 mt-1">1 day ago</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PageCenter = () => {
  const { pages, pageTypes } = useCMS();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Page Center</h1>
        <Link to="create" className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Create Page</Link>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Page Name</th>
              <th className="px-6 py-4 font-medium">URL/Slug</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Sections</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {pages.map(p => (
              <tr key={p.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{p.name}</td>
                <td className="px-6 py-4 text-neutral-600">{p.slug}</td>
                <td className="px-6 py-4 text-neutral-600">
                  {pageTypes?.find(pt => pt.id === p.pageTypeId)?.name || 'Unknown'}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    p.status === 'Published' ? 'bg-success-soft text-green-800' : 'bg-neutral-100 text-neutral-800'
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-neutral-600">{p.sections}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Link to={`${p.id}/builder`} className="text-primary hover:text-indigo-900 font-medium">Builder</Link>
                  <Link to={`${p.id}/preview`} className="text-neutral-600 hover:text-neutral-900 font-medium">Preview</Link>
                  <Link to={`${p.id}/edit`} className="text-neutral-600 hover:text-neutral-900 font-medium">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const PageForm = () => {
  const { pageTypes } = useCMS();
  const { pageId } = useParams();
  const [selectedType, setSelectedType] = React.useState('');

  // Get active page types, or include the currently selected one if it's deactivated but already saved
  const availableTypes = pageTypes.filter(pt => pt.status === 'Active');

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin/cms/pages" className="p-2 border border-neutral-200 rounded-md hover:bg-neutral-50 text-neutral-600">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-2xl font-serif text-neutral-900">{pageId ? 'Edit Page' : 'Create Page'}</h1>
      </div>
      <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Page Name</label>
          <input type="text" className="w-full border-neutral-300 rounded-md shadow-sm p-2 border" placeholder="e.g. About Us" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Page Title (SEO)</label>
          <input type="text" className="w-full border-neutral-300 rounded-md shadow-sm p-2 border" placeholder="e.g. Our Story | Luxury Hotels" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Slug</label>
          <input type="text" className="w-full border-neutral-300 rounded-md shadow-sm p-2 border" placeholder="e.g. /about" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Page Type</label>
          <select 
            className="w-full border-neutral-300 rounded-md shadow-sm p-2 border"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select a Page Type...</option>
            {availableTypes.map(pt => (
              <option key={pt.id} value={pt.id}>{pt.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Status</label>
          <select className="w-full border-neutral-300 rounded-md shadow-sm p-2 border">
            <option>Draft</option>
            <option>Published</option>
            <option>Scheduled</option>
          </select>
        </div>
        <div className="pt-4 flex justify-end gap-2">
          <Link to="/admin/cms/pages" className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded hover:bg-neutral-50">Cancel</Link>
          <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Save Page</button>
        </div>
      </div>
    </div>
  );
};

export const PageBuilder = () => {
  const { pageId } = useParams();
  const { getPage } = useCMS();
  const page = getPage(pageId) || { name: 'Unknown Page' };

  return (
    <div className="flex h-[calc(100vh-4rem)] -m-8"> {/* Negative margin to break out of layout padding */}
      {/* Left Panel: Section Library */}
      <div className="w-64 bg-surface border-r border-neutral-200 flex flex-col">
        <div className="p-4 border-b border-neutral-200">
          <h2 className="font-bold text-neutral-900">Add Section</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Layout</h3>
            <div className="p-3 border border-neutral-200 rounded cursor-move hover:border-neutral-400 bg-neutral-50 text-sm">Hero</div>
            <div className="p-3 border border-neutral-200 rounded cursor-move hover:border-neutral-400 bg-neutral-50 text-sm">Banner</div>
            <div className="p-3 border border-neutral-200 rounded cursor-move hover:border-neutral-400 bg-neutral-50 text-sm">Card Grid</div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Content</h3>
            <div className="p-3 border border-neutral-200 rounded cursor-move hover:border-neutral-400 bg-neutral-50 text-sm">Text</div>
            <div className="p-3 border border-neutral-200 rounded cursor-move hover:border-neutral-400 bg-neutral-50 text-sm">Image + Text</div>
            <div className="p-3 border border-neutral-200 rounded cursor-move hover:border-neutral-400 bg-neutral-50 text-sm">Gallery</div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Dynamic</h3>
            <div className="p-3 border border-neutral-200 rounded cursor-move hover:border-neutral-400 bg-neutral-50 text-sm">Destinations</div>
            <div className="p-3 border border-neutral-200 rounded cursor-move hover:border-neutral-400 bg-neutral-50 text-sm">Featured Hotels</div>
            <div className="p-3 border border-neutral-200 rounded cursor-move hover:border-neutral-400 bg-neutral-50 text-sm">Offers</div>
          </div>
        </div>
      </div>

      {/* Center Panel: Canvas */}
      <div className="flex-1 bg-neutral-100 flex flex-col">
        <div className="bg-surface border-b border-neutral-200 p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/admin/cms/pages" className="text-neutral-500 hover:text-neutral-900"><ArrowLeft className="w-5 h-5"/></Link>
            <span className="font-medium">{page.name}</span>
          </div>
          <div className="flex gap-2">
            <Link to={`/admin/cms/pages/${pageId}/preview`} className="px-3 py-1.5 border border-neutral-200 rounded text-sm hover:bg-neutral-50">Preview</Link>
            <button className="px-3 py-1.5 bg-neutral-900 text-white rounded text-sm hover:bg-neutral-800">Publish</button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Mock Canvas Content */}
            <div className="border-2 border-indigo-500 rounded relative group bg-surface shadow-sm">
              <div className="absolute top-0 right-0 -mt-3 mr-2 hidden group-hover:flex gap-1">
                <button className="p-1 bg-surface border border-neutral-200 rounded shadow-sm hover:bg-neutral-50"><MoveUp className="w-3 h-3"/></button>
                <button className="p-1 bg-surface border border-neutral-200 rounded shadow-sm hover:bg-neutral-50"><MoveDown className="w-3 h-3"/></button>
                <button className="p-1 bg-surface border border-neutral-200 rounded shadow-sm hover:bg-neutral-50"><Copy className="w-3 h-3"/></button>
                <button className="p-1 bg-surface border border-neutral-200 rounded shadow-sm hover:bg-neutral-50"><EyeOff className="w-3 h-3"/></button>
                <button className="p-1 bg-surface border border-neutral-200 rounded shadow-sm hover:bg-danger-soft text-danger"><Trash2 className="w-3 h-3"/></button>
              </div>
              <div className="h-48 bg-neutral-200 flex flex-col items-center justify-center rounded m-1 border-2 border-dashed border-neutral-300">
                <div className="font-serif text-2xl text-neutral-800 mb-2">Hero Section</div>
                <div className="px-4 py-2 bg-neutral-800 text-white text-sm rounded">CTA Button</div>
              </div>
            </div>
            
            <div className="border border-neutral-200 rounded relative group hover:border-indigo-300 bg-surface shadow-sm transition-colors cursor-pointer">
              <div className="h-32 flex items-center justify-center p-6 gap-6 m-1">
                <div className="w-1/3 bg-neutral-200 h-full rounded border-2 border-dashed border-neutral-300"></div>
                <div className="w-2/3 space-y-2">
                  <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                  <div className="h-3 bg-neutral-200 rounded w-full"></div>
                  <div className="h-3 bg-neutral-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
            
            <div className="border-2 border-dashed border-neutral-300 rounded h-24 flex items-center justify-center bg-surface text-neutral-400 hover:bg-neutral-50 hover:border-neutral-400 cursor-pointer transition-colors">
              Drop Section Here
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Settings */}
      <div className="w-80 bg-surface border-l border-neutral-200 flex flex-col">
        <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
          <h2 className="font-bold text-neutral-900">Hero Section</h2>
          <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">Selected</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium border-b border-neutral-100 pb-2">Content</h3>
            <div>
              <label className="block text-xs text-neutral-500 mb-1">Heading</label>
              <input type="text" className="w-full text-sm border-neutral-300 rounded border p-1.5" defaultValue="Luxury Hotel & Resorts" />
            </div>
            <div>
              <label className="block text-xs text-neutral-500 mb-1">Subtitle</label>
              <textarea className="w-full text-sm border-neutral-300 rounded border p-1.5" rows={2} defaultValue="Experience unparalleled luxury..."></textarea>
            </div>
            <div>
              <label className="block text-xs text-neutral-500 mb-1">Background Image</label>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-neutral-200 rounded"></div>
                <button className="text-xs bg-neutral-100 border border-neutral-200 px-2 py-1 rounded">Change</button>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium border-b border-neutral-100 pb-2">Layout</h3>
            <div>
              <label className="block text-xs text-neutral-500 mb-1">Height</label>
              <select className="w-full text-sm border-neutral-300 rounded border p-1.5">
                <option>Full Screen (100vh)</option>
                <option selected>Large (700px)</option>
                <option>Medium (500px)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-neutral-500 mb-1">Alignment</label>
              <div className="flex bg-neutral-100 rounded p-0.5 border border-neutral-200">
                <button className="flex-1 py-1 text-xs bg-surface shadow-sm rounded">Left</button>
                <button className="flex-1 py-1 text-xs text-neutral-500 hover:text-neutral-900">Center</button>
                <button className="flex-1 py-1 text-xs text-neutral-500 hover:text-neutral-900">Right</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SectionLibrary = () => {
  const { sections, setSections } = useCMS();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({ name: '', type: 'Hero', category: 'Hero' });
  const [content, setContent] = React.useState({
    title: '',
    subtitle: '',
    ctaText: '',
    ctaUrl: '',
    items: [
      { id: Date.now(), imageUrl: '', title: '', link: '' }
    ]
  });

  const handleCreate = (e) => {
    e.preventDefault();
    const newTemplate = {
      id: `SEC-${Date.now()}`,
      name: formData.name || 'New Section',
      category: formData.category,
      type: formData.type,
      status: 'Active',
      updatedAt: new Date().toISOString().split('T')[0],
      usageCount: 0,
      content: {
        title: content.title || "Creations with purpose",
        subtitle: content.subtitle || "Many choices based on your space",
        ctaText: content.ctaText || "Explore Now",
        ctaUrl: content.ctaUrl || "/shop",
        items: content.items.length > 0 ? content.items : [
          { id: 1, imageUrl: '/images/default.jpg', title: 'Default', link: '/shop' }
        ]
      },
      // Keep defaultSchema synced so AddSectionDrawer can consume it properly
      defaultSchema: {
        title: content.title || "Creations with purpose",
        subtitle: content.subtitle || "Many choices based on your space",
        ctaText: content.ctaText || "Explore Now",
        ctaUrl: content.ctaUrl || "/shop",
        items: content.items.length > 0 ? content.items : [
          { id: 1, imageUrl: '/images/default.jpg', title: 'Default', link: '/shop' }
        ]
      }
    };
    
    setSections([...sections, newTemplate]);
    setIsModalOpen(false);
    setFormData({ name: '', type: 'Hero', category: 'Hero' });
    setContent({ title: '', subtitle: '', ctaText: '', ctaUrl: '', items: [{ id: Date.now(), imageUrl: '', title: '', link: '' }] });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Section Library</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800"
        >
          Create Section Template
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map(s => (
          <div key={s.id} className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden flex flex-col">
            <div className="h-32 bg-neutral-100 border-b border-neutral-200 flex items-center justify-center text-neutral-400 text-sm">
              [Preview Thumbnail]
            </div>
            <div className="p-4 flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-neutral-900">{s.name}</h3>
                <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded">{s.category}</span>
              </div>
              <div className="text-sm text-neutral-500 mb-4">Type: {s.type}</div>
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-neutral-100">
                <span className="text-xs text-neutral-500">Used in {s.usageCount || 0} pages</span>
                <div className="space-x-2 text-sm">
                  <button className="text-primary hover:text-indigo-800 font-medium">Edit</button>
                  <button className="text-neutral-600 hover:text-neutral-800 font-medium">Duplicate</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-neutral-200">
              <h2 className="text-xl font-serif font-bold text-neutral-900">Create Section Template</h2>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh] custom-scrollbar">
              <form id="create-section-form" onSubmit={handleCreate} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Section Name</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full border border-neutral-300 rounded p-2 focus:ring-1 focus:ring-neutral-900" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    placeholder="e.g., Summer Promo Carousel" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Category</label>
                    <select 
                      className="w-full border border-neutral-300 rounded p-2 focus:ring-1 focus:ring-neutral-900" 
                      value={formData.category} 
                      onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                      <option>Hero</option>
                      <option>Carousel</option>
                      <option>CTA</option>
                      <option>Content</option>
                      <option>Grid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Type</label>
                    <select 
                      className="w-full border border-neutral-300 rounded p-2 focus:ring-1 focus:ring-neutral-900" 
                      value={formData.type} 
                      onChange={e => setFormData({...formData, type: e.target.value})}
                    >
                      <option>Hero</option>
                      <option>Product</option>
                      <option>Newsletter</option>
                      <option>CREATIONS_SHOWCASE</option>
                    </select>
                  </div>
                </div>

                {formData.type === 'CREATIONS_SHOWCASE' && (
                  <div className="border-t border-neutral-200 pt-6 space-y-6">
                    <h3 className="font-bold text-neutral-900 font-serif">Section Content</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
                        <input type="text" className="w-full border border-neutral-300 rounded p-2 focus:ring-1 focus:ring-neutral-900" value={content.title} onChange={e => setContent({...content, title: e.target.value})} placeholder="Creations with purpose" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Subtitle</label>
                        <input type="text" className="w-full border border-neutral-300 rounded p-2 focus:ring-1 focus:ring-neutral-900" value={content.subtitle} onChange={e => setContent({...content, subtitle: e.target.value})} placeholder="Many choices based on your space" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">CTA Text</label>
                        <input type="text" className="w-full border border-neutral-300 rounded p-2 focus:ring-1 focus:ring-neutral-900" value={content.ctaText} onChange={e => setContent({...content, ctaText: e.target.value})} placeholder="Explore Now" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">CTA Link</label>
                        <input type="text" className="w-full border border-neutral-300 rounded p-2 focus:ring-1 focus:ring-neutral-900" value={content.ctaUrl} onChange={e => setContent({...content, ctaUrl: e.target.value})} placeholder="/shop" />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-neutral-900 mb-3">Image Items</h4>
                      <div className="space-y-3">
                        {content.items.map((item, index) => (
                          <div key={item.id} className="p-4 border border-neutral-200 rounded-lg bg-neutral-50 flex gap-4 items-start">
                             <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div>
                                  <label className="block text-xs font-medium text-neutral-500 mb-1">Title</label>
                                  <input type="text" className="w-full text-sm border border-neutral-300 rounded p-1.5 focus:ring-1 focus:ring-neutral-900" value={item.title} onChange={e => {
                                    const newItems = [...content.items];
                                    newItems[index].title = e.target.value;
                                    setContent({...content, items: newItems});
                                  }} placeholder="e.g. Living Room" />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-neutral-500 mb-1">Image URL</label>
                                  <input type="text" className="w-full text-sm border border-neutral-300 rounded p-1.5 focus:ring-1 focus:ring-neutral-900" value={item.imageUrl} onChange={e => {
                                    const newItems = [...content.items];
                                    newItems[index].imageUrl = e.target.value;
                                    setContent({...content, items: newItems});
                                  }} placeholder="https://..." />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-neutral-500 mb-1">Link</label>
                                  <input type="text" className="w-full text-sm border border-neutral-300 rounded p-1.5 focus:ring-1 focus:ring-neutral-900" value={item.link} onChange={e => {
                                    const newItems = [...content.items];
                                    newItems[index].link = e.target.value;
                                    setContent({...content, items: newItems});
                                  }} placeholder="/category/..." />
                                </div>
                             </div>
                             <button type="button" onClick={() => {
                               const newItems = content.items.filter(i => i.id !== item.id);
                               setContent({...content, items: newItems});
                             }} className="text-red-500 hover:text-red-700 mt-6 p-1 transition-colors" title="Remove Item">
                                <Trash2 size={18} />
                             </button>
                          </div>
                        ))}
                      </div>
                      <button type="button" onClick={() => {
                        setContent({...content, items: [...content.items, { id: Date.now(), imageUrl: '', title: '', link: '' }]})
                      }} className="mt-4 text-sm font-medium text-primary hover:text-indigo-800 flex items-center gap-1 transition-colors">
                        + Add Image Item
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
            
            <div className="p-6 border-t border-neutral-200 bg-neutral-50 rounded-b-lg flex justify-end gap-2 shrink-0">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded hover:bg-white transition-colors">Cancel</button>
              <button type="submit" form="create-section-form" className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800 transition-colors">Create Template</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const BlockCenter = () => {
  const { blocks } = useCMS();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Reusable Blocks</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Create Block</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Block Name</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Last Updated</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {blocks.map(b => (
              <tr key={b.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{b.name}</td>
                <td className="px-6 py-4 text-neutral-600">{b.type}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    b.status === 'Active' ? 'bg-success-soft text-green-800' : 'bg-neutral-100 text-neutral-800'
                  }`}>
                    {b.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-neutral-600">{b.updatedAt}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-primary hover:text-indigo-900 font-medium">Edit</button>
                  <button className="text-neutral-600 hover:text-neutral-900 font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const NavigationCenter = () => {
  const { menus } = useCMS();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Navigation Menus</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Create Menu</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Menu Name</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Items</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {menus.map(m => (
              <tr key={m.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{m.name}</td>
                <td className="px-6 py-4 text-neutral-600">{m.type}</td>
                <td className="px-6 py-4 text-neutral-600">{m.items}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    m.status === 'Active' ? 'bg-success-soft text-green-800' : 'bg-neutral-100 text-neutral-800'
                  }`}>
                    {m.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-primary hover:text-indigo-900 font-medium">Builder</button>
                  <button className="text-neutral-600 hover:text-neutral-900 font-medium">Settings</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const HeaderManager = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Header Configuration</h1>
      </div>
      <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Logo</label>
          <div className="flex items-center gap-4">
            <div className="w-32 h-12 bg-neutral-100 border border-neutral-200 flex items-center justify-center text-xs text-neutral-500 rounded">Logo Preview</div>
            <button className="px-3 py-1.5 border border-neutral-200 text-sm rounded hover:bg-neutral-50">Change Logo</button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Primary Menu</label>
          <select className="w-full border-neutral-300 rounded-md shadow-sm p-2 border text-sm">
            <option>Main Header Navigation</option>
            <option>Alternative Menu</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Features</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded text-primary" defaultChecked /> Enable Search
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded text-primary" defaultChecked /> Enable User Account
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded text-primary" defaultChecked /> Enable Wishlist
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded text-primary" defaultChecked /> Enable Cart
            </label>
          </div>
        </div>
        <div className="pt-4 flex justify-end">
          <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Save Configuration</button>
        </div>
      </div>
    </div>
  );
};

export const FooterManager = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Footer Configuration</h1>
      </div>
      <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Footer Description</label>
          <textarea className="w-full border-neutral-300 rounded-md shadow-sm p-2 border text-sm" rows={3} defaultValue="Premium furniture and luxury resorts."></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Footer Menu</label>
          <select className="w-full border-neutral-300 rounded-md shadow-sm p-2 border text-sm">
            <option>Footer Links</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Copyright Text</label>
          <input type="text" className="w-full border-neutral-300 rounded-md shadow-sm p-2 border text-sm" defaultValue="© 2024 Enterprise Furniture. All rights reserved." />
        </div>
        <div className="pt-4 flex justify-end">
          <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Save Configuration</button>
        </div>
      </div>
    </div>
  );
};

export const BannerManager = () => {
  const { banners } = useCMS();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Banners</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Create Banner</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Banner Name</th>
              <th className="px-6 py-4 font-medium">Placement</th>
              <th className="px-6 py-4 font-medium">Schedule</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {banners.map(b => (
              <tr key={b.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{b.name}</td>
                <td className="px-6 py-4 text-neutral-600">{b.placement}</td>
                <td className="px-6 py-4 text-neutral-600">{b.startDate} - {b.endDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    b.status === 'Active' ? 'bg-success-soft text-green-800' : 'bg-neutral-100 text-neutral-800'
                  }`}>
                    {b.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-primary hover:text-indigo-900 font-medium">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const SEOCenter = () => {
  const { seo } = useCMS();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">SEO Center</h1>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Page ID</th>
              <th className="px-6 py-4 font-medium">SEO Title</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Score (Placeholder)</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {seo.map(s => (
              <tr key={s.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{s.pageId}</td>
                <td className="px-6 py-4 text-neutral-600">{s.title}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    s.status === 'Indexed' ? 'bg-success-soft text-green-800' : 'bg-warning-soft text-amber-800'
                  }`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-neutral-600">{s.score}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-primary hover:text-indigo-900 font-medium">Edit Meta</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const RedirectCenter = () => {
  const { redirects } = useCMS();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Redirects</h1>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Add Redirect</button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Source URL</th>
              <th className="px-6 py-4 font-medium">Destination URL</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {redirects.map(r => (
              <tr key={r.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{r.source}</td>
                <td className="px-6 py-4 text-neutral-600">{r.destination}</td>
                <td className="px-6 py-4 text-neutral-600">{r.statusCode}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    r.status === 'Active' ? 'bg-success-soft text-green-800' : 'bg-neutral-100 text-neutral-800'
                  }`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-primary hover:text-indigo-900 font-medium">Edit</button>
                  <button className="text-neutral-600 hover:text-neutral-900 font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const PagePreview = () => {
  const { pageId } = useParams();
  const { getPage } = useCMS();
  const page = getPage(pageId) || { name: 'Unknown Page' };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] -m-8 bg-neutral-100">
      <div className="bg-surface border-b border-neutral-200 p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to={`/admin/cms/pages/${pageId}/builder`} className="text-neutral-500 hover:text-neutral-900"><ArrowLeft className="w-5 h-5"/></Link>
          <span className="font-medium">{page.name} - Preview</span>
        </div>
        <div className="flex gap-2">
           <div className="flex bg-neutral-100 rounded p-1 border border-neutral-200 mr-4">
              <button className="px-3 py-1 text-sm bg-surface shadow-sm rounded">Desktop</button>
              <button className="px-3 py-1 text-sm text-neutral-500 hover:text-neutral-900">Tablet</button>
              <button className="px-3 py-1 text-sm text-neutral-500 hover:text-neutral-900">Mobile</button>
            </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto flex justify-center p-8">
        <div className="bg-surface w-full max-w-6xl shadow-xl min-h-full border border-neutral-200 rounded">
            {/* Mock Rendered Frontend */}
            <div className="h-16 border-b border-neutral-200 flex items-center px-8 justify-between">
              <div className="font-serif font-bold text-xl">BRAND</div>
              <div className="space-x-6 text-sm">
                <span>Home</span>
                <span>Products</span>
                <span>About</span>
              </div>
            </div>
            
            <SectionRenderer section={{ type: "Hero", content: { heading: "Welcome to " + page.name, subtitle: "A premium digital experience", cta: "Explore Now" } }} />
            <SectionRenderer section={{ type: "Text", content: { heading: "Our Philosophy", text: "We believe in the power of good design..." }, layout: { alignment: "center" } }} />
            <SectionRenderer section={{ type: "CardGrid", content: { heading: "Featured Collections", description: "Discover our most popular items" } }} />

        </div>
      </div>
    </div>
  );
};

export const PageVersions = () => {
  const { versions, getPage } = useCMS();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Page Versions</h1>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Page</th>
              <th className="px-6 py-4 font-medium">Version</th>
              <th className="px-6 py-4 font-medium">Author</th>
              <th className="px-6 py-4 font-medium">Change Summary</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {versions.map(v => (
              <tr key={v.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{getPage(v.pageId)?.name || v.pageId}</td>
                <td className="px-6 py-4 text-neutral-600">{v.version}</td>
                <td className="px-6 py-4 text-neutral-600">{v.author}</td>
                <td className="px-6 py-4 text-neutral-600">{v.changeSummary}</td>
                <td className="px-6 py-4 text-neutral-600">{v.createdAt}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-primary hover:text-indigo-900 font-medium">Compare</button>
                  <button className="text-neutral-600 hover:text-neutral-900 font-medium">Restore</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const PageTypeCenter = () => {
  const { pageTypes, setPageTypes, pages } = useCMS();

  const handleDeactivate = (id) => {
    setPageTypes(pageTypes.map(pt => pt.id === id ? { ...pt, status: 'Inactive' } : pt));
  };

  const handleActivate = (id) => {
    setPageTypes(pageTypes.map(pt => pt.id === id ? { ...pt, status: 'Active' } : pt));
  };

  const handleDelete = (id) => {
    const inUse = pages.some(p => p.pageTypeId === id);
    if (inUse) {
      alert(`Cannot delete: This Page Type is currently used by ${pages.filter(p => p.pageTypeId === id).length} pages. Deactivate it instead.`);
      return;
    }
    if (confirm('Are you sure you want to delete this Page Type?')) {
      setPageTypes(pageTypes.filter(pt => pt.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Page Type Management</h1>
        <Link to="create" className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Create Page Type</Link>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Page Type</th>
              <th className="px-6 py-4 font-medium">Description</th>
              <th className="px-6 py-4 font-medium">Usage Count</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {pageTypes.map(pt => {
              const usageCount = pages.filter(p => p.pageTypeId === pt.id).length;
              return (
                <tr key={pt.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 font-medium text-neutral-900">{pt.name}</td>
                  <td className="px-6 py-4 text-neutral-600">{pt.description}</td>
                  <td className="px-6 py-4 text-neutral-600">{usageCount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      pt.status === 'Active' ? 'bg-success-soft text-green-800' : 'bg-neutral-100 text-neutral-800'
                    }`}>
                      {pt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    {pt.status === 'Active' ? (
                      <button onClick={() => handleDeactivate(pt.id)} className="text-warning hover:text-amber-900 font-medium">Deactivate</button>
                    ) : (
                      <button onClick={() => handleActivate(pt.id)} className="text-success hover:text-green-900 font-medium">Activate</button>
                    )}
                    <Link to={`${pt.id}/edit`} className="text-primary hover:text-indigo-900 font-medium">Edit</Link>
                    <button onClick={() => handleDelete(pt.id)} className="text-danger hover:text-red-900 font-medium"><Trash2 className="w-4 h-4 inline" /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const PageTypeForm = () => {
  const { pageTypes, setPageTypes } = useCMS();
  const { id } = useParams();
  
  const [formData, setFormData] = React.useState(
    id 
      ? (pageTypes.find(pt => pt.id === id) || { name: '', slug: '', description: '', template: '', status: 'Active' })
      : { name: '', slug: '', description: '', template: '', status: 'Active' }
  );

  const handleSave = () => {
    if (!formData.name) return alert('Name is required');
    if (id) {
      setPageTypes(pageTypes.map(pt => pt.id === id ? { ...formData, updatedAt: new Date().toISOString() } : pt));
    } else {
      setPageTypes([...pageTypes, { ...formData, id: `PT-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }]);
    }
    window.history.back();
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => window.history.back()} className="p-2 border border-neutral-200 rounded-md hover:bg-neutral-50 text-neutral-600">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-2xl font-serif text-neutral-900">{id ? 'Edit Page Type' : 'Create Page Type'}</h1>
      </div>
      <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
          <input type="text" className="w-full border-neutral-300 rounded-md shadow-sm p-2 border" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Furniture Guide" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Slug</label>
          <input type="text" className="w-full border-neutral-300 rounded-md shadow-sm p-2 border" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="e.g. furniture-guide" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
          <input type="text" className="w-full border-neutral-300 rounded-md shadow-sm p-2 border" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="e.g. Dynamic guide for furniture" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Template Reference</label>
          <input type="text" className="w-full border-neutral-300 rounded-md shadow-sm p-2 border" value={formData.template} onChange={e => setFormData({...formData, template: e.target.value})} placeholder="e.g. default-guide" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Status</label>
          <select className="w-full border-neutral-300 rounded-md shadow-sm p-2 border" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="pt-4 flex justify-end gap-2">
          <button onClick={() => window.history.back()} className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded hover:bg-neutral-50">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">Save Page Type</button>
        </div>
      </div>
    </div>
  );
};
