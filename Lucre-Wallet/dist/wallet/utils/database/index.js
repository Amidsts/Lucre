"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
exports.dbConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'lucre_wallet',
    entities: ['../../models/Wallets.entity.ts'],
    synchronize: false,
};
//# sourceMappingURL=index.js.map