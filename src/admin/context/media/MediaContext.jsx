import React, { createContext, useContext, useState } from 'react';

const MediaContext = createContext();

export function MediaProvider({ children }) {
  const [assets, setAssets] = useState([
    { id: 'ast-1', filename: 'aurora-sofa-main.jpg', title: 'Aurora Sofa Main', altText: 'Aurora Premium Leather Sofa in Cognac', type: 'Image', mimeType: 'image/jpeg', size: 1024500, width: 2400, height: 1600, folderId: 'fld-1', collectionIds: ['col-1'], tags: ['sofa', 'leather', 'premium'], status: 'Active', isFavorite: true, createdAt: '2026-08-01T10:00:00Z', updatedAt: '2026-08-01T10:00:00Z', url: 'https://placehold.co/2400x1600/1a1a1a/ffffff?text=Aurora+Sofa' },
    { id: 'ast-2', filename: 'nordic-dining-table.jpg', title: 'Nordic Dining Table', altText: 'Nordic Oak Dining Table setup', type: 'Image', mimeType: 'image/jpeg', size: 845000, width: 2000, height: 2000, folderId: 'fld-1', collectionIds: [], tags: ['dining', 'table', 'oak'], status: 'Active', isFavorite: false, createdAt: '2026-08-02T11:00:00Z', updatedAt: '2026-08-02T11:00:00Z', url: 'https://placehold.co/2000x2000/1a1a1a/ffffff?text=Nordic+Table' },
    { id: 'ast-3', filename: 'summer-sale-banner.png', title: 'Summer Sale Hero Banner', altText: 'Summer Sale 20% Off', type: 'Image', mimeType: 'image/png', size: 2145000, width: 3840, height: 1200, folderId: 'fld-2', collectionIds: ['col-2'], tags: ['banner', 'summer', 'sale'], status: 'Active', isFavorite: true, createdAt: '2026-08-05T09:00:00Z', updatedAt: '2026-08-05T09:00:00Z', url: 'https://placehold.co/3840x1200/1a1a1a/ffffff?text=Summer+Sale+Banner' },
    { id: 'ast-4', filename: 'assembly-guide-v1.pdf', title: 'Aurora Assembly Guide', altText: '', type: 'Document', mimeType: 'application/pdf', size: 4500000, width: null, height: null, folderId: 'fld-3', collectionIds: [], tags: ['guide', 'assembly'], status: 'Active', isFavorite: false, createdAt: '2026-08-06T14:00:00Z', updatedAt: '2026-08-06T14:00:00Z', url: 'https://placehold.co/800x1200/e0e0e0/555555?text=PDF+Document' },
    { id: 'ast-5', filename: 'velvet-chair-lifestyle.mp4', title: 'Velvet Chair Lifestyle Video', altText: '', type: 'Video', mimeType: 'video/mp4', size: 15600000, width: 1920, height: 1080, folderId: 'fld-1', collectionIds: [], tags: ['chair', 'lifestyle', 'video'], status: 'Active', isFavorite: false, createdAt: '2026-08-07T16:00:00Z', updatedAt: '2026-08-07T16:00:00Z', url: 'https://placehold.co/1920x1080/000000/ffffff?text=Video+Player' },
  ]);

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

  const addAsset = (asset) => setAssets([...assets, { ...asset, id: `ast-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), status: 'Active' }]);
  const updateAsset = (id, data) => setAssets(assets.map(a => a.id === id ? { ...a, ...data, updatedAt: new Date().toISOString() } : a));
  const deleteAsset = (id) => setAssets(assets.filter(a => a.id !== id)); // Hard delete for mock
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
      assets, folders, collections, tags, viewMode, setViewMode,
      addAsset, updateAsset, deleteAsset, archiveAsset, restoreAsset, toggleFavorite,
      addFolder, updateFolder, addCollection, addTag
    }}>
      {children}
    </MediaContext.Provider>
  );
}

export const useMedia = () => useContext(MediaContext);
