import { useAppSelector } from '../../redux/hooks';

const UserIcon = ({ ...props }) => {
  const { user } = useAppSelector((state) => state.auth);
  const UserName = user?.name.split(' ');
  const firstName = UserName[0].at(0)?.toLocaleUpperCase();
  const lastName = UserName[UserName.length - 1].at(0)?.toLocaleUpperCase();
  return (
    <div className="flex flex-row items-center justify-center cursor-pointer" {...props}>
      <div>
        <div className="rounded-full mx-2 p-1  border border-black h-10 w-10 inline-flex justify-center items-center text-center">
          {firstName}
          {lastName}
        </div>
      </div>
    </div>
  );
};
export default UserIcon;
