"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = void 0;
const catchError_1 = require("../../handlers/catchError");
const appError_1 = __importDefault(require("../../handlers/appError"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const sendEmail_1 = __importDefault(require("./sendEmail"));
exports.forgotPassword = (0, catchError_1.catchErrors)(async (req, res, next) => {
    const user = await UserModel_1.default.findOne({ email: req.body.email });
    if (!user) {
        return next(new appError_1.default('No user found with that email', 404));
    }
    const resetToken = user.createResetEmailToken();
    await user.save({ validateBeforeSave: false });
    const resetURL = `${req.protocol}://${req.get('host')}/api/resetPassword/${resetToken}`;
    const emailOption = {
        email: user.email,
        name: user.name,
        subject: 'Reset Password',
        type: 'passwordVerification',
        link: resetURL,
    };
    const data = await (0, sendEmail_1.default)(emailOption);
    res.status(200).json({
        status: 'success',
        message: `An email has been sent to ${user.email} with further instructions`,
        data,
    });
});
//# sourceMappingURL=forgotPassword.js.map