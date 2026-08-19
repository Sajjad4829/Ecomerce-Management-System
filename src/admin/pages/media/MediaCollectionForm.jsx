import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiImage } from 'react-icons/fi';
import { useMedia } from '../../context/media/MediaContext';
import MediaPicker from '../../components/media/MediaPicker';

export default function MediaCollectionForm() {
  const navigate = useNavigate();
  const { addCollection } = useMedia();
  const [formData, setFormData] = useState({ name: '', description: '', assetIds: [] });
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleSave = () => {
    addCollection(formData);
    navigate('/admin/media/collections');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/admin/media/collections')} className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors">
          <FiArrowLeft /> Back to Collections
        </button>
        <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors">
          <FiSave /> Save Collection
        </button>
      </div>

      <div>
        <h1 className="text-3xl font-light text-text-primary tracking-wide mb-2">Create Collection</h1>
        <p className="text-sm text-text-muted">Group related assets together logically.</p>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm border border-stone-100 p-8 space-y-6">
        <div>
          <label className="text-xs font-bold text-text-primary uppercase tracking-widest block mb-2">Collection Name</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full p-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary" 
            placeholder="e.g. Summer Campaign 2026"
          />
        </div>
        
        <div>
          <label className="text-xs font-bold text-text-primary uppercase tracking-widest block mb-2">Description</label>
          <textarea 
            rows="3"
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            className="w-full p-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary" 
          />
        </div>

        <div>
          <label className="text-xs font-bold text-text-primary uppercase tracking-widest block mb-2">Assets ({formData.assetIds.length})</label>
          <button onClick={() => setIsPickerOpen(true)} className="flex items-center justify-center gap-2 w-full p-8 border-2 border-dashed border-border-hover rounded-xl text-text-muted hover:border-stone-400 hover:text-text-secondary transition-colors bg-background">
            <FiImage size={24} />
            <span className="font-medium">Select Assets from Library</span>
          </button>
        </div>
      </div>

      {isPickerOpen && (
        <MediaPicker 
          multiSelect={true}
          onSelect={(assets) => {
            setFormData({...formData, assetIds: [...formData.assetIds, ...assets.map(a => a.id)]});
          }}
          onClose={() => setIsPickerOpen(false)}
        />
      )}
    </div>
  );
}
