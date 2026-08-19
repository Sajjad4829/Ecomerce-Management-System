import { useState } from 'react';
import { FiSearch, FiFilter, FiPlus, FiMoreVertical, FiMail, FiEdit, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import BulkCustomerBar from '../../components/customers/BulkCustomerBar';
import CustomerStatusBadge from '../../components/customers/CustomerStatusBadge';
import CustomerGroupBadge from '../../components/customers/CustomerGroupBadge';

const MOCK_CUSTOMERS = [
  { id: '1', name: 'Eleanor Vance', email: 'eleanor@example.com', phone: '+1 (555) 123-4567', type: 'Registered', group: 'VIP', orders: 12, totalSpent: '$4,520.00', status: 'Active', joined: '2025-01-15' },
  { id: '2', name: 'Marcus Sterling', email: 'marcus.s@example.com', phone: '+1 (555) 987-6543', type: 'Business', group: 'Trade', orders: 45, totalSpent: '$24,100.00', status: 'Active', joined: '2024-11-02' },
  { id: '3', name: 'Guest User (John Doe)', email: 'john.d@example.com', phone: '-', type: 'Guest', group: 'Retail', orders: 1, totalSpent: '$345.00', status: 'Inactive', joined: '2026-02-14' },
  { id: '4', name: 'Sophia Loren', email: 'sophia@example.com', phone: '+1 (555) 456-7890', type: 'Registered', group: 'Retail', orders: 0, totalSpent: '$0.00', status: 'Active', joined: '2026-03-10' },
  { id: '5', name: 'Architechs Ltd.', email: 'purchasing@architechs.com', phone: '+44 20 7123 4567', type: 'Wholesale', group: 'Wholesale', orders: 8, totalSpent: '$112,400.00', status: 'Suspended', joined: '2025-06-22' },
];

export default function CustomerManager() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  const toggleSelectAll = () => {
    if (selectedCustomers.length === MOCK_CUSTOMERS.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(MOCK_CUSTOMERS.map(c => c.id));
    }
  };

  const toggleSelect = (id) => {
    if (selectedCustomers.includes(id)) {
      setSelectedCustomers(selectedCustomers.filter(cId => cId !== id));
    } else {
      setSelectedCustomers([...selectedCustomers, id]);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/admin/customers" className="text-sm font-medium text-text-muted hover:text-black">Customers</Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-medium text-text-primary">List</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-text-primary mt-2">Customer Manager</h1>
        </div>
        
        <div className="flex gap-3">
          <Link to="/admin/customers/new" className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors shadow-sm flex items-center gap-2">
            <FiPlus size={16} /> Add Customer
          </Link>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden relative">
        {selectedCustomers.length > 0 && (
          <BulkCustomerBar 
            count={selectedCustomers.length} 
            onClear={() => setSelectedCustomers([])} 
          />
        )}

        <div className="p-4 border-b border-black/5 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search by name, email, phone..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-background border-transparent rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/20 focus:ring-1 focus:ring-black/20 w-full"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-surface border border-black/10 text-text-secondary rounded-lg text-sm font-medium hover:bg-background transition-colors flex items-center gap-2 shadow-sm">
              <FiFilter size={16} /> Filters
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background border-b border-black/5">
                <th className="p-4 w-12 text-center">
                  <input 
                    type="checkbox" 
                    checked={selectedCustomers.length === MOCK_CUSTOMERS.length && MOCK_CUSTOMERS.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]"
                  />
                </th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Customer</th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Type & Group</th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Status</th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Commerce</th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Joined</th>
                <th className="p-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {MOCK_CUSTOMERS.map(customer => (
                <tr key={customer.id} className={`hover:bg-background transition-colors ${selectedCustomers.includes(customer.id) ? 'bg-background' : ''}`}>
                  <td className="p-4 text-center">
                    <input 
                      type="checkbox" 
                      checked={selectedCustomers.includes(customer.id)}
                      onChange={() => toggleSelect(customer.id)}
                      className="w-4 h-4 rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]"
                    />
                  </td>
                  <td className="p-4">
                    <Link to={`/admin/customers/${customer.id}`} className="font-bold text-text-primary hover:underline block">
                      {customer.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-text-muted flex items-center gap-1"><FiMail size={10} /> {customer.email}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1.5 items-start">
                      <span className="text-xs font-medium text-text-secondary">{customer.type}</span>
                      <CustomerGroupBadge group={customer.group} />
                    </div>
                  </td>
                  <td className="p-4">
                    <CustomerStatusBadge status={customer.status} />
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-medium text-text-primary">{customer.orders} orders</p>
                    <p className="text-xs text-text-muted">{customer.totalSpent}</p>
                  </td>
                  <td className="p-4 text-sm text-text-muted">
                    {customer.joined}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/customers/${customer.id}/edit`} className="p-2 text-text-muted hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                        <FiEdit size={16} />
                      </Link>
                      <button className="p-2 text-text-muted hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                        <FiMoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
