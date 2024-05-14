"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const appError_1 = __importDefault(require("./appError"));
const handleCastError = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new appError_1.default(message, 400);
};
const handleValidationError = (err) => {
    const message = `Required fields are not supplied`;
    return new appError_1.default(message, 400);
};
//DEVELOPEMENT ERROR
const developmentErrors = (error, req, res, next) => {
    error.stack = error.stack || '';
    const errorDetails = {
        message: error.message,
        status: error.status,
        stackHighlighted: error.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>'),
    };
    return new appError_1.default(error.message, 400);
};
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        developmentErrors(err, req, res, next);
    }
    else {
        res.status(err.statusCode).json({
            success: false,
            status: 'error',
            message: 'something went wong',
        });
    }
    if (err.name === 'CastError')
        err = handleCastError(err);
    if (err.name == 'ValidationError')
        err = handleValidationError(err);
    res.status(err.statusCode).json({
        success: false,
        status: err.status,
        message: err.message,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map