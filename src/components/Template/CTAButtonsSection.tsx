import { Component } from 'solid-js';
import { Box, Button, useTheme } from '@suid/material';

const CTAButtonsSection: Component = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        backgroundColor: theme.palette.background.paper,
        flexGrow: 7
      }}
    >
      <Button variant="text" color="primary">
        Link 1
      </Button>
      <Button variant="text">
        Link 2
      </Button>
      <Button variant="text">
        Link 3
      </Button>
    </Box>
  );
};

export default CTAButtonsSection;