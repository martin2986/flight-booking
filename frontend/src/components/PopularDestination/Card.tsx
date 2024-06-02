import { FC, useEffect, useState } from 'react';
import { Blurhash } from 'react-blurhash';
import { LazyLoadImage } from 'react-lazy-load-image-component';
type CardProps = {
  country: string;
  image: string;
  hash: string;
};

const Card: FC<CardProps> = ({ image, country, hash }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = image;
  }, [image]);
  return (
    <div className="h-40 md:h-80 cursor-pointer mt-8 relative">
      {!imageLoaded && (
        <Blurhash hash={hash} resolutionX={32} height={320} width={390} resolutionY={2} punch={1} />
      )}

      {imageLoaded && (
        <LazyLoadImage
          alt={country}
          src={image}
          onLoad={() => setImageLoaded(true)}
          className="w-full h-full  object-cover rounded-xl hover:scale-105 transition-all duration-300"
          loading="lazy"
        />
      )}
      <h4 className="text-sm md:text-base text-base-light font-semibold mt-1 absolute bottom-5 left-5">
        {country}
      </h4>
    </div>
  );
};

export default Card;
