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
exports.register = void 0;
const joi_1 = __importDefault(require("joi"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const catchError_1 = require("../../handlers/catchError");
const appError_1 = __importDefault(require("../../handlers/appError"));
const authUtil_1 = require("./authUtil");
const createAndSendToken = (user, statusCode, res) => {
    const token = (0, authUtil_1.generateJWT)({ id: user._id });
    const cookieOption = {
        secure: true,
        httpOnly: true,
    };
    if (process.env.NODE_ENV === 'production')
        cookieOption.secure = true;
    res.cookie('token', token, cookieOption);
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
exports.register = (0, catchError_1.catchErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, confirmPassword } = req.body;
    const { error } = objectSchema.validate({ name, email, password, confirmPassword });
    if (error)
        return next(new appError_1.default('Invalid/Missing credentials.', 409));
    const existingUser = yield UserModel_1.default.findOne({ email: email, removed: false });
    if (existingUser)
        return next(new appError_1.default('An account with this email has already been registered.', 409));
    const newUser = yield UserModel_1.default.create({ email, name, password, confirmPassword });
    createAndSendToken(newUser, 200, res);
}));
//# sourceMappingURL=register.js.map