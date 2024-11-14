import { transports, format, createLogger } from "winston";

const { combine, prettyPrint } = format;
const logger = createLogger({
  level: "info",
  format: combine(prettyPrint()),
  transports: [
    process.env.NODE_ENV === "production"
      ? new transports.File({ filename: "error.log", level: "error" })
      : new transports.Console({
          format: format.simple(),
        }),
  ],
});

export default logger;
