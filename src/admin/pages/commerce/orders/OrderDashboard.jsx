import React from 'react';
import { FiShoppingBag, FiDollarSign, FiClock, FiTruck, FiAlertCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useOrders } from '../../../context/OrderContext';

export default function OrderDashboard() {
  const { orders } = useOrders();

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const processingOrders = orders.filter(o => o.status === 'Processing').length;
  const holdOrders = orders.filter(o => o.status === 'On Hold').length;
  
  const revenue = orders.filter(o => o.paymentStatus === 'Paid').reduce((acc, o) => acc + o.totals.grandTotal, 0);

  const stats = [
    { label: 'Total Orders', value: totalOrders, icon: FiShoppingBag, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Revenue', value: `$\${revenue.toFixed(2)}`, icon: FiDollarSign, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Pending', value: pendingOrders, icon: FiClock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { label: 'Processing', value: processingOrders, icon: FiTruck, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { label: 'On Hold', value: holdOrders, icon: FiAlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Overview of your store's order activity.</p>
        </div>
        <Link to="/admin/orders/list" className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors">
          View All Orders
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center \${stat.bg}`}>
                <stat.icon className={`\${stat.color}`} size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col items-center justify-center min-h-[300px]">
          <h3 className="text-lg font-bold text-gray-900 mb-2 self-start">Order Volume</h3>
          <div className="text-gray-400 text-sm flex flex-col items-center">
            <FiShoppingBag size={48} className="mb-4 opacity-50" />
            <p>Order volume chart placeholder</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
            <Link to="/admin/orders/list" className="text-sm text-blue-600 hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-gray-100">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                <div>
                  <Link to={`/admin/orders/\${order.id}`} className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                    {order.id}
                  </Link>
                  <p className="text-sm text-gray-500">{order.customer.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${order.totals.grandTotal.toFixed(2)}</p>
                  <span className={`text-xs px-2 py-1 rounded-full \${
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'On Hold' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
