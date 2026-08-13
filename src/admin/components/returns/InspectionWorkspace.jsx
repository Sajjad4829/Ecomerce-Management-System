import React, { useState } from 'react';
import { useReturns } from '../../context/ReturnContext';

export default function InspectionWorkspace({ returnReq }) {
  const { updateItemCondition, completeInspection } = useReturns();
  
  // Track inspection state per item
  const [itemInspections, setItemInspections] = useState(
    returnReq.items.reduce((acc, item) => {
      acc[item.id] = {
        condition: item.condition || 'restockable', // 'restockable' | 'damaged' | 'rejected'
        notes: item.inspectionNotes || ''
      };
      return acc;
    }, {})
  );

  const handleConditionChange = (itemId, condition) => {
    setItemInspections(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], condition }
    }));
  };

  const handleNotesChange = (itemId, notes) => {
    setItemInspections(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], notes }
    }));
  };

  const handleComplete = (e) => {
    e.preventDefault();
    
    let totalRefund = 0;

    // Save individual item states
    returnReq.items.forEach(item => {
      const ins = itemInspections[item.id];
      updateItemCondition(returnReq.id, item.id, ins.condition, ins.notes);
      
      // Calculate suggested refund (only if restockable or damaged. Rejected means no refund usually, but we'll say anything not rejected is eligible for refund)
      if (ins.condition !== 'rejected') {
        totalRefund += (item.price * item.quantity);
      }
    });

    completeInspection(returnReq.id, totalRefund);
  };

  if (returnReq.status === 'Inspection Completed' || returnReq.status === 'Approved for Refund' || returnReq.status === 'Refund Processing' || returnReq.status === 'Completed') {
    return (
      <div className="space-y-4">
        <div className="bg-success-soft rounded-lg p-4 border border-green-200">
          <p className="font-bold text-green-900">Inspection Completed</p>
        </div>
        
        <div className="divide-y divide-gray-100">
          {returnReq.items.map(item => (
            <div key={item.id} className="py-4">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-text-primary">{item.name} <span className="text-text-muted">x{item.quantity}</span></p>
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                  item.condition === 'restockable' ? 'bg-green-100 text-green-800' :
                  item.condition === 'damaged' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {item.condition?.toUpperCase() || 'UNKNOWN'}
                </span>
              </div>
              {item.inspectionNotes && (
                <p className="text-xs text-text-secondary mt-2 bg-surface p-2 rounded border border-border">
                  Notes: {item.inspectionNotes}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleComplete} className="space-y-6">
      
      <div className="space-y-6">
        {returnReq.items.map(item => (
          <div key={item.id} className="bg-background p-4 rounded-xl border border-border">
            <h3 className="font-medium text-text-primary mb-1">{item.name} <span className="text-sm text-text-muted">x{item.quantity}</span></h3>
            <p className="text-xs text-text-muted mb-4">Reason: {item.reason}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Decision</label>
                <select 
                  value={itemInspections[item.id].condition}
                  onChange={(e) => handleConditionChange(item.id, e.target.value)}
                  className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] text-sm bg-surface"
                >
                  <option value="restockable">Restockable</option>
                  <option value="damaged">Damaged / Defective</option>
                  <option value="rejected">Reject Return</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Notes</label>
                <input 
                  type="text"
                  value={itemInspections[item.id].notes}
                  onChange={(e) => handleNotesChange(item.id, e.target.value)}
                  className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] text-sm"
                  placeholder="Optional notes..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <button type="submit" className="w-full py-3 bg-[#1A1A1A] text-white rounded-lg text-sm font-bold hover:bg-black transition-colors">
          Submit Inspection Results
        </button>
      </div>
    </form>
  );
}
