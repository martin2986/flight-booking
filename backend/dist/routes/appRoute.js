"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Index_1 = require("../controllers/cityInfo/Index");
const appRouter = express_1.default.Router();
appRouter.route('/city').get(Index_1.getCity);
exports.default = appRouter;
//# sourceMappingURL=appRoute.js.map