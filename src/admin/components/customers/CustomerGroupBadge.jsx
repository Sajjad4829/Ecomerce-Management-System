import { FiShield } from 'react-icons/fi';

export default function CustomerGroupBadge({ group }) {
  if (!group) return null;

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F7F5F2] text-gray-700 border border-black/5">
      <FiShield size={10} />
      {group}
    </span>
  );
}
