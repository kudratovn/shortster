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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const short_unique_id_1 = require("short-unique-id");
const Urls_1 = require("../entity/Urls");
let UrlService = class UrlService {
    constructor(urlRepository) {
        this.urlRepository = urlRepository;
    }
    async getUrlByCode(code) {
        const url = await this.urlRepository.findOne({ where: { short_code: code } });
        return url || null;
    }
    async useUrl(url) {
        url.times_redeemed = url.times_redeemed + 1;
        url.updated_at = new Date();
        const nwutl = await this.urlRepository.save(url);
        console.log('nwutl', nwutl);
    }
    async createUrl(dto) {
        let code;
        const { short_code = null, url } = dto;
        if (dto.autoGenerate) {
            code = await this.generateUrl();
        }
        else {
            if (!short_code)
                return null;
            const url = await this.getUrlByCode(short_code);
            if (url)
                return null;
            code = short_code;
        }
        const newUrl = Urls_1.default.create(url, code);
        await this.urlRepository.save(newUrl);
        return newUrl;
    }
    async generateUrl() {
        let generatedCode = this.generateCode();
        let url = await this.getUrlByCode(generatedCode);
        if (!url) {
            return generatedCode;
        }
        else {
            await this.generateUrl();
        }
    }
    generateCode() {
        const uid = new short_unique_id_1.default();
        return uid();
    }
};
UrlService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(Urls_1.default)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UrlService);
exports.UrlService = UrlService;
//# sourceMappingURL=UrlService.js.map