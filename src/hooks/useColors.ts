import { useApp } from '../context/AppContext';
import { getColorClasses, getGradientClasses, getGradientHoverClasses } from '../utils/colorUtils';

// Hook personalizado para gerenciar cores dinâmicas
export const useColors = () => {
  const { eventData } = useApp();
  const cores = eventData.cores;

  // Função para obter classes de cor primária
  const getPrimaryClasses = (shade: number = 600) => {
    return getColorClasses(cores.primaria, shade);
  };

  // Função para obter classes de cor secundária
  const getSecondaryClasses = (shade: number = 600) => {
    return getColorClasses(cores.secundaria, shade);
  };

  // Função para obter classes de cor gratuita
  const getFreeClasses = (shade: number = 600) => {
    return getColorClasses(cores.gratuita, shade);
  };

  // Função para obter classes de cor premium
  const getPremiumClasses = (shade: number = 600) => {
    return getColorClasses(cores.premium, shade);
  };

  // Função para obter classes de cor de sucesso
  const getSuccessClasses = (shade: number = 600) => {
    return getColorClasses(cores.sucesso, shade);
  };

  // Função para obter classes de cor de erro
  const getErrorClasses = (shade: number = 600) => {
    return getColorClasses(cores.erro, shade);
  };

  // Função para obter classes de cor de aviso
  const getWarningClasses = (shade: number = 600) => {
    return getColorClasses(cores.aviso, shade);
  };

  // Função para obter gradiente do header
  const getHeaderGradient = () => {
    // Usar estilos inline para garantir que as cores funcionem
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
    
    // Se a cor começar com #, é uma cor personalizada
    const color1 = cores.primaria.startsWith('#') ? cores.primaria : (colorMap[cores.primaria] || colorMap.purple);
    const color2 = cores.secundaria.startsWith('#') ? cores.secundaria : (colorMap[cores.secundaria] || colorMap.blue);
    
    return {
      background: `linear-gradient(to right, ${color1}, ${color2})`,
      style: { background: `linear-gradient(to right, ${color1}, ${color2})` }
    };
  };

  // Função para obter gradiente de botão gratuito
  const getFreeButtonGradient = () => {
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
    
    const color = cores.gratuita.startsWith('#') ? cores.gratuita : (colorMap[cores.gratuita] || colorMap.purple);
    
    return {
      background: `linear-gradient(to right, ${color}, ${color})`,
      style: { background: `linear-gradient(to right, ${color}, ${color})` }
    };
  };

  // Função para obter gradiente de botão premium
  const getPremiumButtonGradient = () => {
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
    
    const color = cores.premium.startsWith('#') ? cores.premium : (colorMap[cores.premium] || colorMap.orange);
    
    return {
      background: `linear-gradient(to right, ${color}, ${color})`,
      style: { background: `linear-gradient(to right, ${color}, ${color})` }
    };
  };

  return {
    cores,
    getPrimaryClasses,
    getSecondaryClasses,
    getFreeClasses,
    getPremiumClasses,
    getSuccessClasses,
    getErrorClasses,
    getWarningClasses,
    getHeaderGradient,
    getFreeButtonGradient,
    getPremiumButtonGradient
  };
};