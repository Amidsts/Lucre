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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const logger_1 = __importDefault(require("../../logger"));
class Redis {
    constructor() {
        this._client = (0, redis_1.createClient)();
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
                logger_1.default.info("connected to Redis!");
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
