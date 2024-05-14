"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const protectRoute_1 = require("../controllers/permissionMiddleware/protectRoute");
const logout_1 = require("../controllers/authMiddleware/logout");
const Index_1 = require("../controllers/UserController/Index");
const userRouter = express_1.default.Router();
userRouter.use(protectRoute_1.protectRoute);
userRouter.route('/').get(Index_1.getAllUser);
userRouter.route('/logout').get(logout_1.logout);
userRouter.route('/:id').get(Index_1.getUser);
userRouter.route('/updateMe').patch(Index_1.updateUser);
userRouter.route('/deleteMe').delete(Index_1.deleteUser);
exports.default = userRouter;
//# sourceMappingURL=userRoute.js.map