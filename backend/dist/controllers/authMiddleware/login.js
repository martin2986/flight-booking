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
exports.google = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const joi_1 = __importDefault(require("joi"));
const appError_1 = __importDefault(require("../../handlers/appError"));
const catchError_1 = require("../../handlers/catchError");
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const authUtil_1 = require("./authUtil");
const objectSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email({ tlds: { allow: true } })
        .required(),
    password: joi_1.default.string().required(),
});
exports.login = (0, catchError_1.catchErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new appError_1.default('Please provide email and password', 400));
    }
    const { error } = objectSchema.validate({ email, password });
    if (error)
        return next(new appError_1.default('Invalid/Missing credentials.', 409));
    const user = yield UserModel_1.default.findOne({ email, removed: false }).select('+password +salt');
    if (!user)
        return next(new appError_1.default('No account with this email has been registered.', 404));
    const isMatch = yield user.validPassword(password);
    if (!isMatch)
        return next(new appError_1.default('Invalid/Missing credentials.', 403));
    const token = (0, authUtil_1.generateJWT)({ id: user._id });
    const cookieOption = {
        expires: authUtil_1.expiryDate,
        httpOnly: true,
        secure: false,
        // domain: req.hostname,
        path: '/',
    };
    if (process.env.NODE_ENV === 'production')
        cookieOption.secure = true;
    res
        .cookie('token', token, cookieOption)
        .status(200)
        .json({
        success: true,
        result: {
            name: user.name,
            email: user.email,
        },
        message: 'Successfully login user',
    });
}));
exports.google = (0, catchError_1.catchErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel_1.default.findOne({ email: req.body.email });
        if (user) {
            const token = (0, authUtil_1.generateJWT)({ id: user._id });
            res.cookie('token', token, { httpOnly: true, expires: authUtil_1.expiryDate }).status(200).json({
                message: 'User logged in successfully',
                name: user.name,
                email: user.email,
                profilePhoto: user.profilePhoto,
            });
        }
        else {
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs_1.default.hashSync(generatePassword, 10);
            const newUser = new UserModel_1.default({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                confirmPassword: hashedPassword,
                profilePhoto: req.body.photo,
            });
            yield newUser.save();
            const token = (0, authUtil_1.generateJWT)({ id: newUser._id });
            res
                .cookie('token', token, {
                httpOnly: true,
                expires: authUtil_1.expiryDate,
            })
                .status(200)
                .json({ name: newUser.name, email: newUser.email, profilePhoto: newUser.profilePhoto });
        }
    }
    catch (err) {
        next(err);
    }
}));
//# sourceMappingURL=login.js.map