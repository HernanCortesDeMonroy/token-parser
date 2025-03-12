import { Address } from "viem";
import { Routers } from "./types";

export const routers: Routers = {
    uniswap: {
        v2: {
            mainnet: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
            arbitrum: "0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24",
            polygon: "0xedf6066a2b290C185783862C7F4776A2C8077AD1",
            optimism: "0x4A7b5Da61326A6379179b40d00F57E5bbDC962c2",
            avalanche: "0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24",
            base: "0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24",
            bsc: "0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24",
            // blast: "0xBB66Eb1c5e875933D44DAe661dbD80e5D9B03035",
        },
        v3: {
            mainnet: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
            arbitrum: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
            polygon: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
            optimism: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
            avalanche: "0xbb00FF08d01D300023C629E8fFfFcb65A5a578cE",
            base: "0x2626664c2603336E57B271c5C0b26F421741e481",
            bsc: "0xB971eF87ede563556b2ED4b1C0b0019111Dd85d2",
            // blast: "0x549FEB8c9bd4c12Ad2AB27022dA12492aC452B66",
        },
    },
    sushiswap: {
        v2: {
            mainnet: "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
            arbitrum: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
            polygon: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
            optimism: "0x2ABf469074dc0b54d793850807E6eb5Faf2625b1",
            avalanche: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
            base: "0x6BDED42c6DA8FBf0d2bA55B2fa120C5e0c8D7891",
            bsc: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
            // blast: "0x54CF3d259a06601b5bC45F61A16443ed5404DD64",
        },
        v3: {
            mainnet: "0x2E6cd2d30aa43f40aa81619ff4b6E0a41479B13F",
            arbitrum: "0x8A21F6768C1f8075791D08546Dadf6daA0bE820c",
            polygon: "0x0aF89E1620b96170e2a9D0b68fEebb767eD044c3",
            optimism: "0x8c32Fd078B89Eccb06B40289A539D84A4aA9FDA6",
            avalanche: "0x8E4638eefee96732C56291fBF48bBB98725c6b31",
            base: "0xFB7eF66a7e61224DD6FcD0D7d9C3be5C8B049b9f",
            bsc: "0x909662a99605382dB1E8d69cc1f182bb577d9038",
            // blast: "0x5D0aA5dD03199D80089278B261167ffF24C304ca",
        },
    },
    pancakeswap: {
        v2: {
            mainnet: "0xEfF92A263d31888d860bD50809A8D171709b7b1c",
            arbitrum: "0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb",
            base: "0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb",
            bsc: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
        },
        v3: {
            mainnet: "0x1b81D678ffb9C0263b24A97847620C99d213eB14",
            arbitrum: "0x1b81D678ffb9C0263b24A97847620C99d213eB14",
            base: "0x1b81D678ffb9C0263b24A97847620C99d213eB14",
            bsc: "0x1b81D678ffb9C0263b24A97847620C99d213eB14",
        },
    },
    camelot: {
        v3: {
            arbitrum: "0x1F721E2E82F6676FCE4eA07A5958cF098D339e18",
        },
        v2: {
            arbitrum: "0xc873fEcbd354f5A56E00E710B90EF4201db2448d",
        },
    },
    velodrome: {
        v2: {
            optimism: "0xa062aE8A9c5e11aaA026fc2670B0D65cCc8B2858",
        },
        v3: {
            optimism: "0x0792a633F0c19c351081CF4B211F68F79bCc9676",
        },
    },
    aerodrome: {
        v2: {
            base: "0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43",
        },
        v3: {
            base: "0xBE6D8f0d05cC4be24d5167a3eF062215bE6D18a5",
        },
    },
    quickswap: {
        v2: {
            polygon: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
        },
        v3: {
            polygon: "0xf5b509bB0909a69B1c207E495f687a596C168E12",
        },
    },
    thena: {
        v2: {
            bsc: "0xd4ae6eCA985340Dd434D38F470aCCce4DC78D109",
        },
        v3: {
            bsc: "0x327Dd3208f0bCF590A66110aCB6e5e6941A4EfA0",
        },
    },
    traderjoe: {
        v2: {
            bsc: "0x89Fa1974120d2a7F83a0cb80df3654721c6a38Cd",
            avalanche: "0x60aE616a2155Ee3d9A68541Ba4544862310933d4",
            arbitrum: "0xbeE5c10Cf6E4F68f831E11C1D9E59B43560B3642",
        },
        traderjoe: {
            avalanche: "0x18556DA13313f3532c54711497A8FedAC273220E",
            arbitrum: "0x18556DA13313f3532c54711497A8FedAC273220E",
        },
    },
    ramses: {
        v2: {
            arbitrum: "0xAAA87963EFeB6f7E0a2711F397663105Acb1805e",
        },
        v3: {
            arbitrum: "0xAA23611badAFB62D37E7295A682D21960ac85A90",
        },
    },
    balancer: {
        balancer: {
            mainnet: "0xBA12222222228d8Ba445958a75a0704d566BF2C8",
            polygon: "0xBA12222222228d8Ba445958a75a0704d566BF2C8",
            arbitrum: "0xBA12222222228d8Ba445958a75a0704d566BF2C8",
            optimism: "0xBA12222222228d8Ba445958a75a0704d566BF2C8",
            bsc: "0xBA12222222228d8Ba445958a75a0704d566BF2C8",
            avalanche: "0xBA12222222228d8Ba445958a75a0704d566BF2C8",
            base: "0xBA12222222228d8Ba445958a75a0704d566BF2C8",
        },
    },
    apeswap: {
        v2: {
            bsc: "0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7",
        },
    },
};

export const getRouterAddress = (
    dex: string,
    type: string,
    network: string,
): Address | null => {
    const address = routers[dex][type][network];
    if (!address) return null;
    return address;
};
