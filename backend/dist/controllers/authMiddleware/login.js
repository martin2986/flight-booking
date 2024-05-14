"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const joi_1 = __importDefault(require("joi"));
const appError_1 = __importDefault(require("../../handlers/appError"));
const catchError_1 = require("../../handlers/catchError");
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const authUtil_1 = require("./authUtil");
const objectSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email({ tlds: { allow: true } }) //check tlds
        .required(),
    password: joi_1.default.string().required(),
});
exports.login = (0, catchError_1.catchErrors)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new appError_1.default('Please provide email and password', 400));
    }
    const { error } = objectSchema.validate({ email, password });
    if (error)
        return next(new appError_1.default('Invalid/Missing credentials.', 409));
    const user = await await UserModel_1.default.findOne({ email, removed: false }).select('+password +salt');
    if (!user)
        return next(new appError_1.default('No account with this email has been registered.', 404));
    const isMatch = await user.validPassword(password);
    if (!isMatch)
        return next(new appError_1.default('Invalid/Missing credentials.', 403));
    const token = (0, authUtil_1.generateJWT)({ id: user._id });
    const cookieOption = {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        secure: false,
        domain: req.hostname,
        path: '/',
    };
    if (process.env.NODE_ENV === 'production')
        cookieOption.secure = true;
    res
        .status(200)
        .cookie('token', token, cookieOption)
        .json({
        success: true,
        token,
        result: {
            name: user.name,
            email: user.email,
        },
        message: 'Successfully login user',
    });
});
//# sourceMappingURL=login.js.map