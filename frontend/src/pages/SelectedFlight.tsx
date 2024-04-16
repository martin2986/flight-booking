import { FC } from 'react';
import FlightDuration from '../components/FlightSchedule/FlightDuration';
import FlightListItem from '../components/FlightSchedule/FlightListItem';
import ScheduleItem from '../components/FlightSchedule/ScheduleItem';
import SearchInfo from '../components/SearchFLight/SearchInfo';
import OverviewLayout from '../layout/OverviewLayout';
import { useAppSelector } from '../redux/hooks';

type SelectedFlightProps = {};

const SelectedFlight: FC<SelectedFlightProps> = () => {
  const { selectedFlight } = useAppSelector((state) => state.app);
  const {
    destinationCode,
    price,
    originCode,
    origin,
    destination,
    durationInMinutes,
    stopCount,
    departureTime,
    originTime,
  } = selectedFlight;
  return (
    <OverviewLayout>
      <div className="flex flex-row justify-between items-center mb-2">
        <div>
          <h1 className="text-sm">SelectedFlight</h1>
          <p className="text-sm font-medium">Thu, 16 May</p>
        </div>
        <button className="text-sm hover:underline">Change selection</button>
      </div>
      <div className=" px-3 py-2 mb-3 bg-gray-100 border-0 rounded hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div className="flex sm:flex-row items-center justify-between">
          <FlightListItem
            time={departureTime}
            country={origin}
            city={origin}
            countryCode={originCode}
          />
          <FlightDuration time={durationInMinutes} stopCount={stopCount} />
          <FlightListItem
            time={originTime}
            country={destination}
            city={destination}
            countryCode={destinationCode}
          />
        </div>
      </div>
    </OverviewLayout>
  );
};

export default SelectedFlight;
