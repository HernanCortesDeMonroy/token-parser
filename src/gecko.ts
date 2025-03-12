import axios from "axios";
import { log } from "console";
import { Address, isAddress, isAddressEqual, PublicClient } from "viem";
import {
    fetchBalancerPoolData,
    fetchBalancerPoolTokens,
    fetchCamelotV2PoolData,
    fetchRamsesV2PoolData,
    fetchToken0Token1,
    fetchTokenXTokenY,
    fetchV3PoolData,
    fetchVelodromeSlipstreamPoolData,
    fetchVelodromeV2PoolData,
} from "./pool/pool-info";
import { BasePoolInfo, GekoApiResponse, IPool, ITokenInfo } from "./types";
import { isNetworkSupported } from "./utils/isNetworkSupported";
import { identifyPoolType } from "./pool/pool-type";
import { getProxy } from "./utils/proxy";
import { providers } from "../config/global";

export const parsePools = async (
    token: ITokenInfo,
): Promise<ITokenInfo["pools"]> => {
    for (const network in token.networks) {
        if (!isNetworkSupported(network)) continue;

        const pools = await tokenPoolsByNetwork(
            network,
            token.networks[network].address,
        );
        if (!pools) continue;
        token.pools[network] = pools;
    }

    return token.pools;
};

export const tokenPoolsByNetwork = async (
    network: string,
    token: string,
): Promise<IPool[]> => {
    const basePools: BasePoolInfo[] | null = await fetchTokenPools(
        network,
        token,
    );
    log(`Found ${basePools.length} pools in ${network}`);
    const fetchedPools: IPool[] = await fetchPoolData(network, basePools);
    return fetchedPools;
};

export const fetchTokenPools = async (network: string, address: string) => {
    network = convertNetworkName(network);
    const url = `https://api.geckoterminal.com/api/v2/networks/${network}/tokens/${address}/pools`;
    const params = {
        include: "base_token,quote_token",
        page: 1,
    };

    for (let i = 0; i < 2; i++) {
        try {
            const proxy = await getProxy();
            const response = await axios.get(url, {
                httpAgent: proxy,
                params,
                timeout: 5000,
            });
            const data: GekoApiResponse = response.data;
            return filterPools(data);
        } catch (err: any) {
            log(err.message);
            const message = `Token: ${address} - ${network}\n`;
            continue;
        }
    }
    return [];
};

export const fetchPoolData = async (
    network: string,
    basePools: BasePoolInfo[],
) => {
    const provider = providers[network];
    const pools: IPool[] = [];

    for (const pool of basePools) {
        const type = await identifyPoolType(provider, pool.address, pool.dex);
        const token0token1 = await fetchTokenOrder(
            provider,
            network,
            pool.address,
            type,
        );
        if (!token0token1) continue;
        const [token0, token1] = token0token1;
        const partialPool: IPool = {
            dex: pool.dex,
            type,
            address: pool.address,
            token0,
            token1,
        };
        const fullPool = await fetchPoolInfo(provider, network, partialPool);
        if (!fullPool) continue;
        pools.push(fullPool);
    }

    return pools;
};

const fetchTokenOrder = async (
    provider: PublicClient,
    network: string,
    pairAddress: string,
    type: string,
): Promise<[Address, Address] | null> => {
    if (type === "balancer") {
        const poolId = await fetchBalancerPoolData(provider, pairAddress);
        return poolId
            ? await fetchBalancerPoolTokens(provider, network, poolId)
            : null;
    }

    if (type === "traderjoe")
        return await fetchTokenXTokenY(provider, pairAddress);

    return await fetchToken0Token1(provider, pairAddress);
};

const fetchPoolInfo = async (
    provider: PublicClient,
    network: string,
    pool: IPool,
): Promise<IPool | null> => {
    const { type, dex, address } = pool;

    switch (type) {
        case "balancer":
            const poolId = await fetchBalancerPoolData(provider, address);
            if (!poolId) return null;
            pool.info = { poolId };
            return pool;

        case "v3":
            if (["velodrome", "aerodrome"].includes(dex)) {
                pool.info = {
                    tickSpacing: await fetchVelodromeSlipstreamPoolData(
                        provider,
                        address,
                    ),
                };
                return pool;
            }
            pool.info = { fee: await fetchV3PoolData(provider, pool.address) };
            return pool;

        case "v2":
            if (dex === "ramses") {
                pool.info = {
                    fee: await fetchRamsesV2PoolData(
                        provider,
                        address,
                        network,
                    ),
                };
                return pool;
            }

            if (dex === "camelot") {
                pool.info = await fetchCamelotV2PoolData(provider, address);
                return pool;
            }

            if (["velodrome", "aerodrome"].includes(dex)) {
                const data = await fetchVelodromeV2PoolData(
                    provider,
                    address,
                    network,
                );
                if (data.stable) return null;
                pool.info = { fee: data.fee };
                return pool;
            }
    }

    return pool;
};
const filterPools = (resp: GekoApiResponse) => {
    const sorted: BasePoolInfo[] = resp.data
        .map((pool) => {
            return {
                address: pool.attributes.address,
                liquidity: Number(pool.attributes.reserve_in_usd),
                dex: convertDexName(pool.relationships.dex.data.id),
            };
        })
        .sort((p1, p2) => p2.liquidity - p1.liquidity);
    if (sorted.length === 0) return [];
    else if (sorted.length === 1) return sorted;

    const pools = [sorted[0]];
    const allowedLiqDiff = sorted[0].liquidity * 0.5;

    sorted.forEach((pool, index) => {
        if (index === 0 || index >= 3) return;
        if (pool.liquidity < allowedLiqDiff) return;
        if (!isAddress(pool.address)) return;
        pools.push(pool);
    });

    return pools;
};

const convertNetworkName = (network: string): string => {
    const networks: Record<string, string> = {
        mainnet: "eth",
        polygon: "polygon-pos",
        avalanche: "avax",
    };

    return networks[network] || network;
};

const convertDexName = (dex: string): string => {
    const match = dex.match(/^[^-_]+/);
    return match ? match[0] : dex;
};
