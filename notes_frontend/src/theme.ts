export const theme = {
  colors: {
    primary: '#2563EB', // blue
    secondary: '#F59E0B', // amber
    success: '#10B981',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    textMuted: '#6B7280',
    border: '#E5E7EB',
    shadow: 'rgba(0,0,0,0.08)',
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
  spacing: (n: number) => n * 8,
  shadow: {
    card: {
      shadowColor: 'rgba(0,0,0,0.15)',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 10,
      elevation: 3,
    },
  },
};
