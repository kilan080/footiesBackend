import './loadEnv.js';
import dotenv from "dotenv";
dotenv.config();


import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import express from "express";
import cors from "cors";
import connectDB from "./src/config/database.js";
import routes from "./src/routes/index.routes.js";

const app = express();
const PORT = 4000;

app.use(cors({ origin: [ "http://localhost:3000", "https://footies-backend.vercel.app" ], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.sendStatus(200).json({
  success: true,
  message: "Welcome to Footies API ...my backend dey work ooo"
}));
app.use(routes);

connectDB();

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
