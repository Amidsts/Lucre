"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.session = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const logger_1 = __importDefault(require("../configs/logger"));
const redis_1 = __importDefault(require("../configs/persistent/redis/redis"));
jest.mock("redis", () => {
    const mockRedisClient = {
        isOpen: false,
        connect: jest.fn().mockResolvedValue(undefined),
        get: jest.fn(),
        setEx: jest.fn(),
        disconnect: jest.fn(),
    };
    return {
        createClient: jest.fn().mockReturnValue(mockRedisClient),
    };
});
exports.session = {
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    abortTransaction: jest.fn(),
    endSession: jest.fn(),
    inTransaction: jest.fn().mockReturnValue(false),
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info("Testing.........");
    yield (0, mongoose_1.connect)(process.env.MONGO_URI);
    logger_1.default.info("connected test db");
    yield redis_1.default.connect();
}));
beforeEach(() => {
    jest.spyOn(mongoose_1.default, "startSession").mockResolvedValue(exports.session);
});
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    let collections = mongoose_1.default.connection.collections;
    for (let collection in collections) {
        yield collections[collection].drop();
    }
    jest.clearAllMocks();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoose_1.disconnect)();
}));
