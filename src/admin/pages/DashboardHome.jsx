import React from 'react';
import { 
  Calendar, Package, Users, ShoppingBag, DollarSign, 
  ArrowUpRight, ArrowDownRight, ChevronDown, RefreshCw 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ComposedChart, Bar, Line, Legend, PieChart, Pie, Cell
} from 'recharts';

const generateSparkline = (trend) => {
  return Array.from({ length: 12 }, (_, i) => ({
    value: trend === 'up' ? 20 + i * 2 + Math.random() * 15 : 40 - i * 2 + Math.random() * 15
  }));
};

const salesOverviewData = [
  { name: 'May 12', sales: 15, orders: 30 },
  { name: 'May 19', sales: 25, orders: 45 },
  { name: 'May 26', sales: 45, orders: 75 },
  { name: 'Jun 2', sales: 30, orders: 50 },
  { name: 'Jun 9', sales: 55, orders: 85 },
];

const categoryData = [
  { name: 'Electronics', value: 35, color: '#3B82F6' },
  { name: 'Fashion', value: 25, color: '#8B5CF6' },
  { name: 'Home & Living', value: 20, color: '#F59E0B' },
  { name: 'Beauty', value: 10, color: '#10B981' },
  { name: 'Sports', value: 10, color: '#EC4899' },
];

const topProducts = [
  { id: 1, name: 'Wireless Headphones', price: '$3,248.75', sold: 432, img: 'https://ui-avatars.com/api/?name=WH&background=f1f5f9&color=64748b' },
  { id: 2, name: 'Smart Watch', price: '$2,987.50', sold: 365, img: 'https://ui-avatars.com/api/?name=SW&background=f1f5f9&color=64748b' },
  { id: 3, name: 'Backpack', price: '$2,450.00', sold: 280, img: 'https://ui-avatars.com/api/?name=BP&background=f1f5f9&color=64748b' },
  { id: 4, name: 'Running Shoes', price: '$2,123.40', sold: 220, img: 'https://ui-avatars.com/api/?name=RS&background=f1f5f9&color=64748b' },
  { id: 5, name: 'Sunglasses', price: '$1,987.60', sold: 210, img: 'https://ui-avatars.com/api/?name=SG&background=f1f5f9&color=64748b' },
];

const recentOrders = [
  { id: '#ORD-00125', customer: 'James Smith', total: '$159.99', status: 'Delivered', time: '2 min ago', statusColor: 'text-emerald-700 bg-emerald-100', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '#ORD-00124', customer: 'Maria Garcia', total: '$89.50', status: 'Processing', time: '15 min ago', statusColor: 'text-blue-700 bg-blue-100', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '#ORD-00123', customer: 'David Johnson', total: '$129.00', status: 'Shipped', time: '45 min ago', statusColor: 'text-amber-700 bg-amber-100', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '#ORD-00122', customer: 'Sarah Williams', total: '$199.99', status: 'Delivered', time: '1 hour ago', statusColor: 'text-emerald-700 bg-emerald-100', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: '#ORD-00121', customer: 'Michael Brown', total: '$99.49', status: 'Cancelled', time: '2 hours ago', statusColor: 'text-rose-700 bg-rose-100', avatar: 'https://i.pravatar.cc/150?u=5' },
];

