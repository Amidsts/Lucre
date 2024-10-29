import mongoose, { ConnectOptions } from "mongoose";
import appConfigs from ".";

async function connectDB(): Promise<void> {
  const options = {
    family: 4,
  } as ConnectOptions;

  try {
    await mongoose.connect(appConfigs.mongoDbUri, options);

    console.log("Database connected");
  } catch (error) {
    console.log("Error connecting to database:", error);
    process.exit(1);
  }

  // Listen for errors after the initial connection
  mongoose.connection.on("error", (error) => {
    console.log("Database error:" + error, "error");
  });
}

export default connectDB;
