import { FC } from 'react';
import ScheduleItem from './ScheduleItem';

type FlightScheduleProps = {};

const Index: FC<FlightScheduleProps> = () => {
  return (
    <div className="mt-4">
      <ScheduleItem price="400" />
    </div>
  );
};

export default Index;
