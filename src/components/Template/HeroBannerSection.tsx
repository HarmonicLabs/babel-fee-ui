import { Component } from 'solid-js';
import { Box, Typography, Button, useTheme } from '@suid/material';

const HeroBannerSection: Component = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: 'linear-gradient(90deg, #FFE4D6, #F5F5F5, #E0E0E0)', // Adjusted gradient to match the image
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
      <Box sx={{ maxWidth: '50%', padding: '20px' , color: "#000000", margin: "0 auto" }}>
        <Box sx={{ width: "100%", gap: '20px', margin: "20px auto" }}>
            <Typography variant="h2" align="center" gutterBottom>
                Welcome to Your Platform
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
                A decentralized solution for the future — seamless and efficient.
            </Typography>
        </Box>
        <Box sx={{ width: "50%", display: 'flex', gap: '20px', margin: "20px auto" }}>
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
    </Box>
  );
};

export default HeroBannerSection;