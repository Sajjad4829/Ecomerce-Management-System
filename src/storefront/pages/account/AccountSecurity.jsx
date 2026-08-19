import { FiLock, FiSmartphone, FiMonitor, FiLogOut } from 'react-icons/fi';

export default function AccountSecurity() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-2">Security & Privacy</h1>
        <p className="text-sm text-gray-500">Manage your password, active sessions, and security settings.</p>
      </div>

      <div className="bg-white p-8 border border-black/5 shadow-sm rounded-xl max-w-3xl">
        <h2 className="text-lg font-serif font-bold text-[#1A1A1A] mb-6">Change Password</h2>
        <form className="space-y-5">
          <div>
            <label className="block text-xs font-mono font-bold text-gray-500 uppercase tracking-wider mb-2">Current Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-[#F7F5F2] border-transparent rounded focus:outline-none focus:bg-white focus:ring-1 focus:ring-black/20 text-sm font-medium" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono font-bold text-gray-500 uppercase tracking-wider mb-2">New Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-[#F7F5F2] border-transparent rounded focus:outline-none focus:bg-white focus:ring-1 focus:ring-black/20 text-sm font-medium" />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-gray-500 uppercase tracking-wider mb-2">Confirm Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-[#F7F5F2] border-transparent rounded focus:outline-none focus:bg-white focus:ring-1 focus:ring-black/20 text-sm font-medium" />
            </div>
          </div>
          <button type="button" className="px-6 py-3 bg-[#1A1A1A] text-white text-sm font-semibold rounded hover:bg-black transition-colors">
            Update Password
          </button>
        </form>
      </div>

      <div className="bg-white p-8 border border-black/5 shadow-sm rounded-xl max-w-3xl">
        <h2 className="text-lg font-serif font-bold text-[#1A1A1A] mb-2">Two-Factor Authentication (2FA)</h2>
        <p className="text-sm text-gray-500 mb-6">Add an extra layer of security to your account.</p>
        
        <div className="p-4 border border-black/10 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <FiSmartphone className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1A1A1A]">Authenticator App</p>
              <p className="text-xs text-gray-500">Not configured</p>
            </div>
          </div>
          <button className="px-4 py-2 border border-black/20 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
            Enable
          </button>
        </div>
      </div>

      <div className="bg-white p-8 border border-black/5 shadow-sm rounded-xl max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-serif font-bold text-[#1A1A1A] mb-1">Active Sessions</h2>
            <p className="text-sm text-gray-500">Devices that are currently logged into your account.</p>
          </div>
          <button className="text-sm font-medium text-red-600 hover:text-red-700 hover:underline">
            Log out all other devices
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-black/10 rounded-lg bg-green-50/50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-black/5 shadow-sm">
                <FiMonitor className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1A1A1A]">Mac OS • Chrome</p>
                <p className="text-xs text-gray-500">San Francisco, CA • Current session</p>
              </div>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-wider rounded">Active</span>
          </div>

          <div className="flex items-center justify-between p-4 border border-black/5 rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#F7F5F2] rounded-full flex items-center justify-center border border-black/5">
                <FiSmartphone className="text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1A1A1A]">iOS • Safari</p>
                <p className="text-xs text-gray-500">San Jose, CA • Last active 2 hours ago</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-black">
              <FiLogOut size={18} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
