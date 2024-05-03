import { FC, useEffect, useRef, useState } from 'react';
import { IoPersonSharp } from 'react-icons/io5';
import { useAppSelector, useDisPatch } from '../../redux/hooks';
import PassengersList from './PassengersList';
import { appAction } from '../../redux/app/appSlice';
type PassengersProps = {};

const Index: FC<PassengersProps> = () => {
  const [show, setShow] = useState<boolean>(false);
  const { adultCount, childrenCount, infantCount } = useAppSelector((state) => state.app);
  const dispatch = useDisPatch();
  const dropDownRef = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const totalPassengers = adultCount + childrenCount + infantCount;
  return (
    <div
      ref={dropDownRef}
      className="relative border border-gray-300 rounded px-2 py-1 cursor-pointer"
    >
      <div onClick={() => setShow((prev) => !prev)}>
        <p className="text-xs mb-1">Passengers</p>
        <div className="flex gap-2">
          <IoPersonSharp />
          <p className="text-sm text-nowrap">{`${totalPassengers} Passenger${totalPassengers > 1 ? 's' : ''}`}</p>
        </div>
      </div>
      {show && (
        <div className="absolute right-0 top-16 w-fit p-0 border shadow-md bg-white z-50">
          <PassengersList
            title="Adults"
            detail="16+"
            increment={() => dispatch(appAction.incrementAdult())}
            decrement={() => dispatch(appAction.decrementAdult())}
            value={adultCount}
            type="adults"
          />
          <PassengersList
            title="Children"
            detail="2 - 15"
            increment={() => dispatch(appAction.incrementChildren())}
            decrement={() => dispatch(appAction.decrementChildren())}
            value={childrenCount}
          />
          <PassengersList
            title="Infants"
            detail="0 - 1"
            bottom
            increment={() => dispatch(appAction.incrementInfant())}
            decrement={() => dispatch(appAction.decrementInfant())}
            value={infantCount}
          />
        </div>
      )}
    </div>
  );
};

export default Index;
