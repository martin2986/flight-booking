"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = void 0;
const catchError_1 = require("../../handlers/catchError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const appError_1 = __importDefault(require("../../handlers/appError"));
const crypto_1 = __importDefault(require("crypto"));
const generateJWT = function (payload, options = {}) {
    const privateKey = process.env.JWT_SECRET;
    const defaultOptions = {
        expiresIn: '1h',
    };
    return jsonwebtoken_1.default.sign(payload, privateKey, Object.assign(defaultOptions, options));
};
exports.resetPassword = (0, catchError_1.catchErrors)(async (req, res, next) => {
    const hashedTOken = crypto_1.default.createHash('sha256').update(req.params.token).digest('hex');
    const user = await UserModel_1.default.findOne({
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
    await user.save();
    const token = generateJWT({ id: user._id }, { expiresIn: '1h' });
    const cookieOption = {
        maxAge: 1000 * 60 * 60,
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
});
//# sourceMappingURL=resetPassword.js.map