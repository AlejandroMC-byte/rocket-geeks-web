/**
 * Configuración de colores y tema personalizable
 * Cambia estos valores para personalizar la tienda para cada cliente
 */

export const themeConfig = {
  // Colores principales (se pueden sobrescribir desde empresa.json)
  colors: {
    primary: '#000000',
    secondary: '#1d1d1f',
    accent: '#0071e3',
    background: '#ffffff',
    text: '#1d1d1f',
    textLight: '#86868b',
    border: '#d2d2d7',
    success: '#30d158',
    warning: '#ff9f0a',
    error: '#ff3b30',
  },

  // Tipografía
  fonts: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    heading: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
  },

  // Espaciado
  spacing: {
    section: '80px',
    container: '1200px',
  },

  // Animaciones
  animations: {
    duration: {
      fast: 0.2,
      normal: 0.3,
      slow: 0.5,
    },
    easing: {
      default: [0.4, 0, 0.2, 1],
      smooth: [0.25, 0.1, 0.25, 1],
    },
  },

  // Breakpoints (ya están en Tailwind, pero aquí como referencia)
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

export type ThemeConfig = typeof themeConfig;
