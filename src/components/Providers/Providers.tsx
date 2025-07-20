import { Card, CardContent, CardActions, Button, Typography, Grid } from '@suid/material';
import { Component } from 'solid-js';

import { ProviderInfoModal } from './ProviderInfoModal';

const providers = [
  {
    providerName: 'Harmonic Babel Provider',
    description: 'We provide a Babel fee service that allows you to pay fees in Cardano native tokens.',
    url: 'http://localhost:3000',
  }
  // Add more providers as needed
];


const Providers: Component = () => {


  return (
    <>
      <Grid container spacing={4} sx={{ marginTop: "20px" }}>
      {
        providers.map((provider, index) => (
          <Grid item xs={6} md={6}>
            <Card sx={{ height: '100%', boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)', marginBottom: '20px' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {provider.providerName}
                </Typography>
                <hr />
                <Typography variant="body2" color="text.secondary">
                  {provider.description}
                </Typography>
              </CardContent>
              <hr />
              <CardActions>
                <ProviderInfoModal providerName={provider.providerName} url={provider.url}/>
              </CardActions>
            </Card>
          </Grid>
        ))
      }
      </Grid>
    </>
  )
};

export default Providers;