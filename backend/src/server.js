import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { loadRoutes } from "./routes/index.js";

const app = express();
const port = 3000;

// ROTA PRINCIPAL
app.get("/health", async (req, res) => {
  res.json({ statuts: "ok" });
});

loadRoutes(app);

// INICIAR SERVIDOR
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

async function mani() {
  await mongoose.connect(process.env.MONGO_URL);
}

// LIGAR AO MONGO
main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
