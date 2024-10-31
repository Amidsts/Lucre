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
function asyncWrapper(callback, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield callback();
            return result;
        }
        catch (err) {
            // if (err instanceof ZodError) {
            //   next(Error(`${err.errors[0].path}: ${err.errors[0].message}`));
            //   return;
            // }
            // if (err instanceof AxiosError) {
            //   // console.log(err.response);
            //   if (err.response) {
            //     const { data } = err.response;
            //     if (
            //       (data.error && "first_image" in data.error) ||
            //       (data.error && "second_image" in data.error)
            //     )
            //       return next(Error(`image: ${data.error.first_image}`));
            //     if (data.errors instanceof Array)
            //       return next(Error(`Ebay Error: ${data.errors[0].longMessage}`));
            //     return next(
            //       Error(
            //         `Axios error: ${err.response.data.message ?? err.response.data}`
            //       )
            //     );
            //   } else {
            //     return next(Error(`Axios error: ${err.response.data}`));
            //   }
            // }
            return next(err);
        }
    });
}
