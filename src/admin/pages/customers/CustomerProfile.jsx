import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Mail, Phone, Calendar, Clock, MapPin, Flag, Plus, Edit2, Trash2, CheckCircle, CreditCard, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { useCustomers } from '../../context/customers/CustomerContext';
import { useFinance } from '../../context/finance/FinanceContext';
import { useOrders } from '../../context/orders/OrderContext';
import { useLoyalty } from '../../context/LoyaltyContext';

export function CustomerProfile() {
  const { customer } = useOutletContext();
  const { addAddress, updateAddress, deleteAddress, segments } = useCustomers();
  const { transactions } = useFinance();
  const { orders } = useOrders();
  const { getLoyaltyAccount, tiers } = useLoyalty();

  const loyaltyAccount = getLoyaltyAccount(customer?.id);
  const currentTier = tiers.find(t => t.id === loyaltyAccount?.tierId) || tiers[0];
  const nextTierIndex = tiers.findIndex(t => t.id === currentTier?.id) + 1;
  const nextTier = nextTierIndex < tiers.length ? tiers[nextTierIndex] : null;
  const progressToNext = nextTier ? Math.min(100, Math.round((loyaltyAccount?.lifetimeEarned || 0) / nextTier.minSpend * 100)) : 100;

  const customerSegments = segments.filter(s => customer?.segmentIds?.includes(s.id));

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const initialAddressForm = {
    type: 'billing',
    name: '',
    address: '',
    city: '',
    region: '',
    postalCode: '',
    country: 'USA',
    isDefault: false
  };

  const [addressForm, setAddressForm] = useState(initialAddressForm);

  // Compute financial stats based on Orders and Transactions context
  const stats = useMemo(() => {
    if (!customer) return null;
    
    // Find all orders for this customer
    // The OrderContext has mock orders. We'll use them or fallback to customer.orderCount
    const customerOrders = orders.filter(o => o.customerId === customer.id || o.customer?.email === customer.email);
    const orderCount = customerOrders.length > 0 ? customerOrders.length : customer.orderCount;
    
    // Using transaction context
    const customerTxns = transactions.filter(t => 
      t.customer === `${customer.firstName} ${customer.lastName}` || 
      t.orderId === `ORD-${customer.id}` // Approximation for matching mocks
    );
    
    let grossPaid = 0;
    let refunded = 0;
    
    customerTxns.forEach(t => {
      if (t.status === 'Completed') {
        if (t.type === 'Payment') grossPaid += t.amount;
        if (t.type === 'Refund') refunded += t.amount;
      }
    });
    
    const netSpent = grossPaid - refunded;
    const aov = orderCount > 0 ? netSpent / orderCount : 0;
    
    // Fallback to customer LTV if txns not found (due to mock mismatch)
    const displayNet = netSpent > 0 ? netSpent : customer.lifetimeValue;
    const displayGross = grossPaid > 0 ? grossPaid : customer.lifetimeValue;
    const displayAov = aov > 0 ? aov : (orderCount > 0 ? customer.lifetimeValue / orderCount : 0);
    const displayRefunded = refunded;

    return {
      orderCount,
      grossPaid: displayGross,
      refunded: displayRefunded,
      netSpent: displayNet,
      aov: displayAov
    };
  }, [customer, orders, transactions]);

  const handleOpenAddressModal = (address = null) => {
    if (address) {
      setEditingAddress(address);
      setAddressForm(address);
    } else {
      setEditingAddress(null);
      setAddressForm(initialAddressForm);
    }
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = () => {
    if (editingAddress) {
      updateAddress(customer.id, editingAddress.id, addressForm);
    } else {
      addAddress(customer.id, addressForm);
    }
    setIsAddressModalOpen(false);
  };

  const handleDeleteAddress = (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      deleteAddress(customer.id, id);
    }
  };

  const handleSetDefault = (id, type) => {
    updateAddress(customer.id, id, { isDefault: true, type });
  };

  if (!customer) return null;

  return (
    <div className="space-y-8 max-w-5xl">
      
      {/* Loyalty & Segments Banner */}
      <section className="bg-[#1A1A1A] rounded-xl p-6 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 border border-gray-800">
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none"></div>
         
         <div className="relative z-10 flex-1">
            <div className="flex flex-wrap gap-2 mb-3">
              {customerSegments.map(seg => (
                 <span key={seg.id} className="px-2.5 py-1 bg-white/10 text-white border border-white/20 rounded-md text-xs font-medium tracking-wide">
                   {seg.name}
                 </span>
              ))}
              {customerSegments.length === 0 && (
                 <span className="px-2.5 py-1 bg-white/5 text-gray-400 border border-white/10 rounded-md text-xs font-medium tracking-wide">
                   No Segments
                 </span>
              )}
            </div>
            <h3 className="text-xl font-serif text-white flex items-center gap-2">
               <span className="bg-gradient-to-r from-yellow-300 to-yellow-600 bg-clip-text text-transparent font-bold">
                 {currentTier?.name || 'Member'} Tier
               </span>
               <span className="text-gray-400 text-sm font-sans font-normal ml-2">
                 {loyaltyAccount?.availablePoints?.toLocaleString() || 0} Available Points
               </span>
            </h3>
         </div>

         <div className="relative z-10 w-full md:w-1/3">
            {nextTier ? (
               <div className="space-y-2">
                 <div className="flex justify-between text-xs text-gray-300 font-medium">
                   <span>{loyaltyAccount?.lifetimeEarned?.toLocaleString() || 0} pts</span>
                   <span>{nextTier.minSpend.toLocaleString()} pts to {nextTier.name}</span>
                 </div>
                 <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-1000" 
                     style={{ width: `${progressToNext}%` }}
                   ></div>
                 </div>
               </div>
            ) : (
               <div className="flex justify-end items-center h-full text-yellow-500 font-medium text-sm">
                  ★ Highest Tier Reached
               </div>
            )}
         </div>
      </section>

      {/* Financial Summary */}
      <section>
        <h3 className="text-lg font-serif text-neutral-900 mb-4 border-b border-neutral-200 pb-2">Financial Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-neutral-50 p-4 rounded-md border border-neutral-200">
            <div className="flex items-center text-neutral-500 mb-1">
              <ShoppingBag className="w-4 h-4 mr-1.5" />
              <span className="text-xs font-medium uppercase tracking-wider">Total Orders</span>
            </div>
            <p className="text-xl font-semibold text-neutral-900">{stats.orderCount}</p>
          </div>
          <div className="bg-neutral-50 p-4 rounded-md border border-neutral-200">
            <div className="flex items-center text-neutral-500 mb-1">
              <CreditCard className="w-4 h-4 mr-1.5" />
              <span className="text-xs font-medium uppercase tracking-wider">Gross Spent</span>
            </div>
            <p className="text-xl font-semibold text-neutral-900">৳{stats.grossPaid.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
          </div>
          <div className="bg-neutral-50 p-4 rounded-md border border-neutral-200">
            <div className="flex items-center text-neutral-500 mb-1">
              <ArrowUpRight className="w-4 h-4 mr-1.5 text-error" />
              <span className="text-xs font-medium uppercase tracking-wider">Refunded</span>
            </div>
            <p className="text-xl font-semibold text-error">৳{stats.refunded.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
          </div>
          <div className="bg-success-soft p-4 rounded-md border border-success/20">
            <div className="flex items-center text-success mb-1">
              <CheckCircle className="w-4 h-4 mr-1.5" />
              <span className="text-xs font-medium uppercase tracking-wider">Net Spent</span>
            </div>
            <p className="text-xl font-semibold text-success-700">৳{stats.netSpent.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
          </div>
          <div className="bg-neutral-50 p-4 rounded-md border border-neutral-200">
            <div className="flex items-center text-neutral-500 mb-1">
              <ShoppingBag className="w-4 h-4 mr-1.5" />
              <span className="text-xs font-medium uppercase tracking-wider">AOV</span>
            </div>
            <p className="text-xl font-semibold text-neutral-900">৳{stats.aov.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <h3 className="text-lg font-serif text-neutral-900 mb-4 border-b border-neutral-200 pb-2">Contact Information</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-3 bg-white p-3 border border-neutral-200 rounded-md">
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs text-neutral-500">Email Address</p>
                <p className="text-sm font-medium text-neutral-900">{customer.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white p-3 border border-neutral-200 rounded-md">
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs text-neutral-500">Phone Number</p>
                <p className="text-sm font-medium text-neutral-900">{customer.phone || 'Not provided'}</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-serif text-neutral-900 mb-4 border-b border-neutral-200 pb-2">Account Details</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-3 bg-white p-3 border border-neutral-200 rounded-md">
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs text-neutral-500">Joined Date</p>
                <p className="text-sm font-medium text-neutral-900">{new Date(customer.joinedAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white p-3 border border-neutral-200 rounded-md">
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs text-neutral-500">Last Activity</p>
                <p className="text-sm font-medium text-neutral-900">{new Date(customer.lastActivityAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4 border-b border-neutral-200 pb-2">
          <h3 className="text-lg font-serif text-neutral-900">Addresses</h3>
          <button 
            onClick={() => handleOpenAddressModal()}
            className="flex items-center text-sm text-primary font-medium hover:text-indigo-800"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Address
          </button>
        </div>
        
        {customer.addresses && customer.addresses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customer.addresses.map(addr => (
              <div key={addr.id} className="border border-neutral-200 rounded-md p-4 bg-white hover:border-indigo-300 transition-colors group">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{addr.type}</span>
                    {addr.isDefault && (
                      <span className="text-[10px] font-medium bg-neutral-900 text-white px-2 py-0.5 rounded uppercase tracking-wider">Default</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!addr.isDefault && (
                      <button 
                        onClick={() => handleSetDefault(addr.id, addr.type)}
                        title="Set as Default" 
                        className="p-1 text-neutral-400 hover:text-indigo-600 hover:bg-indigo-50 rounded"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button 
                      onClick={() => handleOpenAddressModal(addr)}
                      className="p-1 text-neutral-400 hover:text-indigo-600 hover:bg-indigo-50 rounded"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteAddress(addr.id)}
                      className="p-1 text-neutral-400 hover:text-error hover:bg-error-soft rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm font-medium text-neutral-900">{addr.name}</p>
                <div className="text-sm text-neutral-600 mt-2 space-y-1">
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 text-neutral-400 mr-2 mt-0.5 shrink-0" />
                    <span>{addr.address}<br/>{addr.city}, {addr.region} {addr.postalCode}</span>
                  </div>
                  <div className="flex items-center">
                    <Flag className="w-4 h-4 text-neutral-400 mr-2 shrink-0" />
                    <span>{addr.country}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 border border-dashed border-neutral-300 rounded-md bg-neutral-50 text-neutral-500 text-sm">
            No addresses on file. <button onClick={() => handleOpenAddressModal()} className="text-primary hover:underline">Add one now</button>.
          </div>
        )}
      </section>

      {/* Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 bg-neutral-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
              <h3 className="text-lg font-serif">{editingAddress ? 'Edit Address' : 'Add Address'}</h3>
              <button onClick={() => setIsAddressModalOpen(false)} className="text-neutral-400 hover:text-neutral-600">&times;</button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Address Type</label>
                <select 
                  value={addressForm.type}
                  onChange={(e) => setAddressForm({...addressForm, type: e.target.value})}
                  className="w-full p-2 border border-neutral-300 rounded-md text-sm"
                >
                  <option value="shipping">Shipping</option>
                  <option value="billing">Billing</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={addressForm.name}
                  onChange={(e) => setAddressForm({...addressForm, name: e.target.value})}
                  className="w-full p-2 border border-neutral-300 rounded-md text-sm" 
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Street Address</label>
                <input 
                  type="text" 
                  value={addressForm.address}
                  onChange={(e) => setAddressForm({...addressForm, address: e.target.value})}
                  className="w-full p-2 border border-neutral-300 rounded-md text-sm" 
                  placeholder="123 Main St"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">City</label>
                  <input 
                    type="text" 
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                    className="w-full p-2 border border-neutral-300 rounded-md text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Region/State</label>
                  <input 
                    type="text" 
                    value={addressForm.region}
                    onChange={(e) => setAddressForm({...addressForm, region: e.target.value})}
                    className="w-full p-2 border border-neutral-300 rounded-md text-sm" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Postal Code</label>
                  <input 
                    type="text" 
                    value={addressForm.postalCode}
                    onChange={(e) => setAddressForm({...addressForm, postalCode: e.target.value})}
                    className="w-full p-2 border border-neutral-300 rounded-md text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Country</label>
                  <input 
                    type="text" 
                    value={addressForm.country}
                    onChange={(e) => setAddressForm({...addressForm, country: e.target.value})}
                    className="w-full p-2 border border-neutral-300 rounded-md text-sm" 
                  />
                </div>
              </div>
              
              <div className="flex items-center pt-2">
                <input 
                  type="checkbox" 
                  id="isDefault"
                  checked={addressForm.isDefault}
                  onChange={(e) => setAddressForm({...addressForm, isDefault: e.target.checked})}
                  className="w-4 h-4 text-indigo-600 border-neutral-300 rounded" 
                />
                <label htmlFor="isDefault" className="ml-2 block text-sm text-neutral-700">
                  Set as default {addressForm.type} address
                </label>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-neutral-200 flex justify-end space-x-3 bg-neutral-50">
              <button 
                onClick={() => setIsAddressModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-200 rounded-md"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveAddress}
                className="px-4 py-2 text-sm font-medium bg-neutral-900 text-white hover:bg-neutral-800 rounded-md"
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
