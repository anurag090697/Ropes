/** @format */

import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import ropesRouter from "./routes/ropesRoutes.js";

const corsOptions = {
  origin: process.env.MAIN_PORT,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
};
//  console.log(process.env.MAIN_PORT)
const app = express();
const port = 6835;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", ropesRouter);

try {
  await mongoose.connect(process.env.DB_ID);
  app.listen(port, () => {
    console.log(`Database connected and server is running at port ${port}`);
  });
} catch (err) {
  console.log(err);
}
