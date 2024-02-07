import { FC, ComponentPropsWithoutRef } from 'react';

interface UserIconProps extends ComponentPropsWithoutRef<'div'> {
  userName: string;
  id: string;
}

const Index: FC<UserIconProps> = ({ userName = '', id = '', ...props }) => {
  const user = userName.split(' ');
  const firstName = user[0].at(0);
  const lastName = user[user.length - 1].at(0);
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
export default Index;
