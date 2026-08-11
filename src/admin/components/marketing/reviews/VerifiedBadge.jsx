import { FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';

export default function VerifiedBadge({ status }) {
  if (status === 'verified') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-800">
        <FiCheckCircle size={10} /> Verified Purchase
      </span>
    );
  }
  
  if (status === 'pending') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
        <FiClock size={10} /> Verification Pending
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600">
      <FiXCircle size={10} /> Unverified
    </span>
  );
}
