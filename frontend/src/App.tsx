import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Suspense, lazy } from "react";
import PageLoader from "./components/PageLoader";
import store from "./redux/store";
const FlightAirline = lazy(() => import("./app/FlightAirline"));

type RootAppProps = {};
const RootApp: FC<RootAppProps> = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<PageLoader />}>
          <FlightAirline />
        </Suspense>
      </Provider>
    </BrowserRouter>
  );
};

export default RootApp;
