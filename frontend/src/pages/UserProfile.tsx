import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Buttons } from '../components/Button';
import Inputs from '../components/Inputs';
import UserIcon from '../components/UserIcon';
import UserLayout from '../layout/UserLayout';
import { updateMe } from '../redux/auth/actions';
import { useDisPatch } from '../redux/hooks';
type formFields = {
  name: string;
  email: string;
};

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDisPatch();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<formFields>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });
  const onSubmit: SubmitHandler<formFields> = async (data) => {
    try {
      await dispatch(updateMe({ updateMeData: data }));
      reset();
    } catch (err: any) {
      setError('root', {
        message: err.message || 'Something went wrong!',
      });
    }
  };
  return (
    <UserLayout>
      {errors.root && <div className="text-red-500 text-sm mb-4">{errors.root.message}</div>}
      <div className="w-full px-4">
        <div className="text-center">
          <UserIcon />
          <h3 className="mt-3">{user.name}</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Inputs
            register={register}
            name="name"
            label="Name"
            type="text"
            placeholder={user.name}
          />
          <Inputs
            register={register}
            name="email"
            label="Email"
            type="text"
            placeholder={user.email}
            disabled
          />
          {/* <Inputs
              register={register}
              name="number"
              label="Contact Number"
              type="number"
              placeholder="Contact number"
            /> */}
          <Buttons className="w-24 " disabled={isSubmitting}>
            Update
          </Buttons>
        </form>
      </div>
    </UserLayout>
  );
};

export default UserProfile;
