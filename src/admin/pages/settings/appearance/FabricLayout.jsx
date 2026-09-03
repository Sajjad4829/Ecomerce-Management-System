import React, { useState } from 'react';
import { FiBookOpen, FiPlus, FiInfo, FiChevronDown, FiChevronUp, FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

const initialFabrics = [
  { id: 1, title: 'Fabric', subtitle: 'Fabric configuration', color: 'bg-[#2f3336]' },
  { id: 2, title: 'Combination 1', subtitle: '', color: 'bg-[#702a32]' }, 
  { id: 3, title: 'Combination 2', subtitle: '', color: 'bg-[#a35a1f]' }, 
  { id: 4, title: 'Combination 3', subtitle: '', color: 'bg-[#c5bba3]' }, 
  { id: 5, title: 'Combination 4', subtitle: '', color: 'bg-[#234540]' }, 
  { id: 6, title: 'Combination 5', subtitle: '', color: 'bg-[#4a4d51]' }, 
];

const FabricLayout = () => {
  const [fabrics, setFabrics] = useState(initialFabrics);
  const [expandedId, setExpandedId] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', subtitle: '' });

  const handleAdd = () => {
    const newId = fabrics.length > 0 ? Math.max(...fabrics.map(f => f.id)) + 1 : 1;
    const colors = ['bg-[#2f3336]', 'bg-[#702a32]', 'bg-[#a35a1f]', 'bg-[#c5bba3]', 'bg-[#234540]', 'bg-[#4a4d51]'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newFabric = {
      id: newId,
      title: `New Combination ${newId}`,
      subtitle: '',
      color: randomColor
    };
    
    setFabrics([...fabrics, newFabric]);
    setExpandedId(newId);
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    setFabrics(fabrics.filter(f => f.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const startEdit = (fabric, e) => {
    e.stopPropagation();
    setEditingId(fabric.id);
    setEditForm({ title: fabric.title, subtitle: fabric.subtitle });
  };

  const saveEdit = (id, e) => {
    e.stopPropagation();
    setFabrics(fabrics.map(f => f.id === id ? { ...f, title: editForm.title, subtitle: editForm.subtitle } : f));
    setEditingId(null);
  };

  const cancelEdit = (e) => {
    e.stopPropagation();
    setEditingId(null);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f8f9fc] overflow-y-auto">
      {/* Header */}
      <div className="px-6 md:px-10 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-[#8b5cf6] rounded-[14px] flex items-center justify-center text-white shadow-md shadow-purple-500/20 shrink-0">
            <FiBookOpen size={24} />
          </div>
          <div>
            <h2 className="text-[22px] md:text-[24px] font-bold text-[#0f172a] tracking-tight mb-1 leading-none">Fabric</h2>
            <p className="text-[14px] text-[#64748b] max-w-[500px] leading-relaxed">
              Manage and configure your product fabrics. These fabrics will be available for selection in product customization.
            </p>
          </div>
        </div>
        <button 
          onClick={handleAdd}
          className="h-10 px-5 shrink-0 whitespace-nowrap bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm shadow-purple-500/20"
        >
          <FiPlus size={16} />
          Add Fabric
        </button>
      </div>

      {/* Content */}
      <div className="px-6 md:px-10 pb-12">
        <div className="bg-white rounded-[20px] p-4 md:p-6 shadow-sm border border-stone-100">
          <div className="flex flex-col gap-2">
            {fabrics.length === 0 && (
               <div className="text-center py-8 text-stone-400 text-sm font-medium">No fabrics available. Click 'Add Fabric' to create one.</div>
            )}
            
            {fabrics.map((fabric) => {
              const isExpanded = expandedId === fabric.id;
              const isEditing = editingId === fabric.id;
              
              return (
                <div 
                  key={fabric.id}
                  className={`flex flex-col rounded-[12px] transition-all border ${
                    isExpanded 
                      ? 'bg-[#f5f3ff] border-[#8b5cf6]/30 shadow-sm' 
                      : 'bg-[#f8fafc] border-transparent hover:bg-stone-50 hover:border-stone-200'
                  }`}
                >
                  {/* Row Header (Clickable if not editing) */}
                  <div 
                    onClick={() => !isEditing && setExpandedId(isExpanded ? null : fabric.id)}
                    className={`flex items-center justify-between p-3 ${!isEditing ? 'cursor-pointer' : ''}`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-11 h-11 rounded-[10px] shadow-sm border border-black/5 shrink-0 ${fabric.color}`}></div>
                      
                      <div className="flex-1 flex flex-col gap-1 max-w-sm">
                        {isEditing ? (
                          <>
                            <input 
                              type="text" 
                              value={editForm.title} 
                              onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                              className="text-[15px] font-semibold text-[#5b21b6] bg-white border border-purple-200 rounded px-2 py-0.5 outline-none focus:border-purple-400"
                              placeholder="Fabric Name"
                              autoFocus
                            />
                            <input 
                              type="text" 
                              value={editForm.subtitle} 
                              onChange={(e) => setEditForm({...editForm, subtitle: e.target.value})}
                              className="text-[13px] text-[#8b5cf6]/80 font-medium bg-white border border-purple-100 rounded px-2 py-0.5 outline-none focus:border-purple-300"
                              placeholder="Subtitle (Optional)"
                            />
                          </>
                        ) : (
                          <>
                            <h4 className={`font-semibold text-[15px] ${isExpanded ? 'text-[#5b21b6]' : 'text-[#1e293b]'}`}>
                              {fabric.title}
                            </h4>
                            {fabric.subtitle && (
                              <p className="text-[13px] text-[#8b5cf6]/80 font-medium">{fabric.subtitle}</p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    
                    {!isEditing && (
                      <div className="flex items-center gap-3 text-stone-400 mr-1 shrink-0">
                        <button 
                          onClick={(e) => e.stopPropagation()} 
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isExpanded ? 'text-[#8b5cf6]' : 'hover:text-stone-600'}`}
                        >
                          <FiInfo size={18} />
                        </button>
                        {isExpanded ? (
                          <FiChevronUp size={20} className="text-[#8b5cf6]" />
                        ) : (
                          <FiChevronDown size={20} />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Expanded Actions (CRUD) */}
                  {isExpanded && (
                    <div className="px-4 pb-3 pt-2 border-t border-[#8b5cf6]/10 flex justify-end gap-2 animate-in slide-in-from-top-1 fade-in duration-200">
                      {isEditing ? (
                        <>
                          <button 
                            onClick={(e) => cancelEdit(e)}
                            className="px-4 py-1.5 text-[13px] font-semibold text-stone-600 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors flex items-center gap-1.5 shadow-sm"
                          >
                            <FiX size={14} />
                            Cancel
                          </button>
                          <button 
                            onClick={(e) => saveEdit(fabric.id, e)}
                            className="px-4 py-1.5 text-[13px] font-semibold text-white bg-[#8b5cf6] hover:bg-[#7c3aed] border border-transparent rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                          >
                            <FiCheck size={14} />
                            Save
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={(e) => startEdit(fabric, e)}
                            className="px-4 py-1.5 text-[13px] font-semibold text-stone-600 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors flex items-center gap-1.5 shadow-sm"
                          >
                            <FiEdit2 size={14} />
                            Edit
                          </button>
                          <button 
                            onClick={(e) => handleDelete(fabric.id, e)}
                            className="px-4 py-1.5 text-[13px] font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1.5 shadow-sm"
                          >
                            <FiTrash2 size={14} />
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FabricLayout;
