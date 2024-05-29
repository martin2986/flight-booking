import { FC } from 'react';
import { appAction } from '../../redux/app/appSlice';
import { useDisPatch } from '../../redux/hooks';
import { durationInHour } from '../../utils/helperFn';
type FlightDurationProps = {
  time: number;
  stopCount: number;
};

const FlightDuration: FC<FlightDurationProps> = ({ time = 65, stopCount = 1 }) => {
  const dispatch = useDisPatch();
  let stop;
  if (stopCount === 0) {
    stop = 'Direct';
  } else if (stopCount > 0) {
    stop = `${stopCount} stop`;
  }

  const toggleDetailHandler = () => {
    dispatch(appAction.toggleFlightDetail(true));
  };
  return (
    <div className=" w-1/3">
      <p className=" w-full text-center text-xs md:text-sm">{durationInHour(time)}</p>
      <div className=" flex items-center ">
        <div className="flex-grow border-t border-gray-400 border-dotted "></div>
        <span className="flex-shrink mx-1 md:mx-2 w-1 h-1 rounded-full bg-slate-950"></span>
        <div className="flex-grow border-t border-gray-400 border-dotted"></div>
      </div>
      <p className=" w-full text-center text-xs md:text-sm mt-1">{stop}</p>
      <div
        onClick={toggleDetailHandler}
        className=" w-full text-center text-xs md:text-sm pt-2 cursor-pointer text-indigo-500"
      >
        Flight details
      </div>
    </div>
  );
};

export default FlightDuration;
