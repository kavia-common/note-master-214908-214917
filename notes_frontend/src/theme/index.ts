import { Colors } from './colors';

export const Theme = {
  colors: Colors,
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 14
  },
  typography: {
    title: {
      fontSize: 22,
      fontWeight: '700' as const,
      color: Colors.text
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      color: Colors.text
    },
    subtle: {
      fontSize: 14,
      fontWeight: '400' as const,
      color: Colors.secondary
    }
  },
  components: {
    card: {
      backgroundColor: Colors.surface,
      borderColor: Colors.border
    },
    input: {
      backgroundColor: '#000000',
      borderColor: Colors.border,
      textColor: Colors.text,
      placeholderColor: '#888888'
    },
    button: {
      backgroundColor: Colors.primary,
      textColor: '#000000',
      borderColor: Colors.primary
    },
    modal: {
      backdrop: 'rgba(0,0,0,0.7)',
      backgroundColor: Colors.surface,
      borderColor: Colors.border
    },
    listItem: {
      backgroundColor: '#0d0d0d',
      borderColor: Colors.border
    }
  }
};

export type ThemeType = typeof Theme;
