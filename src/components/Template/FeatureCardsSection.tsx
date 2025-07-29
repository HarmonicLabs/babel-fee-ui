import { Component, For } from 'solid-js';
import { Grid, Card, CardContent, Typography, Box, useTheme } from '@suid/material';

const FeatureCardsSection: Component = () => {
  const theme = useTheme();
  const features = [
    { title: 'Feature 1', description: 'Explore this key functionality with ease.' },
    { title: 'Feature 2', description: 'Enhance your experience effortlessly.' },
    { title: 'Feature 3', description: 'Put your resources to work.' },
    { title: 'Feature 4', description: 'Track performance in real-time.' },
  ];

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, padding: '40px 20px', width: '80%', margin: '0 auto' }}>
      <Grid container spacing={4} justifyContent="center">
        <For each={features}>
          {(feature) => (
            <Grid item xs={12} sm={6} md={3}>
              	<Card style="border-radius: 26px" sx={{background: theme.palette.mode === "light" ? "#F1F1F1" : "#000000" }}>
                  <CardContent class={theme.palette.mode === "light" ? "MuiCardLight" : "MuiCardDark" }>
                    <Box sx={{ width: '40px', height: '40px', backgroundColor: '#CCCCCC', marginBottom: '10px' }} /> {/* Placeholder icon */}
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2">
                      {feature.description}
                    </Typography>
                	</CardContent>
              	</Card>
            </Grid>
          )}
        </For>
      </Grid>
    </Box>
  );
};

export default FeatureCardsSection;