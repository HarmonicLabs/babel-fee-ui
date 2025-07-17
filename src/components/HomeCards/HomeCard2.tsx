import { Card, CardContent, CardActions, Button, Typography } from '@suid/material';
import { Component } from 'solid-js';
import { A } from '@solidjs/router';

const HomeCard2: Component = () => {
  return (
    <Card sx={{ height: '100%', boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Home Card 2
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Reactivity of SoildJS
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={A} href="/" sx={{ ml: 'auto' }}>
          Button
        </Button>
      </CardActions>
    </Card>
  );
};

export default HomeCard2;