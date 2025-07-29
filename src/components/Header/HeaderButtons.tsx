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
      <Button variant="text" endIcon={<IoDocumentText />} >
        Docs
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