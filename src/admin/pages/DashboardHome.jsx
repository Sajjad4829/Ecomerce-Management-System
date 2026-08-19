import { FiDollarSign, FiShoppingBag, FiUsers, FiBox, FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const KPICard = ({ title, value, trend, trendValue, icon: Icon, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
    className="bg-surface p-6 rounded-xl border border-black/5 shadow-sm flex flex-col gap-4"
  >
    <div className="flex justify-between items-start">
      <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center text-text-primary">
        <Icon className="text-xl" />
      </div>
      {trend === 'up' ? (
        <div className="flex items-center gap-1 text-xs font-semibold text-success bg-success-soft px-2 py-1 rounded-md">
          <FiArrowUpRight /> {trendValue}
        </div>
      ) : (
        <div className="flex items-center gap-1 text-xs font-semibold text-danger bg-danger-soft px-2 py-1 rounded-md">
          <FiArrowDownRight /> {trendValue}
        </div>
      )}
    </div>
    <div>
      <div className="text-[10px] uppercase tracking-widest text-text-muted mb-1">{title}</div>
      <div className="text-2xl font-serif font-bold text-text-primary">{value}</div>
    </div>
  </motion.div>
);

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Dashboard Overview</h1>
          <p className="text-sm text-text-muted mt-1">Welcome back. Here is what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-surface border border-black/10 text-xs font-semibold uppercase tracking-widest rounded-lg hover:bg-background transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-widest rounded-lg hover:bg-black/80 transition-colors shadow-lg shadow-black/10">
            Create Order
          </button>
        </div>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Revenue" value="$124,500" trend="up" trendValue="12.5%" icon={FiDollarSign} delay={0.1} />
        <KPICard title="Active Orders" value="84" trend="up" trendValue="5.2%" icon={FiShoppingBag} delay={0.2} />
        <KPICard title="Total Customers" value="1,204" trend="up" trendValue="1.1%" icon={FiUsers} delay={0.3} />
        <KPICard title="Low Stock Items" value="12" trend="down" trendValue="8.4%" icon={FiBox} delay={0.4} />
      </div>

      {/* Placeholder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="lg:col-span-2 bg-surface p-6 rounded-xl border border-black/5 shadow-sm min-h-[400px] flex flex-col"
        >
          <div className="text-[10px] uppercase tracking-widest text-text-muted mb-6">Revenue Analytics</div>
          <div className="flex-1 border-2 border-dashed border-gray-100 rounded-lg flex items-center justify-center bg-background/50">
            <span className="text-sm text-text-muted font-medium">Chart Visualization Placeholder</span>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-surface p-6 rounded-xl border border-black/5 shadow-sm min-h-[400px] flex flex-col"
        >
          <div className="text-[10px] uppercase tracking-widest text-text-muted mb-6">Recent Activity</div>
          <div className="flex-1 space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-4 group cursor-pointer">
                <div className="w-2 h-2 mt-2 rounded-full bg-gray-200 group-hover:bg-[#A69076] transition-colors shrink-0"></div>
                <div>
                  <div className="text-sm font-medium text-text-primary group-hover:text-[#A69076] transition-colors">New Order #104{i}</div>
                  <div className="text-xs text-text-muted mt-1">Placed {i * 2} hours ago</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
