import { FC } from 'react';
import AppLayout from '../layout/AppLayout';
import FlightSchedule from '../components/FlightSchedule';
type SchedulesProps = {};

const Schedules: FC<SchedulesProps> = () => {
  return (
    <AppLayout>
      <FlightSchedule />
    </AppLayout>
  );
};

export default Schedules;
