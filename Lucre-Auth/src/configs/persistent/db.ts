import mongoose, { ConnectOptions } from "mongoose";
import appConfigs from "..";
import logger from "../logger";

async function connectDB(): Promise<void> {
  const options = {
    family: 4,
  } as ConnectOptions;

  try {
    await mongoose.connect(appConfigs.mongoDbUri, options);

    logger.info("Connected to Database");
  } catch (error) {
    throw Error(`Error connecting to database: ${error.message}`);
  }

  // Listen for errors after the initial connection
  mongoose.connection.on("error", (error) => {
    throw Error(`Database error: ${error.message}`);
  });
}

export default connectDB;
