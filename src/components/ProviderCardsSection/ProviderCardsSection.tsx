import { Component, For } from 'solid-js';
import { Grid, Card, CardContent, Typography, Box, useTheme, CardActions } from '@suid/material';
import { ProviderInfoModal } from './ProviderInfoModal';

const ProviderCardsSection: Component = () => {
  const theme = useTheme();
  const providers = [
    {
      providerName: 'Harmonic Babel Provider',
      description: 'We provide a Babel fee service that allows you to pay fees in Cardano native tokens.',
      // url: 'https://babelfeesapi.onchainapps.io',
      url: "http://localhost:3000",
      image: 'https://www.harmoniclabs.tech/assets/logo/HarmonicLogoRedStrokeTransparentBg.svg'
    }
    // Add more providers as needed
  ];
  
  return (
    <>
    <Box sx={{ backgroundColor: theme.palette.background.default, padding: '40px 20px', width: '80%', margin: '0 auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Babel Fee Providers(Demo)
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <For each={providers}>
          {(provider) => (
            <Grid item xs={12} sm={6} md={3}>
                <Card style="border-radius: 26px" sx={{background: theme.palette.mode === "light" ? "#F1F1F1" : "#000000" }} >
                  <CardContent class={theme.palette.mode === "light" ? "MuiCardLight" : "MuiCardDark" }>
                    <Box sx={{ 
                      width: '40px', 
                      height: '40px', 
                      backgroundColor: theme.palette.mode === "light" ? "#F1F1F1" : "#000000", 
                      border:"1px solid #FF0000",
                      boxShadow: "0 0 10px 5px rgba(255, 0, 0, 0.7)",
                      marginBottom: '10px', 
                      backgroundImage: `url(${provider.image})`,
                      borderRadius: "50%",
                    }} /> 
                    <Typography variant="h6" gutterBottom>
                      {provider.providerName}
                    </Typography>
                    <Typography variant="body2">
                      {provider.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <ProviderInfoModal providerName={provider.providerName} url={provider.url}/>
                  </CardActions>
                </Card>
            </Grid>
          )}
        </For>
      </Grid>
    </Box>
    </>
  )
};

export default ProviderCardsSection;