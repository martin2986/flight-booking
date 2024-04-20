import { FC } from 'react';
import AppLayout from '../layout/AppLayout';
import OverviewLayout from '../layout/OverviewLayout';
type CheckoutProps = {};

const Checkout: FC<CheckoutProps> = () => {
  return (
    <AppLayout>
      <OverviewLayout>
        <div className="w-full">Checkout</div>
      </OverviewLayout>
    </AppLayout>
  );
};

export default Checkout;
