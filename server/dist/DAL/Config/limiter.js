"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = require("express-rate-limit");
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: "max limit 100 in 15 minutes",
    standardHeaders: "draft-8",
    legacyHeaders: false,
});
exports.default = limiter;
//# sourceMappingURL=limiter.js.map