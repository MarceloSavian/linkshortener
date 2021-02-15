"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __importDefault(require("./config/Config"));
var server_1 = __importDefault(require("./start/server"));
var server = new server_1.default(Config_1.default.getInstace());
server.init();
