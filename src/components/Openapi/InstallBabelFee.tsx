import { Component, createSignal } from "solid-js";
import "swagger-ui-dist/swagger-ui.css";
import { Box, Typography, useTheme, IconButton } from '@suid/material';
import ExpandMoreIcon from '@suid/icons-material/ExpandMore';
import ExpandLessIcon from '@suid/icons-material/ExpandLess';

interface InstallBabelFeeComponentProps {
  themeMode: () => 'dark' | 'light';
}

const InstallBabelFee: Component<InstallBabelFeeComponentProps> = (props) => {
    const [isCollapsed, setIsCollapsed] = createSignal(true);

    const customCSS = (themeMode: 'dark' | 'light') => `
    .instructions-section {
      background: ${themeMode === 'dark' ? '#1A1A1A' : '#F0F0F0'};
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
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `;

  return (
    <Box
      sx={{
        background: props.themeMode() === 'dark' ? '#1A1A1A' : '#F0F0F0',
        padding: '20px',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '80%',
        margin: '20px auto',
        borderRadius: '46px',
      }}
    >
      <style>{customCSS(props.themeMode())}</style>
      <div class="instructions-section">
        <div class="header-container">
          <Typography variant="h5">
            Installing and setting up Babel Fees Service
          </Typography>
          <IconButton onClick={() => setIsCollapsed(!isCollapsed())}>
            {isCollapsed() ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </div>
        {!isCollapsed() && (
          <>
            <hr />
            <Typography variant="body1" gutterBottom>
              You will need an instance of Dolos running with the Blockfrost option and gRPC, which are specified in the configuration file in the dolos directory of this repository.
            </Typography>
            <Typography variant="body1" gutterBottom>
              You will also need the latest version of the Bun JavaScript runtime installed on your machine. You can download it from <a href="https://bun.sh/" target="_blank" rel="noopener noreferrer">Bun's website</a>.
            </Typography>
            <ul>
              <li>Clone the git repository:<br /><code>git clone https://github.com/HarmonicLabs/babel-fee-service</code></li>
              <li>Navigate to the directory:<br /><code>cd babel-fee-service</code></li>
              <li>Install dependencies:<br /><code>bun install</code></li>
              <li>Build the Babel service:<br /><code>bun run build</code></li>
              <br />
              Before running the Babel Fee service, ensure your Dolos instance is running and synced.
              <br />
              Ensure the <code>DOLOS_SOCKET</code> environment variable is specified or provide it.
              <br />
              <br />
              First, generate all managing keys and smart wallets by following the instructions below.
              <br />
              <li>Generate keys:<br /><code>bun dist/contracts/genKeys</code></li>
              <li>Compile contracts:<br /><code>bun dist/contracts/compile</code></li>
              <br />
              Before the next step, fund the address: check the <code>secrets/</code> directory generated during <code>Compile contracts</code>. You will see addresses for Testnet and Mainnet; send 20 ADA to the appropriate address.
              <br />
              <br />
              <li>Deploy RefInput:<br /><code>bun dist/contracts/deployRefInput -s $DOLOS_SOCKET -n 'preprod'</code></li>
              <li>Deploy UTxO Holder Contract:<br /><code>bun dist/contracts/deployUtxoHolderContract -s $DOLOS_SOCKET -n 'preprod'</code></li>
              <li>Run Babel Fee Service:<br /><code>bun dist/cli/index start -s $DOLOS_SOCKET -n 'preprod'</code></li>
              <br />
              Once the Babel Fee service is running, fund the provider contracts with UTxOs for token exchange.
              <br /><br />
              Ensure the Babel Fee service is running before sending ADA. It will detect the sent ADA and create the UTxOs for you.
              <br /><br />
              Send at least 100 ADA to the address. The 100 ADA will be redistributed into UTxOs in multiples of 10.
              <br /><br />
              If successful, you should see: <code>Total Lovelace input for redistribution: 90000000 lovelaces.</code> in your terminal output.
              You are now ready to accept Babel Fees.
            </ul>
          </>
        )}
      </div>
    </Box>
  );
};

export default InstallBabelFee;