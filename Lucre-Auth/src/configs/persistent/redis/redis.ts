import { createClient, RedisClientType } from "redis";
import logger from "../../logger";

class Redis {
  private _client: RedisClientType = createClient({url: 'redis://redis-cache:6379'});

  get Client() {
    if (this._client.isOpen) {
      throw new Error("Not connected to Redis Server");
    }

    return this._client;
  }

  async connect() {
    try {
      await this._client.connect();
      logger.info("connected to Redis!");
    } catch (error) {
      if (error.code === "ECONNREFUSED")
        throw Error("Error connecting to Redis client");

      throw Error(error.message || error);
    }
  }
}

const connectRedis = new Redis();
export default connectRedis;
