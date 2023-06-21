import express from "express";
import cors from "cors";

import {
  readDirAsync,
  readFileAsync,
  writeFileAsync,
  deleteFileAsync,
} from "./utils/fs.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", express.static("src/public"));

app.get("/dir", async (req, res) => {
  try {
    const dir = await readDirAsync();
    if (dir.error) return res.status(400).json(dir);
    res.status(200).json(dir);
  } catch (error) {
    if (error) return console.log(error);
  }
});

app.get("/dir/:file", async (req, res) => {
  try {
    const file = await readFileAsync(req.params.file);
    if (file.error) return res.status(400).json(file);
    res.status(200).json(file);
  } catch (error) {
    if (error) console.log(error);
    res.status(400).json({ error: "error ao ler arquivo." });
  }
});

app.post("/newfile", async (req, res) => {
  const { filename, body } = req.body;

  try {
    const file = await writeFileAsync(filename, body);

    if (file.error) return res.status(400).json(file);

    res.status(201).json(file);
  } catch (error) {
    if (error) {
      res.status(400).json({ error: "error ao tentar escrever arquivo." });
    }
  }
});

app.delete("/file/:file", async (req, res) => {
  try {
    const file = await deleteFileAsync(req.params.file);
    if (file.error) return res.status(400).json(file);
    res.status(200).json(file);
  } catch (error) {
    if (error) console.log(error);
    res.status(400).json({ error: "error ao deletar arquivo." });
  }
});

export default app;
