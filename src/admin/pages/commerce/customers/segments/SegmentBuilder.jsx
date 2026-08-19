import React, { useState } from 'react';
import { FiSave, FiArrowLeft, FiPlus, FiTrash2, FiLayers } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useCustomers } from '../../../../context/customers/CustomerContext';

const ATTRIBUTE_OPTIONS = [
  { group: 'Profile', options: [{ value: 'city', label: 'City' }, { value: 'country', label: 'Country' }, { value: 'customer_group', label: 'Customer Group' }, { value: 'tags', label: 'Customer Tags' }] },
  { group: 'Purchase Behavior', options: [{ value: 'orderCount', label: 'Total Orders' }, { value: 'lifetimeValue', label: 'Total Net Spend' }, { value: 'days_since_last_order', label: 'Days Since Last Order' }, { value: 'return_rate', label: 'Return Rate' }] },
  { group: 'Loyalty', options: [{ value: 'loyaltyTier', label: 'Loyalty Tier' }, { value: 'points', label: 'Available Points' }] },
];

const OPERATOR_OPTIONS = [
  { value: 'equals', label: 'Equals' }, 
  { value: 'not_equals', label: 'Not Equals' },
  { value: 'greater_than', label: 'Greater Than (>)' }, 
  { value: 'less_than', label: 'Less Than (<)' },
  { value: 'greater_than_or_equal', label: 'Greater or Equal (>=)' },
  { value: 'less_than_or_equal', label: 'Less or Equal (<=)' },
  { value: 'contains', label: 'Contains' }
];

