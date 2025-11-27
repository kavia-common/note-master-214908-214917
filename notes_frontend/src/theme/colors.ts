export const Colors = {
  // Monochrome palette
  background: '#111111', // dark readable background
  surface: '#111111',
  text: '#FFFFFF',
  primary: '#FFFFFF', // primary accents (buttons/links)
  secondary: '#CCCCCC', // subtle accents
  border: '#222222', // subtle divider
  muted: '#999999',

  // Status mapped to monochrome per instruction
  success: '#FFFFFF',
  error: '#FFFFFF',

  // Shadows (grayscale)
  shadow: 'rgba(0,0,0,0.6)'
} as const;

export type ColorKeys = keyof typeof Colors;
