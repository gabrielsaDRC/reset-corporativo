import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AdminLogin } from '../components/AdminLogin';
import { AdminDashboard } from '../components/AdminDashboard';
import { ParticipantsList } from '../components/ParticipantsList';
import { EventEditor } from '../components/EventEditor';
import { Header } from '../components/Header';
import { Shield, BarChart3, Users, Settings, Loader2 } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { isAdmin, loading } = useApp();
  const [adminSection, setAdminSection] = useState<'dashboard' | 'participants' | 'event-editor'>('dashboard');

  const handleLoginSuccess = () => {
    // Login success is handled by the context
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-400 mx-auto mb-4" />
          <p className="text-gray-300">Carregando painel administrativo...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAdminPage={true} />
      
      <div className="flex flex-col lg:flex-row">
        {/* Admin Sidebar */}
        <div className="w-full lg:w-64 bg-white shadow-sm border-b lg:border-b-0 lg:border-r min-h-auto lg:min-h-screen">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-800">
                Painel Admin
              </h2>
            </div>
            <nav className="flex lg:flex-col gap-2 lg:space-y-2 overflow-x-auto lg:overflow-x-visible">
              <button
                onClick={() => setAdminSection('dashboard')}
                className={`flex-shrink-0 lg:w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${
                  adminSection === 'dashboard' 
                    ? 'bg-purple-50 text-purple-600 border border-purple-200' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                Dashboard
              </button>
              <button
                onClick={() => setAdminSection('participants')}
                className={`flex-shrink-0 lg:w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${
                  adminSection === 'participants' 
                    ? 'bg-purple-50 text-purple-600 border border-purple-200' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Users className="w-5 h-5" />
                Participantes
              </button>
              <button
                onClick={() => setAdminSection('event-editor')}
                className={`flex-shrink-0 lg:w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${
                  adminSection === 'event-editor' 
                    ? 'bg-purple-50 text-purple-600 border border-purple-200' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Settings className="w-5 h-5" />
                Configurações
              </button>
            </nav>
          </div>
        </div>
        
        {/* Admin Content */}
        <div className="flex-1 bg-gray-50 min-h-screen">
          {adminSection === 'dashboard' ? (
            <AdminDashboard />
          ) : adminSection === 'participants' ? (
            <ParticipantsList />
          ) : (
            <EventEditor />
          )}
        </div>
      </div>
    </div>
  );
};