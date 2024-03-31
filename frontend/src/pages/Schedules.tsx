import { FC, useState } from 'react';
import DetailModal from '../components/FlightSchedule/DetailModal';
import ScheduleItem from '../components/FlightSchedule/ScheduleItem';
import SelectedFlight from '../components/FlightSchedule/SelectedFlight';
import { Card } from '../components/UI/Card';
import AppLayout from '../layout/AppLayout';
import { useAppSelector } from '../redux/hooks';
import { formatTime } from '../utils/helperFn';
import { RiGitCommitFill } from 'react-icons/ri';
type SchedulesProps = {};

const Schedules: FC<SchedulesProps> = () => {
  const { flightData, selectedFlight, toggleFlightDetail } = useAppSelector((state) => state.app);
  const { destinationCode, date, price, originCode } = selectedFlight;
  const [modalInfo, setModalInfo] = useState<any>();
  const { filterStats } = flightData;
  const showID = (data: any) => {
    setModalInfo(data);
  };
  return (
    <AppLayout>
      {toggleFlightDetail && modalInfo && <DetailModal {...modalInfo} />}
      <div>
        <h1 className="font-semibold mb-2">Outbound</h1>
        <p className=" inline-flex items-center gap-3 text-base font-light mb-3">
          {filterStats.airports[0]?.city} <RiGitCommitFill /> {filterStats.airports[1]?.city}
        </p>
      </div>
      <div className="flex gap-10">
        <div className="mx-auto md:w-2/3 ">
          {flightData?.itineraries.map((item: any) => (
            <ScheduleItem key={item.id} {...item} onClick={() => showID(item)} />
          ))}
          {selectedFlight && (
            <div className="hidden md:block md:w-1/3">
              <h1 className="font-bold text-xl mb-3">Overview</h1>

              <Card>
                <div>
                  <p className="text-sm mb-3">Please select an inbound flight</p>
                  <div className="flex flex-row justify-between text-base font-semibold pb-3 border-b-2">
                    <p>Total:</p>
                    <p>{price}</p>
                  </div>

                  <div className="bg-gray-100 mt-3 py-4 px-3">
                    <SelectedFlight
                      date={formatTime(date).formattedFullDate}
                      time={formatTime(date).formattedTime}
                      origin={originCode}
                      destination={destinationCode}
                    />
                    {/* <SelectedFlight date="13 Apr 2024" time="13:00" origin="LXD" destination="DXB" /> */}
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Schedules;
