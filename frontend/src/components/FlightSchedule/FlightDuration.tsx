import { FC } from 'react';
import moment from 'moment';
type FlightDurationProps = {
  time: number;
  stopCount: number;
};

const FlightDuration: FC<FlightDurationProps> = ({ time = 65, stopCount = 1 }) => {
  let stop;
  if (stopCount === 0) {
    stop = 'Direct';
  } else if (stopCount > 0) {
    stop = `${stopCount} stop`;
  }
  const duration = moment.duration(time, 'minutes');
  const hours = Math.floor(duration.asHours());
  const mins = Math.floor(duration.asMinutes()) % 60;
  return (
    <div className=" w-1/3 -mt-5 md:-mt-6">
      <p className=" w-full text-center text-xs md:text-sm">{`${hours}hr ${mins}min`}</p>
      <div className=" flex py-1 items-center ">
        <div className="flex-grow border-t border-gray-400 border-dotted"></div>
        <span className="flex-shrink mx-1 md:mx-2 w-1 h-1 rounded-full bg-slate-950"></span>
        <div className="flex-grow border-t border-gray-400 border-dotted"></div>
      </div>
      <p className=" w-full text-center text-xs md:text-sm">{stop}</p>
    </div>
  );
};

export default FlightDuration;
