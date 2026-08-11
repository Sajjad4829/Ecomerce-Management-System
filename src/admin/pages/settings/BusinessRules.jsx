import React, { useState } from 'react';
import { FiPlus, FiZap, FiTrash2, FiEdit2, FiCheck, FiX } from 'react-icons/fi';
import { SettingsSection, SettingsCard } from '../../components/settings/SettingsShared';

const initialRules = [
  { id: 'rule-1', name: 'Low Stock Alert', event: 'Inventory Level Changed', conditions: [{ field: 'Stock', operator: 'LessThan', value: '5' }], actions: [{ type: 'Notify', target: 'Admin' }], status: 'Active' },
  { id: 'rule-2', name: 'High Value Order Tag', event: 'Order Created', conditions: [{ field: 'Order Total', operator: 'GreaterThan', value: '5000' }], actions: [{ type: 'Add Tag', target: 'VIP' }], status: 'Active' }
];

export function BusinessRules() {
  const [rules, setRules] = useState(initialRules);
  const [isBuilding, setIsBuilding] = useState(false);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Business Rules</h1>
          <p className="text-sm text-text-muted">Automate actions based on store events and conditions.</p>
        </div>
        {!isBuilding && (
          <button onClick={() => setIsBuilding(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors">
            <FiPlus /> Create Rule
          </button>
        )}
      </div>

      {isBuilding ? (
        <RuleBuilder onSave={(newRule) => {
          setRules([...rules, { ...newRule, id: `rule-${Date.now()}` }]);
          setIsBuilding(false);
        }} onCancel={() => setIsBuilding(false)} />
      ) : (
        <div className="bg-surface rounded-xl shadow-sm border border-border overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-background border-b border-border text-xs font-bold text-text-muted uppercase tracking-widest">
                <th className="px-6 py-4">Rule Name</th>
                <th className="px-6 py-4">Trigger Event</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {rules.map(rule => (
                <tr key={rule.id} className="hover:bg-background transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-medium text-text-primary">
                      <FiZap className="text-amber-500" /> {rule.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{rule.event}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-md ${rule.status === 'Active' ? 'bg-success-soft text-success' : 'bg-stone-100 text-text-secondary'}`}>
                      {rule.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-text-muted hover:text-text-primary transition-colors"><FiEdit2 /></button>
                    <button onClick={() => setRules(rules.filter(r => r.id !== rule.id))} className="p-2 text-text-muted hover:text-danger transition-colors"><FiTrash2 /></button>
                  </td>
                </tr>
              ))}
              {rules.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-text-muted">
                    No business rules configured.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function RuleBuilder({ onSave, onCancel }) {
  const [ruleName, setRuleName] = useState('');
  const [event, setEvent] = useState('Order Created');
  const [conditions, setConditions] = useState([{ field: 'Order Total', operator: 'GreaterThan', value: '' }]);
  const [actions, setActions] = useState([{ type: 'Notify', target: 'Admin' }]);

  const handleSave = () => {
    if (!ruleName) return alert('Please provide a rule name.');
    onSave({ name: ruleName, event, conditions, actions, status: 'Active' });
  };

  return (
    <div className="bg-surface rounded-xl shadow-sm border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border bg-background flex items-center justify-between">
        <h3 className="font-bold text-text-primary">Rule Builder</h3>
        <button onClick={onCancel} className="text-text-muted hover:text-text-primary"><FiX /></button>
      </div>
      
      <div className="p-6 space-y-8">
        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">Rule Name</label>
          <input type="text" value={ruleName} onChange={e => setRuleName(e.target.value)} placeholder="e.g. High Value Order Alert" className="w-full max-w-md p-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
        </div>

        <div className="bg-background border border-border rounded-lg p-5">
          <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3">When (Trigger)</div>
          <select value={event} onChange={e => setEvent(e.target.value)} className="w-full max-w-md p-2.5 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-primary">
            <option>Order Created</option>
            <option>Order Status Changed</option>
            <option>Inventory Level Changed</option>
            <option>Customer Created</option>
          </select>
        </div>

        <div className="bg-background border border-border rounded-lg p-5">
          <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3">If (Condition)</div>
          {conditions.map((cond, idx) => (
            <div key={idx} className="flex gap-3 mb-3">
              <select value={cond.field} onChange={e => {
                const newC = [...conditions]; newC[idx].field = e.target.value; setConditions(newC);
              }} className="flex-1 p-2.5 bg-surface border border-border rounded-lg text-sm">
                <option>Order Total</option>
                <option>Stock</option>
                <option>Customer Tags</option>
              </select>
              <select value={cond.operator} onChange={e => {
                const newC = [...conditions]; newC[idx].operator = e.target.value; setConditions(newC);
              }} className="flex-1 p-2.5 bg-surface border border-border rounded-lg text-sm">
                <option value="GreaterThan">Is Greater Than</option>
                <option value="LessThan">Is Less Than</option>
                <option value="Equals">Equals</option>
                <option value="Contains">Contains</option>
              </select>
              <input type="text" value={cond.value} onChange={e => {
                const newC = [...conditions]; newC[idx].value = e.target.value; setConditions(newC);
              }} placeholder="Value" className="flex-1 p-2.5 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
            </div>
          ))}
          <button className="text-sm font-medium text-text-secondary hover:text-text-primary mt-2">+ Add Condition</button>
        </div>

        <div className="bg-background border border-border rounded-lg p-5">
          <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3">Then (Action)</div>
          {actions.map((act, idx) => (
            <div key={idx} className="flex gap-3 mb-3">
              <select value={act.type} onChange={e => {
                const newA = [...actions]; newA[idx].type = e.target.value; setActions(newA);
              }} className="flex-1 p-2.5 bg-surface border border-border rounded-lg text-sm">
                <option>Notify</option>
                <option>Add Tag</option>
                <option>Update Status</option>
              </select>
              <input type="text" value={act.target} onChange={e => {
                const newA = [...actions]; newA[idx].target = e.target.value; setActions(newA);
              }} placeholder="Target (e.g. Admin Email, Tag Name)" className="flex-[2] p-2.5 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
            </div>
          ))}
          <button className="text-sm font-medium text-text-secondary hover:text-text-primary mt-2">+ Add Action</button>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-border bg-background flex items-center justify-end gap-3">
        <button onClick={onCancel} className="px-4 py-2 text-text-secondary font-medium text-sm hover:text-text-primary">Cancel</button>
        <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors">
          <FiCheck /> Save Rule
        </button>
      </div>
    </div>
  );
}
