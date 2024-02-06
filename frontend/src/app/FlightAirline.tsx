import { FC } from 'react';
import { useSelector } from 'react-redux';
import AppRouter from '../router/AppRouter';
import AuthRouter from '../router/AuthRouter';

type FlightAirlineProps = {};

const FlightAirline: FC<FlightAirlineProps> = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (isLoggedIn) {
    return <AppRouter />;
  } else {
    return <AuthRouter />;
  }
};

export default FlightAirline;
