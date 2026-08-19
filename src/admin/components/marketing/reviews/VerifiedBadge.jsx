import { FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';

export default function VerifiedBadge({ status }) {
  if (status === 'verified') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-success-soft text-green-800">
        <FiCheckCircle size={10} /> Verified Purchase
      </span>
    );
  }
  
  if (status === 'pending') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-warning-soft text-amber-800">
        <FiClock size={10} /> Verification Pending
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-text-secondary">
      <FiXCircle size={10} /> Unverified
    </span>
  );
}
