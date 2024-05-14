"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const joi_1 = __importDefault(require("joi"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const catchError_1 = require("../../handlers/catchError");
const appError_1 = __importDefault(require("../../handlers/appError"));
const signToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const createAndSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOption = {
        secure: true,
        httpOnly: true,
    };
    if (process.env.NODE_ENV === 'production')
        cookieOption.secure = true;
    res.cookie('jwt', token, cookieOption);
    user.password = undefined;
    return res.status(200).json({
        success: true,
        result: {
            _id: user._id,
            name: user.name,
            email: user.email,
        },
        message: 'Account registered successfully. Please verify your email.',
    });
};
const objectSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string()
        .email({ tlds: { allow: true } })
        .required(),
    password: joi_1.default.string().min(6).required(),
    confirmPassword: joi_1.default.valid(joi_1.default.ref('password')).required(),
});
exports.register = (0, catchError_1.catchErrors)(async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
    const { error } = objectSchema.validate({ name, email, password, confirmPassword });
    if (error)
        return next(new appError_1.default('Invalid/Missing credentials.', 409));
    const existingUser = await UserModel_1.default.findOne({ email: email, removed: false });
    if (existingUser)
        return next(new appError_1.default('An account with this email has already been registered.', 409));
    const newUser = await UserModel_1.default.create({ email, name, password, confirmPassword });
    createAndSendToken(newUser, 200, res);
});
//# sourceMappingURL=register.js.map