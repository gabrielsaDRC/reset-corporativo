// Utilitários para gerenciamento de cores dinâmicas

export interface ColorConfig {
  primaria: string;
  secundaria: string;
  gratuita: string;
  premium: string;
  sucesso: string;
  erro: string;
  aviso: string;
}

// Função para obter classes de cor baseadas na configuração
export const getColorClasses = (colorName: string, shade: number = 600) => {
  // Para cores personalizadas (hex), retornar classes genéricas
  if (colorName.startsWith('#')) {
    return {
      bg: 'bg-gray-600', // fallback
      text: 'text-gray-600',
      border: 'border-gray-600',
      hover: 'hover:bg-gray-700'
    };
  }
  
  // Mapeamento básico para cores nomeadas (fallback)
  const colorMap: Record<string, any> = {
    purple: {
      bg: 'bg-purple-600',
      text: 'text-purple-600',
      border: 'border-purple-600',
      hover: 'hover:bg-purple-700'
    },
    blue: {
      bg: 'bg-blue-600',
      text: 'text-blue-600',
      border: 'border-blue-600',
      hover: 'hover:bg-blue-700'
    },
    orange: {
      bg: 'bg-orange-600',
      text: 'text-orange-600',
      border: 'border-orange-600',
      hover: 'hover:bg-orange-700'
    },
    green: {
      bg: 'bg-green-600',
      text: 'text-green-600',
      border: 'border-green-600',
      hover: 'hover:bg-green-700'
    },
    red: {
      bg: 'bg-red-600',
      text: 'text-red-600',
      border: 'border-red-600',
      hover: 'hover:bg-red-700'
    },
    yellow: {
      bg: 'bg-yellow-600',
      text: 'text-yellow-600',
      border: 'border-yellow-600',
      hover: 'hover:bg-yellow-700'
    }
  };
  
  return colorMap[colorName] || colorMap.purple;
};

// Função para gerar gradiente
export const getGradientClasses = (color1: string, color2: string) => {
  return `bg-gradient-to-r from-${color1}-600 to-${color2}-600`;
};

// Função para gerar hover do gradiente
export const getGradientHoverClasses = (color1: string, color2: string) => {
  return `hover:from-${color1}-700 hover:to-${color2}-700`;
};