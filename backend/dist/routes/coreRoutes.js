"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const forgotPassword_1 = require("../controllers/authMiddleware/forgotPassword");
const login_1 = require("../controllers/authMiddleware/login");
const logout_1 = require("../controllers/authMiddleware/logout");
const register_1 = require("../controllers/authMiddleware/register");
const resetPassword_1 = require("../controllers/authMiddleware/resetPassword");
const authRouter = express_1.default.Router();
authRouter.route('/register').post(register_1.register);
authRouter.route('/login').post(login_1.login);
authRouter.get('/logout', logout_1.logout);
authRouter.post('/google', login_1.google);
authRouter.route('/forgotPassword').post(forgotPassword_1.forgotPassword);
authRouter.route('/resetPassword/:token').patch(resetPassword_1.resetPassword);
exports.default = authRouter;
//# sourceMappingURL=coreRoutes.js.map