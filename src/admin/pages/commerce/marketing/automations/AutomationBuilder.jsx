import React, { useState } from 'react';
import { FiSave, FiArrowLeft, FiPlus, FiZap, FiSettings, FiClock, FiTrash2, FiPlay, FiBell, FiUserPlus, FiUserMinus } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const TRIGGERS = [
  { id: 'customer_created', label: 'Customer Account Created' },
  { id: 'order_completed', label: 'Order Completed' },
  { id: 'cart_abandoned', label: 'Cart Abandoned (Mock)' },
  { id: 'loyalty_tier_upgraded', label: 'Loyalty Tier Upgraded' },
];

export default function AutomationBuilder() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [trigger, setTrigger] = useState('customer_created');
  
  const [nodes, setNodes] = useState([
    { id: 'node_1', type: 'trigger', data: { event: 'customer_created' } },
    { id: 'node_2', type: 'wait', data: { duration: '1', unit: 'days' } },
    { id: 'node_3', type: 'action', data: { actionType: 'send_notification', templateId: '' } }
  ]);

  const addNode = (type) => {
    setNodes([...nodes, { id: `node_${Date.now()}`, type, data: {} }]);
  };

  const removeNode = (id) => {
    setNodes(nodes.filter(n => n.id !== id));
  };

  const handleSave = () => {
    navigate('/admin/marketing/automations');
  };

  const renderNode = (node, index) => {
    const isFirst = index === 0;
    const isLast = index === nodes.length - 1;

    return (
      <div key={node.id} className="relative flex flex-col items-center">
        {/* Connection Line Top */}
        {!isFirst && <div className="w-px h-8 bg-gray-300"></div>}
        
        {/* Node Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 w-full max-w-lg relative group">
           {!isFirst && (
             <button onClick={() => removeNode(node.id)} className="absolute -right-3 -top-3 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
               <FiTrash2 size={14} />
             </button>
           )}

           {node.type === 'trigger' && (
             <div>
                <div className="flex items-center gap-2 mb-3 text-purple-600 font-bold text-sm uppercase tracking-wider">
                  <FiZap /> Trigger
                </div>
                <select 
                  value={trigger}
                  onChange={e => setTrigger(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 font-medium"
                >
                  {TRIGGERS.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
             </div>
           )}

           {node.type === 'wait' && (
             <div>
                <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold text-sm uppercase tracking-wider">
                  <FiClock /> Wait
                </div>
                <div className="flex gap-2">
                   <input type="number" defaultValue="1" className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                   <select className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm">
                     <option>Minutes</option>
                     <option>Hours</option>
                     <option selected>Days</option>
                     <option>Weeks</option>
                   </select>
                </div>
             </div>
           )}

           {node.type === 'action' && (
             <div>
                <div className="flex items-center gap-2 mb-3 text-green-600 font-bold text-sm uppercase tracking-wider">
                  <FiPlay /> Action
                </div>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-3">
                   <option value="send_notification">Send Notification (Email/SMS)</option>
                   <option value="add_to_segment">Add to Static Segment</option>
                   <option value="add_loyalty_points">Add Loyalty Points</option>
                </select>
                <div className="p-3 bg-gray-50 rounded border border-gray-100">
                  <p className="text-xs text-gray-500 font-medium mb-2">Configuration</p>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white">
                    <option>Select Template...</option>
                    <option>Welcome Email Template</option>
                    <option>Abandoned Cart Template</option>
                  </select>
                </div>
             </div>
           )}

           {node.type === 'condition' && (
             <div>
                <div className="flex items-center gap-2 mb-3 text-orange-600 font-bold text-sm uppercase tracking-wider">
                  <FiSettings /> Condition
                </div>
                <div className="p-3 bg-gray-50 rounded border border-gray-100">
                  <p className="text-xs text-gray-500 font-medium mb-2">Check Rule</p>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white mb-2">
                    <option>Has purchased before</option>
                    <option>Is in Segment</option>
                    <option>Loyalty Tier is...</option>
                  </select>
                </div>
             </div>
           )}
        </div>

        {/* Connection Line Bottom & Add Button */}
        <div className="w-px h-8 bg-gray-300"></div>
        <div className="relative group/add">
           <button className="w-8 h-8 bg-white border border-gray-300 text-gray-500 rounded-full flex items-center justify-center hover:bg-gray-50 hover:text-gray-900 shadow-sm z-10 relative">
             <FiPlus />
           </button>
           <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white border border-gray-200 shadow-lg rounded-xl p-2 w-48 opacity-0 invisible group-hover/add:opacity-100 group-hover/add:visible transition-all z-20 flex flex-col gap-1">
             <button onClick={() => addNode('wait')} className="text-left px-3 py-2 hover:bg-gray-50 rounded text-sm font-medium flex items-center gap-2 text-blue-600"><FiClock /> Wait</button>
             <button onClick={() => addNode('condition')} className="text-left px-3 py-2 hover:bg-gray-50 rounded text-sm font-medium flex items-center gap-2 text-orange-600"><FiSettings /> Condition</button>
             <button onClick={() => addNode('action')} className="text-left px-3 py-2 hover:bg-gray-50 rounded text-sm font-medium flex items-center gap-2 text-green-600"><FiPlay /> Action</button>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 bg-gray-50 z-30 py-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Link to="/admin/marketing/automations" className="text-gray-500 hover:text-gray-900">
            <FiArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create Automation</h1>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            Save as Draft
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
            <FiSave /> Activate
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 mt-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Automation Name</label>
          <input 
            type="text" 
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] font-bold text-lg" 
            placeholder="e.g. Welcome Series"
          />
        </div>

        {/* Visual Flow Builder */}
        <div className="flex flex-col items-center py-8">
           {nodes.map((node, idx) => renderNode(node, idx))}
           
           <div className="w-px h-8 bg-gray-300"></div>
           <div className="bg-gray-100 border border-gray-200 text-gray-500 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider">
             End of Automation
           </div>
        </div>
      </div>
    </div>
  );
}
