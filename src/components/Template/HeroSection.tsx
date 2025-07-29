import { Component } from 'solid-js';
import { Box, Typography, Button, useTheme } from '@suid/material';

const HeroSection: Component = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: "#000000",
        padding: '40px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '80%',
        margin: '20px auto',
        borderRadius: '46px',
        minHeight: '700px',
      }}
    >
      <Box sx={{ maxWidth: '50%', padding: '20px' , color: "#FFFFFF"}}>
        <Typography variant="h1" align="left" gutterBottom>
            Welcome to Your Platform
        </Typography>
        <Typography variant="body1" align="left" gutterBottom>
            A decentralized solution for the future — seamless and efficient.
        </Typography>
        <Box sx={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
          >
            Get Started
          </Button>
          <Button
            variant="text"
            sx={{ textDecoration: 'underline' }}
          >
            Learn More
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          width: '40%',
          height: '300px',
          backgroundColor: '#CCCCCC',
          borderRadius: '12px',
        }}
      >
        {/* Placeholder for graphic */}
      </Box>
    </Box>
  );
};

export default HeroSection;