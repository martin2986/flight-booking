import FlightOverview from '@/features/Flight/FlightOverview';
import { FC, ReactNode } from 'react';

type OverviewLayoutProps = {
  children: ReactNode;
};

const OverviewLayout: FC<OverviewLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="min-h-screen w-screen container mx-auto px-2 md:px-3 py-5 flex flex-row gap-3">
        <div className="w-full md:w-2/3">{children}</div>
        <FlightOverview />
      </div>
    </>
  );
};

export default OverviewLayout;
