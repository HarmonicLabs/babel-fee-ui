import { createSignal, Component, For } from 'solid-js';
import { makePersisted } from '@solid-primitives/storage';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, List, ListItem, Box, Typography, Card, CardContent } from '@suid/material';
import BabelApiClient from '../../utils/babelApi';
import { toUtf8, fromHex, UTxO } from '@harmoniclabs/buildooor';
import { babelFeeTx } from './GenBabelTx';
import { countTokenQuantity, assetsOwned } from '../../utils/utxoAssetTools';
import { DEFAULT_TX_FEE } from '../constants';
import Slider from "./Slider";

interface Token {
  policyHex: string;
  nameHex: string;
  ownedAmount?: bigint;
}

interface Input {
  expirationTime?: number;
  redeemerDataHex: string;
  tokenAmount: number;
  utxo: {
    resolvedCborHex: string;
    txOutRef: string;
  };
}

interface RefInput {
  utxoRef: string;
  resolvedHex: string;
}

interface Script {
  cborHex: string;
}

interface ProviderInfoProps {
  providerName: string;
  url: string;
}

export type WalletInfo = {
  walletName: string;
}

interface AssetCount {
  policyId: string;
  assetName: string;
  quantity: bigint;
}

export const ProviderInfoModal: Component<ProviderInfoProps> = (props) => {
  const [open, setOpen] = createSignal(false);
  const [tokens, setTokens] = createSignal<Token[]>([]);
  const [fees, setFees] = createSignal<Record<string, number>>({});
  const [walletAssets, setWalletAssets] = createSignal<AssetCount[]>([]);
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
  const [connectedWallet, setConnectedWallet] = makePersisted(createSignal<WalletInfo | null>(null), {
    name: 'cardanoWallet',
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  });

  const [enabled, setEnabled ] = createSignal<boolean>(false);

  const babelApi = new BabelApiClient(props.url);

  const handleOpen = async () => {
    setOpen(true);
    await getTokens();
    await getWalletAssets();
  };

  const handleClose = () => setOpen(false);

  const getTokens = async () => {
    await babelApi.getTokens()
      .then(tokens => {
        console.log('Available tokens:', tokens);
        setTokens(tokens);
        setDefaultFees(tokens);
      })
      .catch(error => {
        console.error('Error fetching tokens:', error);
      });
  };

  const setDefaultFees = (tokens: Token[]) => {
    const defaultFees: Record<string, number> = {};
    tokens.forEach(token => {
      const tokenId = token.policyHex + token.nameHex;
      defaultFees[tokenId] = DEFAULT_TX_FEE;
      getInput(tokenId, DEFAULT_TX_FEE);
      getScriptRefInput();
    });
    setFees(defaultFees);
  };

  const getInput = (tokenId: string, fee: number) => {
    if (!tokenId) {
      console.error('No token selected');
      return;
    }
    setEnabled(false);
    babelApi.postInput({ unit: tokenId, lovelacesFee: fee })
      .then(response => {
        console.log('Script ref input:', response);
        setInput(response);
        setEnabled(true);
      })
      .catch(error => {
        console.error('Error fetching script ref input:', error);
      });
  };

  const getScriptInline = () => {
    babelApi.getScriptInline()
      .then(script => {
        console.log('Script inline:', script);
        setScript(script);
      })
      .catch(error => {
        console.error('Error fetching script inline:', error);
      });
  };

  const getScriptRefInput = () => {
    babelApi.getScriptRefInput()
      .then(response => {
        console.log('Reference input:', response);
        setScriptRefInput(response);
      })
      .catch(error => {
        console.error('Error fetching reference input:', error);
      });
  };

 const handleSliderChange = (tokenId: string) => (value: number) => {
    const roundedValue = Math.round(value / 5000) * 5000;
    setFees(prev => {
      const prevFee = prev[tokenId] || DEFAULT_TX_FEE;
      const difference = Math.abs(roundedValue - prevFee);
      if (difference >= 50000) {
        getInput(tokenId, roundedValue);
      }
      return { ...prev, [tokenId]: roundedValue };
    });
  };

  const genBabelFeeTx = (tokenId: string) => {
    const tokenPolicyId = tokenId.slice(0, 56);
    const tokenNameHex = tokenId.slice(56);
    const fee = fees()[tokenId] || DEFAULT_TX_FEE;
    if (!input().redeemerDataHex || !input().utxo.txOutRef || !input().utxo.resolvedCborHex) {
      console.error('Input data is incomplete');
      return;
    }

    console.log('Inputs to babelFeeTx:', {
      redeemerDataHex: input().redeemerDataHex,
      txOutRef: input().utxo.txOutRef,
      resolvedCborHex: input().utxo.resolvedCborHex,
      scriptCborHex: script().cborHex,
      scriptRefInput: scriptRefInput(),
      fee,
      tokenPolicyId,
      tokenNameHex,
      tokenAmount: input().tokenAmount,
      expirationTime: input().expirationTime || Date.now() + 3600000,
    });

    babelFeeTx(
      input().redeemerDataHex,
      input().utxo.txOutRef,
      input().utxo.resolvedCborHex,
      script().cborHex,
      scriptRefInput(),
      fee,
      tokenPolicyId,
      tokenNameHex,
      input().tokenAmount,
      input().expirationTime || Date.now() + 3600000
    )
      .then(tx => {
        console.log('Tx Send:', tx);
        tx === "ok" ? alert("Transaction successfully generated, if you don't have auto submit enabled in your wallet please make sure you manually submit it") : alert("Error generating transaction");
        tx === "ok" && setInput({
          redeemerDataHex: '',
          tokenAmount: 0,
          utxo: {
            resolvedCborHex: '',
            txOutRef: ''
          }
        });
      })
      .catch(error => {
        console.error('Error generating Babel Fee Transaction:', error);
      });
  };

  const getWalletAssets = async () => {
    const walletInfo = connectedWallet();
    if (!walletInfo) {
      throw new Error("No wallet found in localStorage");
    }
    const wallet = walletInfo.walletName;
    const walletApi = await (window as any).cardano[wallet].enable();
    console.log("walletApi: ", walletApi);

    const utxos = await walletApi.getUtxos();
    const parsedUtxos = utxos.map((u: any) => (UTxO.fromCbor(u)));
    console.log("parsedUtxos: ", parsedUtxos);

    const assetCount = await countTokenQuantity(parsedUtxos);
    console.log("assetCount: ", assetCount);

    setWalletAssets(assetCount);

    const assetsOwnedRes = assetsOwned(assetCount, tokens());
    console.log("Assets Owned:", assetsOwnedRes);
    setTokens(assetsOwnedRes);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          borderRadius: '12px',
          padding: '10px 24px',
          textTransform: 'none',
          fontWeight: 600,
          background: 'linear-gradient(45deg, #673ab7 30%, #9c27b0 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #5e35b1 30%, #8e24aa 90%)',
            boxShadow: '0 4px 15px rgba(103, 58, 183, 0.4)',
          },
        }}
      >
        Select Provider
      </Button>
      <Dialog
        open={open()}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '16px',
            background: (theme) => theme.palette.mode === 'dark' ? '#1a1a2e' : '#ffffff',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            padding: '16px',
            maxWidth: '500px',
            margin: 'auto',
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            fontSize: '1.5rem',
            color: (theme) => theme.palette.text.primary,
            background: (theme) => theme.palette.mode === 'dark' ? 'linear-gradient(180deg, #2a2a4e 0%, #1a1a2e 100%)' : 'linear-gradient(180deg, #f5f5f5 0%, #ffffff 100%)',
            borderRadius: '12px 12px 0 0',
            padding: '16px 24px',
          }}
        >
          {props.providerName}
        </DialogTitle>
        <DialogContent sx={{ padding: '24px' }}>
          <DialogContentText
            sx={{
              textAlign: 'center',
              marginBottom: '16px',
              color: (theme) => theme.palette.text.secondary,
              fontSize: '1rem',
            }}
          >
            Select token to pay fee with.
          </DialogContentText>
          <List sx={{ padding: 0 }}>
            <For each={tokens()}>
              {(token) => {
                const tokenId = token.policyHex + token.nameHex;
                return (
                  <Card
                    sx={{
                      marginBottom: '16px',
                      borderRadius: '12px',
                      background: (theme) => theme.palette.mode === 'dark' ? '#242444' : '#f8f9fa',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                      },
                    }}
                  >
                    <CardContent sx={{ padding: '16px' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 600, color: (theme) => theme.palette.text.primary }}
                        >
                          {toUtf8(fromHex(token.nameHex))}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: (theme) => theme.palette.text.secondary, wordBreak: 'break-all' }}
                        >
                          Policy: {token.policyHex.slice(0, 10)}...{token.policyHex.slice(-10)}
                        </Typography>
                        <Box sx={{ width: '100%', textAlign: 'center' }}>
                          <Typography variant="body1" sx={{ fontWeight: 500, marginBottom: '8px' }}>
                            Fee: {fees()[tokenId] || DEFAULT_TX_FEE} Lovelaces
                          </Typography>
                          <Slider
                            min={350000}
                            max={2000000}
                            value={fees()[tokenId] || DEFAULT_TX_FEE}
                            onChange={handleSliderChange(tokenId)}
  
                          />
                        </Box>
                        {input().redeemerDataHex && (
                          <Box sx={{ textAlign: 'center', marginTop: '12px' }}>
                            <Typography
                              variant="body2"
                              sx={{
                                color: (theme) => theme.palette.mode === 'dark' ? '#ffab91' : '#f57c00',
                                marginBottom: '12px',
                              }}
                            >
                              Fee Cost: {input().tokenAmount} {toUtf8(fromHex(token.nameHex))} (Owned: {token.ownedAmount?.toString() ?? '0'})
                            </Typography>
                            <Button
                              disabled={(token.ownedAmount ?? 0n) < input().tokenAmount || enabled() === false}
                              variant="contained"
                              onClick={() => genBabelFeeTx(tokenId)}
                              sx={{
                                borderRadius: '8px',
                                padding: '8px 24px',
                                textTransform: 'none',
                                fontWeight: 600,
                                background: 'linear-gradient(45deg, #673ab7 30%, #9c27b0 90%)',
                                '&:hover': {
                                  background: 'linear-gradient(45deg, #5e35b1 30%, #8e24aa 90%)',
                                  boxShadow: '0 4px 15px rgba(103, 58, 183, 0.4)',
                                },
                                '&:disabled': {
                                  background: 'grey',
                                  color: 'rgba(255, 255, 255, 0.5)',
                                },
                              }}
                            >
                              {(token.ownedAmount ?? 0n) < input().tokenAmount ? "Not Enough Tokens" : "Pay with Token"}
                            </Button>
                          </Box>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                );
              }}
            </For>
            {tokens().length === 0 && (
              <ListItem sx={{ justifyContent: 'center' }}>
                <Typography variant="body1" sx={{ color: (theme) => theme.palette.text.secondary }}>
                  No tokens available
                </Typography>
              </ListItem>
            )}
          </List>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', paddingBottom: '24px' }}>
          <Button
            onClick={handleClose}
            sx={{
              borderRadius: '8px',
              padding: '8px 24px',
              textTransform: 'none',
              fontWeight: 600,
              color: (theme) => theme.palette.text.secondary,
              border: (theme) => `1px solid ${theme.palette.divider}`,
              '&:hover': {
                background: (theme) => theme.palette.mode === 'dark' ? '#2a2a4e' : '#f5f5f5',
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};