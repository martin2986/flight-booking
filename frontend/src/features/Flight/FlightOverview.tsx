import { useAppSelector } from '../../redux/hooks';
import { filterList, formattedDate } from '../../utils/helperFn';
import { Card } from '@/UI/Card';
import SelectedFlight from './SelectedFlight';
import { segment } from './types';

const FlightOverview = () => {
  const {
    selectedFlight,
    adultCount,
    infantCount,
    childrenCount,
    origin,
    destination,
    selectedReturnFlight,
    protectedInsurance,
    extraLuggage,
  } = useAppSelector((state) => state.app);
  const { price, segments, isSelected } = selectedFlight;
  const {
    price: returnPrice,
    segments: returnSegment,
    isSelected: returnIsSelected,
  } = selectedReturnFlight || {};
  const totalPassenger = adultCount + infantCount + childrenCount;

  let totalPrice = totalPassenger * price?.raw || 0;
  if (returnIsSelected) totalPrice = totalPassenger * returnPrice?.raw + returnPrice?.raw;
  const connectionFee = 24;

  const flightPrice = totalPrice + connectionFee + extraLuggage + protectedInsurance;

  const selectedData: segment[] = filterList(segments);
  const selectedReturnData: segment[] = filterList(returnSegment);

  return (
    <div className="hidden md:block md:w-1/3 mx-auto">
      <h1 className="font-bold text-xl mb-3">Overview</h1>

      <Card className=" rounded shadow-md">
        <div>
          {!isSelected && <p className="text-sm mb-3">Please select an inbound flight</p>}
          {isSelected && (
            <>
              <div
                className="flex flex-row  items-center justify-between mb-2
          "
              >
                <p className="text-sm font-light">{`${totalPassenger} passengers`}</p>
                <p className="text-sm md:text-base font-bold">${totalPrice.toFixed(1)}</p>
              </div>
              <div
                className="flex flex-row  items-center justify-between mb-2
          "
              >
                <p className="text-sm font-light">Connection Service</p>
                <p className="text-sm md:text-base font-bold">${connectionFee}</p>
              </div>

              <div className="flex flex-row justify-between text-base font-semibold pb-3 border-b-2">
                <p className="font-medium">Total:</p>
                <p>${!price ? '0.00' : flightPrice.toFixed(1)}</p>
              </div>
            </>
          )}

          <div className="bg-gray-100 mt-3 py-4 px-3 ">
            {isSelected ? (
              selectedData.map(({ origin, destination, departure, flightNumber }) => (
                <SelectedFlight
                  key={flightNumber}
                  date={formattedDate(departure).formattedFullDate}
                  time={formattedDate(departure).formattedTime}
                  origin={origin.displayCode}
                  destination={destination.displayCode}
                />
              ))
            ) : (
              <div>
                <p className="text-sm">From</p>
                <h3 className="text-sm font-semibold">{origin}</h3>
                <p className="text-sm mt-3">To</p>
                <h3 className="text-sm font-semibold">{destination}</h3>
              </div>
            )}
            {returnIsSelected &&
              selectedReturnData.map(({ origin, destination, departure, flightNumber }) => (
                <SelectedFlight
                  key={flightNumber}
                  date={formattedDate(departure).formattedFullDate}
                  time={formattedDate(departure).formattedTime}
                  origin={origin.displayCode}
                  destination={destination.displayCode}
                />
              ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FlightOverview;
