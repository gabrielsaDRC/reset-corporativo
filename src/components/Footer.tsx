import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useColors } from '../hooks/useColors';

export const Footer: React.FC = () => {
  const { eventData } = useApp();
  const { getColor } = useColors();

  const primaryColor = getColor(eventData.cores.primaria);

  const socialIcons = {
    linkedin: Linkedin,
    instagram: Instagram,
    twitter: Twitter,
    facebook: Facebook,
    youtube: Youtube
  };

  const activeSocials = Object.entries(eventData.redesSociais)
    .filter(([_, url]) => url && url.trim() !== '');

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Informações do Evento */}
            <div>
              <h3 className="text-xl font-bold mb-4">{eventData.nome}</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {eventData.descricao.length > 150 
                  ? `${eventData.descricao.substring(0, 150)}...`
                  : eventData.descricao
                }
              </p>
            </div>

            {/* Contato */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contato</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" style={{ color: primaryColor }} />
                  <a 
                    href={`mailto:${eventData.contato.email}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {eventData.contato.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" style={{ color: primaryColor }} />
                  <a 
                    href={`tel:${eventData.contato.telefone}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {eventData.contato.telefone}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-0.5" style={{ color: primaryColor }} />
                  <span className="text-gray-300">
                    {eventData.contato.endereco}
                  </span>
                </div>
              </div>
            </div>

            {/* Redes Sociais */}
            {activeSocials.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">Redes Sociais</h3>
                <div className="flex flex-wrap gap-3">
                  {activeSocials.map(([platform, url]) => {
                    const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                    if (!IconComponent) return null;

                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <IconComponent className="w-5 h-5 text-white" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 {eventData.nome}. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};