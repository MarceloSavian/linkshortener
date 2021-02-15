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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var cors_1 = __importDefault(require("cors"));
var helmet = require("helmet");
var bodyParser = __importStar(require("body-parser"));
var compression = require("compression");
var express_1 = __importDefault(require("express"));
var winston = require("winston");
var typeorm_1 = require("typeorm");
var Config_1 = __importDefault(require("../config/Config"));
var handlers = __importStar(require("../middlewares/handlers"));
var apiDocs_1 = __importDefault(require("../middlewares/apiDocs"));
//Routes
var LinkShortenedRoutes_1 = __importDefault(require("../services/linkshortened/LinkShortenedRoutes"));
var logger = winston.createLogger(Config_1.default.getInstace().settings.log);
var app = express_1.default();
var Server = /** @class */ (function () {
    function Server(config) {
        this.envConfig = config.settings.env;
        this.databaseConfig = config.settings.database;
    }
    Server.prototype.init = function () {
        this.addMiddlewares();
        this.initDatabase();
        this.initRouters();
        this.addPortErrorHander();
    };
    //Middlewares da aplicação
    Server.prototype.addMiddlewares = function () {
        app.use(helmet());
        app.use(cors_1.default());
        app.use(express_1.default.json());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(compression());
        app.use(apiDocs_1.default);
    };
    Server.prototype.initDatabase = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                typeorm_1.createConnection(__assign({}, this.databaseConfig))
                    .then(function () {
                    logger.info("Conectado ao bando de dados");
                })
                    .catch(function (error) {
                    return logger.error("Erro na conex\u00E3o do banco de dados. " + error);
                });
                return [2 /*return*/];
            });
        });
    };
    Server.prototype.addPortErrorHander = function () {
        var _this = this;
        app.use(handlers.errorHandlerNotFound);
        app.use(handlers.resultHandler);
        app.listen(this.envConfig.server.port, function () {
            logger.info("App is listening on port " + _this.envConfig.server.port);
            logger.info("" + _this.envConfig.version);
        });
    };
    Server.prototype.initRouters = function () {
        var initialString = "/";
        app.use(initialString, LinkShortenedRoutes_1.default);
    };
    return Server;
}());
exports.default = Server;
