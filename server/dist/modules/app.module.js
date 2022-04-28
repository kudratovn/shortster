"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const UrlController_1 = require("../controllers/UrlController");
const ConfigService_1 = require("../services/ConfigService");
const UrlService_1 = require("../services/UrlService");
const Urls_1 = require("../entity/Urls");
const env_1 = require("../constants/env");
const configService = new ConfigService_1.ConfigService();
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: configService.config.DB_HOST,
                port: configService.config.DB_PORT,
                username: configService.config.DB_USERNAME,
                password: configService.config.DB_PASSWORD,
                database: configService.config.DB_DATABASE,
                entities: [
                    Urls_1.default
                ],
                ssl: configService.config.NODE_ENV === env_1.PRODUCTION,
                extra: configService.config.NODE_ENV === env_1.PRODUCTION
                    ? {
                        ssl: {
                            rejectUnauthorized: false,
                        },
                    }
                    : undefined,
            }),
            typeorm_1.TypeOrmModule.forFeature([
                Urls_1.default
            ]),
        ],
        controllers: [
            UrlController_1.UrlController,
        ],
        providers: [
            ConfigService_1.ConfigService,
            UrlService_1.UrlService
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map