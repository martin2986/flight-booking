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
exports.resetPassword = void 0;
const catchError_1 = require("../../handlers/catchError");
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const appError_1 = __importDefault(require("../../handlers/appError"));
const crypto_1 = __importDefault(require("crypto"));
const authUtil_1 = require("./authUtil");
exports.resetPassword = (0, catchError_1.catchErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedTOken = crypto_1.default.createHash('sha256').update(req.params.token).digest('hex');
    const user = yield UserModel_1.default.findOne({
        passwordResetToken: hashedTOken,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
        return next(new appError_1.default('Password reset token is invalid or has expired', 400));
    }
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    yield user.save();
    const token = (0, authUtil_1.generateJWT)({ id: user._id });
    const cookieOption = {
        expires: authUtil_1.expiryDate,
        httpOnly: true,
        secure: false,
        domain: req.hostname,
        path: '/',
    };
    if (process.env.NODE_ENV === 'production')
        cookieOption.secure = true;
    res.status(200).cookie('token', token, cookieOption).json({
        success: true,
        message: 'password reset successful',
    });
}));
//# sourceMappingURL=resetPassword.js.map