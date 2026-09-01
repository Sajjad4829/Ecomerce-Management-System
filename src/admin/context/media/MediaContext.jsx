import React, { createContext, useContext, useState } from 'react';

const MediaContext = createContext();

export function MediaProvider({ children }) {
  const [assets, setAssets] = useState([]);
  const [loadingAssets, setLoadingAssets] = useState(true);

  React.useEffect(() => {
    fetch('/api/media')
      .then(res => res.json())
      .then(data => {
        setAssets(data);
        setLoadingAssets(false);
      })
      .catch(err => {
        console.error("Failed to load assets", err);
        setLoadingAssets(false);
      });
  }, []);
  const [folders, setFolders] = useState([
    { id: 'fld-1', name: 'Products', parentId: null, status: 'Active' },
    { id: 'fld-2', name: 'Banners', parentId: null, status: 'Active' },
    { id: 'fld-3', name: 'Documents', parentId: null, status: 'Active' },
    { id: 'fld-4', name: 'Blog', parentId: null, status: 'Active' }
  ]);

  const [collections, setCollections] = useState([
    { id: 'col-1', name: 'Fall Collection 2026', description: 'Assets for the Fall 2026 product launch', coverAssetId: 'ast-1', assetIds: ['ast-1', 'ast-2'], status: 'Active' },
    { id: 'col-2', name: 'Summer Campaign', description: 'Summer sale promotional assets', coverAssetId: 'ast-3', assetIds: ['ast-3'], status: 'Active' }
  ]);

  const [tags, setTags] = useState([
    { id: 'tag-1', name: 'sofa', usageCount: 15 },
    { id: 'tag-2', name: 'banner', usageCount: 8 },
    { id: 'tag-3', name: 'premium', usageCount: 24 }
  ]);

  const [viewMode, setViewMode] = useState('Grid'); // Grid, Compact Grid, List

  const addAsset = (asset) => setAssets([...assets, asset]); // Already fully constructed from backend
  const updateAsset = (id, data) => setAssets(assets.map(a => a.id === id ? { ...a, ...data, updatedAt: new Date().toISOString() } : a));
  const deleteAsset = async (id) => {
    try {
      await fetch(`/api/media/${id}`, { method: 'DELETE' });
      setAssets(assets.filter(a => a.id !== id));
    } catch (err) {
      console.error("Failed to delete asset", err);
    }
  };
  const archiveAsset = (id) => updateAsset(id, { status: 'Archived' });
  const restoreAsset = (id) => updateAsset(id, { status: 'Active' });
  const toggleFavorite = (id) => {
    const asset = assets.find(a => a.id === id);
    if(asset) updateAsset(id, { isFavorite: !asset.isFavorite });
  }

  const addFolder = (folder) => setFolders([...folders, { ...folder, id: `fld-${Date.now()}`, status: 'Active' }]);
  const updateFolder = (id, data) => setFolders(folders.map(f => f.id === id ? { ...f, ...data } : f));
  
  const addCollection = (col) => setCollections([...collections, { ...col, id: `col-${Date.now()}`, status: 'Active' }]);
  
  const addTag = (tag) => setTags([...tags, { ...tag, id: `tag-${Date.now()}`, usageCount: 0 }]);

  return (
    <MediaContext.Provider value={{
      assets, folders, collections, tags, viewMode, setViewMode, loadingAssets,
      addAsset, updateAsset, deleteAsset, archiveAsset, restoreAsset, toggleFavorite,
      addFolder, updateFolder, addCollection, addTag
    }}>
      {children}
    </MediaContext.Provider>
  );
}

export const useMedia = () => useContext(MediaContext);
