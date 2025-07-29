import { Component } from 'solid-js';
import { Box, Typography, Button, useTheme } from '@suid/material';

const AnnouncementBanner: Component = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.neonBlue?.main || '#FFA500',
        color: theme.palette.text.primary,
        padding: '20px',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        margin: '20px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Box sx={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'black' }} /> {/* Placeholder logo */}
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            The Future Starts Here
          </Typography>
          <Typography variant="body1">
            Start exploring your platform today — designed for the next era.
          </Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        sx={{ backgroundColor: '#FFFFFF', color: '#000000', borderRadius: '8px' }}
      >
        Start Now
      </Button>
    </Box>
  );
};

export default AnnouncementBanner;