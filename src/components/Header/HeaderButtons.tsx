import { Component } from 'solid-js';
import { A } from "@solidjs/router";
import { Box, Button, useTheme } from '@suid/material';
import { SiGithub } from 'solid-icons/si'
import { IoDocumentText } from 'solid-icons/io'
import { ImPacman } from 'solid-icons/im'

const HeaderButtons: Component = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        backgroundColor: theme.palette.background.paper,
        flexGrow: 7
      }}
    >
      <Button 
        variant="text" 
        component="a"
        href="https://babelfeesapi.onchainapps.io/openapi/api-docs.html" // External URL
        target="_blank" // Open in new tab
        rel="noopener noreferrer" // Security for _blank
        endIcon={<IoDocumentText />} 
      >
        Docs/API
      </Button>
      <Button variant="text" color="primary" endIcon={<SiGithub />} >
        Github
      </Button>
      <Button variant="text" component={A} href="/demo" color="primary" endIcon={<ImPacman />}>
        Demo
      </Button>

    </Box>
  );
};

export default HeaderButtons;