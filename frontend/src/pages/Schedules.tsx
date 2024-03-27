import { FC } from 'react';
import AppLayout from '../layout/AppLayout';
import FlightSchedule from '../components/FlightSchedule';
import { useQuery } from '@tanstack/react-query';
type SchedulesProps = {};

const Schedules: FC<SchedulesProps> = () => {
  const { data } = useQuery({
    queryKey: ['flights'],
  });
  console.log(data);
  return (
    <AppLayout>
      <FlightSchedule />
    </AppLayout>
  );
};

export default Schedules;
