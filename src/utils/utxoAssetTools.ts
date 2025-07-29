import { TxBuilder, TxOut, UTxO, defaultProtocolParameters, defaultPreprodGenesisInfos, ProtocolParameters, fromHex, Value, Hash28, Script, Credential, Address, toHex } from "@harmoniclabs/buildooor";

interface Asset {
    name: Uint8Array;
    quantity: bigint;
};
interface Policy {
    policy: Uint8Array;
    assets: Asset[];
};
interface Resolved {
    value: Value;
    address: string;
};
interface AssetCount {
    policyId: string;
    assetName: string;
    quantity: bigint;
};
interface AssetCount {
    policyId: string;
    assetName: string;
    quantity: bigint;
};
interface AssetCount {
    policyId: string;
    assetName: string;
    quantity: bigint;
    assetOwned?: boolean;
}
  
type Assets = AssetCount[];

interface AvailableToken {
  nameHex: string;
  policyHex: string;
}

type AvailableTokens = AvailableToken[];

// New interface for output with ownedAmount
interface MergedToken extends AvailableToken {
  ownedAmount: bigint;
}

type MergedTokens = MergedToken[];

export const getUtxosWithNeededAssets = async (parsedUtxos: UTxO[], tokenPlicyID: string, tokenNameHex: string) => {
    const assetToSend: UTxO[] = parsedUtxos.filter((u: any) => 
        u.resolved.value.map.find((a: any) => 
            a.policy.toString() === tokenPlicyID && 
            a.assets.find((a: any) => toHex(a.name) === tokenNameHex) !== undefined
        ) !== undefined
    );
    // console.log("assetToSend: ", assetToSend);
    return assetToSend;
};

export const countTokenQuantity = async (parsedUtxos: UTxO[]): Promise<AssetCount[]> => {
    const assetCountMap: { [key: string]: AssetCount } = {}; // Map to aggregate quantities
    parsedUtxos.forEach((u: UTxO) => {
      u.resolved.value.map.forEach((a: any) => {
        const policyHex = a.policy.toString();
        a.assets.forEach((asset: Asset) => {
          const assetNameHex = toHex(asset.name);
          const key = `${policyHex}-${assetNameHex}`; // Unique key for policyId-assetName pair
          if (assetCountMap[key]) {
            assetCountMap[key].quantity += asset.quantity; // Add to existing quantity
          } else {
            assetCountMap[key] = {
              policyId: policyHex,
              assetName: assetNameHex,
              quantity: asset.quantity,
            };
          }
        });
      });
    });
  
    const assetCounts: AssetCount[] = Object.values(assetCountMap); // Convert map to array
    // console.log("Asset Counts:", assetCounts);
    return assetCounts;
};

// New function to merge assetCounts with availableTokens and add ownedAmount
export const assetsOwned = (assetCounts: Assets, availableTokens: AvailableTokens): MergedTokens => {
    const mergedTokens: MergedTokens = availableTokens.map((token: AvailableToken): MergedToken => {
      const matchingAsset = assetCounts.find((asset: AssetCount) => 
        asset.policyId === token.policyHex && asset.assetName === token.nameHex
      );
      const ownedAmount = matchingAsset ? matchingAsset.quantity : BigInt(0);
      return {
        ...token,
        ownedAmount,
      };
    });
    // console.log("Merged Tokens:", mergedTokens);
    return mergedTokens;
};