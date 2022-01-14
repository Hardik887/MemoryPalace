// in newest version of node, we can use this import syntax instead of using require
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true })); // For images larger in size
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use("/posts", postRoutes);

app.get('/', (req, res) => {
  res.send('Hello API')
})

mongoose.connect(process.env.CONNECTION_URL, {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`);
});
