import { Component } from 'solid-js';
import { Grid, Card, CardContent, Typography, useTheme } from '@suid/material';
import "./Components.css";

const StatisticsSection: Component = () => {
  const theme = useTheme();
  const stats = [
    { title: 'Stat A', value: '15%', info: '$3M' },
    { title: 'Stat B', value: '12%', info: '$4M' },
    { title: 'Stat C', value: '+20%', info: '$1M' },
    { title: 'Stat D', value: '$2M', info: '10%' },
  ];

  return (
    <Grid container spacing={4} sx={{ padding: '40px 20px', backgroundColor: theme.palette.background.default }}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} component="div">
          <Card style="border-radius: 26px">
            <CardContent class={theme.palette.mode === "light" ? "MuiCardLight" : "MuiCardDark" }>
                <Typography variant="subtitle2" color="textSecondary">
                    {stat.title}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {stat.value}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {stat.info}
                </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatisticsSection;