import { FC, useState } from 'react';
import { RiGitCommitFill } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import DetailModal from '../components/FlightSchedule/DetailModal';
import ScheduleItem from '../components/FlightSchedule/ScheduleItem';
import AppLayout from '../layout/AppLayout';
import OverviewLayout from '../layout/OverviewLayout';
import { useAppSelector } from '../redux/hooks';
import SelectedFlight from './SelectedFlight';
type SchedulesProps = {};

const Schedules: FC<SchedulesProps> = () => {
  const [modalInfo, setModalInfo] = useState<any>();
  const location = useLocation();
  const { toggleFlightDetail, origin, destination, selectedFlight, roundTrip } = useAppSelector(
    (state) => state.app,
  );
  const { isSelected } = selectedFlight;
  const { data } = location.state;

  const showID = (data: any) => {
    setModalInfo(data);
  };
  if (!data) return <h3>No selected flight </h3>;
  return (
    <AppLayout>
      <OverviewLayout>
        {toggleFlightDetail && modalInfo && <DetailModal {...modalInfo} />}
        {roundTrip && isSelected && (
          <div>
            <h1 className="font-semibold mb-2">Outbound</h1>
            <p className=" inline-flex items-center gap-3 text-base font-light mb-3">
              {origin} <RiGitCommitFill /> {destination}
            </p>
          </div>
        )}
        {roundTrip && isSelected && <SelectedFlight />}

        {data && !isSelected ? (
          <div>
            <h1 className="font-semibold mb-2">Outbound</h1>
            <p className=" inline-flex items-center gap-3 text-base font-light mb-3">
              {origin} <RiGitCommitFill /> {destination}
            </p>
          </div>
        ) : (
          <div>
            <h1 className="font-semibold mb-2">Inbound</h1>
            <p className=" inline-flex items-center gap-3 text-base font-light mb-3">
              {destination} <RiGitCommitFill /> {origin}
            </p>
          </div>
        )}
        <div>
          <ScheduleItem flightData={data?.itineraries} onSelectFlight={showID} />
        </div>
      </OverviewLayout>
    </AppLayout>
  );
};

export default Schedules;
