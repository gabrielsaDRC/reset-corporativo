import React from 'react';
import { Calendar, MapPin, Clock, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useColors } from '../hooks/useColors';

interface HeaderProps {
  isAdminPage?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isAdminPage = false }) => {
  const { eventData, isAdmin, setIsAdmin } = useApp();
  const { getHeaderGradient } = useColors();
  const headerGradient = getHeaderGradient();

  const handleLogout = () => {
    setIsAdmin(false);
    window.location.href = '/';
  };

  return (
    <header className="text-white" style={headerGradient.style}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="text-center lg:text-left">
            <h1 className="text-xl lg:text-3xl font-bold mb-2 leading-tight">{eventData.nome}</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            {isAdmin && isAdminPage && (
              <>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors whitespace-nowrap"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                  <span className="sm:hidden">Sair</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};