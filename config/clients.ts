import { ClientConfig } from "../src/types";

export const clients: Record<string, ClientConfig> = {
    mainnet: {
        rpc: "ws://178.63.28.210:666/eth/ef2377077e865d83967ebe1b9e7360c0",
        weth: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    },
    bsc: {
        rpc: "ws://46.4.14.188:666/bsc/ef2377077e865d83967ebe1b9e7360c0",
        weth: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
    },
    polygon: {
        rpc: "ws://176.9.38.178:666/polygon-pos/ws/ef2377077e865d83967ebe1b9e7360c0",
        weth: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    },
    avalanche: {
        rpc: "ws://46.4.14.188:666/avax-c/ws/ef2377077e865d83967ebe1b9e7360c0",
        weth: "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
    },
    arbitrum: {
        rpc: "ws://94.130.221.228:666/arb1/ef2377077e865d83967ebe1b9e7360c0",
        weth: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    },
    base: {
        // rpc: "ws://144.76.40.243:666/base/ef2377077e865d83967ebe1b9e7360c0",
        rpc: "wss://base-mainnet.g.alchemy.com/v2/zyHEZP5QBkK1IoSxxTw_nCsAvKENh7Xh",
        weth: "0x4200000000000000000000000000000000000006",
    },
    optimism: {
        rpc: "wss://opt-mainnet.g.alchemy.com/v2/zyHEZP5QBkK1IoSxxTw_nCsAvKENh7Xh",
        // rpc: "rpc://optimism.llamarpc.com/sk_llama_fa1624a49b0862b0439167a6ceade71e",
        weth: "0x4200000000000000000000000000000000000006",
    },
};
