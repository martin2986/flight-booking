import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Suspense } from 'react';
import PageLoader from './components/PageLoader';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import AppRouter from './router/AppRouter';

const RootApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Suspense fallback={<PageLoader />}>
            <AppRouter />
          </Suspense>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
};

export default RootApp;
