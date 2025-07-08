import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface SuccessNotificationProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

export const SuccessNotification: React.FC<SuccessNotificationProps> = ({
  isVisible,
  message,
  onClose,
  autoClose = true,
  duration = 3000
}) => {
  useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className="bg-green-50 border border-green-200 rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1">
            <p className="text-green-800 font-medium text-sm">Sucesso!</p>
            <p className="text-green-700 text-sm">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1 hover:bg-green-100 rounded transition-colors"
          >
            <X className="w-4 h-4 text-green-600" />
          </button>
        </div>
      </div>
    </div>
  );
};