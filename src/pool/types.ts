import { Address } from "viem";

export interface IBalancerPoolData {
    poolId: string;
}

export interface ICamelotV2PoolData {
    token0Fee: number;
    token1Fee: number;
}

export interface IV3PoolData {
    fee: number;
}

export interface IVelodromeSlipstreamData {
    tickSpacing: number;
}

export interface IVelodromeV2PoolData {
    factory: string;
    stable: boolean;
}

export interface Routers {
    [dex: string]: { [type: string]: { [network: string]: Address } };
}
