import { createClient } from "redis";

async function connectRedis() {
  try {
    await createClient().connect();
    console.log("connected to Redis!");
  } catch (error) {
    console.log("Redis Client Error", error);
  }
}

export default connectRedis;
