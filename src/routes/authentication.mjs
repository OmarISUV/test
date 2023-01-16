import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Router } from "express";
import cors from "cors";
import { client as PrismaClient } from "../config/prisma.mjs";
import { middleware as AuthenticationMiddleware } from "../middleware/authentication.mjs";
import { middleware as AuthorizationMiddleware } from "../middleware/authorization.mjs";

/**
 * Function to generate a JWT
 * @param {*} key
 * @returns
 */
const generateJWT = (key) => {
  const SECRET = process.env.TOKEN_SECRET;
  console.log("SECRET", SECRET);
  return jwt.sign({ key }, SECRET, { expiresIn: "10h" });
};

const route = Router();

route.use(cors());

/**
 * Endpoint to register with unique username and a random password
 * http://localhost:3000/authentication/register?username=someuser&name=somename
 */
route.post(
  "/authentication/register",
  AuthenticationMiddleware,
  AuthorizationMiddleware("master"),
  async (request, response) => {
    const { username, name } = request.body;

    const randomPassword = (Math.random() + 1).toString(36).substring(7);
    const hashedPassword = bcrypt.hashSync(randomPassword, 10);

    const user = await PrismaClient.user.findUnique({
      where: {
        username,
      },
    });

    if (user) return response.send("USER ALREADY EXIST!");

    const rolDefault = await PrismaClient.rol.findUnique({
      where: { key: "master" },
    });

    await PrismaClient.user.create({
      data: {
        username,
        password: hashedPassword,
        name,
        rol: {
          connect: { id: rolDefault.id },
        },
      },
    });

    const token = generateJWT(username);

    return response.json({
      username,
      randomPassword,
      token,
    });
  }
);

/**
 * Endpoint to login with existing username and valid password
 * http://localhost:3000/authentication/login?username=someuser&password=somepassword
 */
route.post("/authentication/login", async (request, response) => {
  const { username, password } = request.body;
  let token = null;

  const user = await PrismaClient.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) return response.send("USER DOESNT EXIST!");

  if (bcrypt.compareSync(password, user.password))
    token = generateJWT(username);

  return response.json({
    username,
    token,
  });
});

export { route };
