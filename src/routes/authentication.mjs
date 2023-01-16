import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Router } from "express";
import cors from "cors";
import { client as PrismaClient } from "../config/prisma.mjs";
import { middleware as AuthenticationMiddleware } from "../middleware/authentication.mjs";

/**
 * Function to generate a JWT
 * @param {*} key
 * @returns
 */
const generateJWT = (key) => {
  const SECRET = process.env.TOKEN_SECRET;
  console.log("SECRET", SECRET);
  return jwt.sign({ key }, SECRET, { expiresIn: "10h" });
  //return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
};

const route = Router();

route.use(cors());

/**
 * Endpoint to register with unique username and a random password
 * http://localhost:3000/authentication/register?username=someuser&name=somename
 */
route.get(
  "/authentication/register",
  AuthenticationMiddleware,
  async (request, response) => {
    const { username, name } = request.query;

    const randomPassword = (Math.random() + 1).toString(36).substring(7);
    const hashedPassword = bcrypt.hashSync(randomPassword, 10);

    const user = await PrismaClient.user.findUnique({
      where: {
        username,
      },
    });

    if (user) return response.send("USER ALREADY EXIST!");

    await PrismaClient.user.create({
      data: {
        username,
        password: hashedPassword,
        name,
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
route.get("/authentication/login", async (request, response) => {
  const { username, password } = request.query;
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
