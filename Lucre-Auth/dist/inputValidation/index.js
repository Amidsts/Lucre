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
const request_wrapper_1 = require("../utils/request-wrapper");
const validateInput = (schema, fieldType = "body") => (req, res, next) => {
    return (0, request_wrapper_1.asyncWrapper)(() => __awaiter(void 0, void 0, void 0, function* () {
        let parsedData;
        if (fieldType === "body") {
            parsedData = schema.parse(req.body);
            req.body = parsedData;
        }
        else if (fieldType === "params") {
            parsedData = schema.parse(req.params);
            req.params = parsedData;
        }
        else if (fieldType === "query") {
            parsedData = schema.parse(req.query);
            req.query = parsedData;
        }
        next();
    }), res, next);
};
exports.default = validateInput;
