import { FC } from 'react';
import { useSelector } from 'react-redux';
import AppRouter from '../router/AppRouter';
import AuthRouter from '../router/AuthRouter';

type FlightAirlineProps = {};

const FlightAirline: FC<FlightAirlineProps> = () => {
  const { isSuccess } = useSelector((state) => state.auth);
  if (isSuccess) {
    return <AppRouter />;
  } else {
    return <AuthRouter />;
  }
};

export default FlightAirline;
