import { createPublicClient, webSocket } from "viem";
import { clients } from "../../config/clients";

import { Chain } from "viem";
import {
    arbitrum,
    avalanche,
    base,
    bsc,
    mainnet,
    optimism,
    polygon,
} from "viem/chains";

const getViemChain = (network: string): Chain => {
    const viemChainsMap: Record<string, Chain> = {
        arbitrum,
        mainnet,
        bsc,
        polygon,
        avalanche,
        optimism,
        base,
    };
    return viemChainsMap[network];
};

export const createWssProvider = (network: string) => {
    return createPublicClient({
        chain: getViemChain(network),
        transport: webSocket(clients[network].rpc, {
            keepAlive: true,
            reconnect: {
                attempts: 10,
                delay: 1000,
            },
            retryCount: 5,
        }),
    });
};
