import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Suspense } from 'react';
import PageLoader from './UI/PageLoader';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import AppRouter from './router/AppRouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/auth/apiClient';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
const RootApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <QueryClientProvider client={queryClient}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Suspense fallback={<PageLoader />}>
                <AppRouter />
              </Suspense>
            </LocalizationProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
};

export default RootApp;
