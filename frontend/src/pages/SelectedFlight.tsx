import FlightDuration from '../components/FlightSchedule/FlightDuration';
import FlightListItem from '../components/FlightSchedule/FlightListItem';
import { useAppSelector } from '../redux/hooks';

const SelectedFlight = () => {
  const { selectedFlight } = useAppSelector((state) => state.app);
  const { segments, stopCount } = selectedFlight;
  return (
    <>
      {segments.map(
        ({
          origin,
          destination,
          departure,
          arrival,
          durationInMinutes,
          operatingCarrier,
          flightNumber,
        }) => (
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
                time={departure}
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
