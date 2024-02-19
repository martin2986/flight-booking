import { FC } from 'react';
import AppLayout from '../layout/AppLayout';
import UserIcon from '../components/UserIcon';
import Inputs from '../components/Inputs';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
type UserProfileProps = {};

const UserProfile: FC<UserProfileProps> = () => {
  const { user } = useSelector((state) => state.auth);
  const { register } = useForm();
  return (
    <AppLayout>
      <div>
        <div className="text-center">
          <UserIcon />
          <h3>{user.name}</h3>
        </div>
        <form>
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
        </form>
      </div>
    </AppLayout>
  );
};

export default UserProfile;
