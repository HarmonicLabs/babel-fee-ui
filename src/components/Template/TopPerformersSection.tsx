import { Component } from 'solid-js';
import { Grid, Card, CardContent, Typography, Box, useTheme } from '@suid/material';

const TopPerformersSection: Component = () => {
  const theme = useTheme();
  const performers = [
    {
      title: 'Category A',
      headers: ['Item', 'Rate', 'Value'],
      data: [['Item A', '15%', '$3M']],
    },
    {
      title: 'Category B',
      headers: ['Item', 'Change', 'Volume'],
      data: [['Item B', '+20%', '$1M']],
    },
    {
      title: 'Category C',
      headers: ['Pair', 'Volume', 'Rate'],
      data: [['Pair A', '$2M', '10%']],
    },
  ];

  return (
    <Box sx={{ padding: '40px 20px', backgroundColor: theme.palette.background.default, width: '60%', margin: '0 auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Some Data
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {performers.map((performer, index) => (
          <Grid item xs={12} sm={6} md={4} component="div" >
            <Card sx={{borderRadius: "26px", background: theme.palette.mode === "light" ? "#F1F1F1" : "#000000"}} >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {performer.title}
                </Typography>
                <Box component="table" sx={{ width: '100%' }}>
                  <thead>
                    <tr>
                      {performer.headers.map((header) => (
                        <th style={{ "text-align": 'left', padding: '5px', color: theme.palette.text.secondary }}>
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {performer.data.map((row, rowIndex) => (
                      <tr>
                        {row.map((cell, cellIndex) => (
                          <td style={{ padding: '5px' }}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TopPerformersSection;