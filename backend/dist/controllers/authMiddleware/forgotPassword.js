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
exports.forgotPassword = void 0;
const catchError_1 = require("../../handlers/catchError");
const appError_1 = __importDefault(require("../../handlers/appError"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const sendEmail_1 = __importDefault(require("./sendEmail"));
exports.forgotPassword = (0, catchError_1.catchErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserModel_1.default.findOne({ email: req.body.email });
    if (!user) {
        return next(new appError_1.default('No user found with that email', 404));
    }
    const resetToken = user.createResetEmailToken();
    yield user.save({ validateBeforeSave: false });
    const resetURL = `${req.protocol}://${req.get('host')}/api/resetPassword/${resetToken}`;
    const emailOption = {
        email: user.email,
        name: user.name,
        subject: 'Reset Password',
        type: 'passwordVerification',
        link: resetURL,
    };
    const data = yield (0, sendEmail_1.default)(emailOption);
    res.status(200).json({
        status: 'success',
        message: `An email has been sent to ${user.email} with further instructions`,
        data,
    });
}));
//# sourceMappingURL=forgotPassword.js.map