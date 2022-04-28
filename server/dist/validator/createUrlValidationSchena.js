"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchRuleValidationScheme = void 0;
const yup = require("yup");
exports.patchRuleValidationScheme = yup.object().shape({
    url: yup.string().url().required('Url is required'),
    autoGenerate: yup.boolean().required('Auto generate is required'),
    short_code: yup.string().when("autoGenerate", { is: (autoGenerate) => !autoGenerate, then: yup.string().min(4, 'Name must be at least 4 characters').matches(/[A-Z0-9]*/, "Name must be character or number") }).nullable()
});
//# sourceMappingURL=createUrlValidationSchena.js.map