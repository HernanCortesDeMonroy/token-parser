import {
    IBalancerPoolData,
    ICamelotV2PoolData,
    IV3PoolData,
    IVelodromeSlipstreamData,
} from "./pool/types";

interface IInterPool extends IPool {
    network: string;
}

export interface IPool {
    dex: string;
    type: "v2" | "v3" | "traderjoe" | "balancer" | "unknown" | string;
    address: string;
    token0: string;
    token1: string;
    info?:
        | IV3PoolData
        | IBalancerPoolData
        | IVelodromeSlipstreamData
        | ICamelotV2PoolData;
}

interface IPoolResponse {
    pool: IPool;
    interpool?: IInterPool;
    amountIn: string;
    amountOut: string;
    amountInReadable: number;
    amountOutReadable: number;
    rate: number;
}

interface IPoolInterval {
    buy: IPoolResponse;
    sell: IPoolResponse;
}

interface INetworkPrices {
    [interval: string]: IPoolInterval;
}

interface ITokenRoutes {
    [srcNetwork: string]: {
        [dstNetwork: string]: {
            [bridge: string]: any;
        };
    };
}

interface ITokenNetwork {
    address: string;
    decimals: number;
    fee?: { buy: number; sell: number };
}

export interface ITokenInfo {
    id: string;
    name: string;
    symbol: string;
    networks: Record<string, ITokenNetwork>;
    pools: Record<string, IPool[]>;
    prices: Record<string, INetworkPrices>;
    routes: ITokenRoutes;
}

export interface ClientConfig {
    rpc: string;
    weth: string;
}

interface PriceChangePercentage {
    m5: string;
    h1: string;
    h6: string;
    h24: string;
}

interface Transactions {
    buys: number;
    sells: number;
    buyers: number;
    sellers: number;
}

interface TransactionsData {
    m5: Transactions;
    m15: Transactions;
    m30: Transactions;
    h1: Transactions;
    h24: Transactions;
}

interface VolumeUSD {
    m5: string;
    h1: string;
    h6: string;
    h24: string;
}

interface PoolAttributes {
    base_token_price_usd: string;
    base_token_price_native_currency: string;
    quote_token_price_usd: string;
    quote_token_price_native_currency: string;
    base_token_price_quote_token: string;
    quote_token_price_base_token: string;
    address: string;
    name: string;
    pool_created_at: string;
    token_price_usd: string;
    fdv_usd: string;
    market_cap_usd: string | null;
    price_change_percentage: PriceChangePercentage;
    transactions: TransactionsData;
    volume_usd: VolumeUSD;
    reserve_in_usd: string;
}

interface RelationshipData {
    id: string;
    type: string;
}

interface Relationships {
    base_token: { data: RelationshipData };
    quote_token: { data: RelationshipData };
    dex: { data: RelationshipData };
}

interface Pool {
    id: string;
    type: string;
    attributes: PoolAttributes;
    relationships: Relationships;
}

export interface GekoApiResponse {
    data: Pool[];
}

export interface BasePoolInfo {
    address: string;
    liquidity: number;
    dex: string;
}
