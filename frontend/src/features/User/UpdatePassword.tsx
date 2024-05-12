import { useForm } from 'react-hook-form';
import UserLayout from '../../layout/UserLayout';
import { Buttons } from '../../UI/Button';
import Inputs from '../../components/Inputs';

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
