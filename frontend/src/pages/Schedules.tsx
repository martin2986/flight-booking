import { FC, useState } from 'react';
import { RiGitCommitFill } from 'react-icons/ri';
import DetailModal from '../components/FlightSchedule/DetailModal';
import FlightOverview from '../components/FlightSchedule/FlightOverview';
import ScheduleItem from '../components/FlightSchedule/ScheduleItem';
import SearchInfo from '../components/SearchFLight/SearchInfo';
import AppLayout from '../layout/AppLayout';
import { useAppSelector } from '../redux/hooks';
type SchedulesProps = {};

const Schedules: FC<SchedulesProps> = () => {
  const { flightData, toggleFlightDetail } = useAppSelector((state) => state.app);
  const [modalInfo, setModalInfo] = useState<any>();
  const { filterStats } = flightData;
  const showID = (data: any) => {
    setModalInfo(data);
  };
  return (
    <>
      <SearchInfo />
      <AppLayout>
        {toggleFlightDetail && modalInfo && <DetailModal {...modalInfo} />}
        <div>
          <h1 className="font-semibold mb-2">Outbound</h1>
          <p className=" inline-flex items-center gap-3 text-base font-light mb-3">
            {filterStats?.airports[0]?.city} <RiGitCommitFill /> {filterStats?.airports[1]?.city}
          </p>
        </div>
        <div className="flex gap-3">
          <div className="w-full md:w-2/3">
            {flightData?.itineraries.map((item: any) => (
              <ScheduleItem key={item.id} {...item} onClick={() => showID(item)} />
            ))}
          </div>

          <FlightOverview />
        </div>
      </AppLayout>
    </>
  );
};

export default Schedules;
