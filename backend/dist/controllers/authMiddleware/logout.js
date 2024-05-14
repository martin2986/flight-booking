"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const catchError_1 = require("../../handlers/catchError");
exports.logout = (0, catchError_1.catchErrors)(async (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        status: 'success',
        message: 'Successfully logged out',
    });
});
//# sourceMappingURL=logout.js.map