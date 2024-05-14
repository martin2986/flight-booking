"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getAllUser = void 0;
const catchError_1 = require("../../handlers/catchError");
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const appError_1 = __importDefault(require("../../handlers/appError"));
const authUtil_1 = require("../authMiddleware/authUtil");
exports.getAllUser = (0, catchError_1.catchErrors)(async (req, res, next) => {
    const users = await UserModel_1.default.find({ removed: false });
    if (!users)
        return next(new appError_1.default('No user find', 404));
    res.status(200).json({
        success: true,
        result: users,
    });
});
exports.getUser = (0, catchError_1.catchErrors)(async (req, res, next) => {
    const userId = req.params.id;
    const user = await UserModel_1.default.findById(userId);
    if (!user)
        return next(new appError_1.default('No user found  with that ID!', 404));
    res.status(200).json({
        success: true,
        result: user,
    });
});
exports.updateUser = (0, catchError_1.catchErrors)(async (req, res, next) => {
    req.body.name = (0, authUtil_1.capitalize)(req.body.name);
    const user = await UserModel_1.default.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!user)
        return next(new appError_1.default('No user found  with that ID!', 404));
    res.status(200).json({
        success: true,
        result: user,
    });
});
exports.deleteUser = (0, catchError_1.catchErrors)(async (req, res, next) => {
    const user = await UserModel_1.default.findByIdAndDelete(req.params.id);
    if (!user) {
        return next(new appError_1.default('No doc found with that ID', 404));
    }
    res.status(204).json({
        status: ' success!',
        data: null,
    });
});
//# sourceMappingURL=Index.js.map