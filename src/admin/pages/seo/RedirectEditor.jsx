import { useState } from 'react';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

export default function RedirectEditor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    type: '301',
    active: true
  });

  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const newErrors = {};
    if (!formData.source) newErrors.source = 'Source URL is required';
    if (!formData.destination) newErrors.destination = 'Destination URL is required';
    if (formData.source === formData.destination) newErrors.destination = 'Destination cannot be the same as source';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    navigate('/admin/seo/redirects');
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-theme(spacing.20))] pb-24">
      <div className="sticky top-0 z-20 bg-background pt-4 pb-4 border-b border-black/5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/admin/seo/redirects" className="p-2 bg-surface border border-black/10 rounded-lg text-text-muted hover:text-black hover:border-black/20 transition-all shadow-sm">
            <FiArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-serif font-bold text-text-primary">
              Add Redirect
            </h1>
            <p className="text-xs text-text-muted mt-0.5">Create a new URL forwarding rule</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Link to="/admin/seo/redirects" className="px-4 py-2 text-text-secondary hover:text-black text-sm font-medium transition-colors">
            Cancel
          </Link>
          <button 
            onClick={handleSave}
            className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors shadow-sm flex items-center gap-2"
          >
            <FiCheck size={16} /> Save Redirect
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full mt-8">
        <div className="bg-surface rounded-xl border border-black/5 shadow-sm p-8 space-y-6">
          
          <div>
            <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Source URL (Old Path)</label>
            <div className="flex">
              <span className="px-4 py-2.5 bg-gray-100 border border-transparent rounded-l-lg text-sm text-text-muted shrink-0">
                /
              </span>
              <input 
                type="text" 
                value={formData.source}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, source: e.target.value }));
                  setErrors(prev => ({ ...prev, source: null }));
                }}
                placeholder="old-product-page"
                className={`w-full px-4 py-2.5 bg-background border ${errors.source ? 'border-red-500' : 'border-transparent'} rounded-r-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-text-primary`}
              />
            </div>
            {errors.source && <p className="text-xs text-danger mt-1">{errors.source}</p>}
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Destination URL (New Path)</label>
            <input 
              type="text" 
              value={formData.destination}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, destination: e.target.value }));
                setErrors(prev => ({ ...prev, destination: null }));
              }}
              placeholder="/products/new-product-page"
              className={`w-full px-4 py-2.5 bg-background border ${errors.destination ? 'border-red-500' : 'border-transparent'} rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-text-primary`}
            />
            {errors.destination && <p className="text-xs text-danger mt-1">{errors.destination}</p>}
          </div>

          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-black/5">
            <div>
              <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Redirect Type</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-4 py-2.5 bg-background border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-text-primary"
              >
                <option value="301">301 Permanent (Recommended)</option>
                <option value="302">302 Temporary</option>
                <option value="307">307 Temporary Redirect</option>
                <option value="308">308 Permanent Redirect</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <label className="flex items-center gap-3 cursor-pointer mt-6">
                <div className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${formData.active ? 'bg-[#1A1A1A]' : 'bg-gray-200'}`}>
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={formData.active}
                    onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                  />
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-surface transition-transform ${formData.active ? 'translate-x-4.5' : 'translate-x-1'}`} />
                </div>
                <span className="text-sm font-bold text-text-primary">
                  Active
                </span>
              </label>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
