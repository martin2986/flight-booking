import { FC, ReactNode } from 'react';
import FlightOverview from '../components/FlightSchedule/FlightOverview';
import SearchInfo from '../components/SearchFLight/SearchInfo';

type OverviewLayoutProps = {
  children: ReactNode;
};

const OverviewLayout: FC<OverviewLayoutProps> = ({ children }) => {
  return (
    <>
      <SearchInfo />
      <div className="min-h-screen w-screen container mx-auto px-2 md:px-3 py-5 flex flex-row gap-3">
        <div className="w-full md:w-2/3">{children}</div>
        <FlightOverview />
      </div>
    </>
  );
};

export default OverviewLayout;
