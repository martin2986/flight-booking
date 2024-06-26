"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expiryDate = exports.generateJWT = exports.capitalize = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const capitalize = (name) => {
    return name.replace(/\b\w/g, (char) => char.toUpperCase());
};
exports.capitalize = capitalize;
const generateJWT = function (payload) {
    const privateKey = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign(payload, privateKey);
};
exports.generateJWT = generateJWT;
exports.expiryDate = new Date(Date.now() + 3600000);
//# sourceMappingURL=authUtil.js.map