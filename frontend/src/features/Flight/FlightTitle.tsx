import { FC } from 'react';
import { RiGitCommitFill } from 'react-icons/ri';

type FlightTitleProps = {
  origin: string | null;
  destination: string | null;
  type: string;
};

const FlightTitle: FC<FlightTitleProps> = ({ origin, destination, type }) => {
  return (
    <div>
      <h1 className="font-semibold mb-2">{type}</h1>
      <p className=" inline-flex items-center gap-3 text-base font-light mb-3">
        {origin} <RiGitCommitFill /> {destination}
      </p>
    </div>
  );
};

export default FlightTitle;
