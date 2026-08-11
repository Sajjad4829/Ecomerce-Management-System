import { cn } from '../../../../utils/cn';

export default function PageStatusBadge({ status }) {
  const styles = {
    Published: 'bg-green-50 text-green-700 border-green-200',
    Draft: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    Scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
    Private: 'bg-purple-50 text-purple-700 border-purple-200',
    Archived: 'bg-gray-50 text-gray-600 border-gray-200',
  };

  return (
    <span className={cn(
      "px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold rounded-md border",
      styles[status] || styles['Draft']
    )}>
      {status}
    </span>
  );
}
