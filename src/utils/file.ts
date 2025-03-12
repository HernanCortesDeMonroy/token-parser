import fs from "fs/promises";
import { ITokenInfo } from "../types";
import { fullfilTokenFields } from "./type-check";

export const readFile = async (): Promise<ITokenInfo> => {
    try {
        const rawData = await fs.readFile("./files/current.json", "utf-8");
        const partialToken: Partial<ITokenInfo> = JSON.parse(rawData);
        return fullfilTokenFields(partialToken);
    } catch (err: any) {
        console.error("Reading file error: ", err.message);
        throw new Error();
    }
};

export const writeFile = async (token: ITokenInfo) => {
    try {
        await fs.writeFile(
            "./files/current.json",
            JSON.stringify(token),
            "utf-8",
        );
        return token;
    } catch (err: any) {
        console.error("Writing file error: ", err.message);
        throw new Error();
    }
};
