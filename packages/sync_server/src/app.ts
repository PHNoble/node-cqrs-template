import express from "express";
import cors from "cors";
import path from "path";

// get env vars
const env_path = path.join(__dirname, "../../../.env");
require("dotenv").config({ path: env_path });

const PORT = process.env.SYNC_PORT ?? 3002;

const app = express();

async function main() {
  app.use(cors);
  app.use(express.json());

  app.get("/", function (req, res) {
    console.log("hello world");
  });

  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
}

main();
