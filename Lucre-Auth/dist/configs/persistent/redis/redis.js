"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const lucre_common_1 = require("lucre-common");
class Redis {
    constructor() {
        this._client = (0, redis_1.createClient)({ url: 'redis://redis-cache:6379' });
    }
    get Client() {
        if (this._client.isOpen) {
            throw new Error("Not connected to Redis Server");
        }
        return this._client;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._client.connect();
                lucre_common_1.logger.info("connected to Redis!");
            }
            catch (error) {
                if (error.code === "ECONNREFUSED")
                    throw Error("Error connecting to Redis client");
                throw Error(error.message || error);
            }
        });
    }
}
const connectRedis = new Redis();
exports.default = connectRedis;
