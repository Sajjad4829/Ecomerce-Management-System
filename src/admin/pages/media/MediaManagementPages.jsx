import React, { useState } from 'react';
import { FiFolder, FiGrid, FiTag, FiStar, FiBarChart2, FiPlus, FiMoreVertical } from 'react-icons/fi';
import { useMedia } from '../../context/media/MediaContext';
import { useNavigate } from 'react-router-dom';

const PageTemplate = ({ title, description, icon: Icon, children, action }) => (
  <div className="p-8 max-w-6xl mx-auto space-y-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-stone-900">
          <Icon size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-light text-[#1A1A1A] tracking-wide mb-1">{title}</h1>
          <p className="text-sm text-stone-500">{description}</p>
        </div>
      </div>
      {action}
    </div>
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 min-h-[400px]">
      {children}
    </div>
  </div>
);

export function MediaFolderManager() {
  const { folders, addFolder } = useMedia();
  const [newFolderName, setNewFolderName] = useState('');
  
  const handleAdd = () => {
    if(newFolderName.trim()) {
      addFolder({ name: newFolderName, parentId: null });
      setNewFolderName('');
    }
  };

  return (
    <PageTemplate 
      title="Folders" 
      description="Organize your media assets into physical directories." 
      icon={FiFolder}
    >
      <div className="flex items-center gap-4 mb-8 max-w-md">
        <input 
          type="text" 
          value={newFolderName}
          onChange={e => setNewFolderName(e.target.value)}
          placeholder="New folder name..." 
          className="flex-1 p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400"
        />
        <button onClick={handleAdd} className="px-4 py-2.5 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap">
          Create Folder
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 border border-stone-200 rounded-xl flex items-center gap-4 bg-stone-50 cursor-pointer">
          <FiFolder className="text-stone-400 text-2xl" />
          <div className="font-bold text-stone-900">All Media (Root)</div>
        </div>
        {folders.map(folder => (
          <div key={folder.id} className="p-4 border border-stone-200 rounded-xl flex items-center justify-between group hover:border-stone-300 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <FiFolder className="text-stone-500 text-2xl" />
              <div className="font-bold text-stone-900 group-hover:text-black">{folder.name}</div>
            </div>
            <button className="p-1 text-stone-400 hover:text-stone-900 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              <FiMoreVertical />
            </button>
          </div>
        ))}
      </div>
    </PageTemplate>
  );
}

export function MediaCollectionManager() {
  const { collections } = useMedia();
  const navigate = useNavigate();

  return (
    <PageTemplate 
      title="Collections" 
      description="Logical groupings of assets across different folders." 
      icon={FiGrid}
      action={
        <button onClick={() => navigate('/admin/media/collections/new')} className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors">
          <FiPlus /> Create Collection
        </button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map(col => (
          <div key={col.id} className="border border-stone-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
            <div className="h-40 bg-stone-100 flex items-center justify-center">
              {/* Mock cover image logic */}
              <FiGrid className="text-stone-300 text-4xl" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-stone-900">{col.name}</h3>
              <p className="text-sm text-stone-500 mt-1">{col.description}</p>
              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-stone-500">
                <span className="px-2 py-1 bg-stone-100 rounded">{col.assetIds.length} Assets</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageTemplate>
  );
}

export function MediaTagManager() {
  const { tags, addTag } = useMedia();
  const [newTagName, setNewTagName] = useState('');

  const handleAdd = () => {
    if(newTagName.trim()) {
      addTag({ name: newTagName });
      setNewTagName('');
    }
  }

  return (
    <PageTemplate title="Tags" description="Manage taxonomy for media discovery." icon={FiTag}>
      <div className="flex items-center gap-4 mb-8 max-w-md">
        <input 
          type="text" 
          value={newTagName}
          onChange={e => setNewTagName(e.target.value)}
          placeholder="New tag name (e.g. promotional)..." 
          className="flex-1 p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400"
        />
        <button onClick={handleAdd} className="px-4 py-2.5 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap">
          Add Tag
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {tags.map(tag => (
          <div key={tag.id} className="flex items-center gap-2 px-3 py-1.5 bg-stone-100 border border-stone-200 rounded-lg group">
            <span className="text-sm font-medium text-stone-700">{tag.name}</span>
            <span className="text-xs text-stone-400">({tag.usageCount})</span>
          </div>
        ))}
      </div>
    </PageTemplate>
  );
}

export function MediaFavorites() {
  return (
    <PageTemplate title="Favorites" description="Your frequently accessed or starred assets." icon={FiStar}>
      <div className="text-center py-12 text-stone-500">
        Favorite assets will appear here. Filter existing grid view for favorites instead.
      </div>
    </PageTemplate>
  );
}

export function MediaAnalytics() {
  return (
    <PageTemplate title="Media Analytics" description="Usage and storage metrics across the platform." icon={FiBarChart2}>
      <div className="text-center py-12 text-stone-500">
        Media storage usage, top assets, bandwidth consumption metrics placeholder.
      </div>
    </PageTemplate>
  );
}
