import { FC, ReactNode } from 'react';

type TitleWithIconProps = {
  type?: string;
  name: string | Date | any;
  title: string;
  icon: ReactNode;
};

const TitleWithIcon: FC<TitleWithIconProps> = ({ name, title, icon }) => {
  return (
    <div className="flex items-center gap-1 md:gap-3 mr-2 md:mr-0 text-nowrap">
      <span className=" text-xs md:text-base ">{icon}</span>
      <div>
        <p className=" text-xs md:text-sm hidden md:block font-semibold">{title}</p>
        <p className="text-xs md:text-sm  tracking-wider font-light text-nowrap">{name}</p>
      </div>
    </div>
  );
};

export default TitleWithIcon;
