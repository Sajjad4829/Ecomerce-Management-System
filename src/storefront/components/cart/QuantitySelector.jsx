import { FiMinus, FiPlus } from 'react-icons/fi';

export default function QuantitySelector({ quantity, onChange, min = 1, max = 99, disabled = false }) {
  const decrease = () => {
    if (quantity > min) onChange(quantity - 1);
  };

  const increase = () => {
    if (quantity < max) onChange(quantity + 1);
  };

  return (
    <div className={`inline-flex items-center border border-black/10 rounded overflow-hidden ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <button 
        type="button"
        onClick={decrease}
        disabled={quantity <= min}
        className="px-3 py-1.5 text-gray-500 hover:text-black hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        aria-label="Decrease quantity"
      >
        <FiMinus size={14} />
      </button>
      
      <span className="w-8 text-center text-sm font-medium text-[#1A1A1A]">
        {quantity}
      </span>
      
      <button 
        type="button"
        onClick={increase}
        disabled={quantity >= max}
        className="px-3 py-1.5 text-gray-500 hover:text-black hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        aria-label="Increase quantity"
      >
        <FiPlus size={14} />
      </button>
    </div>
  );
}
