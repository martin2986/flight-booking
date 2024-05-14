"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCity = void 0;
const appError_1 = __importDefault(require("../../handlers/appError"));
const catchError_1 = require("../../handlers/catchError");
const CityInfoModel_1 = __importDefault(require("../../models/CityInfoModel"));
exports.getCity = (0, catchError_1.catchErrors)(async (req, res, next) => {
    const queryItem = req.query.city;
    const city = await CityInfoModel_1.default.find({ name: { $regex: `^${queryItem}`, $options: 'i' } }).limit(5);
    if (!city) {
        return next(new appError_1.default('No city found', 404));
    }
    res.status(200).json({
        success: true,
        result: {
            data: city,
        },
    });
});
//# sourceMappingURL=Index.js.map