import { FiShoppingBag, FiExternalLink } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';

export default function CustomerOrderHistory() {
  const { id } = useParams();
  const { orders } = useOrders();

  // In a real app we'd filter by customer ID properly. We are using a mock customer '1'.
  // For demonstration, just use the first order from the list or all orders.
  const customerOrders = orders.filter(o => o.customer.id === id || id === '1');

  return (
    <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-black/5 flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#1A1A1A] flex items-center gap-2">
          <FiShoppingBag className="text-gray-400" /> Order History
        </h3>
        <Link to="/admin/orders/list" className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
          View All Orders
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-black/5">
              <th className="px-6 py-3 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Order</th>
              <th className="px-6 py-3 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Items</th>
              <th className="px-6 py-3 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {customerOrders.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No orders found for this customer.
                </td>
              </tr>
            )}
            {customerOrders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-[#1A1A1A]">{order.id}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{order.items.reduce((acc, i) => acc + i.quantity, 0)} items</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-[#1A1A1A]">${order.totals.grandTotal.toFixed(2)}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                    order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/admin/orders/${order.id}`} className="inline-flex items-center justify-center text-gray-400 hover:text-[#1A1A1A]">
                    <FiExternalLink size={14} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
