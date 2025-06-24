"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rmq = void 0;
const lucre_common_1 = require("lucre-common");
const subscribers_1 = require("./broadcasts/subscribers");
exports.rmq = lucre_common_1.qm.RpcManager.setup({
    broadcastSubscriberConfigs: subscribers_1.broadcastsSubscribers,
    taskSubscriberConfigs: [],
    questionSubscriberConfigs: [],
}, 'amqp://localhost');
//# sourceMappingURL=connection.js.map