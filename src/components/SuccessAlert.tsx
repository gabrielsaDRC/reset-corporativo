import React, { useEffect } from 'react';
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react';

interface SuccessAlertProps {
  isVisible: boolean;
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

export const SuccessAlert: React.FC<SuccessAlertProps> = ({
  isVisible,
  message,
  type = 'success',
  onClose,
  autoClose = true,
  duration = 4000
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

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-green-50 border-green-200',
          icon: <CheckCircle className="w-6 h-6 text-green-600" />,
          title: 'text-green-800',
          message: 'text-green-700',
          button: 'hover:bg-green-100 text-green-600'
        };
      case 'error':
        return {
          container: 'bg-red-50 border-red-200',
          icon: <AlertCircle className="w-6 h-6 text-red-600" />,
          title: 'text-red-800',
          message: 'text-red-700',
          button: 'hover:bg-red-100 text-red-600'
        };
      case 'info':
        return {
          container: 'bg-blue-50 border-blue-200',
          icon: <Info className="w-6 h-6 text-blue-600" />,
          title: 'text-blue-800',
          message: 'text-blue-700',
          button: 'hover:bg-blue-100 text-blue-600'
        };
      default:
        return {
          container: 'bg-green-50 border-green-200',
          icon: <CheckCircle className="w-6 h-6 text-green-600" />,
          title: 'text-green-800',
          message: 'text-green-700',
          button: 'hover:bg-green-100 text-green-600'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className={`${styles.container} border rounded-lg shadow-lg p-4 max-w-sm min-w-[300px]`}>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            {styles.icon}
          </div>
          <div className="flex-1">
            <p className={`${styles.title} font-semibold text-sm mb-1`}>
              {type === 'success' ? 'Sucesso!' : type === 'error' ? 'Erro!' : 'Informação'}
            </p>
            <p className={`${styles.message} text-sm leading-relaxed`}>{message}</p>
          </div>
          <button
            onClick={onClose}
            className={`flex-shrink-0 p-1 ${styles.button} rounded transition-colors`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        {/* Barra de progresso para auto-close */}
        {autoClose && (
          <div className="mt-3 w-full bg-gray-200 rounded-full h-1">
            <div 
              className={`h-1 rounded-full transition-all ease-linear ${
                type === 'success' ? 'bg-green-500' : 
                type === 'error' ? 'bg-red-500' : 'bg-blue-500'
              }`}
              style={{ 
                width: '100%',
                animation: `shrink ${duration}ms linear forwards`
              }}
            />
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};