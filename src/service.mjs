import dotenv from "dotenv";
import express from "express";
// import { route as HelloRoute } from "./routes/hello.mjs";
import { route as AuthenticationRoute } from "./routes/authentication.mjs";

const service = express();

service.use(express.json());
service.use(express.urlencoded({ extended: true }));

service.use(AuthenticationRoute);

export { service };
