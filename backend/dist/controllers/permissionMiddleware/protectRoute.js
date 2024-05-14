"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectRoute = void 0;
const catchError_1 = require("../../handlers/catchError");
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = __importDefault(require("../../handlers/appError"));
exports.protectRoute = (0, catchError_1.catchErrors)(async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return next(new appError_1.default('You are not logged In', 401));
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    const currentUser = await UserModel_1.default.findById(decoded.id);
    if (!currentUser) {
        return next(new appError_1.default('The user belonging to this token no longer exist', 401));
    }
    req.query.id = currentUser._id;
    next();
});
//# sourceMappingURL=protectRoute.js.map