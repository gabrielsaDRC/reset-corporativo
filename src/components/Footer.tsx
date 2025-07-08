import React from 'react';
import { Mail, Phone, MapPin, Calendar, Linkedin, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { eventData } = useApp();

  const socialIcons = {
    linkedin: Linkedin,
    instagram: Instagram,
    twitter: Twitter,
    facebook: Facebook,
    youtube: Youtube
  };

  const getSocialName = (key: string) => {
    const names = {
      linkedin: 'LinkedIn',
      instagram: 'Instagram',
      twitter: 'Twitter',
      facebook: 'Facebook',
      youtube: 'YouTube'
    };
    return names[key as keyof typeof names] || key;
  };

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4">{eventData.nome}</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {eventData.descricao}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <h4 className="text-lg font-semibold mb-4">Informações</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-gray-300">{eventData.data}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-gray-300 text-center">{eventData.local}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-gray-300">{eventData.horario}</span>
                </div>
              </div>
            </div>
          
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-gray-300">{eventData.contato.email}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-gray-300">{eventData.contato.telefone}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-gray-300 text-center">{eventData.contato.endereco}</span>
                </div>
              </div>
            </div>
          
            <div>
              <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
              <div className="flex justify-center gap-4">
                {Object.entries(eventData.redesSociais).map(([key, url]) => {
                  if (!url) return null;
                  
                  const IconComponent = socialIcons[key as keyof typeof socialIcons];
                  if (!IconComponent) return null;
                  
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-purple-600 transition-all duration-300 transform hover:scale-110"
                      title={getSocialName(key)}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
              
              {/* Fallback se não houver redes sociais configuradas */}
              {Object.values(eventData.redesSociais).every(url => !url) && (
                <p className="text-gray-400 text-sm">
                  Configure as redes sociais no painel administrativo
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 {eventData.nome}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};