import express from "express";
import mongoose from "mongoose";
import loadRoutes from "./routes/index.js";
import "dotenv/config";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/health", async (req, res) => {
  res.json({ status: "ok" });
});
loadRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
main()
  .then(() => {
    console.log("Mongo db successfully connected");
  })
  .catch((err) => console.log(err));
