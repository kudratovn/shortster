"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./modules/app.module");
const ConfigService_1 = require("./services/ConfigService");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(ConfigService_1.ConfigService);
    app.enableCors({
        origin(origin, cb) {
            if (!origin || [configService.config.AUTHORITY].includes(origin)) {
                cb(null, true);
            }
            else {
                cb(new Error('Not allowed by CORS!'));
            }
        }
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map