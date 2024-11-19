import connectRedis from "./redis";

const { Client } = connectRedis;

export async function setEx(key: string, value: string) {
  return await Client.setEx(key, 30, value);
}

export async function GET(key: string) {
  return await Client.get(key);
}
