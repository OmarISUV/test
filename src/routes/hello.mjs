import { Router } from "express";
import cors from "cors";
import { middleware as HelloMiddleware } from "../middleware/hello.mjs";

const route = Router();

route.use(cors());

route.get("/", HelloMiddleware, async (request, response) => {
  return response.send("Hello World!!");
});

export { route };
