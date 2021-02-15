"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateModel = void 0;
var joi_1 = __importDefault(require("@hapi/joi"));
var validateSchema_1 = require("../../utils/validateSchema");
var Joi = joi_1.default;
var schemaModel = Joi.object().keys({
    url: Joi.string().required(),
});
var validateModel = function (input) {
    return validateSchema_1.validateSchema(input, schemaModel);
};
exports.validateModel = validateModel;
