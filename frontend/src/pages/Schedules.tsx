import { FC } from 'react';
import ScheduleItem from '../components/FlightSchedule/ScheduleItem';
import AppLayout from '../layout/AppLayout';
import { useAppSelector } from '../redux/hooks';
type SchedulesProps = {};

const Schedules: FC<SchedulesProps> = () => {
  const { flightData } = useAppSelector((state) => state.app);
  return (
    <AppLayout>
      <div className="mx-2 md:w-2/3">
        {flightData?.itineraries.map((item: any) => <ScheduleItem key={item.id} {...item} />)}
      </div>
    </AppLayout>
  );
};

export default Schedules;