const KPICard = ({ title, value, trend, trendValue, icon: Icon, colorHex }) => {
  const data = generateSparkline(trend);
  const isUp = trend === 'up';
  
  return (
    <div className="bg-surface p-5 rounded-xl border border-black/5 shadow-sm flex flex-col justify-between">
      <div className="flex items-start gap-4 mb-2">
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" 
          style={{ backgroundColor: `${colorHex}15`, color: colorHex }}
        >
          <Icon size={20} />
        </div>
        <div className="flex-1">
          <div className="text-[13px] font-medium text-text-muted mb-1">{title}</div>
          <div className="text-xl font-bold text-text-primary tracking-tight">{value}</div>
        </div>
      </div>
      
      <div className="flex items-center gap-1 text-[11px] mb-4">
        {isUp ? (
          <span className="text-emerald-500 font-medium flex items-center"><ArrowUpRight size={14} className="mr-0.5"/> {trendValue}</span>
        ) : (
          <span className="text-rose-500 font-medium flex items-center"><ArrowDownRight size={14} className="mr-0.5"/> {trendValue}</span>
        )}
        <span className="text-text-muted">vs last 30 days</span>
      </div>
      
      <div className="h-10 w-full mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`color-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colorHex} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={colorHex} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={colorHex} 
              fillOpacity={1} 
              fill={`url(#color-${title.replace(/\s+/g, '')})`} 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default function DashboardHome() {
  return (
    <div className="space-y-6 pb-8">
      {/* Date Picker Header */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-black/5 rounded-lg shadow-sm text-sm font-medium text-text-primary hover:bg-black/5 transition-colors">
          <Calendar size={16} className="text-text-muted" />
          May 12, 2024 - Jun 12, 2024
          <ChevronDown size={16} className="text-text-muted ml-2" />
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard title="Total Sales" value="$ 45,231.89" trend="up" trendValue="12.5%" icon={Calendar} colorHex="#8B5CF6" />
        <KPICard title="Orders" value="1,234" trend="up" trendValue="8.3%" icon={Package} colorHex="#10B981" />
        <KPICard title="Customers" value="8,654" trend="up" trendValue="15.7%" icon={Users} colorHex="#3B82F6" />
        <KPICard title="Average Order Value" value="$ 36.72" trend="down" trendValue="3.2%" icon={ShoppingBag} colorHex="#F59E0B" />
        <KPICard title="Total Profit" value="$ 12,425.65" trend="up" trendValue="10.1%" icon={DollarSign} colorHex="#EC4899" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Overview */}
        <div className="lg:col-span-2 bg-surface p-6 rounded-xl border border-black/5 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-text-primary">Sales Overview</h2>
            <button className="flex items-center gap-1 text-sm font-medium text-text-secondary bg-background px-3 py-1.5 rounded-md border border-black/5 hover:bg-black/5 transition-colors">
              Last 30 Days <ChevronDown size={14} />
            </button>
          </div>
          
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-500"></div>
              <span className="text-xs font-medium text-text-muted">Total Sales</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-purple-500"></div>
              <span className="text-xs font-medium text-text-muted">Total Orders</span>
            </div>
          </div>

          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={salesOverviewData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7F2" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#7C849F' }} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#7C849F' }} tickFormatter={(val) => val === 0 ? '$0' : `$${val}k`} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#7C849F' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}
                  cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                />
                <Bar yAxisId="left" dataKey="sales" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={32} />
                <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 4, fill: '#fff', stroke: '#8B5CF6', strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-surface p-6 rounded-xl border border-black/5 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-text-primary">Top Selling Products</h2>
            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</a>
          </div>
          <div className="flex flex-col gap-5 flex-1">
            {topProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-4 group">
                <span className="text-sm font-bold text-text-muted w-4">{product.id}</span>
                <img src={product.img} alt={product.name} className="w-10 h-10 rounded-lg object-cover bg-background" />
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-text-primary group-hover:text-blue-600 transition-colors cursor-pointer">{product.name}</h3>
                  <p className="text-xs font-medium text-text-muted mt-0.5">{product.price}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-text-primary">{product.sold}</div>
                  <div className="text-[11px] text-text-muted">Sold</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-surface p-6 rounded-xl border border-black/5 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-text-primary">Recent Orders</h2>
            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={index} className="border-b border-black/5 last:border-0 hover:bg-black/[0.02] transition-colors">
                    <td className="py-3">
                      <img src={order.avatar} alt="Avatar" className="w-8 h-8 rounded-full bg-background" />
                    </td>
                    <td className="py-3 font-medium text-text-primary whitespace-nowrap px-2">{order.id}</td>
                    <td className="py-3 text-text-secondary whitespace-nowrap px-2">{order.customer}</td>
                    <td className="py-3 font-bold text-text-primary px-2">{order.total}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-md ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 text-text-muted text-xs text-right whitespace-nowrap">{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sales by Category */}
        <div className="bg-surface p-6 rounded-xl border border-black/5 shadow-sm flex flex-col items-center">
          <h2 className="text-lg font-bold text-text-primary w-full text-left mb-2">Sales by Category</h2>
          <div className="relative w-48 h-48 my-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs font-medium text-text-muted">Total</span>
              <span className="text-[15px] font-bold text-text-primary">$45,231.89</span>
            </div>
          </div>
          <div className="w-full mt-4 flex flex-col gap-2.5">
            {categoryData.map((category, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: category.color }}></div>
                  <span className="font-medium text-text-secondary">{category.name}</span>
                </div>
                <span className="font-bold text-text-primary">{category.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Overview */}
        <div className="bg-surface p-6 rounded-xl border border-black/5 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-text-primary">Customer Overview</h2>
            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</a>
          </div>
          
          <div className="flex flex-col gap-6 flex-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-text-muted mb-1">New Customers</div>
                <div className="text-2xl font-bold text-text-primary mb-1">1,245</div>
                <div className="text-[11px] text-emerald-500 font-medium flex items-center">
                  <ArrowUpRight size={14} className="mr-0.5"/> 18.2% <span className="text-text-muted ml-1">vs last 30 days</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users size={24} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-text-muted mb-1">Returning Customers</div>
                <div className="text-2xl font-bold text-text-primary mb-1">3,456</div>
                <div className="text-[11px] text-emerald-500 font-medium flex items-center">
                  <ArrowUpRight size={14} className="mr-0.5"/> 12.5% <span className="text-text-muted ml-1">vs last 30 days</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <RefreshCw size={24} />
              </div>
            </div>

            <div className="mt-auto pt-5 border-t border-black/5 flex justify-between items-center">
              <span className="text-sm font-bold text-text-secondary">Total Customers</span>
              <span className="text-lg font-bold text-text-primary">8,654</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

