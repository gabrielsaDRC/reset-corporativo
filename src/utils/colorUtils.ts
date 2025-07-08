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

// Mapeamento de cores para classes Tailwind
export const colorMap: Record<string, any> = {
  purple: {
    50: 'bg-purple-50',
    100: 'bg-purple-100',
    200: 'bg-purple-200',
    300: 'bg-purple-300',
    400: 'bg-purple-400',
    500: 'bg-purple-500',
    600: 'bg-purple-600',
    700: 'bg-purple-700',
    800: 'bg-purple-800',
    900: 'bg-purple-900',
    text: {
      50: 'text-purple-50',
      100: 'text-purple-100',
      200: 'text-purple-200',
      300: 'text-purple-300',
      400: 'text-purple-400',
      500: 'text-purple-500',
      600: 'text-purple-600',
      700: 'text-purple-700',
      800: 'text-purple-800',
      900: 'text-purple-900'
    },
    border: {
      50: 'border-purple-50',
      100: 'border-purple-100',
      200: 'border-purple-200',
      300: 'border-purple-300',
      400: 'border-purple-400',
      500: 'border-purple-500',
      600: 'border-purple-600',
      700: 'border-purple-700',
      800: 'border-purple-800',
      900: 'border-purple-900'
    },
    hover: {
      50: 'hover:bg-purple-50',
      100: 'hover:bg-purple-100',
      200: 'hover:bg-purple-200',
      300: 'hover:bg-purple-300',
      400: 'hover:bg-purple-400',
      500: 'hover:bg-purple-500',
      600: 'hover:bg-purple-600',
      700: 'hover:bg-purple-700',
      800: 'hover:bg-purple-800',
      900: 'hover:bg-purple-900'
    }
  },
  blue: {
    50: 'bg-blue-50',
    100: 'bg-blue-100',
    200: 'bg-blue-200',
    300: 'bg-blue-300',
    400: 'bg-blue-400',
    500: 'bg-blue-500',
    600: 'bg-blue-600',
    700: 'bg-blue-700',
    800: 'bg-blue-800',
    900: 'bg-blue-900',
    text: {
      50: 'text-blue-50',
      100: 'text-blue-100',
      200: 'text-blue-200',
      300: 'text-blue-300',
      400: 'text-blue-400',
      500: 'text-blue-500',
      600: 'text-blue-600',
      700: 'text-blue-700',
      800: 'text-blue-800',
      900: 'text-blue-900'
    },
    border: {
      50: 'border-blue-50',
      100: 'border-blue-100',
      200: 'border-blue-200',
      300: 'border-blue-300',
      400: 'border-blue-400',
      500: 'border-blue-500',
      600: 'border-blue-600',
      700: 'border-blue-700',
      800: 'border-blue-800',
      900: 'border-blue-900'
    },
    hover: {
      50: 'hover:bg-blue-50',
      100: 'hover:bg-blue-100',
      200: 'hover:bg-blue-200',
      300: 'hover:bg-blue-300',
      400: 'hover:bg-blue-400',
      500: 'hover:bg-blue-500',
      600: 'hover:bg-blue-600',
      700: 'hover:bg-blue-700',
      800: 'hover:bg-blue-800',
      900: 'hover:bg-blue-900'
    }
  },
  orange: {
    50: 'bg-orange-50',
    100: 'bg-orange-100',
    200: 'bg-orange-200',
    300: 'bg-orange-300',
    400: 'bg-orange-400',
    500: 'bg-orange-500',
    600: 'bg-orange-600',
    700: 'bg-orange-700',
    800: 'bg-orange-800',
    900: 'bg-orange-900',
    text: {
      50: 'text-orange-50',
      100: 'text-orange-100',
      200: 'text-orange-200',
      300: 'text-orange-300',
      400: 'text-orange-400',
      500: 'text-orange-500',
      600: 'text-orange-600',
      700: 'text-orange-700',
      800: 'text-orange-800',
      900: 'text-orange-900'
    },
    border: {
      50: 'border-orange-50',
      100: 'border-orange-100',
      200: 'border-orange-200',
      300: 'border-orange-300',
      400: 'border-orange-400',
      500: 'border-orange-500',
      600: 'border-orange-600',
      700: 'border-orange-700',
      800: 'border-orange-800',
      900: 'border-orange-900'
    },
    hover: {
      50: 'hover:bg-orange-50',
      100: 'hover:bg-orange-100',
      200: 'hover:bg-orange-200',
      300: 'hover:bg-orange-300',
      400: 'hover:bg-orange-400',
      500: 'hover:bg-orange-500',
      600: 'hover:bg-orange-600',
      700: 'hover:bg-orange-700',
      800: 'hover:bg-orange-800',
      900: 'hover:bg-orange-900'
    }
  },
  green: {
    50: 'bg-green-50',
    100: 'bg-green-100',
    200: 'bg-green-200',
    300: 'bg-green-300',
    400: 'bg-green-400',
    500: 'bg-green-500',
    600: 'bg-green-600',
    700: 'bg-green-700',
    800: 'bg-green-800',
    900: 'bg-green-900',
    text: {
      50: 'text-green-50',
      100: 'text-green-100',
      200: 'text-green-200',
      300: 'text-green-300',
      400: 'text-green-400',
      500: 'text-green-500',
      600: 'text-green-600',
      700: 'text-green-700',
      800: 'text-green-800',
      900: 'text-green-900'
    },
    border: {
      50: 'border-green-50',
      100: 'border-green-100',
      200: 'border-green-200',
      300: 'border-green-300',
      400: 'border-green-400',
      500: 'border-green-500',
      600: 'border-green-600',
      700: 'border-green-700',
      800: 'border-green-800',
      900: 'border-green-900'
    },
    hover: {
      50: 'hover:bg-green-50',
      100: 'hover:bg-green-100',
      200: 'hover:bg-green-200',
      300: 'hover:bg-green-300',
      400: 'hover:bg-green-400',
      500: 'hover:bg-green-500',
      600: 'hover:bg-green-600',
      700: 'hover:bg-green-700',
      800: 'hover:bg-green-800',
      900: 'hover:bg-green-900'
    }
  },
  red: {
    50: 'bg-red-50',
    100: 'bg-red-100',
    200: 'bg-red-200',
    300: 'bg-red-300',
    400: 'bg-red-400',
    500: 'bg-red-500',
    600: 'bg-red-600',
    700: 'bg-red-700',
    800: 'bg-red-800',
    900: 'bg-red-900',
    text: {
      50: 'text-red-50',
      100: 'text-red-100',
      200: 'text-red-200',
      300: 'text-red-300',
      400: 'text-red-400',
      500: 'text-red-500',
      600: 'text-red-600',
      700: 'text-red-700',
      800: 'text-red-800',
      900: 'text-red-900'
    },
    border: {
      50: 'border-red-50',
      100: 'border-red-100',
      200: 'border-red-200',
      300: 'border-red-300',
      400: 'border-red-400',
      500: 'border-red-500',
      600: 'border-red-600',
      700: 'border-red-700',
      800: 'border-red-800',
      900: 'border-red-900'
    },
    hover: {
      50: 'hover:bg-red-50',
      100: 'hover:bg-red-100',
      200: 'hover:bg-red-200',
      300: 'hover:bg-red-300',
      400: 'hover:bg-red-400',
      500: 'hover:bg-red-500',
      600: 'hover:bg-red-600',
      700: 'hover:bg-red-700',
      800: 'hover:bg-red-800',
      900: 'hover:bg-red-900'
    }
  },
  yellow: {
    50: 'bg-yellow-50',
    100: 'bg-yellow-100',
    200: 'bg-yellow-200',
    300: 'bg-yellow-300',
    400: 'bg-yellow-400',
    500: 'bg-yellow-500',
    600: 'bg-yellow-600',
    700: 'bg-yellow-700',
    800: 'bg-yellow-800',
    900: 'bg-yellow-900',
    text: {
      50: 'text-yellow-50',
      100: 'text-yellow-100',
      200: 'text-yellow-200',
      300: 'text-yellow-300',
      400: 'text-yellow-400',
      500: 'text-yellow-500',
      600: 'text-yellow-600',
      700: 'text-yellow-700',
      800: 'text-yellow-800',
      900: 'text-yellow-900'
    },
    border: {
      50: 'border-yellow-50',
      100: 'border-yellow-100',
      200: 'border-yellow-200',
      300: 'border-yellow-300',
      400: 'border-yellow-400',
      500: 'border-yellow-500',
      600: 'border-yellow-600',
      700: 'border-yellow-700',
      800: 'border-yellow-800',
      900: 'border-yellow-900'
    },
    hover: {
      50: 'hover:bg-yellow-50',
      100: 'hover:bg-yellow-100',
      200: 'hover:bg-yellow-200',
      300: 'hover:bg-yellow-300',
      400: 'hover:bg-yellow-400',
      500: 'hover:bg-yellow-500',
      600: 'hover:bg-yellow-600',
      700: 'hover:bg-yellow-700',
      800: 'hover:bg-yellow-800',
      900: 'hover:bg-yellow-900'
    }
  },
  indigo: {
    50: 'bg-indigo-50',
    100: 'bg-indigo-100',
    200: 'bg-indigo-200',
    300: 'bg-indigo-300',
    400: 'bg-indigo-400',
    500: 'bg-indigo-500',
    600: 'bg-indigo-600',
    700: 'bg-indigo-700',
    800: 'bg-indigo-800',
    900: 'bg-indigo-900',
    text: {
      50: 'text-indigo-50',
      100: 'text-indigo-100',
      200: 'text-indigo-200',
      300: 'text-indigo-300',
      400: 'text-indigo-400',
      500: 'text-indigo-500',
      600: 'text-indigo-600',
      700: 'text-indigo-700',
      800: 'text-indigo-800',
      900: 'text-indigo-900'
    },
    border: {
      50: 'border-indigo-50',
      100: 'border-indigo-100',
      200: 'border-indigo-200',
      300: 'border-indigo-300',
      400: 'border-indigo-400',
      500: 'border-indigo-500',
      600: 'border-indigo-600',
      700: 'border-indigo-700',
      800: 'border-indigo-800',
      900: 'border-indigo-900'
    },
    hover: {
      50: 'hover:bg-indigo-50',
      100: 'hover:bg-indigo-100',
      200: 'hover:bg-indigo-200',
      300: 'hover:bg-indigo-300',
      400: 'hover:bg-indigo-400',
      500: 'hover:bg-indigo-500',
      600: 'hover:bg-indigo-600',
      700: 'hover:bg-indigo-700',
      800: 'hover:bg-indigo-800',
      900: 'hover:bg-indigo-900'
    }
  },
  pink: {
    50: 'bg-pink-50',
    100: 'bg-pink-100',
    200: 'bg-pink-200',
    300: 'bg-pink-300',
    400: 'bg-pink-400',
    500: 'bg-pink-500',
    600: 'bg-pink-600',
    700: 'bg-pink-700',
    800: 'bg-pink-800',
    900: 'bg-pink-900',
    text: {
      50: 'text-pink-50',
      100: 'text-pink-100',
      200: 'text-pink-200',
      300: 'text-pink-300',
      400: 'text-pink-400',
      500: 'text-pink-500',
      600: 'text-pink-600',
      700: 'text-pink-700',
      800: 'text-pink-800',
      900: 'text-pink-900'
    },
    border: {
      50: 'border-pink-50',
      100: 'border-pink-100',
      200: 'border-pink-200',
      300: 'border-pink-300',
      400: 'border-pink-400',
      500: 'border-pink-500',
      600: 'border-pink-600',
      700: 'border-pink-700',
      800: 'border-pink-800',
      900: 'border-pink-900'
    },
    hover: {
      50: 'hover:bg-pink-50',
      100: 'hover:bg-pink-100',
      200: 'hover:bg-pink-200',
      300: 'hover:bg-pink-300',
      400: 'hover:bg-pink-400',
      500: 'hover:bg-pink-500',
      600: 'hover:bg-pink-600',
      700: 'hover:bg-pink-700',
      800: 'hover:bg-pink-800',
      900: 'hover:bg-pink-900'
    }
  },
  teal: {
    50: 'bg-teal-50',
    100: 'bg-teal-100',
    200: 'bg-teal-200',
    300: 'bg-teal-300',
    400: 'bg-teal-400',
    500: 'bg-teal-500',
    600: 'bg-teal-600',
    700: 'bg-teal-700',
    800: 'bg-teal-800',
    900: 'bg-teal-900',
    text: {
      50: 'text-teal-50',
      100: 'text-teal-100',
      200: 'text-teal-200',
      300: 'text-teal-300',
      400: 'text-teal-400',
      500: 'text-teal-500',
      600: 'text-teal-600',
      700: 'text-teal-700',
      800: 'text-teal-800',
      900: 'text-teal-900'
    },
    border: {
      50: 'border-teal-50',
      100: 'border-teal-100',
      200: 'border-teal-200',
      300: 'border-teal-300',
      400: 'border-teal-400',
      500: 'border-teal-500',
      600: 'border-teal-600',
      700: 'border-teal-700',
      800: 'border-teal-800',
      900: 'border-teal-900'
    },
    hover: {
      50: 'hover:bg-teal-50',
      100: 'hover:bg-teal-100',
      200: 'hover:bg-teal-200',
      300: 'hover:bg-teal-300',
      400: 'hover:bg-teal-400',
      500: 'hover:bg-teal-500',
      600: 'hover:bg-teal-600',
      700: 'hover:bg-teal-700',
      800: 'hover:bg-teal-800',
      900: 'hover:bg-teal-900'
    }
  }
};

