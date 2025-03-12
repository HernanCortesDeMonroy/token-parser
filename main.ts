import { log } from "console";
import { readFile, writeFile } from "./src/utils/file";
import { parsePools } from "./src/gecko";

async function main() {
    const token = await readFile();
    token.pools = await parsePools(token);
    await writeFile(token);
}

main();
