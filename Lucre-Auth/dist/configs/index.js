"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const { env } = process;
const appConfigs = {
    mongoDbUri: env.MONGO_URI || "",
    port: env.PORT || 7000,
    accessTokenSecret: env.ACCESS_TOKEN_SECRET || "",
    accessTokenLifeSpan: "1 days",
    refreshTokenSecret: env.REFRESH_TOKEN_SECRET || "",
    refreshTokenLifeSpan: "7 days",
    hashPepper: env.HASH_PEPPER,
};
exports.default = appConfigs;
