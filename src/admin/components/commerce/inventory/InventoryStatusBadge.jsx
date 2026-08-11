import { FiCheckCircle, FiAlertCircle, FiXCircle } from 'react-icons/fi';

export default function InventoryStatusBadge({ status }) {
  if (status === 'in-stock') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
        <FiCheckCircle size={12} />
        In Stock
      </span>
    );
  }
  
  if (status === 'low-stock') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
        <FiAlertCircle size={12} />
        Low Stock
      </span>
    );
  }

  if (status === 'out-of-stock') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
        <FiXCircle size={12} />
        Out of Stock
      </span>
    );
  }
  
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
      Unknown
    </span>
  );
}
