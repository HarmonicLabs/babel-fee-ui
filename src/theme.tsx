import { createTheme } from '@suid/material';

declare module '@suid/material/styles' {
  interface Palette {
    accent: {
      main: string;
    };
    neonCyan: {
      main: string;
    };
    neonPink: {
      main: string;
    };
    neonBlue: {
      main: string;
    };
    redGradient?: {
      main: string;
    };
  }

  interface PaletteOptions {
    accent?: {
      main: string;
    };
    neonCyan?: {
      main: string;
    };
    neonPink?: {
      main: string;
    };
    neonBlue?: {
      main: string;
    };
    redGradient?: {
      main: string;
    };
  }
}

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#673AB7',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#9575CD',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F8F8F8',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      secondary: '#7986CB',
    },
    accent: {
      main: '#FFD700',
    },
    neonBlue: {
      main: '#00BFFF', // Deep Sky Blue
    },
    redGradient: {
      main: 'linear-gradient(to bottom, #DC143C, rgba(220, 20, 60, 0.7))', // Improved gradient direction
    },
  },
  typography: {
    fontFamily: '"Orbitron", "Roboto", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 0 10px rgba(0, 191, 255, 0.3)',
          transition: 'box-shadow 0.3s ease, transform 0.2s ease',
          '&:hover': {
            boxShadow: '0 0 20px rgba(0, 191, 255, 0.5)',
            transform: 'scale(1.05)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #673AB7, #9575CD)',
        },
        textPrimary: {
          backgroundColor: 'transparent',
          color: 'inherit',
          border: 'none',
          borderRadius: 0,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          transition: 'text-shadow 0.3s ease',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          border: '1px solid rgba(149, 117, 205, 0.2)',
          borderRadius: '16px',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#673AB7',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#9575CD',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#161616',
      paper: '#000000',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B39DDB',
    },
    accent: {
      main: '#FFD700',
    },
    neonCyan: {
      main: '#00FFFF',
    },
    neonPink: {
      main: '#FF00FF',
    },
    neonBlue: {
      main: '#00BFFF',
    },
    redGradient: { // Fixed capitalization
      main: 'linear-gradient(to bottom, #DC143C, rgba(220, 20, 60, 0.7))',
    },
  },
  typography: {
    fontFamily: '"Orbitron", "Roboto", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 0 10px rgba(0, 191, 255, 0.3)',
          transition: 'box-shadow 0.3s ease, transform 0.2s ease',
          '&:hover': {
            boxShadow: '0 0 20px rgba(0, 191, 255, 0.5)',
            transform: 'scale(1.05)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #673AB7, #00FFFF)',
        },
        textPrimary: {
          backgroundColor: 'transparent',
          color: 'inherit',
          border: 'none',
          borderRadius: 0,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#000000',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          transition: 'text-shadow 0.3s ease',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
          border: '1px solid rgba(149, 117, 205, 0.3)',
          borderRadius: '16px',
        },
      },
    },
  },
});