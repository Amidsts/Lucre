"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, prettyPrint } = winston_1.format;
const logger = (0, winston_1.createLogger)({
    level: "info",
    format: combine(prettyPrint()),
    transports: [
        process.env.NODE_ENV === "production"
            ? new winston_1.transports.File({ filename: "error.log", level: "error" })
            : new winston_1.transports.Console({
                format: winston_1.format.simple(),
            }),
    ],
});
exports.default = logger;
