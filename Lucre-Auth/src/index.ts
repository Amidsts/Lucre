import mongoose from "mongoose";
import appConfigs from "./configs";
import app from "./configs/app";
import connectDB from "./configs/persistent/db";
import connectRedis from "./configs/persistent/redis";
import logger from "./configs/logger";

(async () => {
  let server: any;
  try {
    await connectDB();
    await connectRedis.connect();

    server = app.listen(appConfigs.port, () => {
      logger.info(`Server is running on port ${appConfigs.port}`);
    });

    const gracefulShutdown = () => {
      logger.info("Received server kill signal, shutting down gracefully.");

      server.close(async () => {
        try {
          await mongoose.disconnect();
          logger.info("Closed database connections.");
        } catch (err) {
          logger.info("Error closing connections", err);
        } finally {
          process.exit(0);
        }
      });
    };

    process
      .on("SIGINT", gracefulShutdown)
      .on("SIGTERM", gracefulShutdown)
      .on("unhandledRejection", (error) => {
        logger.info("unhandledRejection Signal: ", error);
        gracefulShutdown();
      })
      .on("uncaughtException", (error) => {
        logger.info("uncaughtException Signal: ", error);
        gracefulShutdown();
      });
  } catch (error) {
    logger.error(error.message);
    process.exit(0);
  }
})();
