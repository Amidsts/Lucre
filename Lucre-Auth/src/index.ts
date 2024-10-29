import mongoose from "mongoose";
import appConfigs from "./configs";
import app from "./configs/app";
import connectDB from "./configs/db";

(async () => {
  let server: any;
  try {
    await connectDB();
    server = app.listen(appConfigs.port, () => {
      console.log(`Server is running on port ${appConfigs.port}`);
    });

    const gracefulShutdown = () => {
      console.log("Received server kill signal, shutting down gracefully.");

      server.close(async () => {
        try {
          await mongoose.disconnect();
          console.log("Closed database connections.");
        } catch (err) {
          console.log("Error closing connections", err);
        } finally {
          process.exit(0);
        }
      });
    };

    process
      .on("SIGINT", gracefulShutdown)
      .on("SIGTERM", gracefulShutdown)
      .on("unhandledRejection", (error) => {
        console.log("unhandledRejection Signal: ", error);
        gracefulShutdown();
      })
      .on("uncaughtException", (error) => {
        console.log("uncaughtException Signal: ", error);
        gracefulShutdown();
      });
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
})();
