import { FC } from 'react';
import AuthLayout from '../layout/AuthLayout';
import { MdVerified } from 'react-icons/md';

type VerifyAccountProps = {};

const VerifyAccount: FC<VerifyAccountProps> = () => {
  return (
    <AuthLayout AUTH_TITLE="Verify Account">
      <div className="text-black text-center flex flex-col items-center">
        <h1 className="mb-3 font-semibold">Registration Successfull</h1>
        <p>Check Email to verify your account.</p>
        <MdVerified className="text-9xl text-lime-700 mt-5" />
      </div>
    </AuthLayout>
  );
};

export default VerifyAccount;
