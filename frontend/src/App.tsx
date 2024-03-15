import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Suspense } from 'react';
import PageLoader from './components/PageLoader';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import AppRouter from './router/AppRouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './auth/apiClient';
const RootApp = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <Suspense fallback={<PageLoader />}>
              <AppRouter />
            </Suspense>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default RootApp;
