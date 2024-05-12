import FlightTitle from '@/features/Flight/FlightTitle';
import SearchInfo from '@/features/SearchFlight/SearchInfo';
import { AnimatePresence } from 'framer-motion';
import { FC, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import DetailModal from '../components/DetailModal';
import FlightDetailItem from '../features/Flight/FlightDetailItem';
import FlightList from '../features/Flight/FlightList';
import { selectedFLight } from '../features/Flight/types';
import OverviewLayout from '../layout/OverviewLayout';
import { useAppSelector } from '../redux/hooks';
import { durationInHour, formattedDate, formatTime } from '../utils/helperFn';
import SelectedFlight from './SelectedFlight';
type SchedulesProps = {};

const Schedules: FC<SchedulesProps> = () => {
  const [modalInfo, setModalInfo] = useState<selectedFLight>();
  let [searchParams] = useSearchParams();
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');
  const isRoundTrip = searchParams.get('isRoundTrip');
  const departureDate = searchParams.get('departDate');

  const location = useLocation();
  const { toggleFlightDetail, selectedFlight } = useAppSelector((state) => state.app);
  const { isSelected } = selectedFlight;
  const { data } = location.state;

  const showID = (data: selectedFLight) => {
    setModalInfo(data);
  };
  if (!data) return <h3>No selected flight </h3>;
  return (
    <>
      <SearchInfo origin={origin} destination={destination} />
      <OverviewLayout>
        <AnimatePresence>
          {toggleFlightDetail && modalInfo && (
            <DetailModal>
              <div className="p-4 md:p-5">
                <div className="mb-3">
                  <h3 className="flex items-start mb-1 text-sm font-bold text-gray-900 dark:text-black">
                    Depart - {formatTime(departureDate).fullDateWithDay}
                  </h3>
                  <p className="block mb-3 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                    Journey duration: {durationInHour(modalInfo.durationInMinutes)}
                  </p>
                </div>
                {modalInfo.segments?.map(
                  ({
                    origin,
                    destination,
                    departure,
                    arrival,
                    durationInMinutes,
                    operatingCarrier,
                    flightNumber,
                  }) => (
                    <FlightDetailItem
                      key={flightNumber}
                      originCode={origin.displayCode}
                      origin={origin.name}
                      originTime={formattedDate(departure).formattedTime}
                      departureDate={formattedDate(departure).formattedDateShort}
                      destination={destination.name}
                      destinationCode={destination.displayCode}
                      returnDate={formattedDate(arrival).formattedDateShort}
                      destinationTime={formattedDate(arrival).formattedTime}
                      duration={durationInMinutes}
                      flightNumber={flightNumber}
                      operatingCarrier={operatingCarrier}
                    />
                  ),
                )}
              </div>
            </DetailModal>
          )}
        </AnimatePresence>
        {isRoundTrip && isSelected && (
          <SelectedFlight origin={origin} destination={destination} isRoundTrip={isRoundTrip} />
        )}

        {data && !isSelected ? (
          <FlightTitle origin={origin} destination={destination} type="Outbound" />
        ) : (
          <FlightTitle origin={destination} destination={origin} type="Inbound" />
        )}
        <div>
          <FlightList flightData={data?.itineraries} onSelectFlight={showID} />
        </div>
      </OverviewLayout>
    </>
  );
};

export default Schedules;
