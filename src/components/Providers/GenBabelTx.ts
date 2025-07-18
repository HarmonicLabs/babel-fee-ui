import { TxBuilder, TxOut, UTxO, defaultProtocolParameters, defaultPreprodGenesisInfos, ProtocolParameters, fromHex, Value, Hash28, Script, Credential, Address } from "@harmoniclabs/buildooor";
import { blockfrostPreProd } from "../../utils/blockfrost";
import adaptedProtocolParams from "./blockfrost-like.protocolParams.preprod.json";

/*
{
    "redeemerDataHex": "d8799fd8799fd8799f582009805802da949842ff299f50a4a9a8ed184812c4e0433b17d6b5f5e859bc0d4800ff581ce16c2dc8ae937e8d3790c7fd7168d7b994621ba14ca11415f39fed72434d494e1b00000006c2e4602e1a01000000d8799f1b000001980c0dc7e3ffff58406d221df96bfd0325c26542b6ac46b096f3555d39b6409ff95c3924e96c39e69a0383ae7acef8ed9c1c79dbbc69a63f8b2b609aa26196a06dfdac6346dba20403ff",
    "utxo": {
        "txOutRef": "09805802da949842ff299f50a4a9a8ed184812c4e0433b17d6b5f5e859bc0d48#0",
        "resolvedCborHex": "a200581d700285300b29db32a07ec2e2d4946cbff23d808b9fb3cf00dd3e32549f011a00989680"
    },
    "expirationTime": 1752548886499,
    "tokenAmount": 29039550510
}
    01010098004c8c88c8c966002003149a2c8010c8c8c8c8c8ca6002646006600460040026008011006803401a00d2323233322232332533300f300148000400c54ccc03cc0052002100416370e601400260180026ea800cc8c018c014004c01c02c8cdc798031991991911998091111191999112999807800801899801180900098088009802000980180080119980200200180110801111198028011801800918029801000800a5eb11d71bac3230073006300630063006300630063006300600130083006300800c379001a46464646464646464646464646464646464646464646464646466032660326603266032660326603266030292110636f72726563745369676e61747572650033372a04c6ecc018dd7180200d1980c0a4810a6e6f744578706972656400333222323325333029300148000400c54ccc0a4c0052002100416370e6048002604c0026ea800cc8c080c07cc07cc07cc07cc07c004008928919b89375a604060466ea8c080c008c014c008c8c084c080c080c080c080c080c080c080004c008c080c008098dd698100009980c0a490e73696e676c654f776e496e707574003017301e3300f2300e3020300230203002300530020013758603e01666030292010f73696e676c654f776e4f7574707574003017301e3300f2300e30203002302030020013758646040603e603e002016660302921106973416c6c6f7765645574786f526566003375e026603e0046603029211f7370656e744c6573734c6f76656c6163655468616e4d6178416c6c6f776564003371266e04c8ccc02c005221004881000073233300b001488100488100010375a646040603e603e603e603e00200466030292117726563656976656441744c656173744d696e546f6b656e00337126eb4c8c080c07cc07cc07c004008cdc0999805180f008002801999805180f003802801918111baa00132302137540020086eb8c8c074c070c070004c8c080dd50008019180e180d8009bae32301b301a00132301e375400200260320286eacc008c004c8ccc888c8cc94ccc08cc0052000100315333023300148008401058dc3980f00098100009baa003333223023225333022301500110141325333023300400113374a90001980d180280080a099801801980e801180e800900091801180d18018009bac301930023019300201f26230043003301a00100b2301b37540024602e602c00244464666002429000111299981099b8f32375c603c00200400c2666008429000111299981219b8f375c604000401026eb4c0880084c00c004dd5980f801098018008021810111119199911299980e8008018998011810000980f800980200098018008011998020020018011800980a180080d1180b9baa001375e60246002602460026466644464664a66603a6002900008018a99980e9800a400420082c6e1cc060004c068004dd500199991180e91299980e18078008807099299980e9802000899ba548000cc050c0140040384cc00c00cc05c008c05c00480048c008c050c00c004dd6180998011809980100c93119180a980a0009801980a0008029180a9baa0012332233301b2222323332225333018001003133002301b001301a0013004001300300100233300400400300221002222330050023003001225333018300300213300f0020011001007375660086002601e6646644666034444464666444a66602e0020062660046034002603200260080026006002004666008008006004420044446600a004600600244a66602e600600426601c004002200200c466ebcc040c008c040c008c8ccc888c8cc94ccc06cc005200010031533301b300148008401058dc3980b000980c0009baa00333322301b22533301a300d001100c132533301b300400113374a9000198091802800806099801801980a801180a800900091801180918020009bac301130033011300301726230073004301200100330103002301030020013758646020601e601e0026002601e600202a460246ea8004dd780098060051180618058009bb1499300103d87a8000574644a66601c00229444cd5ce28012502233300d0020014a0ae8155cfc019222222232332598009800a400110038a9998081800a400420082a6660206002900208028a9998081800a400c200c2a6660206002900408038a9998081800a401420102c8080dc3980580098068009baa0072ba25742aae748c008dd5000aab9e265734910120bc37df06553a4bf26b35e33becdfa6b63241b822056bb9e3dc34a5f39e0953c10023001001a40a81
*/
interface RefInput {
    utxoRef: string;
    resolvedHex: string;
};

