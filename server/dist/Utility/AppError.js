"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
exports.default = AppError;
//# sourceMappingURL=AppError.js.map