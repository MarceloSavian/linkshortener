"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
var validateSchema = function (input, schema) {
    return new Promise(function (resolve, reject) {
        if (!input)
            reject('Invalid input');
        else {
            var _a = schema.validate(input), error = _a.error, value = _a.value;
            if (error) {
                var errorResult = new Error();
                errorResult.message = error.message;
                reject(__assign(__assign({}, errorResult), { status: 400 }));
            }
            else {
                resolve(value);
            }
        }
    });
};
exports.validateSchema = validateSchema;
