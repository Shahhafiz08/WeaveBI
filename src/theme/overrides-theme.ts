import { createPaletteChannel } from './styles';

import type { ThemeUpdateOptions } from './types';

// ----------------------------------------------------------------------

export const overridesTheme: ThemeUpdateOptions = {
  colorSchemes: {
    light: {
      palette: {
        primary: createPaletteChannel({
          lighter: '#E4DCFD',
          light: '#A996F8',
          main: '#2E5077',
          dark: '#243e5c',
          darker: '#180F6F',
          contrastText: '#FFFFFF',
        }),
      },
    },
  },
  shape: { borderRadius: 10 },
};
