import connectRedis from "./redis";
import logger from "../../logger";

const { Client } = connectRedis;

export async function setEx(key: string, value: string) {
  return await Client.setEx(key, 30, value);
}

export async function get(key: string) {
  return await Client.get(key);
}
