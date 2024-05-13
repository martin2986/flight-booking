import { FC } from 'react';

type CardProps = {
  country: string;
  image: string;
};

const Card: FC<CardProps> = ({ image, country }) => {
  return (
    <div className=" md:h-48  mt-8">
      <img src={image} loading="lazy" alt={country} className="w-full h-4/5 object-fit rounded" />
      <h4 className="text-sm md:text-base font-semibold mt-1">{country}</h4>
    </div>
  );
};

export default Card;
