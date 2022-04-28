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
var Urls_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
let Urls = Urls_1 = class Urls {
    constructor(id, url, short_code) {
        this.id = id;
        this.url = url;
        this.times_redeemed = 0;
        this.short_code = short_code;
        this.created_at = new Date();
        this.updated_at = new Date();
    }
    static create(url, short_code) {
        const id = uuid_1.v4();
        return new Urls_1(id, url, short_code);
    }
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Urls.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Urls.prototype, "url", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Urls.prototype, "short_code", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Urls.prototype, "times_redeemed", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Urls.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Urls.prototype, "updated_at", void 0);
Urls = Urls_1 = __decorate([
    typeorm_1.Entity('urls'),
    __metadata("design:paramtypes", [String, String, String])
], Urls);
exports.default = Urls;
//# sourceMappingURL=Urls.js.map