export default function SegmentBuilder() {
  const { segments, addSegment } = useCustomers();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Dynamic');
  
  // A premium rule builder supports rule groups (AND/OR logic at the top level)
  const [ruleGroups, setRuleGroups] = useState([
    {
      id: 'group_1',
      matchType: 'AND', // Customers must match ALL rules in this group
      rules: [{ id: 'rule_1', attribute: '', operator: 'equals', value: '' }]
    }
  ]);

  const addRuleGroup = () => {
    setRuleGroups([...ruleGroups, {
      id: `group_${Date.now()}`,
      matchType: 'AND',
      rules: [{ id: `rule_${Date.now()}`, attribute: '', operator: 'equals', value: '' }]
    }]);
  };

  const removeRuleGroup = (groupId) => {
    setRuleGroups(ruleGroups.filter(g => g.id !== groupId));
  };

  const updateGroupMatch = (groupId, matchType) => {
    setRuleGroups(ruleGroups.map(g => g.id === groupId ? { ...g, matchType } : g));
  };

  const addRuleToGroup = (groupId) => {
    setRuleGroups(ruleGroups.map(g => {
      if (g.id === groupId) {
        return { ...g, rules: [...g.rules, { id: `rule_${Date.now()}`, attribute: '', operator: 'equals', value: '' }] };
      }
      return g;
    }));
  };

  const removeRuleFromGroup = (groupId, ruleId) => {
    setRuleGroups(ruleGroups.map(g => {
      if (g.id === groupId) {
        return { ...g, rules: g.rules.filter(r => r.id !== ruleId) };
      }
      return g;
    }));
  };

  const updateRule = (groupId, ruleId, field, value) => {
    setRuleGroups(ruleGroups.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          rules: g.rules.map(r => r.id === ruleId ? { ...r, [field]: value } : r)
        };
      }
      return g;
    }));
  };

  const handleSave = () => {
    // Flatten rules for the simplified backend context if needed, or pass full groups
    const flatRules = ruleGroups.flatMap(g => g.rules);
    addSegment({
      name,
      description,
      type,
      rules: flatRules // Storing flat rules for the mock context to evaluate
    });
    navigate('/admin/customers/segments');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-2">
        <Link to="/admin/customers/segments" className="text-text-muted hover:text-text-primary">
          <FiArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-serif text-text-primary">Create Segment</h1>
        </div>
        <div className="ml-auto flex gap-3">
          <Link to="/admin/customers/segments" className="px-4 py-2 border border-border-hover text-text-secondary rounded-lg text-sm font-medium hover:bg-background transition-colors">
            Cancel
          </Link>
          <button onClick={handleSave} className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
            <FiSave /> Save Segment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6 space-y-5">
             <div>
               <label className="block text-sm font-medium text-text-secondary mb-1">Segment Name</label>
               <input 
                 type="text" 
                 value={name}
                 onChange={e => setName(e.target.value)}
                 className="w-full px-4 py-2 bg-background border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                 placeholder="e.g. High Value VIP Customers"
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-text-secondary mb-1">Description</label>
               <textarea 
                 value={description}
                 onChange={e => setDescription(e.target.value)}
                 className="w-full px-4 py-2 bg-background border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                 placeholder="Describe the purpose of this segment..."
                 rows={2}
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-text-secondary mb-2">Segment Type</label>
               <div className="flex flex-col sm:flex-row gap-4">
                 <label className={`flex-1 border rounded-lg p-4 cursor-pointer flex flex-col gap-1 transition-colors ${type === 'Dynamic' ? 'border-[#1A1A1A] bg-background' : 'border-border hover:border-border-hover'}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-text-primary">Dynamic Segment</span>
                      <input type="radio" name="type" checked={type === 'Dynamic'} onChange={() => setType('Dynamic')} className="text-text-primary focus:ring-[#1A1A1A]" />
                    </div>
                    <span className="text-xs text-text-muted mt-1">Customers are automatically added and removed as their data changes to match the rules.</span>
                 </label>
                 <label className={`flex-1 border rounded-lg p-4 cursor-pointer flex flex-col gap-1 transition-colors ${type === 'Static' ? 'border-[#1A1A1A] bg-background' : 'border-border hover:border-border-hover'}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-text-primary">Static List</span>
                      <input type="radio" name="type" checked={type === 'Static'} onChange={() => setType('Static')} className="text-text-primary focus:ring-[#1A1A1A]" />
                    </div>
                    <span className="text-xs text-text-muted mt-1">Fixed list of customers. Rules are only evaluated once upon creation.</span>
                 </label>
               </div>
             </div>
          </div>

          {type === 'Dynamic' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FiLayers className="text-text-muted" />
                <h2 className="text-lg font-serif text-text-primary">Segmentation Rules</h2>
              </div>
              
              {ruleGroups.map((group, groupIndex) => (
                <div key={group.id} className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-border bg-background/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-text-secondary">Customers must match</span>
                      <select 
                        value={group.matchType} 
                        onChange={(e) => updateGroupMatch(group.id, e.target.value)}
                        className="bg-white border border-border-hover rounded-md text-sm px-2 py-1 font-bold text-text-primary focus:outline-none"
                      >
                        <option value="AND">ALL</option>
                        <option value="OR">ANY</option>
                      </select>
                      <span className="text-sm font-medium text-text-secondary">of the following:</span>
                    </div>
                    {ruleGroups.length > 1 && (
                      <button onClick={() => removeRuleGroup(group.id)} className="text-xs font-medium text-danger hover:text-red-700 transition-colors">
                        Remove Group
                      </button>
                    )}
                  </div>
                  
                  <div className="p-5 space-y-3">
                    {group.rules.map((rule, idx) => (
                      <div key={rule.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        <div className="w-full sm:w-1/3">
                          <select 
                            value={rule.attribute}
                            onChange={e => updateRule(group.id, rule.id, 'attribute', e.target.value)}
                            className="w-full px-3 py-2 bg-background border border-border-hover rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          >
                            <option value="">Select criteria...</option>
                            {ATTRIBUTE_OPTIONS.map(optGroup => (
                              <optgroup key={optGroup.group} label={optGroup.group}>
                                {optGroup.options.map(opt => (
                                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                              </optgroup>
                            ))}
                          </select>
                        </div>
                        <div className="w-full sm:w-1/4">
                          <select 
                            value={rule.operator}
                            onChange={e => updateRule(group.id, rule.id, 'operator', e.target.value)}
                            className="w-full px-3 py-2 bg-background border border-border-hover rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          >
                            {OPERATOR_OPTIONS.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                        <div className="w-full sm:flex-1 flex gap-2 items-center">
                          <input 
                            type="text"
                            value={rule.value}
                            onChange={e => updateRule(group.id, rule.id, 'value', e.target.value)}
                            placeholder="Value"
                            className="w-full px-3 py-2 bg-background border border-border-hover rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          />
                          <button onClick={() => removeRuleFromGroup(group.id, rule.id)} className="p-2 text-text-muted hover:text-danger hover:bg-danger-soft rounded-lg transition-colors" disabled={group.rules.length === 1}>
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="pt-3">
                      <button onClick={() => addRuleToGroup(group.id)} className="text-sm font-medium text-[#1A1A1A] hover:text-black flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-neutral-100 transition-colors">
                        <FiPlus size={14} /> Add Condition
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex items-center justify-center py-4 relative">
                 <div className="absolute inset-0 flex items-center">
                   <div className="w-full border-t border-border-hover border-dashed"></div>
                 </div>
                 <div className="relative bg-[#fafafa] px-4">
                    <button onClick={addRuleGroup} className="text-sm font-medium text-text-secondary hover:text-text-primary flex items-center gap-2 px-4 py-2 border border-border-hover rounded-full bg-white shadow-sm hover:shadow transition-all">
                      <FiPlus size={14} /> OR add another rule group
                    </button>
                 </div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1 space-y-6">
           <div className="bg-[#1A1A1A] rounded-xl border border-gray-800 shadow-xl p-6 text-white sticky top-6">
             <h3 className="font-serif text-lg mb-4 text-gray-100">Live Estimate</h3>
             {type === 'Static' ? (
                <p className="text-sm text-gray-400">Static segments do not estimate real-time matches. Customers are manually enrolled.</p>
             ) : (
                <div className="space-y-6">
                  <div>
                    <p className="text-4xl font-light text-white mb-1">~0</p>
                    <p className="text-sm text-gray-400">Matching Customers</p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-800">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Matched Sample</p>
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    </div>
                    <div className="space-y-3">
                       <p className="text-sm text-gray-500 italic">Configure rules to preview matching customers from your database.</p>
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
