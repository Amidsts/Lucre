import { createClient } from "redis";
import logger from "../../logger";

async function connectRedis() {
  try {
    await createClient().connect();
    logger.error("connected to Redis!");
  } catch (error) {
    if (error.code === "ECONNREFUSED")
      throw Error("Error cnnecting to Redis default port");

    throw Error(error.message);
  }
}

export default connectRedis;
