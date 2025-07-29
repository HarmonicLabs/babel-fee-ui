import { Component } from 'solid-js';
import { Box, Grid, Typography, useTheme } from '@suid/material';

const Footer: Component = () => {
  const theme = useTheme();
  const columns = [
    { title: 'Features', links: ['Feature 1', 'Feature 2', 'Feature 3'] },
    { title: 'Resources', links: ['Docs', 'Analytics', 'Blog'] },
    { title: 'Community', links: ['About', 'Contact', 'Support'] },
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
            <Box sx={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: theme.palette.text.primary }} /> {/* Placeholder logo */}
            <Typography variant="h6">Your Platform</Typography>
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