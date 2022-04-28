"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const dotenv = require("dotenv");
const fs = require("fs");
const common_1 = require("@nestjs/common");
const CONFIG_KEYS = [
    'NODE_ENV',
    'PORT',
    'AUTHORITY',
    'DB_HOST',
    'DB_PORT',
    'DB_USERNAME',
    'DB_PASSWORD',
    'DB_DATABASE',
];
let ConfigService = class ConfigService {
    constructor() {
        const conf = fs.existsSync('.env')
            ? dotenv.parse(fs.readFileSync('.env'))
            : process.env;
        this.config = CONFIG_KEYS.reduce((acc, key) => {
            if (!conf[key]) {
                throw new Error(`Env variable ${key} is not defined`);
            }
            acc[key] = conf[key];
            return acc;
        }, {});
    }
};
ConfigService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], ConfigService);
exports.ConfigService = ConfigService;
//# sourceMappingURL=ConfigService.js.map