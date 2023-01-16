import { Router } from "express";
import cors from "cors";
import { middleware as HelloMiddleware } from "../middleware/hello.mjs";

const route = Router();

route.use(cors());

route.get("/", HelloMiddleware, (request, response) => {
  response.send("Hello World!!");
});

export { route };