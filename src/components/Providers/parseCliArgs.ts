import { readFile } from "node:fs/promises";
import { CliArgs, Config, NetworkConstants, SmartWallet } from "./Config";
import { defaultAddrs, defaultConfigPath, defaultHttpPort, defaultIngoreDotenv, defaultLocalConfigPath, defaultNetwork, defaultPortRange, defaultThreads, defaultWssPorts } from "../cli/defaults";
import { AddressStr, ProtocolParameters } from "@harmoniclabs/buildooor";
import { isAddrStr } from "../utils/isAddrStr";
import { existsSync } from "node:fs";
import { CardanoNetworkMagic } from "@harmoniclabs/ouroboros-miniprotocols-ts";
import { availableParallelism, cpus } from "node:os";
import { isLogLevelString, Logger, logger, LogLevel, logLevelFromString } from "../utils/Logger";
import { TxBuilder } from "@harmoniclabs/buildooor";
import { adaptProtocolParams } from "../utils/adaptProtocolParams";
import { execSync } from "node:child_process";
import { minswapMainnet, minswapPreprod } from "../constants/minswap";

export async function parseCliArgs(args: Partial<CliArgs>): Promise<Config> {
    const jsonCfg =
        typeof args.config === "string" && existsSync(args.config)
            ? (JSON.parse(await readFile(args.config, { encoding: "utf-8" })) as Partial<Config>)
            : existsSync(defaultConfigPath)
              ? (JSON.parse(
                    await readFile(defaultConfigPath, { encoding: "utf-8" }),
                ) as Partial<Config>)
              : existsSync(defaultLocalConfigPath)
                ? (JSON.parse(
                      await readFile(defaultLocalConfigPath, { encoding: "utf-8" }),
                  ) as Partial<Config>)
                : {};

    console.log("jsonCfg: ", jsonCfg);

    function get<T>(
        key: keyof Config,
        type:
            | "string"
            | "number"
            | "bigint"
            | "boolean"
            | "symbol"
            | "undefined"
            | "object"
            | "function"
            | ((thing: any) => thing is T),
        defaultValue: T,
    ): T {
        return isTypeOrElse(args[key], type, isTypeOrElse(jsonCfg[key], type, defaultValue));
    }

    let nodeSocketPath = get<string | undefined>("nodeSocketPath", "string", undefined);

    if (!nodeSocketPath) {
        nodeSocketPath = process.env.CARDANO_NODE_SOCKET_PATH;
    }

    if (!nodeSocketPath) throw new Error("No node socket path provided");
    if (!existsSync(nodeSocketPath))
        throw new Error("Node socket path does not exist or has been moved");

    const network =
        getNetworkMagic(args.network) ??
        getNetworkMagic(jsonCfg.network) ??
        getNetworkMagic(defaultNetwork)!;

    const logLevel = logLevelFromString(get("logLevel", isLogLevelString, "INFO"));

    logger.setLogLevel(logLevel);

    let blockfrostPort = get<number | undefined>("blockfrostPort", "number", undefined);
    if (!blockfrostPort) {
        blockfrostPort = 3001;
    };

    let utxorpcPort = get<number | undefined>("utxorpcPort", "number", undefined);
    if (!utxorpcPort) {
        utxorpcPort = 50051;
    };

    return {
        network,
        logLevel,
        nodeSocketPath,
        httpPort: get<number>("httpPort", "number", defaultHttpPort),
        networkConstants: await getNetworkConstants(network === CardanoNetworkMagic.Mainnet),
        blockfrostPort,
        utxorpcPort,
        initSupportedTokenUnits: [{
            unit:   "e16c2dc8ae937e8d3790c7fd7168d7b994621ba14ca11415f39fed724d494e",
            lpHash: "6c3ea488e6ff940bb6fb1b18fd605b5931d9fefde6440117015ba484cf321200",
        }],
    };
}

async function getNetworkConstants(mainnet: boolean): Promise<NetworkConstants> {
    return {
        pkhWallet: await getPkhWallet(mainnet),
        smartWallet: await getSmartWallet(mainnet),
        adaptedProtocolParams: await getProtocolParams(mainnet),
        minswap: mainnet ? minswapMainnet : minswapPreprod,
    };
}

