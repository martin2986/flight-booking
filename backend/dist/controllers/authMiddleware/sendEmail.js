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
Object.defineProperty(exports, "__esModule", { value: true });
const EmailVerification_1 = require("../../emailTemplate/EmailVerification");
const resend_1 = require("resend");
const sendMail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, name, subject = 'Verify your email | appName', type = 'emailVerification', app_email, link, }) {
    const resend = new resend_1.Resend(process.env.RESEND_API);
    const { data } = yield resend.emails.send({
        from: app_email,
        to: email,
        subject,
        html: type === 'emailVerification'
            ? (0, EmailVerification_1.emailVerification)({ name, link })
            : (0, EmailVerification_1.passwordVerification)({ name, link }),
    });
    return data;
});
exports.default = sendMail;
//# sourceMappingURL=sendEmail.js.map