/**
 * npm i ioredis
 * import { client as RedisClient } from "../config/redis.mjs"
 */
import 'dotenv/config'
import Redis from "ioredis";

const URI = process.env.REDIS_URI;

const client = new Redis(URI);

export { client };
