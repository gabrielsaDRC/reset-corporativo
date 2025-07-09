import { useApp } from '../context/AppContext';

export const useColors = () => {
  const { eventData } = useApp();

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

  const getColor = (colorName: string): string => {
    return colorName.startsWith('#') ? colorName : (colorMap[colorName] || colorMap.purple);
  };

  const getHeaderGradient = () => {
    const primaryColor = getColor(eventData.cores.primaria);
    const secondaryColor = getColor(eventData.cores.secundaria);
    
    return {
      style: {
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
      }
    };
  };

  const getFreeButtonGradient = () => {
    const color = getColor(eventData.cores.gratuita);
    
    return {
      style: {
        background: `linear-gradient(135deg, ${color} 0%, ${color}DD 100%)`
      }
    };
  };

  const getPremiumButtonGradient = () => {
    const color = getColor(eventData.cores.premium);
    
    return {
      style: {
        background: `linear-gradient(135deg, ${color} 0%, ${color}DD 100%)`
      }
    };
  };

  return {
    getColor,
    getHeaderGradient,
    getFreeButtonGradient,
    getPremiumButtonGradient
  };
};