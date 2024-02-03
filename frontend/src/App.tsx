import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Suspense, lazy } from 'react';
import PageLoader from './components/PageLoader';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
const FlightAirline = lazy(() => import('./app/FlightAirline'));

type RootAppProps = {};
const RootApp: FC<RootAppProps> = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Suspense fallback={<PageLoader />}>
            <FlightAirline />
          </Suspense>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
};

export default RootApp;
