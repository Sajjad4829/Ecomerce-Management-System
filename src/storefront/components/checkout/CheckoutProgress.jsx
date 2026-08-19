import { useCheckout } from '../../context/CheckoutContext';
import { FiCheck } from 'react-icons/fi';

const STEPS = [
  { id: 'information', label: 'Information' },
  { id: 'delivery', label: 'Delivery' },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' }
];

export default function CheckoutProgress() {
  const { currentStep } = useCheckout();

  const getCurrentStepIndex = () => STEPS.findIndex(s => s.id === currentStep);
  const currentIndex = getCurrentStepIndex();

  return (
    <nav aria-label="Progress" className="mb-12 hidden sm:block">
      <ol role="list" className="flex items-center">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isLast = index === STEPS.length - 1;

          return (
            <li key={step.id} className={`relative ${isLast ? '' : 'pr-8 sm:pr-20'}`}>
              <div className="flex items-center">
                <div 
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors
                    ${isCompleted ? 'bg-black text-white' : isCurrent ? 'border-2 border-black text-black bg-white' : 'border-2 border-gray-200 text-gray-400 bg-white'}
                  `}
                >
                  {isCompleted ? <FiCheck size={16} /> : index + 1}
                </div>
                {!isLast && (
                  <div className={`absolute top-4 w-full h-[2px] -z-10 left-8 ${isCompleted ? 'bg-black' : 'bg-gray-200'}`} />
                )}
              </div>
              <span className={`absolute mt-2 text-xs font-medium ${isCurrent || isCompleted ? 'text-black' : 'text-gray-400'}`}>
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
