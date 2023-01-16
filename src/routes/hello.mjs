import { Router } from "express";
import cors from "cors";
import { middleware as HelloMiddleware } from "../middleware/hello.mjs";
import { client as PrismaClient } from "../config/prisma.mjs";

const route = Router();

route.use(cors());

route.get("/", HelloMiddleware, async (request, response) => {
  await PrismaClient.$connect();

  await PrismaClient.user.create({
    data: {
      name: "Rich",
      email: "hello@prisma.com",
      posts: {
        create: {
          title: "My first post",
          body: "Lots of really interesting stuff",
          slug: "my-first-post",
        },
      },
    },
  });

  response.send("Hello World!!");
});

export { route };