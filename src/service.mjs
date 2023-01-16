import express from "express";
import { route as HelloRoute } from "./routes/hello.mjs";

const service = express();

service.use(express.json());
service.use(express.urlencoded({ extended: true }));

service.use(HelloRoute);

export { service };
