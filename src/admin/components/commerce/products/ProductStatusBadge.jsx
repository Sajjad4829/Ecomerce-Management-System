export default function ProductStatusBadge({ status }) {
  const styles = {
    published: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    draft: 'bg-stone-100 text-stone-600 border-stone-200',
    archived: 'bg-red-50 text-red-700 border-red-200'
  };

  const style = styles[status] || styles.draft;

  return (
    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${style}`}>
      {status}
    </span>
  );
}
