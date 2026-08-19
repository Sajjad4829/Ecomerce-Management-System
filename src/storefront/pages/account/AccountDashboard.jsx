import { FiPackage, FiHeart, FiStar, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../auth/context/AuthContext';

export default function AccountDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-2">Hello, {user?.name?.split(' ')[0]}</h1>
        <p className="text-sm text-gray-500">Manage your orders, addresses, and account details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Orders" value="12" icon={FiPackage} to="/account/orders" />
        <DashboardCard title="Wishlist" value="5" icon={FiHeart} to="/account/wishlist" />
        <DashboardCard title="Reviews" value="2" icon={FiStar} to="/account/reviews" />
        <DashboardCard title="Addresses" value="2" icon={FiMapPin} to="/account/addresses" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 border border-black/5 shadow-sm rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">Recent Orders</h3>
            <Link to="/account/orders" className="text-sm font-medium text-gray-500 hover:text-black">View All</Link>
          </div>
          
          <div className="space-y-6">
            {[1, 2].map(i => (
              <div key={i} className="flex items-center justify-between border-b border-black/5 pb-6 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#F7F5F2] rounded-lg flex items-center justify-center">
                    <FiPackage className="text-gray-400" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1A1A1A]">Order #ORD-{8000 + i}</p>
                    <p className="text-xs text-gray-500 mt-1">Placed on Aug 1, 2026</p>
                    <span className="inline-block mt-2 px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-wider rounded">Delivered</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-[#1A1A1A]">$1,200.00</p>
                  <button className="mt-2 text-xs font-medium text-gray-500 hover:text-black flex items-center gap-1">Details <FiArrowRight size={12}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 border border-black/5 shadow-sm rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">Default Address</h3>
            <Link to="/account/addresses" className="text-sm font-medium text-gray-500 hover:text-black">Manage</Link>
          </div>
          
          <div className="bg-[#F7F5F2] p-6 rounded-lg">
            <p className="text-sm font-bold text-[#1A1A1A] mb-2">{user?.name}</p>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              123 Enterprise Way<br />
              Suite 400<br />
              San Francisco, CA 94105<br />
              United States
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-200 px-2 py-0.5 rounded">Default Shipping & Billing</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, value, icon: Icon, to }) {
  return (
    <Link to={to} className="bg-white p-6 border border-black/5 shadow-sm rounded-xl hover:border-black/20 hover:shadow-md transition-all group">
      <div className="flex items-center justify-between mb-4">
        <Icon className="text-gray-400 group-hover:text-[#1A1A1A] transition-colors" size={24} />
      </div>
      <p className="text-2xl font-bold text-[#1A1A1A] mb-1">{value}</p>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
    </Link>
  );
}
