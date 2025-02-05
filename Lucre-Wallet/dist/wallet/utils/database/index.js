"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const wallet_entity_1 = require("../../wallet.entity");
exports.dbConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'lucre_wallet',
    entities: [wallet_entity_1.Wallet],
    synchronize: true,
};
//# sourceMappingURL=index.js.map