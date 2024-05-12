import { RiGitCommitFill } from 'react-icons/ri';
import { MdOutlineFlightTakeoff } from 'react-icons/md';
import { FC } from 'react';
type SelectedFlightProps = {
  origin: string;
  destination: string;
  date: string;
  time: string;
};

const SelectedFlight: FC<SelectedFlightProps> = ({
  origin = '',
  destination = '',
  date = '',
  time = '',
}) => {
  return (
    <div className="flex flex-row items-center justify-between py-4  border-b-2">
      <div className="flex flex-row items-center justify-between">
        <h4 className="text-sm w-fit border-2">{origin}</h4>
        <RiGitCommitFill />
        <h4 className="text-sm">{destination}</h4>
      </div>
      <div>
        <div className="flex flex-row gap-2">
          <MdOutlineFlightTakeoff />
          <h4 className="font-bold text-sm">{time}</h4>
        </div>
        <p className="text-sm">{date}</p>
      </div>
    </div>
  );
};

export default SelectedFlight;
