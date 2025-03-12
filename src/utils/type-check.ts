import { ITokenInfo } from "../types";

const isTokenCorrect = (token: Partial<ITokenInfo>): boolean => {
    if (!token.id) throw new Error("Lack of token id. Check current.json");
    if (!token.name) throw new Error("Lack of token name. Check current.json");
    if (!token.networks)
        throw new Error("Lack of token networks. Check current.json");
    if (!token.routes)
        throw new Error("Lack of token routes. Check current.json");

    return true;
};

export const fullfilTokenFields = (token: Partial<ITokenInfo>): ITokenInfo => {
    if (!isTokenCorrect(token)) throw new Error();

    token.prices = {};
    token.pools = token.pools ?? {};

    for (const network in token.networks ?? {}) {
        token.pools[network] = [];
    }
    return token as ITokenInfo;
};
