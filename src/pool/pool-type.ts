import { Address, encodeFunctionData, parseAbiItem, PublicClient } from "viem";

export const identifyPoolType = async (
    provider: PublicClient,
    pairAddress: string,
    dex: string,
) => {
    if (dex == "traderjoe") {
        const isTraderjoe = await isTraderjoePool(provider, pairAddress);
        if (isTraderjoe) return "traderjoe";
    }
    const isV2 = await isV2Pool(provider, pairAddress);
    if (isV2) return "v2";
    const isV3 = await isV3Pool(provider, pairAddress);
    if (isV3) return "v3";
    const isBalancer = await isBalancerPool(provider, pairAddress);
    if (isBalancer) return "balancer";
    return "unknown";
};

const isBalancerPool = async (
    provider: PublicClient,
    pairAddress: string,
): Promise<boolean> => {
    const balData = encodeFunctionData({
        abi: [parseAbiItem("function getPoolId()")],
        functionName: "getPoolId",
    });
    try {
        const balancerResponse = await provider.call({
            // account: settings.botAddress,
            data: balData,
            to: pairAddress as Address,
        });
        if (!balancerResponse.data) return false;
        return true;
    } catch (error: any) {
        return false;
    }
};

const isV2Pool = async (
    provider: PublicClient,
    pairAddress: string,
): Promise<boolean> => {
    const v2Data = encodeFunctionData({
        abi: [parseAbiItem("function getReserves()")],
        functionName: "getReserves",
    });
    try {
        const v2Response = await provider.call({
            // account: settings.botAddress,
            data: v2Data,
            to: pairAddress as Address,
        });
        if (!v2Response.data) return false;
        return true;
    } catch (error: any) {
        return false;
    }
};

const isV3Pool = async (
    provider: PublicClient,
    pairAddress: string,
): Promise<boolean> => {
    const v3Data = encodeFunctionData({
        abi: [parseAbiItem("function tickSpacing()")],
        functionName: "tickSpacing",
    });
    try {
        const v3Response = await provider.call({
            // account: settings.botAddress,
            data: v3Data,
            to: pairAddress as Address,
        });
        if (!v3Response.data) return false;
        return true;
    } catch (error: any) {
        return false;
    }
};

const isTraderjoePool = async (
    provider: PublicClient,
    pairAddress: string,
): Promise<boolean> => {
    const traderjoeData = encodeFunctionData({
        abi: [parseAbiItem("function getBinStep() external returns (uint16)")],
        functionName: "getBinStep",
    });
    try {
        const traderjoeResponse = await provider.call({
            // account: settings.botAddress,
            data: traderjoeData,
            to: pairAddress as `0x${string}`,
        });
        if (!traderjoeResponse.data) return false;
        return true;
    } catch (error: any) {
        return false;
    }
};
