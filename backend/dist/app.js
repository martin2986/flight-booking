"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const coreRoutes_1 = __importDefault(require("./routes/coreRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
const errorHandler_1 = require("./handlers/errorHandler");
const appError_1 = __importDefault(require("./handlers/appError"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const appRoute_1 = __importDefault(require("./routes/appRoute"));
const app = (0, express_1.default)();
app.disable('x-powered-by');
app.use((0, cors_1.default)({ credentials: true }));
app.use((0, compression_1.default)());
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/auth/v1', coreRoutes_1.default);
app.use('/api/users/v1', userRoute_1.default);
app.use('/api/v1', appRoute_1.default);
app.all('*', (req, res, next) => {
    next(new appError_1.default(`Api url ${req.originalUrl} does not exist`, 404));
});
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map