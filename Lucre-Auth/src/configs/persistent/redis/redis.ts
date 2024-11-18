import { createClient, RedisClientType } from "redis";
import logger from "../../logger";

class Redis {
  private _client: RedisClientType;

  constructor() {
    this._client = createClient();
  }

  async connect() {
    try {
      await this._client.connect();
      logger.info("connected to Redis!");
    } catch (error) {
      if (error.code === "ECONNREFUSED")
        throw Error("Error connecting to Redis client");

      throw Error(error.message);
    }
  }

  get Client() {
    if (!this._client) {
      throw Error("Not connected to redis client");
    }

    return this._client;
  }
}

const connectRedis = new Redis();
export default connectRedis;
