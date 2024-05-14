"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmailVerification_1 = require("../../emailTemplate/EmailVerification");
const resend_1 = require("resend");
const sendMail = async ({ email, name, subject = 'Verify your email | appName', type = 'emailVerification', app_email, link, }) => {
    const resend = new resend_1.Resend(process.env.RESEND_API);
    const { data } = await resend.emails.send({
        from: app_email,
        to: email,
        subject,
        html: type === 'emailVerification'
            ? (0, EmailVerification_1.emailVerification)({ name, link })
            : (0, EmailVerification_1.passwordVerification)({ name, link }),
    });
    return data;
};
exports.default = sendMail;
//# sourceMappingURL=sendEmail.js.map