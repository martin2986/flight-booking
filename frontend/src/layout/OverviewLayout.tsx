import { FC, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import FlightOverview from '../components/FlightSchedule/FlightOverview';
import SearchInfo from '../components/SearchFLight/SearchInfo';
import { useAppSelector } from '../redux/hooks';

type OverviewLayoutProps = {
  children: ReactNode;
};

const OverviewLayout: FC<OverviewLayoutProps> = ({ children }) => {
  const { origin } = useAppSelector((state) => state.app);
  const location = useLocation();
  const isCheckout = location.pathname === '/checkout';
  return (
    <>
      {origin && !isCheckout && <SearchInfo />}
      <div className="min-h-screen w-screen container mx-auto px-2 md:px-3 py-5 flex flex-row gap-3">
        <div className="w-full md:w-2/3">{children}</div>
        <FlightOverview />
      </div>
    </>
  );
};

export default OverviewLayout;
