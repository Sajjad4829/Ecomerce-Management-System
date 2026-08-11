export default function CustomerStatusBadge({ status }) {
  const getStatusStyles = () => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-success-soft text-green-800 border-green-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-border';
      case 'suspended':
        return 'bg-danger-soft text-red-800 border-red-200';
      case 'archived':
        return 'bg-gray-800 text-gray-300 border-gray-700';
      default:
        return 'bg-gray-100 text-gray-800 border-border';
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusStyles()}`}>
      {status}
    </span>
  );
}
