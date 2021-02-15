"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nanoid_1 = require("nanoid");
var uuid = function () {
    return nanoid_1.nanoid(8);
};
exports.default = uuid;
