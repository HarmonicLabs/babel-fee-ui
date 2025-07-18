import { createSignal, Component, For } from 'solid-js';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, List, ListItem, ListItemText, TextField, Box, Typography } from '@suid/material';
import BabelApiClient from '../../utils/babelApi';
import { toUtf8, fromHex } from '@harmoniclabs/buildooor';
import { babelFeeTx } from './GenBabelTx';
interface Token {
  policyHex: string;
  nameHex: string;
}

interface Input {
  expirationTime?: number;
  redeemerDataHex: string;
  tokenAmount: number;
  utxo: {
    resolvedCborHex: string;
    txOutRef: string;
  };
};

interface RefInput {
    utxoRef: string;
    resolvedHex: string;
};

interface Script {
  cborHex: string;
};

interface ProviderInfoProps {
  providerName: string;
  url: string;
};

export const ProviderInfoModal: Component<ProviderInfoProps> = (props) => {
  const [open, setOpen] = createSignal(false);
  const [tokens, setTokens] = createSignal<Token[]>([]);
  const [fees, setFees] = createSignal<Record<string, number>>({});
  const [selectedToken, setSelectedToken] = createSignal<string>("");
  const [input, setInput] = createSignal<Input>({
    redeemerDataHex: '',
    tokenAmount: 0,
    utxo: {
        resolvedCborHex: '',
        txOutRef: ''
    }
  });
  const [script, setScript] = createSignal<Script>({ cborHex: '' }); 
  const [scriptRefInput, setScriptRefInput] = createSignal<RefInput>({
    utxoRef: '',
    resolvedHex: ''
  });
  const babelApi = new BabelApiClient(props.url);

  const handleOpen = () => {
    setOpen(true);
    getTokens();
  };

  const handleClose = () => setOpen(false);

  const getTokens = () => {
    babelApi.getTokens()
      .then(tokens => {
        console.log('Available tokens:', tokens);
        setTokens(tokens);
      })
      .catch(error => {
        console.error('Error fetching tokens:', error);
      });
  };

  const getInput = (tokenId: string, fee: number) => {
    if (!tokenId) {
      console.error('No token selected');
      return;
    }
    babelApi.postInput({ unit: tokenId, lovelacesFee: fee })
      .then(response => {
        console.log('Script ref input:', response);
        setInput(response); // Update the input signal with the API response
      })
      .catch(error => {
        console.error('Error fetching script ref input:', error);
      });
  };

  const getScriptInline = () => {
    babelApi.getScriptInline()
      .then(script => {
        console.log('Script inline:', script);
        setScript(script); // Update the script signal with the API response
      })
      .catch(error => {
        console.error('Error fetching script inline:', error);
      });
  };

  const getScriptRefInput = () => {
    babelApi.getScriptRefInput()
      .then(response => {
        console.log('Reference input:', response);
        setScriptRefInput(response); // Update the input signal with the API response
      })
      .catch(error => {
        console.error('Error fetching reference input:', error);
      });
  };

  const handleFeeChange = (tokenId: string, value: string) => {
    const fee = parseInt(value) || 0;
    setFees(prev => ({ ...prev, [tokenId]: fee }));
  };

  const handleSelectedToken = (token: Token) => {
    const tokenId = token.policyHex + token.nameHex;
    setSelectedToken(tokenId);
    console.log('Selected token:', tokenId);
    const fee = 300000// fees()[tokenId] || 0;
    getInput(tokenId, fee);
    getScriptInline();
    getScriptRefInput();
  };

  const genBabelFeeTx = () => {
    const tokenId = selectedToken();
    const tokenPolicyId = selectedToken().slice(0, 56); // First 56 characters for policy ID
    const tokenNameHex = selectedToken().slice(56); // Remaining characters for token name 
    const fee = fees()[tokenId] || 0;
    
    // console.log("tokenPolicyId:", tokenPolicyId);
    // console.log("tokenNameHex:", tokenNameHex);

    if (!input().redeemerDataHex || !input().utxo.txOutRef || !input().utxo.resolvedCborHex) {
      console.error('Input data is incomplete');
      return;
    }

    babelFeeTx(
        input().redeemerDataHex,
        input().utxo.txOutRef,
        input().utxo.resolvedCborHex,
        script().cborHex, // Assuming the script is the URL of the provider
        scriptRefInput(),
        fee,
        tokenPolicyId,
        tokenNameHex,
        input().tokenAmount,
        input().expirationTime || Date.now() + 3600000 // Default to 1 hour from now
    )
    .then(tx => {
      console.log('Generated Babel Fee Transaction:', tx);
    })
    .catch(error => {
      console.error('Error generating Babel Fee Transaction:', error);
    });
  }

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        View Provider
      </Button>
      <Dialog
        open={open()}
        onClose={handleClose}
        maxWidth="md"
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(103, 58, 183, 0.2)',
            backgroundColor: (theme) => theme.palette.background.paper,
            width: '80%',
          },
        }}
      >
        <DialogTitle>{props.providerName}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Available tokens for {props.providerName}:
          </DialogContentText>
          <List sx={{ bgcolor: 'background.paper', borderRadius: '8px' }}>
            <For each={tokens()}>
              {(token) => {
                const tokenId = token.policyHex + token.nameHex;
                return (
                  <>
                    <ListItem sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <ListItemText
                        primary={`Policy: ${token.policyHex}`}
                        secondary={`Name: ${toUtf8(fromHex(token.nameHex))}`}
                        sx={{ color: (theme) => theme.palette.text.primary, flex: '1 1 auto' }}
                      />
                    </ListItem>
                    <ListItem sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        {/*
                        <TextField
                            label="Fee (Lovelaces)"
                            type="number"
                            size="small"
                            value={fees()[tokenId] || ''}
                            onChange={(e) => handleFeeChange(tokenId, e.currentTarget.value)}
                            sx={{ width: '150px', marginRight: '16px' }}
                            inputProps={{ min: 0 }}
                        />
                        */}
                        <Button
                            variant="contained"
                            onClick={() => handleSelectedToken(token)}
                            // disabled={(fees()[tokenId] || 0) < 500000}
                            sx={{
                            bgcolor: (theme) => theme.palette.accent.main,
                            color: 'white',
                            '&:hover': {
                                bgcolor: (theme) => theme.palette.accent.main,
                                opacity: 0.9,
                            },
                            }}
                        >
                        Use Token
                        </Button>
                    </ListItem>
                    <ListItem sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        {input().redeemerDataHex && (
                            <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: '8px' }}>
                            <Typography variant="h6" sx={{ color: (theme) => theme.palette.text.primary }}>
                                Fee Details
                            </Typography>
                            <Typography variant="body2" sx={{ color: (theme) => theme.palette.energyOrange.main }}>
                                The Fee will cost: {input().tokenAmount} ${toUtf8(fromHex(token.nameHex))} token
                            </Typography>
                            {
                            /*
                            <Typography variant="body2" sx={{ color: (theme) => theme.palette.energyOrange.main }}>
                                Redeemer Data Hex: {input().redeemerDataHex.slice(0, 50)}...
                            </Typography>

                            <Typography variant="body2" sx={{ color: (theme) => theme.palette.energyOrange.main }}>
                                UTXO Ref: {input().utxo.txOutRef}
                            </Typography>
                            <Typography variant="body2" sx={{ color: (theme) => theme.palette.energyOrange.main }}>
                                Resolved CBOR Hex: {input().utxo.resolvedCborHex}
                            </Typography>
                            
                            <Typography variant="body2" sx={{ color: (theme) => theme.palette.energyOrange.main }}>
                                Redeemer Data Hex: {input().redeemerDataHex.slice(0, 50)}...}
                            {input().expirationTime && (
                                <Typography variant="body2" sx={{ color: (theme) => theme.palette.energyOrange.main }}>
                                Expiration Time: {input().expirationTime}
                                </Typography>
                            )}
                            */}
                            <Button
                                variant="contained"
                                onClick={genBabelFeeTx}
                                sx={{
                                mt: 2,
                                bgcolor: (theme) => theme.palette.accent.main,
                                color: 'white',
                                '&:hover': {
                                    bgcolor: (theme) => theme.palette.accent.main,
                                    opacity: 0.9,
                                },
                                }}
                                >
                                    Generate Babel Fee Transaction
                                </Button>
                            </Box>
                        )}                      
                    </ListItem>
                  </>
                );
              }}
            </For>
            {tokens().length === 0 && (
              <ListItem>
                <ListItemText primary="No tokens available" />
              </ListItem>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};