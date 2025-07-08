import React from 'react';
import { Loader2, Zap } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="text-center">
        {/* Logo animado */}
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
            <Zap className="w-10 h-10 text-white" />
          </div>
          
          {/* Círculos animados ao redor do logo */}
          <div className="absolute inset-0 w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full border-2 border-purple-400 opacity-20 animate-ping"></div>
            <div className="absolute inset-2 rounded-full border-2 border-blue-400 opacity-30 animate-ping animation-delay-200"></div>
            <div className="absolute inset-4 rounded-full border-2 border-purple-300 opacity-40 animate-ping animation-delay-400"></div>
          </div>
        </div>

        {/* Texto de carregamento */}
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
            Reset Corporativo
          </h1>
          <p className="text-gray-300 text-lg">
            Carregando evento...
          </p>
        </div>

        {/* Spinner de carregamento */}
        <div className="flex items-center justify-center gap-3">
          <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
          <span className="text-gray-400 text-sm">
            Preparando sua experiência
          </span>
        </div>

        {/* Barra de progresso animada */}
        <div className="mt-8 w-64 mx-auto">
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-1 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Pontos de carregamento */}
        <div className="flex justify-center gap-1 mt-6">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-100"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce animation-delay-200"></div>
        </div>
      </div>

      {/* Efeito de partículas no fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-30 animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-400 rounded-full opacity-40 animate-float animation-delay-300"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-20 animate-float animation-delay-500"></div>
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-blue-300 rounded-full opacity-30 animate-float animation-delay-700"></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
};