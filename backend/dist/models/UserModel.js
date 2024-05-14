"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const short_unique_id_1 = __importDefault(require("short-unique-id"));
const crypto_1 = __importDefault(require("crypto"));
const { randomUUID } = new short_unique_id_1.default({ length: 10 });
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        select: false,
    },
    removed: {
        type: Boolean,
        default: false,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    loggedSession: {
        type: [String],
        default: [],
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
    },
});
userSchema.pre('save', function () {
    this.name = this.name.replace(/\b\w/g, (char) => char.toUpperCase());
});
userSchema.pre('save', async function (next) {
    this.salt = randomUUID();
    this.password = await bcryptjs_1.default.hashSync(this.password + this.salt);
    this.confirmPassword = undefined;
    next();
});
//checking if password is valid
userSchema.methods.validPassword = function (userPassword) {
    return bcryptjs_1.default.compareSync(userPassword + this.salt, this.password);
};
userSchema.methods.createResetEmailToken = function () {
    const resetEmailToken = crypto_1.default.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto_1.default.createHash('sha256').update(resetEmailToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetEmailToken;
};
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=UserModel.js.map