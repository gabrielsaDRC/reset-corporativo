import React, { useState, useRef, useEffect } from 'react';
import { Check, Palette, X } from 'lucide-react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  disabled?: boolean;
}

// Função para converter HSV para RGB
const hsvToRgb = (h: number, s: number, v: number) => {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  
  let r = 0, g = 0, b = 0;
  
  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  
  return { r, g, b };
};

// Função para converter RGB para HEX
const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// Função para converter HEX para RGB
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
};

// Função para converter RGB para HSV
const rgbToHsv = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  
  let h = 0;
  if (diff !== 0) {
    if (max === r) {
      h = ((g - b) / diff) % 6;
    } else if (max === g) {
      h = (b - r) / diff + 2;
    } else {
      h = (r - g) / diff + 4;
    }
  }
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  
  const s = max === 0 ? 0 : diff / max;
  const v = max;
  
  return { h, s, v };
};

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
  disabled = false
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(1);
  const [brightness, setBrightness] = useState(1);
  const [customColor, setCustomColor] = useState('#9333ea');
  
  const colorAreaRef = useRef<HTMLDivElement>(null);
  const hueSliderRef = useRef<HTMLDivElement>(null);
  
  // Inicializar com a cor atual
  useEffect(() => {
    // Se o valor for um hex válido, usar diretamente
    const currentColorHex = value.startsWith('#') ? value : '#9333ea';
    setCustomColor(currentColorHex);
    
    const rgb = hexToRgb(currentColorHex);
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    setHue(hsv.h);
    setSaturation(hsv.s);
    setBrightness(hsv.v);
  }, [value]);

  // Atualizar cor customizada quando HSV mudar
  useEffect(() => {
    const rgb = hsvToRgb(hue, saturation, brightness);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    setCustomColor(hex);
  }, [hue, saturation, brightness]);

  const handleColorAreaClick = (e: React.MouseEvent) => {
    if (!colorAreaRef.current) return;
    
    const rect = colorAreaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newSaturation = x / rect.width;
    const newBrightness = 1 - (y / rect.height);
    
    setSaturation(Math.max(0, Math.min(1, newSaturation)));
    setBrightness(Math.max(0, Math.min(1, newBrightness)));
  };

  const handleHueSliderClick = (e: React.MouseEvent) => {
    if (!hueSliderRef.current) return;
    
    const rect = hueSliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newHue = (x / rect.width) * 360;
    
    setHue(Math.max(0, Math.min(360, newHue)));
  };

  const handleCustomColorApply = () => {
    // Sempre usar o valor hex para cores customizadas
    onChange(customColor);
    setShowAdvanced(false);
  };

  // Garantir que o valor exibido seja sempre um hex válido
  const displayColor = value.startsWith('#') ? value : '#9333ea';

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label}
      </label>
      
      {/* Preview da Cor Atual e Botão para Abrir Seletor */}
      <div className="flex items-center gap-3 mb-4">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          disabled={disabled}
          className={`flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg transition-colors ${
            disabled 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-gray-50 cursor-pointer'
          }`}
        >
          <div 
            className="w-8 h-8 rounded border-2 border-gray-300 flex-shrink-0"
            style={{ backgroundColor: displayColor }}
          />
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            <span className="text-sm">Escolher Cor</span>
          </div>
        </button>
        
        {/* Código da Cor */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 font-mono">
            {displayColor.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Seletor de Cor Avançado */}
      {showAdvanced && !disabled && (
        <div className="mt-4 p-6 bg-gray-50 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-700">Escolher Cor Personalizada</h4>
            <button
              type="button"
              onClick={() => setShowAdvanced(false)}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          
          {/* Área de Seleção de Cor */}
          <div className="space-y-4">
            {/* Quadrado de Saturação/Brilho */}
            <div className="relative">
              <div
                ref={colorAreaRef}
                className="w-full h-48 rounded-lg cursor-crosshair border border-gray-300"
                style={{
                  background: `
                    linear-gradient(to top, #000000, transparent),
                    linear-gradient(to right, #ffffff, hsl(${hue}, 100%, 50%))
                  `
                }}
                onClick={handleColorAreaClick}
              >
                {/* Indicador de posição */}
                <div
                  className="absolute w-4 h-4 rounded-full shadow-lg transform -translate-x-2 -translate-y-2 pointer-events-none"
                  style={{
                    left: `${saturation * 100}%`,
                    top: `${(1 - brightness) * 100}%`,
                    border: '2px solid ' + (brightness > 0.5 ? '#000000' : '#ffffff'),
                    backgroundColor: brightness > 0.5 ? '#ffffff' : '#000000'
                  }}
                />
              </div>
            </div>
            
            {/* Slider de Matiz */}
            <div className="relative">
              <div
                ref={hueSliderRef}
                className="w-full h-6 rounded-lg cursor-pointer border border-gray-300"
                style={{
                  background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)'
                }}
                onClick={handleHueSliderClick}
              >
                {/* Indicador de matiz */}
                <div
                  className="absolute w-4 h-8 bg-white border-2 border-gray-400 rounded transform -translate-x-2 -translate-y-1 shadow-lg pointer-events-none"
                  style={{ left: `${(hue / 360) * 100}%` }}
                />
              </div>
            </div>
            
            {/* Preview e Input Manual */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div 
                  className="w-12 h-12 rounded-lg border-2 border-gray-300 shadow-sm"
                  style={{ backgroundColor: customColor }}
                />
                <div>
                  <input
                    type="text"
                    value={customColor}
                    onChange={(e) => {
                      const newColor = e.target.value;
                      if (/^#[0-9A-F]{6}$/i.test(newColor)) {
                        setCustomColor(newColor);
                        const rgb = hexToRgb(newColor);
                        const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
                        setHue(hsv.h);
                        setSaturation(hsv.s);
                        setBrightness(hsv.v);
                      } else {
                        setCustomColor(newColor);
                      }
                    }}
                    className="w-24 px-2 py-1 text-sm border border-gray-300 rounded font-mono"
                    placeholder="#000000"
                  />
                </div>
              </div>
              
              <button
                type="button"
                onClick={handleCustomColorApply}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
              >
                Aplicar Cor
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-2">
        Cor selecionada: <span className="font-medium font-mono">
          {displayColor.toUpperCase()}
        </span>
      </p>
    </div>
  );
};