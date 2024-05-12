import { FC, ReactNode } from 'react';

type TitleWithIconProps = {
  type?: string;
  name: string | Date | any;
  title: string;
  icon: ReactNode;
};

const TitleWithIcon: FC<TitleWithIconProps> = ({ name, title, icon }) => {
  return (
    <div className="flex items-center gap-3 mr-4 md:mr-0">
      <span className=" text-sm md:text-base ">{icon}</span>
      <div>
        <p className=" text-xs hidden md:block font-semibold">{title}</p>
        <p className="text-sm tracking-wider font-light text-nowrap">{name}</p>
      </div>
    </div>
  );
};

export default TitleWithIcon;
