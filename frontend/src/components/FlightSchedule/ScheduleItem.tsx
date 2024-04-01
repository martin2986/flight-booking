import { FC } from 'react';
import { appAction } from '../../redux/app/appSlice';
import { useDisPatch } from '../../redux/hooks';
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

const ScheduleItem: FC<FlightListInfoProps> = ({ legs, price, ...rest }) => {
  const { arrival, departure, stopCount, durationInMinutes, origin, destination, carriers } =
    legs[0];
  const { marketing } = carriers;
  const dispatch = useDisPatch();
  const selectHandler = () => {
    dispatch(
      appAction.selectedFLight({
        destinationCode: destination?.displayCode,
        date: departure,
        price: price?.formatted,
        originCode: origin?.displayCode,
        origin: origin?.name,
        destination: destination?.name,
      }),
    );
  };

  return (
    <Card className=" mb-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-0" {...rest}>
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
          <h1 className="font-semibold text-center text-sm md:text-base">{price.formatted}</h1>
          <Buttons
            className="rounded-3xl px-3 py-2 md:px-5 lg:px-7  font-semibold"
            onClick={selectHandler}
          >
            Select
          </Buttons>
        </div>
      </div>
    </Card>
  );
};

export default ScheduleItem;
