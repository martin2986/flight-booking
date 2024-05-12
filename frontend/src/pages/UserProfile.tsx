import { SubmitHandler, useForm } from 'react-hook-form';
import { Buttons } from '../UI/Button';
import Inputs from '../components/Inputs';
import Notification from '../UI/Notification';
import UserIcon from '../features/User/UserIcon';
import UserLayout from '../layout/UserLayout';
import { updateMe } from '../redux/auth/AuthAction';
import { useAppSelector, useDisPatch } from '../redux/hooks';
type formFields = {
  name: string;
  email: string;
};

const UserProfile = () => {
  const { user } = useAppSelector((state) => state.auth);
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
      await dispatch(updateMe(data));
      reset();
    } catch (err: any) {
      setError('root', {
        message: err.message || 'Something went wrong!',
      });
    }
  };

  return (
    <UserLayout>
      <div className="w-full px-4 mx-auto ">
        {errors.root && <Notification type="error" message={errors.root.message} />}
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
          <Buttons className="w-24 " disabled={isSubmitting}>
            Update
          </Buttons>
        </form>
      </div>
    </UserLayout>
  );
};

export default UserProfile;
