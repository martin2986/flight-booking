import { useForm } from 'react-hook-form';
import AppLayout from '../layout/AppLayout';
import UserLayout from '../layout/UserLayout';
import { Buttons } from './Button';
import Inputs from './Inputs';

type UpdatePasswordProps = {};

const UpdatePassword = () => {
  const {
    register,
    formState: { isSubmitting },
  } = useForm();
  return (
    <UserLayout>
      <form className="mx-5 mt-5 w-full">
        <Inputs label="Password" name="password" register={register} />
        <Inputs label="Confirm Password" name="confirm Password" register={register} />
        <Buttons className=" w-24 mt-5" disabled={isSubmitting}>
          Update
        </Buttons>
      </form>
    </UserLayout>
  );
};

export default UpdatePassword;
