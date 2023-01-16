import dotenv from "dotenv";
import express from "express";
// import { route as HelloRoute } from "./routes/hello.mjs";
import { route as UsersRoute } from "./routes/users.mjs";

const service = express();

service.use(express.json());
service.use(express.urlencoded({ extended: true }));

service.use(UsersRoute);

export { service };
