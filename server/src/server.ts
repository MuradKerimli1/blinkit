import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { AppDataSource } from "./DAL/Config/db";
import { helper } from "./DAL/Config/helper";
import cors from "cors";
import cookieParser from "cookie-parser";

import helmet from "helmet";
import { mainRouter } from "./Router/index.router";

const server = express();
const port = 8080;

AppDataSource.initialize().then(async () => {
  console.log("db are connected");

  // middleware

  // seedDatabase()
  server.use(
    cors({
      credentials: true,
      origin: process.env.FRONT_END_URL,
    })
  );
  server.use(express.json());
  // server.use(limiter);
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser());
  server.use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  );

  // router
  server.use("/api/v1", mainRouter);

  // error middleware

  server.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Error:", err.message);
    res.status(err.status || 500).json({
      message: err.message || "Something went wrong. Please try again later.",
    });
  });

  server.listen(port, () => {
    console.log(`server running port ${port}`);
  });
});
