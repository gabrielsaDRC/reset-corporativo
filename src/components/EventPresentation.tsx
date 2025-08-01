import React from 'react';
import { Calendar, MapPin, Clock, Users, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useColors } from '../hooks/useColors';

export const EventPresentation: React.FC = () => {
  const { eventData } = useApp();
  const { getPrimaryClasses, getColorValue } = useColors();
  
  const customIconColor = getColorValue(eventData.cores.primaria);

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 leading-relaxed text-center lg:text-left">
                Sobre o Evento
              </h2>
              <p className="text-base lg:text-lg text-gray-600 mb-8 leading-relaxed text-center lg:text-left">
                {eventData.descricao}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-3 lg:p-4 bg-white rounded-lg shadow-sm">
                  <Calendar className="w-5 h-5 lg:w-6 lg:h-6 flex-shrink-0" style={{ color: customIconColor }} />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm lg:text-base">Data</p>
                    <p className="text-gray-600 text-sm lg:text-base">{eventData.data}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 lg:p-4 bg-white rounded-lg shadow-sm">
                  <Clock className="w-5 h-5 lg:w-6 lg:h-6 flex-shrink-0" style={{ color: customIconColor }} />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm lg:text-base">Horário</p>
                    <p className="text-gray-600 text-sm lg:text-base">{eventData.horario}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 lg:p-4 bg-white rounded-lg shadow-sm sm:col-span-2">
                  <MapPin className="w-5 h-5 lg:w-6 lg:h-6 flex-shrink-0" style={{ color: customIconColor }} />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm lg:text-base">Local</p>
                    <p className="text-gray-600 text-sm lg:text-base break-words">{eventData.local}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 justify-center lg:justify-start">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{eventData.descricaoParticipantes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" style={{ color: customIconColor }} />
                  <span>Evento Premium</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[3/4] lg:aspect-[4/5]">
                <img
                  src={eventData.imagemUrl}
                  alt="Evento X"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};