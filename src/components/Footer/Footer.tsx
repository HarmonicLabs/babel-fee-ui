import { Component } from 'solid-js';
import { Box, Grid, Typography, useTheme } from '@suid/material';

const Footer: Component = () => {
  const theme = useTheme();
  const columns = [
    { title: 'Features', links: ['Tx Builders', 'Typescript', 'Decentralization'] },
    { title: 'Resources', links: ['Docs', 'Github' ] },
    { title: 'Community', links: [] },
  ];

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        padding: '40px 20px',
        marginTop: 'auto',
        borderTopLeftRadius: '26px',
        borderTopRightRadius: '26px',
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Box sx={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: theme.palette.mode === "light" ? "#F1F1F1" : "#000000", 
                        border:"1px solid #FF0000",
                        boxShadow: "0 0 10px 5px rgba(255, 0, 0, 0.7)",
                        marginBottom: '10px', 
                        backgroundImage: `url('https://www.harmoniclabs.tech/assets/logo/HarmonicLogoRedStrokeTransparentBg.svg')`,
                        borderRadius: "50%",
                      }} 
              /> 
              <Typography variant="h6">
                Harmonic Labs
              </Typography>
            </Box>
          <Typography variant="body2" color="textSecondary">
            A decentralized solution for all.
          </Typography>
        </Grid>
        {columns.map((column, index) => (
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              {column.title}
            </Typography>
            {column.links.map((link, linkIndex) => (
              <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                {link}
              </Typography>
            ))}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Footer;