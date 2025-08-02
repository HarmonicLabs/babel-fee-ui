import { Component } from 'solid-js';
import { Box, Typography, Button, useTheme } from '@suid/material';
import { ThreeCoinScene } from "./ThreeCoinScene";
import { A } from "@solidjs/router";
import { ImPacman } from 'solid-icons/im'

const HeroSection: Component = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: '#000000', // Black background
        padding: '40px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '80%',
        margin: 'auto auto',
        borderRadius: '46px',
        minHeight: '700px',
      }}
    >
      <Box sx={{ maxWidth: '50%', padding: '20px', color: '#FFFFFF' }}>
        <Typography variant="h2" align="left" gutterBottom>
          Discover Babel Fees on Cardano
        </Typography>
        <Typography variant="body1" align="left" gutterBottom>
          Smart Contracts Powering Efficient Babel Fee Transactions
        </Typography>
        <Typography variant="body1" align="left" gutterBottom>
            Try our Demo on testnet right now
          </Typography>
        <Box sx={{ display: 'flex', gap: '20px', marginTop: '20px' }}>

          <Button variant="text" color="primary" component={A} href="/demo" endIcon={<ImPacman />} sx={{ margin: "-5 0"}}>
            Demo
          </Button>
        </Box>
        
      </Box>
      <Box
        sx={{
          width: '40%',
          height: '100%',
          backgroundColor: '#000000', // Match scene background
          borderRadius: '12px',
          marginRight: '5%',
          overflow: 'hidden',
        }}
      >
        <ThreeCoinScene />
      </Box>
    </Box>
  );
};

const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

export default HeroSection;