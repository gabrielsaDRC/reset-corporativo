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
    // Função centralizada para obter valor da cor
    const getColorValue = (colorName: string): string => {
      // Se a cor começar com #, é uma cor personalizada
      if (colorName.startsWith('#')) {
        return colorName;
      }
      
      // Caso contrário, usar o mapeamento padrão
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
      
      return colorMap[colorName] || colorMap.purple;
    };
    
    const color1 = getColorValue(cores.primaria || 'purple');
    const color2 = getColorValue(cores.secundaria || 'blue');
    
    return {
      background: `linear-gradient(to right, ${color1}, ${color2})`,
      style: { background: `linear-gradient(to right, ${color1}, ${color2})` }
    };
  };

  // Função para obter gradiente de botão gratuito
  const getFreeButtonGradient = () => {
    const getColorValue = (colorName: string): string => {
      if (colorName.startsWith('#')) {
        return colorName;
      }
      
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
      
      return colorMap[colorName] || colorMap.purple;
    };
    
    const color = getColorValue(cores.gratuita || 'purple');
    
    return {
      background: `linear-gradient(to right, ${color}, ${color})`,
      style: { background: `linear-gradient(to right, ${color}, ${color})` }
    };
  };

  // Função para obter gradiente de botão premium
  const getPremiumButtonGradient = () => {
    const getColorValue = (colorName: string): string => {
      if (colorName.startsWith('#')) {
        return colorName;
      }
      
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
      
      return colorMap[colorName] || colorMap.orange;
    };
    
    const color = getColorValue(cores.premium || 'orange');
    
    return {
      background: `linear-gradient(to right, ${color}, ${color})`,
      style: { background: `linear-gradient(to right, ${color}, ${color})` }
    };
  };

  // Função centralizada para obter valor de cor (reutilizável)
  const getColorValue = (colorName: string): string => {
    if (!colorName) return '#9333ea'; // fallback para purple
    
    if (colorName.startsWith('#')) {
      return colorName;
    }
    
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
    
    return colorMap[colorName] || '#9333ea';
  };

  return {
    cores,
    getColorValue,
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