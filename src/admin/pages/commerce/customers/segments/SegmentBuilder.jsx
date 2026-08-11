import React, { useState } from 'react';
import { FiSave, FiArrowLeft, FiPlus, FiTrash2 } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const ATTRIBUTE_OPTIONS = [
  { group: 'Profile', options: [{ value: 'city', label: 'City' }, { value: 'country', label: 'Country' }, { value: 'customer_group', label: 'Customer Group' }] },
  { group: 'Purchase', options: [{ value: 'order_count', label: 'Order Count' }, { value: 'total_spend', label: 'Total Spend' }, { value: 'days_since_last_order', label: 'Days Since Last Order' }] },
  { group: 'Loyalty', options: [{ value: 'loyalty_tier', label: 'Loyalty Tier' }, { value: 'lifetime_points', label: 'Lifetime Points' }] },
];

const OPERATOR_OPTIONS = {
  string: [{ value: 'equals', label: 'Equals' }, { value: 'contains', label: 'Contains' }],
  number: [{ value: 'equals', label: 'Equals' }, { value: 'greater_than', label: 'Greater Than' }, { value: 'less_than', label: 'Less Than' }],
  list: [{ value: 'in_list', label: 'Is in list' }, { value: 'not_in_list', label: 'Is not in list' }]
};

export default function SegmentBuilder() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Dynamic');
  const [rules, setRules] = useState([
    { id: 'rule_1', attribute: '', operator: '', value: '' }
  ]);

  const addRule = () => {
    setRules([...rules, { id: `rule_${Date.now()}`, attribute: '', operator: '', value: '' }]);
  };

  const removeRule = (id) => {
    setRules(rules.filter(r => r.id !== id));
  };

  const updateRule = (id, field, value) => {
    setRules(rules.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const handleSave = () => {
    // Mock save
    navigate('/admin/customers/segments');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-2">
        <Link to="/admin/customers/segments" className="text-gray-500 hover:text-gray-900">
          <FiArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Segment</h1>
        </div>
        <div className="ml-auto flex gap-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
            <FiSave /> Save Segment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Segment Name</label>
               <input 
                 type="text" 
                 value={name}
                 onChange={e => setName(e.target.value)}
                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]" 
                 placeholder="e.g. VIP Customers"
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
               <textarea 
                 value={description}
                 onChange={e => setDescription(e.target.value)}
                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]" 
                 placeholder="Describe the purpose of this segment..."
                 rows={3}
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">Segment Type</label>
               <div className="flex gap-4">
                 <label className={`flex-1 border rounded-lg p-4 cursor-pointer flex flex-col gap-1 transition-colors ${type === 'Dynamic' ? 'border-[#1A1A1A] bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">Dynamic</span>
                      <input type="radio" name="type" checked={type === 'Dynamic'} onChange={() => setType('Dynamic')} className="text-[#1A1A1A] focus:ring-[#1A1A1A]" />
                    </div>
                    <span className="text-xs text-gray-500">Customers are automatically added and removed based on rules.</span>
                 </label>
                 <label className={`flex-1 border rounded-lg p-4 cursor-pointer flex flex-col gap-1 transition-colors ${type === 'Static' ? 'border-[#1A1A1A] bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">Static</span>
                      <input type="radio" name="type" checked={type === 'Static'} onChange={() => setType('Static')} className="text-[#1A1A1A] focus:ring-[#1A1A1A]" />
                    </div>
                    <span className="text-xs text-gray-500">Customers are manually added. Useful for fixed lists.</span>
                 </label>
               </div>
             </div>
          </div>

          {type === 'Dynamic' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
               <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
                 <h2 className="font-bold text-gray-900">Segment Rules (Customers must match ALL conditions)</h2>
               </div>
               <div className="p-6 space-y-4">
                 {rules.map((rule, idx) => (
                   <div key={rule.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-gray-50 p-4 rounded-lg border border-gray-100">
                     <div className="w-full sm:w-1/3">
                        <select 
                          value={rule.attribute}
                          onChange={e => updateRule(rule.id, 'attribute', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                          <option value="">Select Attribute...</option>
                          {ATTRIBUTE_OPTIONS.map(group => (
                            <optgroup key={group.group} label={group.group}>
                              {group.options.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                     </div>
                     <div className="w-full sm:w-1/4">
                        <select 
                          value={rule.operator}
                          onChange={e => updateRule(rule.id, 'operator', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                          <option value="">Operator...</option>
                          {OPERATOR_OPTIONS.number.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                     </div>
                     <div className="w-full sm:flex-1 flex gap-2 items-center">
                        <input 
                          type="text"
                          value={rule.value}
                          onChange={e => updateRule(rule.id, 'value', e.target.value)}
                          placeholder="Value"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button onClick={() => removeRule(rule.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors" disabled={rules.length === 1}>
                          <FiTrash2 size={16} />
                        </button>
                     </div>
                   </div>
                 ))}
                 
                 <div className="pt-2">
                   <button onClick={addRule} className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                     <FiPlus size={16} /> Add Condition
                   </button>
                 </div>
               </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1 space-y-6">
           <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-sm p-6 text-white sticky top-6">
             <h3 className="font-bold text-lg mb-4">Preview Estimate</h3>
             {type === 'Static' ? (
                <p className="text-sm text-gray-400">Static segments do not have real-time estimates. You will add customers manually after saving.</p>
             ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-4xl font-bold text-blue-400 mb-1">~0</p>
                    <p className="text-sm text-gray-400">Estimated Customers</p>
                  </div>
                  <div className="pt-4 border-t border-gray-800">
                    <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-semibold">Sample Matches</p>
                    <div className="space-y-3">
                       <p className="text-sm text-gray-400 italic">Configure rules to see samples.</p>
                    </div>
                  </div>
                </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}