async function getPkhWallet(mainnet: boolean): Promise<NetworkConstants["pkhWallet"]> {
    if (!existsSync("./secrets/wallet.sk")) void execSync("bun src/contracts/genKeys.ts");

    const [sk, pk, pkh, addr] = await Promise.all([
        readFile("./secrets/wallet.sk"),
        readFile("./secrets/wallet.pk"),
        readFile("./secrets/wallet.pkh"),
        readFile("./secrets/" + (mainnet ? "mainnet" : "testnet") + "-address.addr", "utf-8"),
    ]);
    return {
        sk,
        pk,
        pkh,
        addr: addr as AddressStr,
    };
}

async function getSmartWallet(mainnet: boolean): Promise<SmartWallet> {
    const [refInputStr, addrStr, hash] = await Promise.all([
        readFile("./out/deployRefInput." + (mainnet ? "mainnet" : "preprod") + ".json", "utf-8"),
        readFile("./out/smart-wallet." + (mainnet ? "mainnet" : "testnet") + ".addr", "utf-8"),
        readFile("./out/smart-wallet.hash"),
    ]);

    return {
        refInput: JSON.parse(refInputStr),
        addr: addrStr as AddressStr,
        hash,
    };
}

async function getProtocolParams(mainnet: boolean): Promise<ProtocolParameters> {
    return adaptProtocolParams(
        JSON.parse(
            await readFile(
                mainnet
                    ? "./blockfrost-like.protocolParams.mainnet.json"
                    : "./blockfrost-like.protocolParams.preprod.json",
                "utf-8",
            ),
        ),
    );
}

function isTypeOrElse<T>(
    value: any,
    type:
        | "string"
        | "number"
        | "bigint"
        | "boolean"
        | "symbol"
        | "undefined"
        | "object"
        | "function"
        | ((thing: any) => thing is T),
    orElse: T,
): T {
    if (typeof type === "function") {
        return type(value) ? value : orElse;
    }
    return typeof value === type ? value : orElse;
}

function getAddrsStrArr(thing: any): AddressStr[] {
    if (!Array.isArray(thing)) return [];
    thing = thing.filter(isAddrStr);
    if (thing.length <= 0) return [];
    return thing as AddressStr[];
}

function getNetworkMagic(thing: any): number | undefined {
    if (typeof thing === "number" && Number.isSafeInteger(thing) && thing > 0) return thing;
    if (typeof thing === "string") {
        if (thing === "mainnet") return CardanoNetworkMagic.Mainnet;
        if (thing === "preview") return CardanoNetworkMagic.Preview;
        if (thing === "preprod") return CardanoNetworkMagic.Preprod;
    }
    return undefined;
}

const minThreads = 2;
const maxThreads = Math.max(availableParallelism(), cpus().length);

function normalizeThreads(val: number): number {
    return Math.max(minThreads, Math.min(maxThreads, val));
}

function parseThreads(val: string | number): number {
    if (typeof val === "number") return normalizeThreads(val);
    if (typeof val === "string") {
        val = val.trim();
        if (val.endsWith("%")) {
            const num = parseInt(val.slice(0, -1));
            return normalizeThreads(((maxThreads * num) / 100) >>> 0);
        }

        return normalizeThreads(parseInt(val));
    }
    return Math.max(maxThreads >>> 1, minThreads);
}

function parsePortRange(val: string | any[]): [number, number] {
    const defaultResult = defaultPortRange.slice() as [number, number];

    if (Array.isArray(val)) {
        val = val.filter((x) => typeof x === "number");

        if (val.length < 2) return defaultResult;

        val.length = 2;
        const [a, b] = val;

        return [Math.min(a, b), Math.max(a, b)];
    }

    if (typeof val !== "string") return defaultResult;

    val = val.trim();

    if (!/\b\d{2,5}-\d{2,5}\b/.test(val)) return defaultResult;

    const [a, b] = val.split("-").map((x) => parseInt(x));

    return [Math.min(a, b), Math.max(a, b)];
}
