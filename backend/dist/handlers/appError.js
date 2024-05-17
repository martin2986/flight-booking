"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode || 500;
        this.isOperational = true;
        Error.captureStackTrace(this);
    }
}
exports.default = AppError;
//# sourceMappingURL=appError.js.map