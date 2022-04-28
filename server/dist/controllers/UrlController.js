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
exports.UrlController = void 0;
const common_1 = require("@nestjs/common");
const UrlService_1 = require("../services/UrlService");
const YupValidationPipe_1 = require("../pipes/YupValidationPipe");
const createUrlValidationSchena_1 = require("../validator/createUrlValidationSchena");
const common_2 = require("../constants/common");
let UrlController = class UrlController {
    constructor(urlService) {
        this.urlService = urlService;
    }
    async create(dto, res) {
        const url = await this.urlService.createUrl(dto);
        if (url) {
            return res.send({
                status: common_2.RESULT_STATUSES.SUCCESS,
                data: url,
            });
        }
        else {
            return res.send({
                status: common_2.RESULT_STATUSES.ERROR,
                error: 'Failed to create url',
            });
        }
    }
    async redirect(short_code, res) {
        const url = await this.urlService.getUrlByCode(short_code);
        if (url) {
            await this.urlService.useUrl(url);
            return res.send({
                status: common_2.RESULT_STATUSES.SUCCESS,
                data: url.url,
            });
        }
        else {
            return res.send({
                status: common_2.RESULT_STATUSES.ERROR,
                error: 'Failed to create url',
            });
        }
    }
};
__decorate([
    common_1.Post('/submit'),
    common_1.UsePipes(new YupValidationPipe_1.YupValidationPipe(createUrlValidationSchena_1.patchRuleValidationScheme)),
    __param(0, common_1.Body()),
    __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "create", null);
__decorate([
    common_1.Get('/:short_code'),
    __param(0, common_1.Param('short_code')),
    __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "redirect", null);
UrlController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [UrlService_1.UrlService])
], UrlController);
exports.UrlController = UrlController;
//# sourceMappingURL=UrlController.js.map