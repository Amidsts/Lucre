"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccountNumber = void 0;
function generateAccountNumber() {
    return Math.floor(Math.random() * (9999999999 - 1000000000) + 1000000000).toString();
}
exports.generateAccountNumber = generateAccountNumber;
//# sourceMappingURL=helpers.js.map