"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const response_1 = require("../utils/response");
const routes_1 = __importDefault(require("../routes"));
const app = (0, express_1.default)();
const initializeMiddleware = () => {
    app
        .use((0, cors_1.default)())
        .use(express_1.default.json({ limit: "50kb" }))
        .use(express_1.default.urlencoded({ limit: "50kb", extended: false }))
        .use((0, helmet_1.default)())
        .use((err, req, res, next) => {
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE");
            return next(Error("Invalid header method"));
        }
        if (req.body && err instanceof SyntaxError) {
            return next("Malformed JSON, please check the body of your request");
        }
        return next();
    });
};
const initializeRoute = () => {
    // app.use("/v1/auth")
    app.get("/", (req, res) => {
        (0, response_1.responseHandler)({ res, message: "Welcome to Lucre, Lets get started!" });
    });
    app.use("/v1/auth", routes_1.default);
    app.all("*", (_req, res) => {
        (0, response_1.responseHandler)({
            res,
            status: 404,
            message: "You have used an invalid method or hit an invalid route",
        });
    });
    app.use((err, _req, res, _next) => {
        (0, response_1.responseHandler)({
            res,
            message: err.message,
            status: err.statusCode || 400,
        });
    });
};
initializeMiddleware();
initializeRoute();
exports.default = app;
