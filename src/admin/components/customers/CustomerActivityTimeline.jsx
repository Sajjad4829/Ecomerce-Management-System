import { FiActivity, FiShoppingBag, FiUser, FiMapPin, FiStar } from 'react-icons/fi';

const MOCK_ACTIVITY = [
  { id: '1', type: 'order', text: 'Placed order #ORD-8492', date: '2 hours ago', icon: FiShoppingBag, color: 'bg-blue-100 text-blue-600' },
  { id: '2', type: 'review', text: 'Reviewed Oasis Lounge Chair (5 stars)', date: '1 day ago', icon: FiStar, color: 'bg-amber-100 text-amber-600' },
  { id: '3', type: 'address', text: 'Added new shipping address', date: '1 week ago', icon: FiMapPin, color: 'bg-gray-100 text-gray-600' },
  { id: '4', type: 'account', text: 'Account created', date: 'Jan 15, 2025', icon: FiUser, color: 'bg-green-100 text-green-600' },
];

export default function CustomerActivityTimeline() {
  return (
    <div className="bg-white rounded-xl border border-black/5 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <FiActivity className="text-gray-400" />
        <h3 className="text-sm font-bold text-[#1A1A1A]">Activity Timeline</h3>
      </div>

      <div className="relative border-l border-gray-200 ml-3 space-y-6">
        {MOCK_ACTIVITY.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="relative pl-6">
              <div className={`absolute -left-3.5 top-0.5 w-7 h-7 rounded-full flex items-center justify-center border-4 border-white ${item.color}`}>
                <Icon size={12} />
              </div>
              <div>
                <p className="text-sm font-medium text-[#1A1A1A]">{item.text}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
