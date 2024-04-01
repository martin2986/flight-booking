import { FC } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { Card } from '../UI/Card';
import SelectedFlight from './SelectedFlight';
import { formatTime } from '../../utils/helperFn';
type FlightOverviewProps = {};

const FlightOverview: FC<FlightOverviewProps> = () => {
  const { selectedFlight, flightData } = useAppSelector((state) => state.app);
  const { destinationCode, date, price, originCode } = selectedFlight;
  const { filterStats } = flightData;
  return (
    <div className="hidden md:block md:w-1/3 mx-auto">
      <h1 className="font-bold text-xl mb-3">Overview</h1>

      <Card>
        <div>
          <p className="text-sm mb-3">Please select an inbound flight</p>
          <div className="flex flex-row justify-between text-base font-semibold pb-3 border-b-2">
            <p>Total:</p>
            <p>{!price ? '$0.00' : price}</p>
          </div>

          <div className="bg-gray-100 mt-3 py-4 px-3 ">
            {originCode ? (
              <SelectedFlight
                date={formatTime(date).formattedFullDate}
                time={formatTime(date).formattedTime}
                origin={originCode}
                destination={destinationCode}
              />
            ) : (
              <div>
                <p className="text-sm">From</p>
                <h3 className="text-sm font-semibold">{filterStats.airports[0]?.city}</h3>
                <p className="text-sm mt-3">To</p>
                <h3 className="text-sm font-semibold">{filterStats.airports[1]?.city}</h3>
              </div>
            )}
            {/* <SelectedFlight date="13 Apr 2024" time="13:00" origin="LXD" destination="DXB" /> */}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FlightOverview;
