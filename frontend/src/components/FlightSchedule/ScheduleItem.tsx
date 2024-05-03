import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appAction } from '../../redux/app/appSlice';
import { useAppSelector, useDisPatch } from '../../redux/hooks';
import { Buttons } from '../Button';
import { Card } from '../UI/Card';
import FlightDuration from './FlightDuration';
import FlightListItem from './FlightListItem';
import ImageList from './ImageList';
type FlightListInfoProps = {
  legs: {
    arrival: string;
    departure: string;
    stopCount: number;
    durationInMinutes: number;
    carriers: {
      marketing: {
        logoUrl: string;
        name: string;
        id: number;
      }[];
    };
    origin: {
      displayCode: string;
      name: string;
      city: string;
    };
    destination: {
      displayCode: string;
      name: string;
      city: string;
    };
  }[];
  price: {
    formatted: string;
  };
};

const ScheduleItem: FC<any> = ({ flightData, onSelectFlight, ...rest }) => {
  const navigate = useNavigate();
  const dispatch = useDisPatch();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { roundTrip, selectedFlight } = useAppSelector((state) => state.app);
  const { isSelected } = selectedFlight;

  const selectHandler = (data: any) => {
    dispatch(appAction.selectedFLight(data));
    if (!roundTrip) navigate('/checkout');
    setCurrentIndex(1);
  };
  const selectReturnHandler = (data: any) => {
    dispatch(appAction.setSelectedReturnFLight(data));
    navigate('/checkout');
  };
  useEffect(() => {
    if (isSelected && roundTrip) setCurrentIndex(1);
  }, [isSelected, roundTrip]);
  return (
    <>
      {flightData ? (
        flightData?.map(({ legs, price, id }: { legs: any; price: any; id: any }) => {
          const {
            arrival,
            departure,
            stopCount,
            durationInMinutes,
            origin,
            destination,
            carriers,
            segments,
          } = legs[currentIndex];
          const { marketing } = carriers;
          return (
            <Card
              className=" mb-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-0"
              {...rest}
              key={id}
              onClick={() => onSelectFlight({ segments, durationInMinutes, stopCount })}
            >
              <div className="flex sm:flex-row items-center justify-between">
                <ImageList marketing={marketing} />
                <FlightListItem
                  time={departure}
                  country={origin?.name}
                  city={origin?.city}
                  countryCode={origin.displayCode}
                />
                <FlightDuration time={durationInMinutes} stopCount={stopCount} />
                <FlightListItem
                  type="destination"
                  time={arrival}
                  country={destination?.name}
                  city={destination?.city}
                  countryCode={destination.displayCode}
                />
                <div className=" backdrop: flex flex-col items-center text-center">
                  <h1 className="font-semibold text-center text-sm md:text-base">
                    {price.formatted}
                  </h1>
                  <Buttons
                    className="rounded-3xl px-3 py-2 md:px-5 lg:px-7  font-semibold"
                    onClick={
                      isSelected && roundTrip
                        ? () =>
                            selectReturnHandler({
                              segments,
                              durationInMinutes,
                              price,
                              isSelected: true,
                            })
                        : () =>
                            selectHandler({
                              segments,
                              durationInMinutes,
                              price,
                              isSelected: true,
                            })
                    }
                  >
                    Select
                  </Buttons>
                </div>
              </div>
            </Card>
          );
        })
      ) : (
        <p className="text-center mt-8">No flight available for this date</p>
      )}
    </>
  );
};

export default ScheduleItem;
