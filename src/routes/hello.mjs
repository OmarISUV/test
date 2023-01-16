import { Router } from "express";
import cors from "cors";
import { middleware as HelloMiddleware } from "../middleware/hello.mjs";
import { client as MongoClient } from "../config/mongodb.mjs"

const route = Router();

route.use(cors());

route.get("/", HelloMiddleware, async (request, response) => {
  await MongoClient.connect()
  
  response.send("Hello World!!-----");
});

export { route };