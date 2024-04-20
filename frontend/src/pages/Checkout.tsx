import { FC } from 'react';
import FlightOverview from '../components/FlightSchedule/FlightOverview';
import AppLayout from '../layout/AppLayout';
import OverviewLayout from '../layout/OverviewLayout';
import { useSearchParams } from 'react-router-dom';
type CheckoutProps = {};

const Checkout: FC<CheckoutProps> = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams);
  return (
    <AppLayout>
      <OverviewLayout>
        <div className="w-full">Checkout</div>
      </OverviewLayout>
    </AppLayout>
  );
};

export default Checkout;
