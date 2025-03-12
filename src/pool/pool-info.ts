import {
    Address,
    decodeFunctionResult,
    encodeFunctionData,
    fromHex,
    Hex,
    parseAbiItem,
    PublicClient,
    trim,
} from "viem";
import { factories } from "./factory";
import { getRouterAddress } from "./routers";
import { ICamelotV2PoolData } from "./types";

export const fetchV3PoolData = async (
    provider: PublicClient,
    pairAddress: string,
): Promise<number> => {
    const tickSpacingData = encodeFunctionData({
        abi: [parseAbiItem("function tickSpacing()")],
        functionName: "tickSpacing",
    });
    try {
        const tickSpacingResponse = await provider.call({
            data: tickSpacingData,
            to: pairAddress as Address,
        });

        if (!tickSpacingResponse.data)
            throw new Error(
                `${provider.chain?.name} | V3 pool data is undefined for ${pairAddress}`,
            );
        const tickSpacing = Number(fromHex(tickSpacingResponse.data, "bigint"));
        const fee = tickSpacingToFeeTier(tickSpacing as 200 | 60 | 50 | 10 | 1);
        return fee;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

const tickSpacingToFeeTier = (tickSpacing: 200 | 60 | 50 | 10 | 1) => {
    const feeTier = {
        200: 10000, // 1% fee tier
        60: 3000, // 0.3% fee tier
        50: 2500, // 0.25 fee tier
        10: 500, // 0.05% fee tier
        1: 100, // 0.01% fee tier
    };
    return feeTier[tickSpacing];
};

export const fetchRamsesV2PoolData = async (
    provider: PublicClient,
    pairAddress: string,
    network: string,
) => {
    const feeData = encodeFunctionData({
        abi: [
            parseAbiItem(
                "function pairFee(address _pool) external view returns (uint256 fee)",
            ),
        ],
        functionName: "pairFee",
        args: [pairAddress as Address],
    });
    try {
        const feeResponse = await provider.call({
            to: factories["ramses"][network] as Address,
            data: feeData,
        });

        if (!feeResponse.data)
            throw new Error(
                `${provider.chain?.name} | Ramses pool data is undefined for ${pairAddress}`,
            );
        const fee = Number(fromHex(feeResponse.data, "bigint"));
        return fee;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const fetchVelodromeV2PoolData = async (
    provider: PublicClient,
    pairAddress: string,
    network: string,
) => {
    const feeData = encodeFunctionData({
        abi: [
            parseAbiItem(
                "function getFee(address pool, bool stable) external view returns (uint256 fee)",
            ),
        ],
        functionName: "getFee",
        args: [pairAddress as Address, false],
    });
    const stableData = encodeFunctionData({
        abi: [parseAbiItem("function stable() returns (bool)")],
        functionName: "stable",
    });
    try {
        const feeResponse = await provider.call({
            to: factories["velodrome"][network] as Address,
            data: feeData,
        });
        const stableResponse = await provider.call({
            to: pairAddress as Address,
            data: stableData,
        });

        if (!feeResponse.data)
            throw new Error(
                `${provider.chain?.name} | Velodrome pool data is undefined for ${pairAddress}`,
            );
        if (!stableResponse.data)
            throw new Error(
                `${provider.chain?.name} | Velodrome pool data is undefined for ${pairAddress}`,
            );
        const fee = Number(fromHex(feeResponse.data, "bigint"));
        const isStable = fromHex(stableResponse.data, "boolean");
        return { fee: fee, stable: isStable };
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const fetchBalancerPoolData = async (
    provider: PublicClient,
    pairAddress: string,
) => {
    const poolIdData = encodeFunctionData({
        abi: [parseAbiItem("function getPoolId() returns (bytes32 poolId)")],
        functionName: "getPoolId",
    });
    try {
        const poolIdResponse = await provider.call({
            to: pairAddress as Address,
            data: poolIdData,
        });

        if (!poolIdResponse.data)
            throw new Error(
                `${provider.chain?.name} | Balancer pool poolId is undefined for ${pairAddress}`,
            );
        return poolIdResponse.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const fetchVelodromeSlipstreamPoolData = async (
    provider: PublicClient,
    pairAddress: string,
): Promise<number> => {
    const tickSpacingData = encodeFunctionData({
        abi: [parseAbiItem("function tickSpacing()")],
        functionName: "tickSpacing",
    });
    try {
        const tickSpacingResponse = await provider.call({
            data: tickSpacingData,
            to: pairAddress as Address,
        });

        if (!tickSpacingResponse.data)
            throw new Error(
                `${provider.chain?.name} | VElodrome pool data is undefined for ${pairAddress}`,
            );
        const tickSpacing = Number(fromHex(tickSpacingResponse.data, "bigint"));
        return tickSpacing;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const fetchCamelotV2PoolData = async (
    provider: PublicClient,
    pairAddress: string,
): Promise<ICamelotV2PoolData> => {
    const token0Data = encodeFunctionData({
        abi: [parseAbiItem("function token0FeePercent()")],
        functionName: "token0FeePercent",
    });
    const token1Data = encodeFunctionData({
        abi: [parseAbiItem("function token1FeePercent()")],
        functionName: "token1FeePercent",
    });
    try {
        const token0Response = await provider.call({
            data: token0Data,
            to: pairAddress as Address,
        });
        const token1Response = await provider.call({
            data: token1Data,
            to: pairAddress as Address,
        });

        if (!token0Response.data || !token1Response.data)
            throw new Error(
                `${provider.chain?.name} | Camelot pool data is undefined for ${pairAddress}`,
            );
        const token0Fee = Number(fromHex(token0Response.data, "bigint"));
        const token1Fee = Number(fromHex(token1Response.data, "bigint"));
        return { token0Fee, token1Fee };
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const fetchBalancerPoolTokens = async (
    provider: PublicClient,
    network: string,
    poolId: string,
): Promise<[Address, Address] | null> => {
    const router = getRouterAddress("balancer", "balancer", network);
    if (!router) return null;

    const abi =
        "function getPoolTokens(bytes32 poolId) returns (address[] tokens, uint256[] balances, uint256 lastChangedBlock)";
    const callData = encodeFunctionData({
        abi: [parseAbiItem(abi)],
        functionName: "getPoolTokens",
        args: [poolId as Hex],
    });

    try {
        const poolTokensData = await provider.call({
            to: router,
            data: callData,
        });
        if (!poolTokensData.data)
            throw new Error(
                `${network} | Balancer pool data is undefined for ${poolId}`,
            );

        const decodedData = decodeFunctionResult({
            abi: [parseAbiItem(abi)],
            functionName: "getPoolTokens",
            data: poolTokensData.data,
        });
        if (decodedData[0].length > 2) return null;
        const token0: Address = decodedData[0][0];
        const token1: Address = decodedData[0][1];
        return [token0, token1];
    } catch (error: any) {
        console.log(error.message);
        return null;
    }
};

export const fetchToken0Token1 = async (
    provider: PublicClient,
    pairAddress: string,
): Promise<[Address, Address] | null> => {
    const token0Data = encodeFunctionData({
        abi: [parseAbiItem("function token0()")],
        functionName: "token0",
    });
    const token1Data = encodeFunctionData({
        abi: [parseAbiItem("function token1()")],
        functionName: "token1",
    });
    try {
        const [token0Response, token1Response] = await Promise.all([
            provider.call({
                data: token0Data,
                to: pairAddress as Address,
            }),
            provider.call({
                data: token1Data,
                to: pairAddress as Address,
            }),
        ]);
        if (!token0Response.data || !token1Response.data)
            throw new Error(
                `${provider.chain?.name} | Token adresses are undefined for ${pairAddress}`,
            );

        const token0 = trim(token0Response.data);
        const token1 = trim(token1Response.data);

        return [token0, token1];
    } catch (error: any) {
        return null;
    }
};

export const fetchTokenXTokenY = async (
    provider: PublicClient,
    pairAddress: string,
): Promise<[Address, Address] | null> => {
    const token0Data = encodeFunctionData({
        abi: [parseAbiItem("function getTokenX()")],
        functionName: "getTokenX",
    });
    const token1Data = encodeFunctionData({
        abi: [parseAbiItem("function getTokenY()")],
        functionName: "getTokenY",
    });
    try {
        const [token0Response, token1Response] = await Promise.all([
            provider.call({
                data: token0Data,
                to: pairAddress as Address,
            }),
            provider.call({
                data: token1Data,
                to: pairAddress as Address,
            }),
        ]);
        if (!token0Response.data || !token1Response.data)
            throw new Error(
                `${provider.chain?.name} | Token adresses are undefined for ${pairAddress}`,
            );

        const token0 = trim(token0Response.data);
        const token1 = trim(token1Response.data);

        return [token0, token1];
    } catch (error: any) {
        return null;
    }
};
