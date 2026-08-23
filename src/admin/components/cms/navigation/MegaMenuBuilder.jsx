import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiMove, FiImage, FiSettings, FiArrowLeft, FiAlertCircle } from 'react-icons/fi';
import { Edit2 } from 'lucide-react';
import { cn } from '../../../../utils/cn';
import { useCategories } from '../../../context/commerce/CategoryContext';

// Item component for handling display/edit mode of a mega menu link
const MegaMenuEditableItem = ({ item, onChange, onDelete, categories, parentCategoryId }) => {
  // Filter for children of the parent group's category that are published
  const availableCategories = categories.filter(c => c.parentId === parentCategoryId && c.status === 'published');
  
  const [isEditing, setIsEditing] = useState(() => {
    return !item.referenceType;
  });

  const getResolvedCategory = () => {
    if (item.referenceType === 'category') {
      return categories.find(c => c.id === item.referenceId);
    }
    return null;
  };

  const resolvedCat = getResolvedCategory();

  if (isEditing) {
    return (
      <div className="flex flex-col gap-2 p-2 bg-gray-50 border border-gray-200 rounded-md shadow-inner">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Select Category</span>
          <button onClick={() => setIsEditing(false)} className="text-[10px] font-bold text-[#635BFF] hover:text-[#524be0]">Done</button>
        </div>
        
        {availableCategories.length > 0 ? (
          <select
            value={item.referenceId || ''}
            onChange={(e) => {
              const val = e.target.value;
              onChange({
                ...item,
                referenceType: val ? 'category' : null,
                referenceId: val || null,
                title: ''
              });
            }}
            className="w-full border-gray-200 rounded-md shadow-sm border bg-white p-1 text-[11px] focus:outline-none focus:border-[#635BFF]"
          >
            <option value="">Select sub-category...</option>
            {availableCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        ) : (
          <div className="text-[10px] text-orange-600 bg-orange-50 p-2 rounded border border-orange-100 flex items-start gap-1">
            <FiAlertCircle size={12} className="shrink-0 mt-0.5" />
            <span>No sub-categories under this category yet. Add them on the Categories page.</span>
          </div>
        )}
        
        <div className="flex justify-end mt-1">
           <button onClick={onDelete} className="text-[10px] text-red-500 hover:text-red-700 flex items-center gap-1 font-bold">
             <FiTrash2 size={10} /> Remove
           </button>
        </div>
      </div>
    );
  }

  // Graceful handling for missing category
  if (item.referenceType === 'category' && !resolvedCat) {
    return (
      <div className="flex items-center justify-between group/item py-1">
        <div className="flex items-center gap-1 text-[11px] font-medium text-red-500 bg-red-50 px-2 py-1 rounded truncate flex-1">
          <FiAlertCircle size={12} className="shrink-0" />
          <span className="truncate">Category no longer available</span>
        </div>
        <div className="flex items-center gap-2 pl-2 shrink-0">
          <button onClick={onDelete} className="text-gray-400 hover:text-red-500">
            <FiTrash2 size={12} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between group/item py-1">
      <div className="flex flex-col flex-1 truncate">
        <div className="flex items-center gap-2">
           <span className="text-[13px] font-medium text-gray-700 group-hover/item:text-gray-900 truncate">
             {resolvedCat ? resolvedCat.name : (item.title || 'Unknown Category')}
           </span>
           {item.referenceType && (
             <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-blue-100 text-blue-700">
               {item.referenceType}
             </span>
           )}
        </div>
      </div>
      <div className="opacity-0 group-hover/item:opacity-100 flex items-center gap-2 transition-opacity pl-2 shrink-0">
        <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-[#635BFF]">
          <Edit2 size={12} />
        </button>
        <button onClick={onDelete} className="text-gray-400 hover:text-red-500">
          <FiTrash2 size={12} />
        </button>
      </div>
    </div>
  );
};

export default function MegaMenuBuilder({ activeLink, onChange, onBack }) {
  const isControlled = activeLink !== undefined;
  
  const { categories, getCategoryHierarchy, getChildren } = useCategories();
  
  // Any depth category that has at least one published child
  const validGroupCategories = categories.filter(c => {
    if (c.status !== 'published') return false;
    const children = getChildren(c.id);
    return children.some(child => child.status === 'published');
  });

  const getBreadcrumb = (catId) => {
    const hierarchy = getCategoryHierarchy(catId);
    return hierarchy.map(c => c.name).join(' > ');
  };
  // Normalize data initialization to prevent dummy data leak
  const [internalState, setInternalState] = useState(() => {
    return {
      text: 'Mega Menu Preview',
      columns: [
        {
          id: 'c1',
          groups: [
            {
              id: 'g1',
              title: '',
              referenceType: null,
              referenceId: null,
              items: []
            }
          ]
        }
      ],
      promoBanner: { imageUrl: '', link: '', title: '', description: '', cta: '' }
    };
  });

  const data = isControlled ? activeLink : internalState;

  // Clean the data of any existing placeholder "New Link" artifacts in case it comes from stale storage
  const cleanData = (d) => {
    if (!d || !d.columns) return d;
    const cleanedColumns = d.columns.map(col => ({
      ...col,
      groups: (col.groups || []).map(group => ({
        ...group,
        title: group.title === 'New Group' ? '' : group.title,
        items: (group.items || []).map(item => {
          if (item.title === 'New Link') {
            return { ...item, title: '', referenceType: null, referenceId: null };
          }
          return item;
        })
      }))
    }));
    return { ...d, columns: cleanedColumns };
  };

  const safeData = cleanData(data);

  const handleChange = (newData) => {
    if (isControlled) {
      onChange(newData);
    } else {
      setInternalState(newData);
    }
  };

  const addColumn = () => {
    handleChange({
      ...safeData,
      columns: [...(safeData.columns || []), { id: `col-${Date.now()}`, groups: [] }]
    });
  };

  const removeColumn = (colId) => {
    handleChange({
      ...safeData,
      columns: safeData.columns.filter(c => c.id !== colId)
    });
  };

  const addGroup = (colId) => {
    const newCols = (safeData.columns || []).map(col => {
      if (col.id === colId) {
        return {
          ...col,
          groups: [...(col.groups || []), { 
            id: `grp-${Date.now()}`, 
            title: '', 
            referenceType: null,
            referenceId: null,
            items: [] 
          }]
        };
      }
      return col;
    });
    handleChange({ ...safeData, columns: newCols });
  };

  const removeGroup = (colId, groupId) => {
    const newCols = safeData.columns.map(col => {
      if (col.id === colId) {
        return { ...col, groups: col.groups.filter(g => g.id !== groupId) };
      }
      return col;
    });
    handleChange({ ...safeData, columns: newCols });
  };

  const updateGroup = (colId, groupId, updates) => {
    const newCols = safeData.columns.map(col => {
      if (col.id === colId) {
        return {
          ...col,
          groups: col.groups.map(g => g.id === groupId ? { ...g, ...updates } : g)
        };
      }
      return col;
    });
    handleChange({ ...safeData, columns: newCols });
  };

  const addItem = (colId, groupId) => {
    const newCols = safeData.columns.map(col => {
      if (col.id === colId) {
        return {
          ...col,
          groups: col.groups.map(g => {
            if (g.id === groupId) {
              return { 
                ...g, 
                items: [...(g.items || []), { id: `item-${Date.now()}`, title: '', referenceType: null, referenceId: null }] 
              };
            }
            return g;
          })
        };
      }
      return col;
    });
    handleChange({ ...safeData, columns: newCols });
  };

  const removeItem = (colId, groupId, itemId) => {
    const newCols = safeData.columns.map(col => {
      if (col.id === colId) {
        return {
          ...col,
          groups: col.groups.map(g => {
            if (g.id === groupId) {
              return { ...g, items: g.items.filter(i => i.id !== itemId) };
            }
            return g;
          })
        };
      }
      return col;
    });
    handleChange({ ...safeData, columns: newCols });
  };

  const updateItem = (colId, groupId, itemId, updates) => {
    const newCols = safeData.columns.map(col => {
      if (col.id === colId) {
        return {
          ...col,
          groups: col.groups.map(g => {
            if (g.id === groupId) {
              return { ...g, items: g.items.map(i => i.id === itemId ? { ...i, ...updates } : i) };
            }
            return g;
          })
        };
      }
      return col;
    });
    handleChange({ ...safeData, columns: newCols });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-gray-200 shrink-0 bg-gray-50 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {onBack && (
            <button onClick={onBack} className="p-2 hover:bg-gray-200 rounded-lg text-gray-500 transition-colors">
              <FiArrowLeft size={18} />
            </button>
          )}
          <h3 className="text-lg font-bold text-gray-900">Mega Menu: {safeData.text}</h3>
        </div>
        <div className="flex gap-2">
           <button onClick={addColumn} className="px-4 py-2 bg-[#1A1A1A] text-white rounded-md text-xs font-bold uppercase tracking-widest hover:bg-black/80 shadow-sm flex items-center gap-2">
             <FiPlus size={14} /> Add Column
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-auto bg-gray-100 p-6 custom-scrollbar">
        <div className="flex gap-6 items-start min-w-max">
           
           {/* Promotional Block Column */}
           <div className="w-72 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col shrink-0">
              <div className="p-3 border-b border-gray-100 bg-purple-50/50 rounded-t-xl">
                 <span className="font-bold text-sm text-purple-900 uppercase tracking-widest text-xs">Promo Block</span>
              </div>
              <div className="p-4 flex flex-col gap-4">
                 <div className="relative aspect-[4/3] bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 group overflow-hidden">
                    {safeData.promoBanner?.imageUrl ? (
                      <>
                        <img src={safeData.promoBanner.imageUrl} className="w-full h-full object-cover" alt="Promo" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <FiImage size={24} className="text-white" />
                        </div>
                      </>
                    ) : (
                      <>
                        <FiImage size={24} className="mb-2" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Image URL</span>
                      </>
                    )}
                 </div>
                 
                 <input 
                   type="text" 
                   placeholder="Image URL" 
                   value={safeData.promoBanner?.imageUrl || ''}
                   onChange={(e) => handleChange({ ...safeData, promoBanner: { ...safeData.promoBanner, imageUrl: e.target.value } })}
                   className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono focus:outline-none focus:border-[#635BFF]" 
                 />
                 <input 
                   type="text" 
                   placeholder="Promo Title" 
                   value={safeData.promoBanner?.title || ''}
                   onChange={(e) => handleChange({ ...safeData, promoBanner: { ...safeData.promoBanner, title: e.target.value } })}
                   className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-gray-900 focus:outline-none focus:border-[#635BFF]" 
                 />
                 <textarea 
                   placeholder="Description" 
                   rows={2} 
                   value={safeData.promoBanner?.description || ''}
                   onChange={(e) => handleChange({ ...safeData, promoBanner: { ...safeData.promoBanner, description: e.target.value } })}
                   className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 focus:outline-none focus:border-[#635BFF] resize-none"
                 />
                 <div className="flex gap-2">
                   <input 
                     type="text" 
                     placeholder="CTA Label" 
                     value={safeData.promoBanner?.cta || ''}
                     onChange={(e) => handleChange({ ...safeData, promoBanner: { ...safeData.promoBanner, cta: e.target.value } })}
                     className="w-1/2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-900 focus:outline-none focus:border-[#635BFF]" 
                   />
                   <input 
                     type="text" 
                     placeholder="CTA URL" 
                     value={safeData.promoBanner?.link || ''}
                     onChange={(e) => handleChange({ ...safeData, promoBanner: { ...safeData.promoBanner, link: e.target.value } })}
                     className="w-1/2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono text-gray-600 focus:outline-none focus:border-[#635BFF]" 
                   />
                 </div>
              </div>
           </div>

           {/* Menu Columns */}
           {(safeData.columns || []).map((col, colIdx) => (
             <div key={col.id} className="w-72 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col shrink-0 min-h-[400px]">
                <div className="p-3 border-b border-gray-100 bg-gray-50 rounded-t-xl flex justify-between items-center group">
                   <div className="flex items-center gap-2 text-gray-500 font-bold text-xs uppercase tracking-widest">
                     <FiMove className="text-gray-400" size={14} />
                     Column {colIdx + 1}
                   </div>
                   <button onClick={() => removeColumn(col.id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                     <FiTrash2 size={14} />
                   </button>
                </div>
                
                <div className="flex-1 p-4 flex flex-col gap-6">
                   {col.groups?.map((group) => {
                     // Check if category is valid/published
                     const groupCat = group.referenceType === 'category' 
                       ? categories.find(c => c.id === group.referenceId && c.status === 'published')
                       : null;
                     
                     // If it's a legacy group with no reference yet (e.g. from an old initialization), it might just be invalid now.
                     // But we want to let them select one.
                     const isGroupValid = !group.referenceType || groupCat;

                     return (
                     <div key={group.id} className="group/section border border-transparent hover:border-gray-200 p-2 -m-2 rounded-lg transition-colors">
                        <div className="flex flex-col gap-1 mb-2">
                           <div className="flex items-center justify-between">
                             <div className="flex-1 mr-2">
                               <select
                                 value={group.referenceId || ''}
                                 onChange={(e) => {
                                   const val = e.target.value;
                                   updateGroup(col.id, group.id, {
                                     referenceType: val ? 'category' : null,
                                     referenceId: val || null,
                                     title: '' // wipe old title data
                                   });
                                 }}
                                 className={cn(
                                   "w-full border-none p-0 focus:ring-0 cursor-pointer bg-transparent truncate",
                                   group.isMain ? "font-extrabold text-sm text-gray-900" : "font-bold text-sm text-gray-700",
                                   !group.referenceId && "text-gray-400 text-xs italic font-medium"
                                 )}
                               >
                                 <option value="" disabled>Select Group Category...</option>
                                 {validGroupCategories.map(c => {
                                   const isUsedInColumn = col.groups.some(g => g.id !== group.id && g.referenceId === c.id);
                                   return (
                                     <option key={c.id} value={c.id} disabled={isUsedInColumn}>
                                       {getBreadcrumb(c.id)} {isUsedInColumn ? '(Already used in column)' : ''}
                                     </option>
                                   );
                                 })}
                                 {/* Fallback if a category is selected but not in validGroupCategories */}
                                 {group.referenceId && !validGroupCategories.find(c => c.id === group.referenceId) && groupCat && (
                                   <option value={group.referenceId}>{getBreadcrumb(group.referenceId)}</option>
                                 )}
                               </select>
                             </div>
                             <div className="flex items-center gap-2 opacity-0 group-hover/section:opacity-100 transition-opacity shrink-0">
                               <button onClick={() => removeGroup(col.id, group.id)} className="text-gray-400 hover:text-red-500">
                                 <FiTrash2 size={14} />
                               </button>
                             </div>
                           </div>
                           
                           {!isGroupValid && group.referenceType === 'category' && (
                             <div className="flex items-center gap-1 text-[10px] font-medium text-red-500 bg-red-50 px-2 py-1 rounded">
                               <FiAlertCircle size={10} className="shrink-0" />
                               <span className="truncate">Category no longer available</span>
                             </div>
                           )}
                        </div>

                          <div className="space-y-1.5 ml-1 border-l-2 border-gray-100 pl-3">
                             {group.items?.map((item) => (
                               <MegaMenuEditableItem 
                                 key={item.id}
                                 item={item}
                                 onChange={(updated) => updateItem(col.id, group.id, item.id, updated)}
                                 onDelete={() => removeItem(col.id, group.id, item.id)}
                                 categories={categories}
                                 parentCategoryId={group.referenceId}
                               />
                             ))}
                             
                             {/* Only allow adding items if a valid group category is selected */}
                             {groupCat ? (
                               <button onClick={() => addItem(col.id, group.id)} className="text-[11px] font-bold text-gray-400 hover:text-[#1A1A1A] flex items-center gap-1 mt-2">
                                 <FiPlus size={10} /> Add Item
                               </button>
                             ) : group.referenceId ? (
                               <span className="text-[10px] text-gray-400 italic mt-2 block">Group category unavailable. Cannot add items.</span>
                             ) : (
                               <span className="text-[10px] text-gray-400 italic mt-2 block">Select a group category to add items.</span>
                             )}
                          </div>
                     </div>
                   )})}
                   
                   <button onClick={() => addGroup(col.id)} className="mt-2 p-3 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-center text-gray-400 hover:bg-gray-50 hover:text-gray-600 hover:border-gray-300 transition-colors">
                      <FiPlus size={16} className="mb-1" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Add Group</span>
                   </button>
                </div>
             </div>
           ))}

        </div>
      </div>
    </div>
  );
}
