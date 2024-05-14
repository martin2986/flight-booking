"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cityInfoSchema = new mongoose_1.default.Schema({
    name_translation: {
        type: mongoose_1.default.Schema.Types.Mixed,
    },
    case: {
        type: mongoose_1.default.Schema.Types.Mixed,
    },
    country_code: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    time_zone: String,
    name: String,
    coordinates: {
        lat: Number,
        lon: Number,
    },
});
const City = mongoose_1.default.model('City', cityInfoSchema);
exports.default = City;
//# sourceMappingURL=CityInfoModel.js.map