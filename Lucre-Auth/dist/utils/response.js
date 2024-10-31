"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHandler = void 0;
const responseHandler = ({ res, data, message, status = 200, session, }) => {
    //   if (session) {
    //     await session.commitTransaction();
    //     session.endSession();
    //   }
    return res.status(status).json({
        message,
        data,
    });
};
exports.responseHandler = responseHandler;
