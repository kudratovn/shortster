"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchRuleValidationScheme = void 0;
const yup = require("yup");
exports.patchRuleValidationScheme = yup.object().shape({
    url: yup.string().url().required('Url is required'),
    autoGenerate: yup.boolean().required('Auto generate is required'),
    short_code: yup.string().when("autoGenerate", { is: false, then: yup.string().min(4, 'Name must be at least 4 characters').required('Short code is required') })
});
//# sourceMappingURL=createUrlValidationSchena.js.map