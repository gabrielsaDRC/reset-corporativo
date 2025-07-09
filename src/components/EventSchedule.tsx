import React from 'react';
import { Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useColors } from '../hooks/useColors';

export const EventSchedule: React.FC = () => {
  const { eventData } = useApp();
  const { getColor } = useColors();

  const primaryColor = getColor(eventData.cores.primaria);

  if (!eventData.programacao || eventData.programacao.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Programação do Evento
            </h2>
            <p className="text-lg text-gray-600">
              Confira a agenda completa com todas as atividades planejadas
            </p>
          </div>

          <div className="space-y-4">
            {eventData.programacao.map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow"
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${primaryColor}20` }}
                >
                  <Clock className="w-6 h-6" style={{ color: primaryColor }} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium leading-relaxed">
                    {item}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};