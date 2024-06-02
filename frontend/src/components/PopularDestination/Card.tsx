import { FC } from 'react';

type CardProps = {
  country: string;
  image: string;
};

const Card: FC<CardProps> = ({ image, country }) => {
  return (
    <div className="h-40 md:h-80 cursor-pointer mt-8 relative">
      <img
        src={image}
        loading="lazy"
        alt={country}
        className=" w-full h-full  object-cover rounded-xl hover:scale-105 transition-all duration-300"
      />
      <h4 className="text-sm md:text-base text-base-light font-semibold mt-1 absolute bottom-5 left-5">
        {country}
      </h4>
    </div>
  );
};

export default Card;
