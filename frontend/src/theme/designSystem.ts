// Design Tokens
export const designTokens = {
  colors: {
    // Brand Colors
    brand: {
      primary: '#3366FF',
      secondary: '#00B8D9',
      tertiary: '#6554C0',
      accent: '#FF5630',
    },
    // Semantic Colors
    semantic: {
      success: '#36B37E',
      warning: '#FFAB00',
      error: '#FF5630',
      info: '#00B8D9',
    },
    // Neutrals
    neutral: {
      900: '#101828', // Heading text
      800: '#1D2939', // Body text
      700: '#344054', // Secondary text
      600: '#475467', // Tertiary text
      500: '#667085', // Placeholder text
      400: '#98A2B3', // Disabled text
      300: '#D0D5DD', // Border
      200: '#E4E7EC', // Input background
      100: '#F2F4F7', // Page background
      50: '#F9FAFB', // Surface background
      0: '#FFFFFF',
    },
    // Gradients
    gradients: {
      primary: 'linear-gradient(135deg, #3366FF 0%, #6554C0 100%)',
      secondary: 'linear-gradient(135deg, #00B8D9 0%, #3366FF 100%)',
      accent: 'linear-gradient(135deg, #FF5630 0%, #FF8B6B 100%)',
    },
  },
  spacing: {
    xxs: '4px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },
  typography: {
    fontFamilies: {
      display: 'SF Pro Display',
      body: 'Inter',
      mono: 'SF Mono',
    },
    fontSizes: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
      '6xl': '60px',
    },
    fontWeights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  shadows: {
    sm: '0px 1px 2px rgba(16, 24, 40, 0.05)',
    md: '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)',
    lg: '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
    xl: '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
    '2xl': '0px 24px 48px -12px rgba(16, 24, 40, 0.18)',
    '3xl': '0px 32px 64px -12px rgba(16, 24, 40, 0.14)',
  },
  radii: {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '20px',
    '3xl': '24px',
    full: '9999px',
  },
  transitions: {
    default: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  zIndices: {
    hide: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
  },
};

// Mixins
export const mixins = {
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  absoluteCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  textEllipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  glass: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  cardHover: {
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: designTokens.shadows.xl,
    },
  },
};

// Breakpoints
export const breakpoints = {
  xs: '0px',
  sm: '600px',
  md: '900px',
  lg: '1200px',
  xl: '1536px',
}; 