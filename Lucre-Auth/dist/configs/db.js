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
const _1 = __importDefault(require("."));
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            family: 4,
        };
        try {
            yield mongoose_1.default.connect(_1.default.mongoDbUri, options);
            console.log("Database connected");
        }
        catch (error) {
            console.log("Error connecting to database:", error);
            process.exit(1);
        }
        // Listen for errors after the initial connection
        mongoose_1.default.connection.on("error", (error) => {
            console.log("Database error:" + error, "error");
        });
    });
}
exports.default = connectDB;
