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
        },
        allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization',
        methods: 'GET,PUT,PATCH,POST,DELETE,UPDATE,OPTIONS',
        credentials: true,
    });
    await app.listen(configService.config.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map