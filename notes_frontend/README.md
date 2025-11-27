# Notes Frontend (Monochrome Theme)

This React Native (Expo) app is configured to use a black-and-white monochrome theme.

- Background / Surface: #111111
- Text: #FFFFFF
- Primary (buttons/links): #FFFFFF
- Secondary (accents/subtle text): #CCCCCC
- Success/Error: #FFFFFF (mapped to monochrome)
- Gradients: removed (strict grayscale)

Centralized theme:
- src/theme/colors.ts defines color constants.
- src/theme/index.ts derives component tokens (inputs, buttons, modal, list item) and spacing.
- Components under src/components use the theme tokens.

Update the theme in one place by editing src/theme/colors.ts and src/theme/index.ts.

Note: Replace assets in ./assets with proper images for production builds.
