/**
 * npm i pusher-js
 * import { client as PusherClient } from "../config/pusher.mjs"
 */
import 'dotenv/config'
import Pusher from "pusher-js";

const APP_KEY = process.env.PUSHER_APP_KEY;
const APP_CLUSTER = process.env.PUSHER_APP_CLUSTER;

const client = new Pusher(APP_KEY, { cluster: APP_CLUSTER });

export { client };
