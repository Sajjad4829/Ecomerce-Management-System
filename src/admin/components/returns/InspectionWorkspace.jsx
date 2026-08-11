import React, { useState } from 'react';
import { useReturns } from '../../context/ReturnContext';

export default function InspectionWorkspace({ returnReq }) {
  const { completeInspection } = useReturns();
  const [condition, setCondition] = useState('Like New');
  const [notes, setNotes] = useState('');
  
  const [checklist, setChecklist] = useState({
    packaging: false,
    surface: false,
    structural: false,
    accessories: false
  });

  const handleComplete = (e) => {
    e.preventDefault();
    completeInspection(returnReq.id, {
      condition,
      notes,
      checklist,
      inspectedAt: new Date().toISOString()
    });
  };

  if (returnReq.inspection) {
    return (
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold">Assessed Condition</p>
            <p className="font-bold text-gray-900 mt-1">{returnReq.inspection.condition}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase font-semibold">Inspected On</p>
            <p className="font-medium text-gray-900 mt-1">{new Date(returnReq.inspection.inspectedAt).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Checklist Findings</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Packaging Intact: {returnReq.inspection.checklist.packaging ? 'Yes' : 'No'}</li>
            <li>Surface Damage: {returnReq.inspection.checklist.surface ? 'Yes' : 'No'}</li>
            <li>Structural Damage: {returnReq.inspection.checklist.structural ? 'Yes' : 'No'}</li>
            <li>All Accessories Present: {returnReq.inspection.checklist.accessories ? 'Yes' : 'No'}</li>
          </ul>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Inspector Notes</p>
          <p className="text-sm text-gray-600 bg-white p-3 border border-gray-200 rounded-lg">{returnReq.inspection.notes || 'No notes provided.'}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleComplete} className="space-y-6">
      
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-700">Inspection Checklist</p>
        <label className="flex items-center gap-3">
          <input type="checkbox" checked={checklist.packaging} onChange={e => setChecklist(prev => ({...prev, packaging: e.target.checked}))} className="rounded border-gray-300" />
          <span className="text-sm text-gray-900">Original packaging is intact</span>
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" checked={checklist.surface} onChange={e => setChecklist(prev => ({...prev, surface: e.target.checked}))} className="rounded border-gray-300" />
          <span className="text-sm text-gray-900">Surface damage (scratches, dents) detected</span>
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" checked={checklist.structural} onChange={e => setChecklist(prev => ({...prev, structural: e.target.checked}))} className="rounded border-gray-300" />
          <span className="text-sm text-gray-900">Structural damage or defect detected</span>
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" checked={checklist.accessories} onChange={e => setChecklist(prev => ({...prev, accessories: e.target.checked}))} className="rounded border-gray-300" />
          <span className="text-sm text-gray-900">All accessories and manuals are present</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Overall Condition</label>
        <select 
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] text-sm bg-white"
        >
          <option>New / Unopened</option>
          <option>Like New</option>
          <option>Used / Good</option>
          <option>Damaged</option>
          <option>Severely Damaged</option>
          <option>Defective</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Inspector Notes</label>
        <textarea 
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] text-sm"
          rows="3"
          placeholder="Detailed notes on the condition..."
        />
      </div>

      <div>
        <button type="submit" className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors">
          Complete Inspection
        </button>
      </div>
    </form>
  );
}
