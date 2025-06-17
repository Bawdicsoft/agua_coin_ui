'use client';
import { useEffect } from 'react';

export default function AutoCloseModal({
  message,
  type = 'success', // 'success' | 'error'
  duration = 3000,
  onClose,
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor =
    type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  const borderColor =
    type === 'success' ? 'border-green-300' : 'border-red-300';

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 z-50">
      <div
        className={`px-6 py-4 rounded-lg border shadow-lg ${bgColor} ${borderColor} text-center max-w-sm w-full mx-4`}
      >
        <p className="text-base font-medium">{message}</p>
      </div>
    </div>
  );
}
