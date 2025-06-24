"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const { env } = process;
const appConfigs = {
    mongoDbUri: env.DB_URI || "",
    port: env.PORT || 7000,
    accessTokenSecret: env.ACCESS_TOKEN_SECRET || "",
    accessTokenLifeSpan: 60 * 60 * 24,
    hashPepper: env.HASH_PEPPER,
};
exports.default = appConfigs;
