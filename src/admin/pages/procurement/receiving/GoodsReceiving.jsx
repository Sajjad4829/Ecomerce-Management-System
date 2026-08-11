import React, { useState } from 'react';
import { useProcurement } from '../../../context/procurement/ProcurementContext';
import { useNavigate } from 'react-router-dom';
import { Search, PackageCheck, AlertCircle, ArrowRight } from 'lucide-react';

export const GoodsReceiving = () => {
  const { purchaseOrders, receiving } = useProcurement();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Find POs that are in a state to be received
  const receivablePOs = purchaseOrders.filter(po => 
    po.status === 'Sent' || po.status === 'Acknowledged' || po.status === 'Partially Received'
  ).filter(po => po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Goods Receiving</h1>
          <p className="text-sm text-neutral-500 mt-1">Process incoming supplier shipments</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Active Shipments Queue */}
        <div className="bg-white rounded-lg border border-neutral-200 shadow-sm flex flex-col">
          <div className="p-5 border-b border-neutral-200">
            <h2 className="font-medium text-neutral-900">Incoming Shipments</h2>
            <p className="text-sm text-neutral-500 mt-1">Select a PO to begin receiving process</p>
          </div>
          <div className="p-4 border-b border-neutral-100">
            <div className="relative">
              <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search PO Number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
          </div>
          <div className="divide-y divide-neutral-200 flex-1 overflow-y-auto max-h-[500px]">
            {receivablePOs.map(po => (
              <div key={po.id} className="p-4 hover:bg-neutral-50 transition-colors flex items-center justify-between group">
                <div>
                  <div className="font-medium text-neutral-900">{po.poNumber}</div>
                  <div className="text-sm text-neutral-500 mt-0.5">Supplier: {po.supplierId} • Dest: {po.warehouseId}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${po.status === 'Partially Received' ? 'bg-indigo-100 text-indigo-800' : 'bg-blue-100 text-blue-800'}`}>
                      {po.status}
                    </span>
                    <span className="text-xs text-neutral-400">Exp: {po.expectedDate}</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigate(`/admin/procurement/purchase-orders/${po.id}`)}
                  className="p-2 text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors opacity-0 group-hover:opacity-100 flex items-center gap-1"
                >
                  Receive <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
            {receivablePOs.length === 0 && (
              <div className="p-8 text-center text-neutral-500">
                <PackageCheck className="w-8 h-8 mx-auto text-neutral-300 mb-2" />
                <p>No incoming shipments found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Receiving Logs */}
        <div className="bg-white rounded-lg border border-neutral-200 shadow-sm flex flex-col">
          <div className="p-5 border-b border-neutral-200">
            <h2 className="font-medium text-neutral-900">Recent Receipts</h2>
            <p className="text-sm text-neutral-500 mt-1">Audit log of processed goods</p>
          </div>
          <div className="divide-y divide-neutral-200 flex-1 overflow-y-auto max-h-[570px]">
            {receiving.map(rec => (
              <div key={rec.id} className="p-4 flex items-start gap-4">
                <div className="mt-1">
                  {rec.status === 'Completed' ? (
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <PackageCheck className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div className="font-medium text-neutral-900">{rec.poNumber}</div>
                    <div className="text-xs text-neutral-500">{rec.date}</div>
                  </div>
                  <div className="text-sm text-neutral-600 mt-1">Received {rec.itemsReceived} items at {rec.warehouseId}</div>
                  <div className="mt-2 inline-flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                    <AlertCircle className="w-3 h-3" />
                    Inventory update requires backend transaction
                  </div>
                </div>
              </div>
            ))}
            {receiving.length === 0 && (
              <div className="p-8 text-center text-neutral-500">
                No recent receipts.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
