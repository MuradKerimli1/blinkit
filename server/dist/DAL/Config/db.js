"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.DB_NAME,
    password: "",
    database: "blinkitt",
    synchronize: true,
    logging: false,
    entities: [__dirname + "/../Entities/*.{ts,js}"],
    subscribers: [],
    migrations: [],
});
//# sourceMappingURL=db.js.map