"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
exports.default = {
    format: winston.format.combine(winston.format.timestamp(), winston.format.json(), winston.format.colorize({ all: true })),
    transports: [new winston.transports.Console()],
};
