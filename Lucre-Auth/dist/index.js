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
const mongoose_1 = __importDefault(require("mongoose"));
const configs_1 = __importDefault(require("./configs"));
const app_1 = __importDefault(require("./configs/app"));
const db_1 = __importDefault(require("./configs/db"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    let server;
    try {
        yield (0, db_1.default)();
        server = app_1.default.listen(configs_1.default.port, () => {
            console.log(`Server is running on port ${configs_1.default.port}`);
        });
        const gracefulShutdown = () => {
            console.log("Received server kill signal, shutting down gracefully.");
            server.close(() => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield mongoose_1.default.disconnect();
                    console.log("Closed database connections.");
                }
                catch (err) {
                    console.log("Error closing connections", err);
                }
                finally {
                    process.exit(0);
                }
            }));
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
    }
    catch (error) {
        console.log(error);
        process.exit(0);
    }
}))();