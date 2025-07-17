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
    energyOrange: {
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
    energyOrange?: {
      main: string;
    };
  }
}

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1A237E',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#7986CB',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A237E',
      secondary: '#7986CB',
    },
    accent: {
      main: '#FFD700',
    },
    neonCyan: {
      main: '#ADD8E6', // Softer light blue for light mode
    },
    neonPink: {
      main: '#FFB6C1', // Softer light pink for light mode
    },
    energyOrange: {
      main: '#FFA07A', // Softer light salmon for light mode
    },
  },
  typography: {
    fontFamily: '"Orbitron", "Roboto", sans-serif',
    h1: {
      fontWeight: 700,
      textShadow: '0 0 5px #00FFFF',
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
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)',
          transition: 'box-shadow 0.3s ease, transform 0.2s ease',
          '&:hover': {
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
            transform: 'scale(1.05)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #1A237E, #7986CB)',
        },
      },
    },
    MuiCard: {
      root: {
        backgroundColor: '#FFFFFF',
        backgroundImage: 'radial-gradient(circle, rgba(255, 215, 0, 0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(103, 58, 183, 0.2)',
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(to right, #1A237E, #7986CB)',
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
          border: '1px solid rgba(121, 134, 203, 0.2)',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0D1B2A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#1A237E',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0BEC5',
    },
    accent: {
      main: '#FFD700',
    },
    neonCyan: {
      main: '#00FFFF', // Bright cyan for dark mode
    },
    neonPink: {
      main: '#FF00FF', // Bright pink for dark mode
    },
    energyOrange: {
      main: '#FFA500', // Bright orange for dark mode
    },
  },
  typography: {
    fontFamily: '"Orbitron", "Roboto", sans-serif',
    h1: {
      fontWeight: 700,
      textShadow: '0 0 5px #00FFFF',
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
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)',
          transition: 'box-shadow 0.3s ease, transform 0.2s ease',
          '&:hover': {
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
            transform: 'scale(1.05)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #0D1B2A, #1A237E)',
        },
      },
    },
    MuiCard: {
      root: {
        backgroundColor: '#1E1E1E',
        backgroundImage: 'radial-gradient(circle, rgba(255, 215, 0, 0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(103, 58, 183, 0.3)',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(to right, #0D1B2A, #1A237E)',
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
          border: '1px solid rgba(26, 35, 126, 0.3)',
        },
      },
    },
  },
});