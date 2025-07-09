import React from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useColors } from '../hooks/useColors';

export const EventPresentation: React.FC = () => {
  const { eventData } = useApp();
  const { getColor } = useColors();

  const primaryColor = getColor(eventData.cores.primaria);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Imagem do Evento */}
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={eventData.imagemUrl}
                  alt={eventData.nome}
                  className="w-full h-80 lg:h-96 object-cover"
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                />
              </div>
            </div>

            {/* Informações do Evento */}
            <div className="order-1 lg:order-2">
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                    Sobre o Evento
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {eventData.descricao}
                  </p>
                </div>

                {/* Detalhes do Evento */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div 
                    className="flex items-center gap-3 p-4 rounded-lg"
                    style={{ backgroundColor: `${primaryColor}10` }}
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Data</p>
                      <p className="font-semibold text-gray-800">{eventData.data}</p>
                    </div>
                  </div>

                  <div 
                    className="flex items-center gap-3 p-4 rounded-lg"
                    style={{ backgroundColor: `${primaryColor}10` }}
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Horário</p>
                      <p className="font-semibold text-gray-800">{eventData.horario}</p>
                    </div>
                  </div>

                  <div 
                    className="flex items-center gap-3 p-4 rounded-lg"
                    style={{ backgroundColor: `${primaryColor}10` }}
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Local</p>
                      <p className="font-semibold text-gray-800">{eventData.local}</p>
                    </div>
                  </div>

                  <div 
                    className="flex items-center gap-3 p-4 rounded-lg"
                    style={{ backgroundColor: `${primaryColor}10` }}
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Participantes</p>
                      <p className="font-semibold text-gray-800">{eventData.descricaoParticipantes}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};