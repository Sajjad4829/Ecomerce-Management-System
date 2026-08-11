import { FiShieldOff, FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/context/AuthContext';

export default function AccessDenied({ requiredPermission }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F5F2] p-6">
      <div className="max-w-md w-full bg-white rounded-xl border border-black/5 shadow-sm p-8 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiShieldOff size={32} />
        </div>
        
        <h1 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-2">Access Denied</h1>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          You do not have permission to access this resource. 
          {requiredPermission && <span className="block mt-2">Required permission: <code className="bg-gray-100 text-xs px-2 py-1 rounded text-red-600">{requiredPermission}</code></span>}
        </p>

        <div className="bg-[#F7F5F2] rounded-lg p-4 mb-8 text-left">
          <p className="text-xs text-gray-500 uppercase font-mono font-bold tracking-wider mb-1">Current User</p>
          <p className="text-sm font-medium text-[#1A1A1A]">{user?.name || 'Unknown'}</p>
          <p className="text-xs text-gray-500">{user?.role || 'No Role Assigned'}</p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 bg-white border border-black/10 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <FiArrowLeft size={16} /> Go Back
          </button>
          <Link 
            to="/admin"
            className="px-6 py-2.5 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors shadow-sm"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
