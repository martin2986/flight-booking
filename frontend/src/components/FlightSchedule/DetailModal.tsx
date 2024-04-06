import { FC } from 'react';
import { IoIosClose } from 'react-icons/io';
import { appAction } from '../../redux/app/appSlice';
import { useDisPatch } from '../../redux/hooks';
import Modal from '../../UI/Modal';
import { Buttons } from '../Button';
import FlightDetailItem from './FlightDetailItem';
import { durationInHour, formatTime } from '../../utils/helperFn';
type DetailModalProps = {
  legs: {
    arrival: string;
    departure: string;
    stopCount: number;
    durationInMinutes: number;
    segments: any[];
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

const DetailModal: FC<DetailModalProps> = ({ legs }) => {
  const { durationInMinutes, segments, departure } = legs[0];
  const dispatch = useDisPatch();
  const handleHideModal = () => {
    dispatch(appAction.toggleFlightDetail(false));
  };

  console.log();
  return (
    <Modal onHideCart={handleHideModal}>
      <div className="  fixed items-center z-20 top-24 left-0 right-0 justify-center w-2/3 mx-auto  max-h-full">
        <div className="relative p-4  max-h-full mx-auto">
          <div className="relative bg-white rounded-lg shadow b">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-black">Your Journey</h3>
              <IoIosClose
                className="text-3xl cursor-pointer hover:bg-gray-300 rounded-full"
                onClick={() => dispatch(appAction.toggleFlightDetail(false))}
              />
            </div>

            <div className="p-4 md:p-5">
              <div className="mb-3">
                <h3 className="flex items-start mb-1 text-sm font-bold text-gray-900 dark:text-black">
                  Depart - {formatTime(departure).fullDateWithDay}
                </h3>
                <p className="block mb-3 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                  Journey duration: {durationInHour(durationInMinutes)}
                </p>
              </div>
              {segments.map(
                ({
                  origin,
                  destination,
                  departure,
                  arrival,
                  durationInMinutes,
                  operatingCarrier,
                  flightNumber,
                }) => (
                  <FlightDetailItem
                    originCode={origin.displayCode}
                    origin={origin.name}
                    originTime={formatTime(departure).formattedTime}
                    date={formatTime(departure).formattedDateShort}
                    destination={destination.name}
                    destinationCode={destination.displayCode}
                    destinationTime={formatTime(arrival).formattedTime}
                    duration={durationInMinutes}
                    flightNumber={flightNumber}
                    operatingCarrier={operatingCarrier}
                  />
                ),
              )}
            </div>
            <div className="p-2 md:p-5 border-t  dark:border-gray-600">
              <Buttons
                className="bg-transparent px-7 rounded-3xl text-black hover:bg-gray-300"
                onClick={() => dispatch(appAction.toggleFlightDetail(false))}
              >
                Close
              </Buttons>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DetailModal;
