/** @format */

import express from "express";
import cors from "cors";
import "dotenv/config";
// import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import ropesRouter from "./routes/ropesRoutes.js";
import { createServer } from "http";
import { initializeSocket } from "./services/Socket.js";

// dotenv.config();

const corsOptions = {
  origin: process.env.MAIN_PORT,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
};

const app = express();
const port = 6835;
const httpServer = createServer(app);

initializeSocket(httpServer);

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", ropesRouter);

try {
  await mongoose.connect(process.env.DB_ID);
  httpServer.listen(port, () => {
    console.log(`Database connected and server is running at port ${port}`);
  });
} catch (err) {
  console.log(err);
}
