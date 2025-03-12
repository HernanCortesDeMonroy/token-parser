import { SocksProxyAgent } from "socks-proxy-agent";
import fs from "fs/promises";

export const getProxy = async (): Promise<SocksProxyAgent> => {
    const proxies = (await fs.readFile("./config/proxies.txt", "utf8")).split(
        "\n",
    );
    const proxyIndex = Math.floor(Math.random() * proxies.length - 1);
    const proxy = proxies[proxyIndex].split(":");
    return new SocksProxyAgent(
        `socks5://${proxy[2]}:${proxy[3]}@${proxy[0]}:${proxy[1]}`,
    );
};
