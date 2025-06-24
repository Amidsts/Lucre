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
exports.asyncWrapper = asyncWrapper;
const zod_1 = require("zod");
function asyncWrapper(callback, next, session) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield callback();
            return result;
        }
        catch (err) {
            if (err instanceof zod_1.ZodError) {
                console.log(err);
                next(Error(`${err.errors[0].path}: ${err.errors[0].message}`));
                return;
            }
            if (session) {
                yield session.abortTransaction();
                yield session.endSession();
            }
            return next(err);
        }
    });
}
