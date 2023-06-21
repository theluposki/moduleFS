import { readdir, stat, readFile, writeFile, unlink } from "node:fs/promises";
import { join } from "node:path";
import { encrypt, decrypt } from "./crypto.js";
import config from "../config.js";

const defaultDir = "src/dir/";

export const readDirAsync = async (directoryPath = defaultDir) => {
  try {
    const items = await readdir(directoryPath);

    return await Promise.all(
      items.map(async (item) => {
        const itemPath = join(directoryPath, item);
        const itemStats = await stat(itemPath);
        return {
          name: item,
          isDirectory: itemStats.isDirectory(),
        };
      })
    );
  } catch (err) {
    console.error("Ocorreu um erro ao ler o diretório:", err);
    return [];
  }
};

export const readFileAsync = async (filePath) => {
  try {
    const fileResult = await readFile(`${defaultDir}${filePath}`, "utf8");
    return decrypt(fileResult, config.password);
  } catch (erro) {
    console.error("Erro ao ler o arquivo:", erro);
    return "Erro ao ler o arquivo";
  }
};

export const writeFileAsync = async (filePath, content) => {
  try {
    const enc = encrypt(content, config.password);
    await writeFile(`${defaultDir}${filePath}`, enc);
    console.log("Arquivo escrito com sucesso!");
    return { sucess: "Arquivo escrito com sucesso!" };
  } catch (erro) {
    console.error("Erro ao escrever no arquivo:", erro);
    return { error: "Erro ao escrever no arquivo" };
  }
};

export const deleteFileAsync = async (filePath) => {
  try {
    await unlink(`${defaultDir}${filePath}`);
    console.log("Arquivo excluído com sucesso!");
    return { sucess: "Arquivo excluído com sucesso!" };
  } catch (erro) {
    console.error("Erro ao excluir o arquivo:", erro);
  }
};
