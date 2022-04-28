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
exports.YupValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const Yup = require("yup");
const TestYup_1 = require("./TestYup");
let YupValidationPipe = class YupValidationPipe {
    constructor(schema) {
        this.schema = schema;
    }
    async transform(value, metadata) {
        let errors = null;
        if (metadata.type !== 'body') {
            return value;
        }
        try {
            const result = await this.schema.validate(value, { abortEarly: false });
            return result;
        }
        catch (error) {
            errors = TestYup_1.yupToFormErrors(error);
        }
        throw new common_1.BadRequestException('', errors);
    }
};
YupValidationPipe = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [Yup.ObjectSchema])
], YupValidationPipe);
exports.YupValidationPipe = YupValidationPipe;
//# sourceMappingURL=YupValidationPipe.js.map