"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const db_1 = require("./DAL/Config/db");
const helper_1 = require("./DAL/Config/helper");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const index_router_1 = require("./Router/index.router");
const server = (0, express_1.default)();
const port = helper_1.helper.port || 3000;
db_1.AppDataSource.initialize().then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("db are connected");
    // middleware
    server.use((0, cors_1.default)({
        credentials: true,
        origin: helper_1.helper.front_url,
    }));
    server.use(express_1.default.json());
    // server.use(limiter);
    server.use(express_1.default.urlencoded({ extended: true }));
    server.use((0, cookie_parser_1.default)());
    server.use((0, helmet_1.default)({
        crossOriginResourcePolicy: false,
    }));
    // router
    server.use("/api/v1", index_router_1.mainRouter);
    // error middleware
    server.use((err, req, res, next) => {
        console.error("Error:", err.message);
        res.status(err.status || 500).json({
            message: err.message || "Something went wrong. Please try again later.",
        });
    });
    server.listen(port, () => {
        console.log(`server running port ${port}`);
    });
}));
//# sourceMappingURL=server.js.map