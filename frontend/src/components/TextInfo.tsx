import { FC } from 'react';

type TextInfoProps = {
  title: string;
  description: string;
  icon: string;
  alt: string;
};

const TextInfo: FC<TextInfoProps> = ({ title, icon, description, alt }) => {
  return (
    <div className="flex items-center gap-3 py-5 ">
      <img src={icon} alt={alt} className="w-10 h-10" />
      <div>
        <p className=" text-xs md:text-base font-semibold">{title}</p>
        <p className="text-sm tracking-wider font-light">{description}</p>
      </div>
    </div>
  );
};

export default TextInfo;
