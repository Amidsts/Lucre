"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const connection_1 = require("./rmqManager/connection");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { logger: false });
    connection_1.rmq.then(() => console.log('connected to rabbitmq successfully'));
    await app.listen(process.env.PORT ?? 3000);
}
console.log(`✅ App is running on port ${process.env.PORT ?? 3000}`);
bootstrap();
//# sourceMappingURL=main.js.map