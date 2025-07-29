import { Component } from 'solid-js';
import { Box, Typography, Button, useTheme } from '@suid/material';

const AnnouncementBanner: Component = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: theme.palette.redGradient?.main || '#FF0000', // Fallback to solid red if gradient fails
        color: theme.palette.text.primary,
        padding: '20px',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        margin: '20px',
        // Add gradient fallback with CSS if needed
        backgroundImage: theme.palette.redGradient?.main,
        backgroundColor: '#FF0000', // Solid fallback
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Box sx={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'black' }} /> {/* Placeholder logo */}
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            For this demo you will need MIN token which is available from the Minswap Dex at the following link.
            <br />
            <a
              href="https://testnet-preprod.minswap.org/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: theme.palette.neonBlue.main, 'text-decoration': 'underline' }}
            >
              Preprod Minswap
            </a>
          </Typography>
          <Typography variant="body1">
            
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AnnouncementBanner;