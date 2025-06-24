"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lucre_common_1 = require("lucre-common");
const user_entity_1 = require("../../../users/entities/user.entity");
const config = lucre_common_1.qInterfaces.broadcasts.newUserConfig;
async function onMessageReceived(params) {
    const response = JSON.parse(params.toString());
    console.log('response', response);
    await user_entity_1.default.createUser(response);
}
exports.default = { config, onMessageReceived };
//# sourceMappingURL=new-user.js.map