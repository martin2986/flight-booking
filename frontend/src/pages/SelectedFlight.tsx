import { FC } from 'react';
import FlightDuration from '@/features/Flight/FlightDuration';
import FlightListItem from '@/features/Flight/FlightItem';
import FlightTitle from '@/features/Flight/FlightTitle';
import { segment } from '../features/Flight/types';
import { useAppSelector } from '../redux/hooks';
import { filterList } from '../utils/helperFn';
type SelectedFlightProps = {
  origin: string | null;
  destination: string | null;
  isRoundTrip: string | null;
};
const SelectedFlight: FC<SelectedFlightProps> = ({ origin, destination, isRoundTrip }) => {
  const { selectedFlight } = useAppSelector((state) => state.app);
  const { segments, stopCount, isSelected } = selectedFlight;
  const selectedData: segment[] = filterList(segments);
  return (
    <>
      {isRoundTrip && isSelected && (
        <FlightTitle origin={origin} destination={destination} type="Outbound" />
      )}
      {selectedData.map(
        ({ origin, destination, departure, arrival, durationInMinutes, flightNumber }) => (
          <div className=" px-3 py-2 mb-3 bg-gray-100 border-0 rounded hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <div className="flex sm:flex-row items-center justify-between" key={flightNumber}>
              <FlightListItem
                time={departure}
                country={origin.name}
                city={origin.name}
                countryCode={origin.displayCode}
              />
              <FlightDuration time={durationInMinutes} stopCount={stopCount} />
              <FlightListItem
                time={arrival}
                country={destination.name}
                city={destination.name}
                countryCode={destination.displayCode}
              />
            </div>
          </div>
        ),
      )}
    </>
  );
};

export default SelectedFlight;
