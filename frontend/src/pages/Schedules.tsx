import { FC } from 'react';
import ScheduleItem from '../components/FlightSchedule/ScheduleItem';
import moment from 'moment';
import AppLayout from '../layout/AppLayout';
import { useAppSelector } from '../redux/hooks';
import { Card } from '../components/UI/Card';
import SelectedFlight from '../components/FlightSchedule/SelectedFlight';
import DetailModal from '../components/FlightSchedule/DetailModal';
type SchedulesProps = {};

const Schedules: FC<SchedulesProps> = () => {
  const { flightData, selectedFlight } = useAppSelector((state) => state.app);
  const { destinationCode, date, price, originCode } = selectedFlight;
  const [datePart, timePart] = date.split('T');
  const formattedTime = moment(timePart, 'HH:mm:ss').format('HH:mm');
  const formattedDate = moment(datePart).format('DD MMM YYYY');
  return (
    <AppLayout>
      <div className="flex gap-10">
        {/* <DetailModal origin={originCode} destination={destinationCode} /> */}
        <div className="mx-auto md:w-2/3 ">
          {flightData?.itineraries.map((item: any) => <ScheduleItem key={item.id} {...item} />)}
        </div>
        {originCode !== '' && (
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
                    date={formattedDate}
                    time={formattedTime}
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
    </AppLayout>
  );
};

export default Schedules;
