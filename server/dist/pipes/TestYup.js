"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yupToFormErrors = void 0;
const lodash_1 = require("lodash");
const isObject = (obj) => obj !== null && typeof obj === 'object';
const isInteger = (obj) => String(Math.floor(Number(obj))) === obj;
function getIn(obj, key, def, p = 0) {
    const path = lodash_1.toPath(key);
    while (obj && p < path.length) {
        obj = obj[path[p++]];
    }
    return obj === undefined ? def : obj;
}
function setIn(obj, path, value) {
    const res = lodash_1.clone(obj);
    let resVal = res;
    let i = 0;
    const pathArray = lodash_1.toPath(path);
    for (; i < pathArray.length - 1; i++) {
        const currentPath = pathArray[i];
        const currentObj = getIn(obj, pathArray.slice(0, i + 1));
        if (currentObj && (isObject(currentObj) || Array.isArray(currentObj))) {
            resVal = resVal[currentPath] = lodash_1.clone(currentObj);
        }
        else {
            const nextPath = pathArray[i + 1];
            resVal = resVal[currentPath] =
                isInteger(nextPath) && Number(nextPath) >= 0 ? [] : {};
        }
    }
    if ((i === 0 ? obj : resVal)[pathArray[i]] === value) {
        return obj;
    }
    if (value === undefined) {
        delete resVal[pathArray[i]];
    }
    else {
        resVal[pathArray[i]] = value;
    }
    if (i === 0 && value === undefined) {
        delete res[pathArray[i]];
    }
    return res;
}
function yupToFormErrors(yupError) {
    let errors = {};
    if (yupError.inner) {
        if (yupError.inner.length === 0) {
            return setIn(errors, yupError.path, yupError.message);
        }
        for (const err of yupError.inner) {
            if (!errors[err.path]) {
                errors = setIn(errors, err.path, err.message);
            }
        }
    }
    return errors;
}
exports.yupToFormErrors = yupToFormErrors;
//# sourceMappingURL=TestYup.js.map