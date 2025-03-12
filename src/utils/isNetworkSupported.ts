import { clients } from "../../config/clients";

export const isNetworkSupported = (network: string): boolean => {
    if (Object.keys(clients).includes(network)) return true;
    return false;
};
