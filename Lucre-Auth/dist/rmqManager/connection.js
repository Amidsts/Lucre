"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rmq = void 0;
const lucre_common_1 = require("lucre-common");
exports.rmq = lucre_common_1.qm.RpcManager.setup({ broadcastSubscriberConfigs: [], taskSubscriberConfigs: [], questionSubscriberConfigs: [] }, "amqp://localhost");
