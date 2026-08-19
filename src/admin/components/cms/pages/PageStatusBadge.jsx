import { cn } from '../../../../utils/cn';

export default function PageStatusBadge({ status }) {
  const styles = {
    Published: 'bg-success-soft text-success border-green-200',
    Draft: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    Scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
    Private: 'bg-purple-50 text-purple-700 border-purple-200',
    Archived: 'bg-background text-text-secondary border-border',
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
