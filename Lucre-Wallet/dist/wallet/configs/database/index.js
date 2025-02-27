"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const wallets_entity_1 = require("../../models/wallets.entity");
exports.dbConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'lucre_wallet',
    entities: [wallets_entity_1.default],
    synchronize: true,
};
//# sourceMappingURL=index.js.map