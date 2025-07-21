import { TxBuilder, TxOut, UTxO, defaultProtocolParameters, defaultPreprodGenesisInfos, ProtocolParameters, fromHex, Value, Hash28, Script, Credential, Address, toHex } from "@harmoniclabs/buildooor";
import { blockfrostPreProd } from "../../utils/blockfrost";
import adaptedProtocolParams from "./blockfrost-like.protocolParams.preprod.json";
import { getUtxosWithNeededAssets, countTokenQuantity } from "../../utils/utxoAssetTools";

interface RefInput {
    utxoRef: string;
    resolvedHex: string;
};
interface Asset {
    name: Uint8Array;
    quantity: string;
};
interface Policy {
    policy: Uint8Array;
    assets: Asset[];
};
interface Resolved {
    value: Value;
    address: string;
};
// Remove local Utxo interface to use the one from @harmoniclabs/buildooor

export async function babelFeeTx(
    redeemerDataHex: string,
    txOutRef: string,
    resolvedCborHex: string,
    script: string,
    scriptRefInput: RefInput,
    fee: number,
    tokenPlicyID: string,
    tokenNameHex: string,
    tokenAmtToSend: number,
    expirationTime:number
) 
{
    const preprod_adaptedProtocolParams = adaptedProtocolParams as unknown as ProtocolParameters;
    // console.log("adaptedProtocolParams", defaultProtocolParameters)
    console.log("fee:, ",  fee );
    const txBuilder = new TxBuilder(
        defaultProtocolParameters,
        {
            ...defaultPreprodGenesisInfos,
            startSlotNo: (96929998 - 96845246) + 1500
        }
    );
    const resolvedBabelOut = TxOut.fromCbor(resolvedCborHex);
    const resolvedRefScript = TxOut.fromCbor(scriptRefInput.resolvedHex);

    const wallet = localStorage.getItem("cardanoWallet");
    if (!wallet) {
        throw new Error("No wallet found in localStorage");
    };

    const walletApi = await (window as any).cardano[JSON.parse(wallet).walletName].enable();
    //console.log("walletApi: ", walletApi);
    
    const changeAddressPkh = await walletApi.getChangeAddress();
    const changeAddressBase = Address.fromBytes(fromHex(changeAddressPkh)).toString()
    //console.log("changeAddress: ", changeAddressBase);

    const utxos = await walletApi.getUtxos();
    
    const parsedUtxos = utxos.map((u: any) => (UTxO.fromCbor(u)));
    //console.log("parsedUtxos: ", parsedUtxos);
    
    const assetToSend: UTxO[] = await getUtxosWithNeededAssets( parsedUtxos, tokenPlicyID, tokenNameHex );
    //console.log("assetToSend: ", assetToSend);

    const input = parsedUtxos.find((u: any) => u.resolved.value.lovelaces > 5_000_000)
    console.log("input: ", input);

    const collaterals = await walletApi.getCollateral();
    //console.log("collaterals: ", collaterals);
    //console.log("utxo ref: ", scriptRefInput.utxoRef.split("#")[0],  Number(scriptRefInput.utxoRef.split("#")[1]));

    console.log("resolvedBabelOut.value.lovelaces: ", resolvedBabelOut.value.lovelaces)

    const outValue = Value.add(
        Value.sub(
            resolvedBabelOut.value,
            Value.lovelaces( BigInt(fee)  ),
        ),
        Value.singleAsset(
            new Hash28(tokenPlicyID),
            fromHex(tokenNameHex),
            BigInt(tokenAmtToSend)
        ),
    );

    try{
        const tx = txBuilder.buildSync({
            inputs: [
                {
                    utxo: new UTxO({
                        utxoRef: { 
                            id: txOutRef.split("#")[0], 
                            index: Number(txOutRef.split("#")[1])
                        },
                        resolved: resolvedBabelOut
                    }),
                    referenceScript: {
                        refUtxo: new UTxO({
                            utxoRef: {
                                id: scriptRefInput.utxoRef.split("#")[0], 
                                index: Number(scriptRefInput.utxoRef.split("#")[1])
                            },
                            resolved: resolvedRefScript
                        }),
                        redeemer: redeemerDataHex,
                    }
                },
                ...assetToSend
            ],
            outputs: [
                new TxOut({
                    address: resolvedBabelOut.address,
                    value: outValue
                })
            ],
            // Hard coded for testing
            fee: BigInt(fee-30000), // example fee
            collaterals: [ collaterals[0] ],
            changeAddress: changeAddressBase,
            invalidAfter: txBuilder.posixToSlot(expirationTime)
        });
               
        const signedTx = await walletApi.signTx(tx.toCbor().toString());
        console.log("Signed Tx: ", signedTx);
        console.log("tx: ", tx);
        console.log("Signed Tx: ", tx.toCbor().toString());
        return({
            status: "success",
            message: "Transaction built successfully",
        });
    }catch(error) {
        console.log("Error building transaction: ", error);
        return({
            status: "error",
            message: error
        });
    }
};