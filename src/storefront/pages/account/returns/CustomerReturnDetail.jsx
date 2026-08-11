import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useReturns } from '../../../../admin/context/ReturnContext';
import { FiArrowLeft, FiBox, FiCheckCircle, FiTruck, FiClock, FiSearch } from 'react-icons/fi';

export default function CustomerReturnDetail() {
  const { id } = useParams();
  const { getReturn } = useReturns();
  const ret = getReturn(id);

  if (!ret) {
    return <div className="p-8 text-center text-gray-500">Return not found.</div>;
  }

  // Filter out internal timeline events if needed, but for now we'll show customer visible ones.
  const timelineEvents = [...ret.timeline].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const getIcon = (status) => {
    switch (status) {
      case 'Requested': return <FiClock size={16} />;
      case 'Approved': case 'Completed': return <FiCheckCircle size={16} />;
      case 'Pickup Scheduled': case 'In Transit': case 'Received': return <FiTruck size={16} />;
      case 'Inspection Pending': case 'Inspection Completed': return <FiSearch size={16} />;
      default: return <FiClock size={16} />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <Link to="/account/returns" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1A1A1A] mb-4 transition-colors">
          <FiArrowLeft /> Back to Returns
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">Return {ret.id}</h2>
            <p className="text-sm text-gray-500 mt-1">Requested on {new Date(ret.createdAt).toLocaleDateString()}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-bold tracking-wide uppercase ${
            ret.status === 'Completed' ? 'bg-green-100 text-green-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {ret.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden">
            <div className="px-6 py-4 border-b border-black/5 bg-gray-50">
              <h3 className="font-bold text-[#1A1A1A]">Returned Items</h3>
            </div>
            <div className="divide-y divide-black/5">
              {ret.items.map(item => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <p className="font-bold text-[#1A1A1A]">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-sm text-gray-500 uppercase font-semibold">Reason</p>
                    <p className="text-sm font-medium text-[#1A1A1A] mt-1">{item.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {ret.pickup && (
            <div className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden">
               <div className="px-6 py-4 border-b border-black/5 bg-gray-50 flex items-center gap-2">
                 <FiTruck className="text-gray-500" />
                 <h3 className="font-bold text-[#1A1A1A]">Pickup Logistics</h3>
               </div>
               <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <p className="text-sm text-gray-500 uppercase font-semibold">Scheduled Date</p>
                   <p className="font-medium text-[#1A1A1A] mt-1">{new Date(ret.pickup.scheduledDate).toLocaleDateString()}</p>
                 </div>
                 <div>
                   <p className="text-sm text-gray-500 uppercase font-semibold">Status</p>
                   <p className="font-medium text-[#1A1A1A] mt-1">{ret.pickup.status}</p>
                 </div>
                 <div className="md:col-span-2">
                   <p className="text-sm text-gray-500 uppercase font-semibold">Pickup Address</p>
                   <p className="text-[#1A1A1A] mt-1">{ret.pickup.address}</p>
                 </div>
               </div>
            </div>
          )}

           {ret.resolution === 'Refund Pending' && (
             <div className="bg-blue-50 rounded-xl border border-blue-100 p-6 flex items-start gap-4">
               <FiCheckCircle className="text-blue-600 mt-1" size={24} />
               <div>
                 <h3 className="text-lg font-bold text-blue-900">Refund in Progress</h3>
                 <p className="text-blue-800 mt-1">We've received your item and are processing your refund to your original payment method. Please allow 3-5 business days for it to appear.</p>
               </div>
             </div>
           )}

        </div>

        {/* Sidebar Timeline */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-black/5 p-6">
            <h3 className="font-bold text-[#1A1A1A] mb-6">Updates</h3>
            <div className="space-y-6">
              {timelineEvents.map((ev, i) => {
                const isLatest = i === 0;
                return (
                  <div key={ev.id} className="relative pl-8">
                     {i !== timelineEvents.length - 1 && (
                        <div className="absolute top-8 left-[15px] bottom-[-24px] w-0.5 bg-gray-200" />
                     )}
                     <div className={`absolute top-1 left-0 w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                        isLatest ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-300 bg-white text-gray-400'
                     }`}>
                       {getIcon(ev.status)}
                     </div>
                     <div>
                        <p className={`font-bold ${isLatest ? 'text-[#1A1A1A]' : 'text-gray-600'}`}>{ev.status}</p>
                        <p className="text-sm text-gray-500 mt-1">{new Date(ev.timestamp).toLocaleString()}</p>
                     </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
