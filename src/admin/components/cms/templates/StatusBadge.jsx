import { cn } from '../../../../utils/cn';

export default function StatusBadge({ status, className = '' }) {
  const normalized = (status || 'draft').toLowerCase();

  const styles = {
    published: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    draft: 'bg-warning-soft text-amber-800 border-amber-200',
    archived: 'bg-gray-100 text-text-secondary border-border'
  };

  const dots = {
    published: 'bg-emerald-500',
    draft: 'bg-warning-soft0',
    archived: 'bg-gray-400'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border',
        styles[normalized] || styles.draft,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', dots[normalized] || dots.draft)} />
      {normalized}
    </span>
  );
}
