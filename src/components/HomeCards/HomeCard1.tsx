import { Card, CardContent, CardActions, Button, Typography } from '@suid/material';
import { Component } from 'solid-js';

const HomeCard1: Component = () => {
  return (
    <Card sx={{ height: '100%', boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Home Card 1
        </Typography>
        <Typography variant="body2" color="text.secondary">
          bootstrap a dapp in seconds.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" sx={{ ml: 'auto' }}>
          Start Building
        </Button>
      </CardActions>
    </Card>
  );
};

export default HomeCard1;