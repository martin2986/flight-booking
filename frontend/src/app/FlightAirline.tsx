import { FC } from 'react';
import { useSelector } from 'react-redux';
import AppRouter from '../router/AppRouter';
import AuthRouter from '../router/AuthRouter';

type FlightAirlineProps = {};

const FlightAirline: FC<FlightAirlineProps> = () => {
  const { token } = useSelector((state) => state.auth);
  if (token) {
    return <AppRouter />;
  } else {
    return <AuthRouter />;
  }
};

export default FlightAirline;
