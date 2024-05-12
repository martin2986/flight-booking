import { FC } from 'react';
import { modifiedAirlineName } from '@/utils/helperFn';
type ImageListProps = {
  marketing: {
    logoUrl: string;
    name: string;
    id: number;
  }[];
};

const ImageList: FC<ImageListProps> = ({ marketing }) => {
  return (
    <div className="text-center">
      {marketing.map(({ name, logoUrl, id }) => (
        <div className="flex flex-col  place-items-center w-fit lg:w-20 p-1" key={id}>
          <img src={logoUrl} alt={name} className="w-4" />
          <p className="text-xs text-gray-500 font-bold text-nowrap text-center">
            {modifiedAirlineName(name)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ImageList;
