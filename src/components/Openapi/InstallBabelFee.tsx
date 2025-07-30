import { Component} from "solid-js";
import "swagger-ui-dist/swagger-ui.css";
import {  Box, Typography, useTheme } from '@suid/material';

interface InstallBabelFeeComponentProps {
  themeMode: () => 'dark' | 'light';
}

const InstallBabelFee: Component<InstallBabelFeeComponentProps> = (props) => {
    const customCSS = (themeMode: 'dark' | 'light') => `

    /* Instructions Section Styling */
    .instructions-section {
      background: ${themeMode === 'dark' ? '#1A1A1A' : '#F0F0F0'};
      border: 1px solid ${themeMode === 'dark' ? '#666666' : '#CCCCCC'};
      border-radius: 16px;
      width: 70%;
      margin: 20px auto;
      padding: 20px;
      color: ${themeMode === 'dark' ? '#E0E0E0' : '#333333'};
      font-family: 'Orbitron', 'Roboto', sans-serif;
    }
    .instructions-section h2 {
      color: ${themeMode === 'dark' ? '#FFFFFF' : '#444444'};
      font-weight: 700;
      margin-bottom: 10px;
    }
    .instructions-section ul {
      list-style-type: decimal;
      padding-left: 20px;
    }
    .instructions-section li {
      margin-bottom: 10px;
    }
    .instructions-section code {
      background: ${themeMode === 'dark' ? '#2A2A2A' : '#E8E8E8'};
      padding: 2px 6px;
      border-radius: 4px;
      color: ${themeMode === 'dark' ? '#A0A0A0' : '#555555'};
    }
  `;

  return (
    <Box
      sx={{
        background: props.themeMode() === 'dark' ? '#1A1A1A' : '#F0F0F0',
        padding: ' 20px',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '80%',
        margin: '20px auto',
        borderRadius: '46px',
      }}
    >
      <div class="instructions-section">
        <Typography variant="h3">
            Installing and setting up Babel Fees Service
        </Typography>
        <hr />
        <Typography variant="body1" gutterBottom>
            You will need an instance of dolos running, with the configuration file in the dolos directory.
        </Typography>
        <ul>

          <li>First pull the git repository:<br /><code>git clone https://github.com/HarmonicLabs/babel-fee-service</code></li>
          <li>Navigate to the directory:<br /><code>cd babel-fee-service</code></li>
          <li>Install dependencies:<br /><code>bun i</code></li>
        </ul>
      </div>
    </Box>
  );
};

export default InstallBabelFee;