import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type = 'info', message, duration = 4000 }) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} onRemove={removeToast} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

function Toast({ toast, onRemove }) {
  const icons = {
    success: <FiCheckCircle className="text-[#20C77A]" size={20} />,
    error: <FiAlertCircle className="text-[#FF4D4F]" size={20} />,
    info: <FiInfo className="text-[#4F46FF]" size={20} />,
  };

  const bgs = {
    success: 'bg-[#E8FFF3] border-[#20C77A]/20 text-[#111A4A]',
    error: 'bg-[#FFF2F2] border-[#FF4D4F]/20 text-[#111A4A]',
    info: 'bg-[#EEF0FF] border-[#4F46FF]/20 text-[#111A4A]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ duration: 0.2, type: 'spring', stiffness: 300, damping: 25 }}
      className={`pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-[0_8px_32px_rgba(17,26,74,0.08)] ${bgs[toast.type]}`}
    >
      {icons[toast.type]}
      <p className="text-sm font-semibold pr-4">{toast.message}</p>
      <button 
        onClick={() => onRemove(toast.id)}
        className="ml-auto text-[#7C849F] hover:text-[#111A4A] transition-colors"
      >
        <FiX size={16} />
      </button>
    </motion.div>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
