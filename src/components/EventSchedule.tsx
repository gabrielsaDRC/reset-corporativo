import React from 'react';
import { Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useColors } from '../hooks/useColors';

export const EventSchedule: React.FC = () => {
  const { eventData } = useApp();
  const { getPrimaryClasses } = useColors();
  
  // Obter cor primária personalizada
  const colorMap: Record<string, string> = {
    purple: '#9333ea',
    blue: '#2563eb',
    orange: '#ea580c',
    green: '#16a34a',
    red: '#dc2626',
    yellow: '#ca8a04',
    indigo: '#4f46e5',
    pink: '#db2777',
    teal: '#0d9488'
  };
  
  const primaryColor = eventData.cores.primaria;
  const customIconColor = primaryColor.startsWith('#') ? primaryColor : (colorMap[primaryColor] || colorMap.purple);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Programação do Evento
            </h2>
            <p className="text-lg lg:text-xl text-gray-600">
              Uma agenda completa com o que há de melhor no setor
            </p>
          </div>

          <div className="space-y-4">
            {eventData.programacao.map((item, index) => (
              <div
                key={index}
                className="flex items-start lg:items-center gap-3 lg:gap-4 p-4 lg:p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-shrink-0 mt-1 lg:mt-0">
                  <Clock className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: customIconColor }} />
                </div>
                <div className="flex-1">
                  <p className="text-base lg:text-lg font-medium text-gray-800 leading-relaxed">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};