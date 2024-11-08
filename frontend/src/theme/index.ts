import { createTheme } from '@mui/material/styles';
import { designTokens } from './designSystem';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: designTokens.colors.brand.primary,
      light: designTokens.colors.brand.secondary,
      dark: designTokens.colors.brand.tertiary,
    },
    secondary: {
      main: designTokens.colors.brand.secondary,
    },
    success: {
      main: designTokens.colors.semantic.success,
    },
    warning: {
      main: designTokens.colors.semantic.warning,
    },
    error: {
      main: designTokens.colors.semantic.error,
    },
    info: {
      main: designTokens.colors.semantic.info,
    },
    text: {
      primary: designTokens.colors.neutral[900],
      secondary: designTokens.colors.neutral[600],
    },
    background: {
      default: designTokens.colors.neutral[50],
      paper: designTokens.colors.neutral[0],
    },
    divider: designTokens.colors.neutral[200],
  },
  typography: {
    fontFamily: designTokens.typography.fontFamilies.body,
    h1: {
      fontFamily: designTokens.typography.fontFamilies.display,
      fontSize: designTokens.typography.fontSizes['5xl'],
      fontWeight: designTokens.typography.fontWeights.extrabold,
      lineHeight: designTokens.typography.lineHeights.tight,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: designTokens.typography.fontFamilies.display,
      fontSize: designTokens.typography.fontSizes['4xl'],
      fontWeight: designTokens.typography.fontWeights.bold,
      lineHeight: designTokens.typography.lineHeights.tight,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: designTokens.typography.fontFamilies.display,
      fontSize: designTokens.typography.fontSizes['3xl'],
      fontWeight: designTokens.typography.fontWeights.bold,
      lineHeight: designTokens.typography.lineHeights.tight,
    },
    h4: {
      fontFamily: designTokens.typography.fontFamilies.display,
      fontSize: designTokens.typography.fontSizes['2xl'],
      fontWeight: designTokens.typography.fontWeights.semibold,
      lineHeight: designTokens.typography.lineHeights.tight,
    },
    h5: {
      fontFamily: designTokens.typography.fontFamilies.display,
      fontSize: designTokens.typography.fontSizes.xl,
      fontWeight: designTokens.typography.fontWeights.semibold,
      lineHeight: designTokens.typography.lineHeights.tight,
    },
    h6: {
      fontFamily: designTokens.typography.fontFamilies.display,
      fontSize: designTokens.typography.fontSizes.lg,
      fontWeight: designTokens.typography.fontWeights.semibold,
      lineHeight: designTokens.typography.lineHeights.tight,
    },
    body1: {
      fontSize: designTokens.typography.fontSizes.md,
      lineHeight: designTokens.typography.lineHeights.normal,
    },
    body2: {
      fontSize: designTokens.typography.fontSizes.sm,
      lineHeight: designTokens.typography.lineHeights.normal,
    },
    button: {
      textTransform: 'none',
      fontWeight: designTokens.typography.fontWeights.medium,
    },
  },
  shape: {
    borderRadius: parseInt(designTokens.radii.lg),
  },
  shadows: [
    'none',
    designTokens.shadows.sm,
    designTokens.shadows.md,
    designTokens.shadows.lg,
    designTokens.shadows.xl,
    designTokens.shadows['2xl'],
    designTokens.shadows['3xl'],
    designTokens.shadows.lg,
    designTokens.shadows.lg,
    designTokens.shadows.lg,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows['2xl'],
    designTokens.shadows['2xl'],
    designTokens.shadows['2xl'],
    designTokens.shadows['2xl'],
    designTokens.shadows['2xl'],
    designTokens.shadows['3xl'],
    designTokens.shadows['3xl'],
    designTokens.shadows['3xl'],
    designTokens.shadows['3xl'],
    designTokens.shadows['3xl'],
    designTokens.shadows['3xl'],
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.radii.lg,
          padding: `${designTokens.spacing.sm} ${designTokens.spacing.lg}`,
          transition: designTokens.transitions.default,
          fontWeight: designTokens.typography.fontWeights.semibold,
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          boxShadow: designTokens.shadows.md,
          '&:hover': {
            boxShadow: designTokens.shadows.lg,
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.radii.xl,
          boxShadow: designTokens.shadows.sm,
          border: `1px solid ${designTokens.colors.neutral[200]}`,
          transition: designTokens.transitions.default,
          '&:hover': {
            boxShadow: designTokens.shadows.md,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.radii.md,
          fontWeight: designTokens.typography.fontWeights.medium,
          fontSize: designTokens.typography.fontSizes.sm,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: designTokens.radii.lg,
            '& fieldset': {
              borderColor: designTokens.colors.neutral[300],
            },
            '&:hover fieldset': {
              borderColor: designTokens.colors.neutral[400],
            },
            '&.Mui-focused fieldset': {
              borderColor: designTokens.colors.brand.primary,
            },
          },
        },
      },
    },
  },
});

export default theme; 