// Função para obter classes de cor baseadas na configuração
export const getColorClasses = (colorName: string, shade: number = 600) => {
  const color = colorMap[colorName];
  if (!color) return colorMap.purple; // fallback para purple
  
  return {
    bg: color[shade] || color[600],
    text: color.text[shade] || color.text[600],
    border: color.border[shade] || color.border[600],
    hover: color.hover[shade] || color.hover[600]
  };
};

// Função para gerar gradiente
export const getGradientClasses = (color1: string, color2: string) => {
  return `bg-gradient-to-r from-${color1}-600 to-${color2}-600`;
};

// Função para gerar hover do gradiente
export const getGradientHoverClasses = (color1: string, color2: string) => {
  return `hover:from-${color1}-700 hover:to-${color2}-700`;
};

// Lista de cores disponíveis
export const availableColors = [
  { name: 'purple', label: 'Roxo', hex: '#9333ea' },
  { name: 'blue', label: 'Azul', hex: '#2563eb' },
  { name: 'orange', label: 'Laranja', hex: '#ea580c' },
  { name: 'green', label: 'Verde', hex: '#16a34a' },
  { name: 'red', label: 'Vermelho', hex: '#dc2626' },
  { name: 'yellow', label: 'Amarelo', hex: '#ca8a04' },
  { name: 'indigo', label: 'Índigo', hex: '#4f46e5' },
  { name: 'pink', label: 'Rosa', hex: '#db2777' },
  { name: 'teal', label: 'Verde-azulado', hex: '#0d9488' },
  { name: 'emerald', label: 'Esmeralda', hex: '#059669' },
  { name: 'cyan', label: 'Ciano', hex: '#0891b2' },
  { name: 'violet', label: 'Violeta', hex: '#7c3aed' },
  { name: 'fuchsia', label: 'Fúcsia', hex: '#c026d3' },
  { name: 'rose', label: 'Rosa Claro', hex: '#e11d48' },
  { name: 'amber', label: 'Âmbar', hex: '#d97706' },
  { name: 'lime', label: 'Lima', hex: '#65a30d' },
  { name: 'sky', label: 'Azul Céu', hex: '#0284c7' }
];