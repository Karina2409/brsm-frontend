import {definePreset} from '@primeuix/themes';
import Material from "@primeng/themes/material";
import {providePrimeNG} from 'primeng/config';

export const primeThemeProvider = providePrimeNG({
  theme: {
    preset: definePreset(Material, {
      semantic: {
        primary: {
          50: '{blue.50}',
          100: '{blue.100}',
          200: '{blue.200}',
          300: '{blue.300}',
          400: '{blue.400}',
          500: '{blue.500}',
          600: '{blue.600}',
          700: '{blue.700}',
          800: '{blue.800}',
          900: '{blue.900}',
          950: '{blue.950}'
        }
      },
      components: {
        menubar: {
          root: {
            background: '{primary.950}',
            borderColor: 'none',
            borderRadius: '0',
            color: 'white',
            gap: '1.2rem',
            padding: '1.2rem',
            transitionDuration: '0.3s'
          },
          item: {
            focusBackground: "{primary.950}",
            activeBackground: "{primary.950}",
            color: "white",
            focusColor: "{primary.100}",
            activeColor: "{primary.100}",
            gap: '0.8rem',
            icon: {
              color: "white",
              focusColor: "{primary.100}",
              activeColor: "{primary.100}"
            }
          },
          submenu: {
            padding: "1.2rem",
            gap: "1.2rem",
            background: "{primary.950}",
            borderColor: "black",
            borderRadius: "0"
          },
          mobileButton: {
            color: "white",
            hoverColor: "{primary.100}",
            hoverBackground: "{primary.950}"
          },
          css: `
            .p-menubar-item-link-active {
              color: var(--p-primary-200);
              .p-menubar-item-icon {
                color: var(--p-primary-200);
              }
            }
          `
        }
      }
    }),
    options: {
      darkModeSelector: false
    }
  },
  ripple: true
});
