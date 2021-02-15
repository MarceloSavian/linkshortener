"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestHandler = exports.errorHandlerNotFound = exports.resultHandler = void 0;
var winston = require("winston");
var Config_1 = __importDefault(require("../config/Config"));
var logger = winston.createLogger(Config_1.default.getInstace().settings.log);
/**
 *  Handle de Erros
 */
// eslint-disable-next-line no-unused-vars
var resultHandler = function (result, req, res, next) {
    if (result.status) {
        if (result.status === 500 || result.status === 503) {
            res.status(result.status).json({
                message: 'Sistema indisponível',
            });
        }
        else {
            res.status(result.status).json({
                message: result.message || '',
            });
        }
    }
    else if (result.errors) {
        var message = result.message || result;
        res.status(401).json({
            message: message,
        });
    }
    else {
        res.status(200).json(result);
    }
};
exports.resultHandler = resultHandler;
// eslint-disable-next-line no-unused-vars
var errorHandlerNotFound = function (req, res, _) {
    res.json({
        message: 'O recurso {' + req.url + '} não existe ou foi removido.',
    });
};
exports.errorHandlerNotFound = errorHandlerNotFound;
// eslint-disable-next-line no-unused-vars
var requestHandler = function (req, res, next) {
    logger.info(req.url);
    next();
};
exports.requestHandler = requestHandler;
