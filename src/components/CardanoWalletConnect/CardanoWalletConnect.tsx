import { createSignal, createResource, Show, For, createEffect } from 'solid-js';
import { CardanoWalletConnectComponent } from 'cardano-wallet-connect-solidjs-component';
import { makePersisted } from '@solid-primitives/storage';

export type WalletInfo = {
    walletName: string;
};
  
export function CardanoWalletConnect() {
	const [connectedWallet, setConnectedWallet] = makePersisted(createSignal<WalletInfo | null>(null), {
		name: 'cardanoWallet',
		serialize: JSON.stringify,
		deserialize: JSON.parse,
	});

    return (
        <>
			<CardanoWalletConnectComponent showName={true}/>
        </>
    );
};