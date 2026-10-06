import React, { useState, useRef, useEffect } from 'react';
import { useAnalytics } from '../context/AnalyticsContext';
import { 
  Calendar, Package, Users, ShoppingBag, DollarSign, 
  ArrowUpRight, ArrowDownRight, ChevronDown, RefreshCw, ChevronLeft, ChevronRight
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ComposedChart, Bar, Line, Legend, PieChart, Pie, Cell
} from 'recharts';

const generateSparkline = (trendStr, dataArray = null, dataKey = 'value') => {
  if (dataArray && dataArray.length > 0) {
    return dataArray.map(item => ({ value: item[dataKey] || 0 }));
  }
  return Array.from({ length: 12 }, (_, i) => ({
    value: trendStr === 'up' ? 20 + i * 2 + Math.random() * 15 : 40 - i * 2 + Math.random() * 15
  }));
};


const KPICard = ({ title, value, trend, trendValue, icon: Icon, colorHex, chartData }) => {
  const data = generateSparkline(trend, chartData?.data, chartData?.key);
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

const DateSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState('Last 30 Days');
  const [customDates, setCustomDates] = useState([null, null]); // [start, end]
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const dropdownRef = useRef(null);

  // Helper to format date
  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Dynamically calculate the displayed date string based on the selection
  const getDisplayDate = () => {
    if (selectedRange === 'Custom Range...') {
      if (customDates[0] && customDates[1]) {
        return `${formatDate(customDates[0])} - ${formatDate(customDates[1])}`;
      } else if (customDates[0]) {
        return `${formatDate(customDates[0])} - Select End Date`;
      }
      return 'Select Date Range';
    }

    const today = new Date();
    
    if (selectedRange === 'Today') return formatDate(today);
    if (selectedRange === 'Yesterday') {
      const y = new Date(today);
      y.setDate(y.getDate() - 1);
      return formatDate(y);
    }
    if (selectedRange === 'Last 7 Days') {
      const past = new Date(today);
      past.setDate(past.getDate() - 7);
      return `${formatDate(past)} - ${formatDate(today)}`;
    }
    if (selectedRange === 'Last 30 Days') {
      const past = new Date(today);
      past.setDate(past.getDate() - 30);
      return `${formatDate(past)} - ${formatDate(today)}`;
    }
    if (selectedRange === 'This Month') {
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      return `${formatDate(firstDay)} - ${formatDate(today)}`;
    }
    if (selectedRange === 'Last Month') {
      const firstDay = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const lastDay = new Date(today.getFullYear(), today.getMonth(), 0);
      return `${formatDate(firstDay)} - ${formatDate(lastDay)}`;
    }
    return selectedRange;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        if (!customDates[0] || !customDates[1]) {
          setShowCalendar(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [customDates]);

  const ranges = ['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Month', 'Last Month', 'Custom Range...'];

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const padding = Array.from({ length: firstDayOfMonth }, (_, i) => null);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (!customDates[0] || (customDates[0] && customDates[1])) {
      // Start new selection
      setCustomDates([clickedDate, null]);
    } else {
      // Complete selection
      if (clickedDate < customDates[0]) {
        setCustomDates([clickedDate, customDates[0]]);
      } else {
        setCustomDates([customDates[0], clickedDate]);
      }
      setTimeout(() => setIsOpen(false), 300);
    }
  };

  const isSelected = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return (
      (customDates[0] && date.getTime() === customDates[0].getTime()) ||
      (customDates[1] && date.getTime() === customDates[1].getTime())
    );
  };

  const isInRange = (day) => {
    if (!customDates[0] || !customDates[1]) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date > customDates[0] && date < customDates[1];
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-surface border border-black/5 rounded-lg shadow-sm text-sm font-medium text-text-primary hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <Calendar size={16} className="text-text-muted" />
        {getDisplayDate()}
        <ChevronDown size={16} className={`text-text-muted ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-surface border border-black/5 rounded-xl shadow-xl z-50 overflow-hidden flex flex-col md:flex-row">
          <div className="w-56 py-2 border-b md:border-b-0 md:border-r border-black/5">
            {ranges.map((range) => (
              <button
                key={range}
                onClick={() => {
                  setSelectedRange(range);
                  if (range === 'Custom Range...') {
                    setShowCalendar(true);
                  } else {
                    setShowCalendar(false);
                    setIsOpen(false);
                  }
                }}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  selectedRange === range 
                    ? 'bg-blue-50 text-blue-600 font-medium' 
                    : 'text-text-primary hover:bg-black/5'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {showCalendar && (
            <div className="p-5 w-72 bg-surface">
              <div className="flex justify-between items-center mb-4">
                <button 
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} 
                  className="p-1.5 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-[15px] font-bold text-text-primary">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </span>
                <button 
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} 
                  className="p-1.5 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="text-xs font-bold text-text-muted/70 py-1">{day}</div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-y-1 text-center">
                {padding.map((_, i) => <div key={`pad-${i}`} />)}
                {days.map(day => {
                  const selected = isSelected(day);
                  const inRange = isInRange(day);
                  return (
                    <div key={day} className="relative py-0.5">
                      {inRange && <div className="absolute inset-0 bg-blue-50"></div>}
                      <button 
                        onClick={() => handleDateClick(day)}
                        className={`relative w-8 h-8 mx-auto flex items-center justify-center text-sm rounded-full transition-colors z-10 ${
                          selected 
                            ? 'bg-blue-600 text-white font-bold shadow-md' 
                            : inRange
                              ? 'text-blue-800 font-medium hover:bg-blue-100'
                              : 'text-text-primary hover:bg-black/5 hover:bg-black/5'
                        }`}
                      >
                        {day}
                      </button>
                    </div>
                  );
                })}
              </div>
              
              {customDates[0] && !customDates[1] && (
                <div className="mt-4 text-xs text-center text-text-muted animate-pulse">
                  Select end date
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const PeriodSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Last 30 Days');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const periods = ['Last 7 Days', 'Last 30 Days', 'This Year'];

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm font-medium text-text-secondary bg-background px-3 py-1.5 rounded-md border border-black/5 hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        {selected} <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-surface border border-black/5 rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="py-1">
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => {
                  setSelected(period);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  selected === period 
                    ? 'bg-blue-50 text-blue-600 font-medium' 
                    : 'text-text-primary hover:bg-black/5'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function DashboardHome() {
  const { service } = useAnalytics();
  const overview = service.getOverviewMetrics();
  const salesMetrics = service.getSalesMetrics();
  const productMetrics = service.getProductMetrics();
  const customerMetrics = service.getCustomerMetrics();
  const recentOrdersDynamic = service.getRecentOrders(5);
  const trendData = salesMetrics.trend;
  
  // Create color palette for categories
  const colorPalette = ['#3B82F6', '#8B5CF6', '#F59E0B', '#10B981', '#EC4899'];
  const categoryMetrics = service.getCategoryMetrics ? service.getCategoryMetrics().all.map((c, i) => ({
    name: c.name,
    value: c.revenue,
    color: colorPalette[i % colorPalette.length]
  })) : [];
  return (
    <div className="space-y-6 pb-8">
      {/* Date Picker Header */}
      <div className="flex justify-end">
        <DateSelector />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard 
          title="Total Sales" 
          value={service.formatCurrency(overview.revenue.current)} 
          trend={overview.revenue.trend >= 0 ? 'up' : 'down'} 
          trendValue={`${Math.abs(overview.revenue.trend).toFixed(1)}%`} 
          icon={Calendar} 
          colorHex="#8B5CF6" 
          chartData={{ data: trendData, key: 'revenue' }}
        />
        <KPICard 
          title="Orders" 
          value={overview.orders.current.toLocaleString()} 
          trend={overview.orders.trend >= 0 ? 'up' : 'down'} 
          trendValue={`${Math.abs(overview.orders.trend).toFixed(1)}%`} 
          icon={Package} 
          colorHex="#10B981" 
          chartData={{ data: trendData, key: 'orders' }}
        />
        <KPICard 
          title="Customers" 
          value={overview.customers.current.toLocaleString()} 
          trend={overview.customers.trend >= 0 ? 'up' : 'down'} 
          trendValue={`${Math.abs(overview.customers.trend).toFixed(1)}%`} 
          icon={Users} 
          colorHex="#3B82F6" 
          chartData={{ data: trendData, key: 'orders' }} // using orders proxy for trend
        />
        <KPICard 
          title="Average Order Value" 
          value={service.formatCurrency(overview.aov.current)} 
          trend={overview.aov.trend >= 0 ? 'up' : 'down'} 
          trendValue={`${Math.abs(overview.aov.trend).toFixed(1)}%`} 
          icon={ShoppingBag} 
          colorHex="#F59E0B" 
        />
        <KPICard 
          title="Total Profit" 
          value={service.formatCurrency(overview.netRevenue.current)} 
          trend={overview.netRevenue.trend >= 0 ? 'up' : 'down'} 
          trendValue={`${Math.abs(overview.netRevenue.trend).toFixed(1)}%`} 
          icon={DollarSign} 
          colorHex="#EC4899" 
          chartData={{ data: trendData, key: 'revenue' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Overview */}
        <div className="lg:col-span-2 bg-surface p-6 rounded-xl border border-black/5 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-text-primary">Sales Overview</h2>
            <PeriodSelector />
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
              <ComposedChart data={trendData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7F2" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#7C849F' }} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#7C849F' }} tickFormatter={(val) => val === 0 ? '$0' : `$${(val/1000).toFixed(1)}k`} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#7C849F' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}
                  cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                  formatter={(value, name) => name === 'revenue' ? service.formatCurrency(value) : value}
                  labelStyle={{ fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}
                />
                <Bar yAxisId="left" dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={32} />
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
            {productMetrics.bestSellersUnits.slice(0, 5).map((product, index) => {
              const displayPrice = product.units > 0 ? service.formatCurrency(product.revenue / product.units) : '$0.00';
              const initials = product.name.substring(0, 2).toUpperCase();
              const imgUrl = `https://ui-avatars.com/api/?name=${initials}&background=f1f5f9&color=64748b`;
              return (
                <div key={product.id} className="flex items-center gap-4 group">
                  <span className="text-sm font-bold text-text-muted w-4">{index + 1}</span>
                  <img src={imgUrl} alt={product.name} className="w-10 h-10 rounded-lg object-cover bg-background" />
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-text-primary group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-1" title={product.name}>{product.name}</h3>
                    <p className="text-xs font-medium text-text-muted mt-0.5">{displayPrice}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-text-primary">{product.units}</div>
                    <div className="text-[11px] text-text-muted">Sold</div>
                  </div>
                </div>
              );
            })}
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
                {recentOrdersDynamic.map((order) => {
                  const statusColors = {
                    delivered: 'text-emerald-700 bg-emerald-100',
                    completed: 'text-emerald-700 bg-emerald-100',
                    processing: 'text-blue-700 bg-blue-100',
                    pending: 'text-blue-700 bg-blue-100',
                    shipped: 'text-amber-700 bg-amber-100',
                    cancelled: 'text-rose-700 bg-rose-100',
                    returned: 'text-rose-700 bg-rose-100'
                  };
                  const color = statusColors[order.status.toLowerCase()] || 'text-slate-700 bg-slate-100';
                  const custName = order.customerName || 'Guest';
                  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(custName)}&background=f1f5f9&color=64748b`;
                  const dateStr = new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

                  return (
                    <tr key={order.id} className="border-b border-black/5 last:border-0 hover:bg-black/[0.02] transition-colors">
                      <td className="py-3">
                        <img src={avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full bg-background" />
                      </td>
                      <td className="py-3 font-medium text-text-primary whitespace-nowrap px-2">{order.id}</td>
                      <td className="py-3 text-text-secondary whitespace-nowrap px-2">{custName}</td>
                      <td className="py-3 font-bold text-text-primary px-2">{service.formatCurrency(order.total)}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-md capitalize ${color}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 text-text-muted text-xs text-right whitespace-nowrap">{dateStr}</td>
                    </tr>
                  );
                })}
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
                  data={categoryMetrics}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryMetrics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs font-medium text-text-muted">Total</span>
              <span className="text-[15px] font-bold text-text-primary">{service.formatCurrency(overview.revenue.current)}</span>
            </div>
          </div>
          <div className="w-full mt-4 flex flex-col gap-2.5">
            {categoryMetrics.map((category, index) => {
              const percentage = overview.revenue.current > 0 
                ? ((category.value / overview.revenue.current) * 100).toFixed(1) 
                : 0;
              return (
                <div key={index} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: category.color }}></div>
                    <span className="font-medium text-text-secondary">{category.name}</span>
                  </div>
                  <span className="font-bold text-text-primary">{percentage}%</span>
                </div>
              );
            })}
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
                <div className="text-2xl font-bold text-text-primary mb-1">{customerMetrics.newCustomers.toLocaleString()}</div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users size={24} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-text-muted mb-1">Returning Customers</div>
                <div className="text-2xl font-bold text-text-primary mb-1">{customerMetrics.returningCustomers.toLocaleString()}</div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <RefreshCw size={24} />
              </div>
            </div>

            <div className="mt-auto pt-5 border-t border-black/5 flex justify-between items-center">
              <span className="text-sm font-bold text-text-secondary">Total Customers</span>
              <span className="text-lg font-bold text-text-primary">{customerMetrics.totalCustomers.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

