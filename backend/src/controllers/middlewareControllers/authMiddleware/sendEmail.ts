import { emailVerification, passwordVerification } from '../../../emailTemplate/EmailVerification';

import { Resend } from 'resend';

type sendEmailProps = {
  email: string;
  subject: string;
  name: string;
  type: string;
  app_email?: string;
  link: string;
};
const sendMail = async ({
  email,
  name,
  subject = 'Verify your email | appName',
  type = 'emailVerification',
  app_email,
  link,
}: sendEmailProps) => {
  const resend = new Resend(process.env.RESEND_API);
  const { data } = await resend.emails.send({
    from: app_email,
    to: email,
    subject,
    html:
      type === 'emailVerification'
        ? emailVerification({ name, link })
        : passwordVerification({ name, link }),
  });

  return data;
};

export default sendMail;
