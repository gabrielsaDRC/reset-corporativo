import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { EventPresentation } from '../components/EventPresentation';
import { EventSchedule } from '../components/EventSchedule';
import { Footer } from '../components/Footer';
import { Gift, CreditCard, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useColors } from '../hooks/useColors';

export const LandingPage: React.FC = () => {
  const { eventData } = useApp();
  const { getFreeButtonGradient, getPremiumButtonGradient } = useColors();
  
  const freeButtonGradient = getFreeButtonGradient();
  const premiumButtonGradient = getPremiumButtonGradient();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <EventPresentation />
      <EventSchedule />
      
      {/* Seção de Inscrições */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Escolha sua Inscrição
              </h2>
              <p className="text-lg lg:text-xl text-gray-600">
                Selecione o tipo de inscrição que melhor se adequa às suas necessidades
              </p>
            </div>

            <div className={`grid gap-6 lg:gap-8 ${
              (eventData.inscricaoGratuita.disponivel && eventData.inscricaoPaga.disponivel) 
                ? 'grid-cols-1 lg:grid-cols-2' 
                : 'grid-cols-1 max-w-2xl mx-auto'
            }`}>
              {/* Inscrição Gratuita */}
              {eventData.inscricaoGratuita.disponivel && (
                <div className={`p-6 lg:p-8 bg-gradient-to-br from-${eventData.cores.gratuita}-50 to-${eventData.cores.gratuita}-100 rounded-xl border-2 border-${eventData.cores.gratuita}-200 relative overflow-hidden`}>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-12 h-12 bg-${eventData.cores.gratuita}-600 rounded-full flex items-center justify-center`}>
                        <Gift className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className={`text-xl lg:text-2xl font-bold text-${eventData.cores.gratuita}-800`}>
                          {eventData.inscricaoGratuita.titulo}
                        </h3>
                        <p className={`text-${eventData.cores.gratuita}-600 font-semibold`}>Gratuito</p>
                      </div>
                    </div>
                    
                    <p className={`text-${eventData.cores.gratuita}-700 mb-6 text-base lg:text-lg`}>
                      {eventData.inscricaoGratuita.descricao}
                    </p>
                    
                    <ul className="space-y-3 mb-8">
                      {eventData.inscricaoGratuita.beneficios.map((benefit, index) => (
                        <li key={index} className={`flex items-start gap-2 text-${eventData.cores.gratuita}-700`}>
                          <div className={`w-2 h-2 bg-${eventData.cores.gratuita}-600 rounded-full mt-2 flex-shrink-0`}></div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link
                      to="/inscricao-gratuita"
                      className="w-full text-white py-4 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 group hover:opacity-90"
                      style={freeButtonGradient.style}
                    >
                      Inscrever-se Gratuitamente
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-${eventData.cores.gratuita}-200 rounded-full -translate-y-16 translate-x-16 opacity-50`}></div>
                </div>
              )}

              {/* Inscrição Premium */}
              {eventData.inscricaoPaga.disponivel && (
                <div className={`p-6 lg:p-8 bg-gradient-to-br from-${eventData.cores.premium}-50 to-${eventData.cores.premium}-100 rounded-xl border-2 border-${eventData.cores.premium}-200 relative overflow-hidden`}>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-12 h-12 bg-${eventData.cores.premium}-600 rounded-full flex items-center justify-center`}>
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className={`text-xl lg:text-2xl font-bold text-${eventData.cores.premium}-800`}>
                          {eventData.inscricaoPaga.titulo}
                        </h3>
                        <p className={`text-${eventData.cores.premium}-600 font-bold text-lg`}>
                          R$ {eventData.inscricaoPaga.preco.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    
                    <p className={`text-${eventData.cores.premium}-700 mb-6 text-base lg:text-lg`}>
                      {eventData.inscricaoPaga.descricao}
                    </p>
                    
                    <ul className="space-y-3 mb-8">
                      {eventData.inscricaoPaga.beneficios.map((benefit, index) => (
                        <li key={index} className={`flex items-start gap-2 text-${eventData.cores.premium}-700`}>
                          <div className={`w-2 h-2 bg-${eventData.cores.premium}-600 rounded-full mt-2 flex-shrink-0`}></div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link
                      to="/inscricao-premium"
                      className="w-full text-white py-4 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 group hover:opacity-90"
                      style={premiumButtonGradient.style}
                    >
                      Inscrever-se Premium
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-${eventData.cores.premium}-200 rounded-full -translate-y-16 translate-x-16 opacity-50`}></div>
                </div>
              )}
            </div>

            {/* Informação adicional */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 font-medium">
                  Inscrições abertas • Vagas limitadas
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};