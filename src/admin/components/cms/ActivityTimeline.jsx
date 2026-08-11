import { motion } from 'framer-motion';

const MOCK_ACTIVITIES = [
  { id: 1, action: 'Published Page', target: 'About Us V2', time: '10 minutes ago', type: 'publish' },
  { id: 2, action: 'Updated Section', target: 'Hero Fall Collection', time: '1 hour ago', type: 'update' },
  { id: 3, action: 'Created Menu', target: 'Footer Legal Links', time: '3 hours ago', type: 'create' },
  { id: 4, action: 'Uploaded Media', target: 'sofa-lifestyle-01.jpg', time: '5 hours ago', type: 'media' },
  { id: 5, action: 'Deleted Template', target: 'Old Product Layout', time: '1 day ago', type: 'delete' },
];

export default function ActivityTimeline() {
  return (
    <div className="bg-white border border-black/5 rounded-xl p-6 shadow-sm">
      <h3 className="text-[10px] uppercase tracking-widest text-gray-500 mb-6">Recent Activity</h3>
      
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-black/5 before:to-transparent">
        {MOCK_ACTIVITIES.map((activity, index) => {
          let dotColor = 'bg-gray-300';
          if (activity.type === 'publish') dotColor = 'bg-green-400';
          if (activity.type === 'update') dotColor = 'bg-blue-400';
          if (activity.type === 'create') dotColor = 'bg-purple-400';
          if (activity.type === 'delete') dotColor = 'bg-red-400';

          return (
            <motion.div 
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              {/* Icon */}
              <div className={`flex items-center justify-center w-6 h-6 rounded-full border-4 border-white ${dotColor} shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10`}></div>
              
              {/* Card */}
              <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] bg-[#F7F5F2] p-4 rounded-lg border border-black/5 hover:border-black/10 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#1A1A1A]">{activity.action}</span>
                  <span className="text-[10px] text-gray-500 font-medium">{activity.time}</span>
                </div>
                <div className="text-sm text-gray-600 font-serif italic">{activity.target}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <button className="w-full mt-6 py-3 border border-black/10 rounded-lg text-xs font-semibold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-colors">
        View All Activity
      </button>
    </div>
  );
}