export async function babelFeeTx(
    redeemerDataHex: string,
    txOutRef: string,
    resolvedCborHex: string,
    script: string,
    scriptRefInput: RefInput,
    allowedAdaToSpend: number,
    tokePlicyID: string,
    tokenNameHex: string,
    tokenAmtToSend: number,
    expirationTime:number
) 
{
    const preprod_adaptedProtocolParams = adaptedProtocolParams as unknown as ProtocolParameters;
    // console.log("adaptedProtocolParams", defaultProtocolParameters)
    
    const txBuilder = new TxBuilder(
        defaultProtocolParameters,
        {
            ...defaultPreprodGenesisInfos,
            startSlotNo: (96929998 - 96845246) + 1500
        }
    );
    const resolvedBabelOut = TxOut.fromCbor(resolvedCborHex);
    const resolvedRefScript = TxOut.fromCbor(scriptRefInput.resolvedHex);

    console.log("resolvedBabelOut: ", resolvedBabelOut.toJson() );
    console.log("resolvedBabelOut.value.lovelaces: ", resolvedBabelOut.value.lovelaces);
    // console.log("script", script);
    // console.log(typeof resolvedBabelOut.value.lovelaces);
    // console.log(typeof allowedAdaToSpend);
    // console.log("exp time", expirationTime);
    // console.log("exp posix", txBuilder.posixToSlot(expirationTime));
    // console.log("date", Date.now());
    // console.log("tokePlicyID: ", fromHex(tokePlicyID));
    // console.log("tokenNameHex: ", tokenNameHex);

    const wallet = localStorage.getItem("cardanoWallet");
    if (!wallet) {
        throw new Error("No wallet found in localStorage");
    };

    const walletApi = await (window as any).cardano[JSON.parse(wallet).walletName].enable();
    console.log("walletApi: ", walletApi);
    
    const changeAddressPkh = await walletApi.getChangeAddress();
    const changeAddressBase = Address.fromBytes(fromHex(changeAddressPkh)).toString()
    console.log("changeAddress: ", changeAddressBase);

    const utxos = await walletApi.getUtxos();
    
    const parsedUtxos = utxos.map((u: any) => (UTxO.fromCbor(u)));
    console.log("parsedUtxos: ", parsedUtxos);
    
    const input = parsedUtxos.find((u: any) => u.resolved.value.lovelaces > 5_000_000)
    console.log("input: ", input);

    const assetToSend = parsedUtxos.find((u: any) => u.resolved.value.map.find((a: any) => a.policy.toString() === tokePlicyID ) !== undefined);
    console.log("assetToSend: ", assetToSend);
    

    const collaterals = await walletApi.getCollateral();
    console.log("collaterals: ", collaterals);

    console.log("utxo ref: ", scriptRefInput.utxoRef.split("#")[0],  Number(scriptRefInput.utxoRef.split("#")[1]));

    console.log("Policy ID: ", new Hash28(tokePlicyID));
    console.log("TokenNameHex: ", fromHex(tokenNameHex));
    console.log("Token Amount to Send: ", BigInt(tokenAmtToSend));
    console.log("locelaces: ", resolvedBabelOut.value.lovelaces - BigInt(300000));
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
                assetToSend,
                input
            ],
            outputs: [
                new TxOut({
                    address: resolvedBabelOut.address,
                    value: Value.singleAsset(
                        new Hash28(tokePlicyID),
                        fromHex(tokenNameHex),
                        BigInt(tokenAmtToSend)
                    )
                    /*
                    Value.add(
                        Value.singleAsset(
                            new Hash28(tokePlicyID),
                            fromHex(tokenNameHex),
                            BigInt(tokenAmtToSend)
                        ),
                        Value.lovelaces( resolvedBabelOut.value.lovelaces - BigInt(300000) )
                    )
                    */
                })
            ],
            // Hard coded for testing
            fee: BigInt(300000), // example fee
            collaterals: [ ...collaterals ],
            changeAddress: changeAddressBase,
            invalidAfter: txBuilder.posixToSlot(expirationTime)
        });
        
        console.log("tx", tx.toJson() );
        
        const signedTx = await walletApi.signTx(tx.toCbor().toString());
        console.log("Signed transaction: ", signedTx);
        console.log("Submitting transaction with hash: ", signedTx);
        
        return('OK');
    }catch(error) {
        console.log("Error building transaction: ", error);
        // throw error;
    }
};