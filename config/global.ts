import { PublicClient } from "viem";
import { createWssProvider } from "../src/utils/wss";

export const providers: Record<string, PublicClient> = {
    arbitrum: createWssProvider("arbitrum"),
    base: createWssProvider("base"),
    bsc: createWssProvider("bsc"),
    mainnet: createWssProvider("mainnet"),
    avalanche: createWssProvider("avalanche"),
    polygon: createWssProvider("polygon"),
    optimism: createWssProvider("optimism"),
};
