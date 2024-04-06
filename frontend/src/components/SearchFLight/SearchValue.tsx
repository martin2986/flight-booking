import { FC, ReactNode } from 'react';

type SearchValueProps = {
  type?: string;
  name: string | Date | any;
  title: string;
  icon: ReactNode;
};

const SearchValue: FC<SearchValueProps> = ({ name, title, icon }) => {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <p className=" text-xs font-semibold">{title}</p>
        <p className="text-sm tracking-wider font-light">{name}</p>
      </div>
    </div>
  );
};

export default SearchValue;
