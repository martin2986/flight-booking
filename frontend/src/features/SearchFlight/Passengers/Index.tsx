import { useEffect, useRef, useState } from 'react';
import { IoPersonSharp } from 'react-icons/io5';
import { useAppSelector, useDisPatch } from '../../../redux/hooks';
import { searchAction } from '../searchSlice';
import PassengersList from './PassengersList';

const Index = () => {
  const [show, setShow] = useState<boolean>(false);
  const { adultCount, childrenCount, infantCount, passengers } = useAppSelector(
    (state) => state.search,
  );
  const dispatch = useDisPatch();
  const dropDownRef = useRef<any | null>(null);

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
  return (
    <div
      ref={dropDownRef}
      className="relative border border-gray-300 rounded px-2 py-1 cursor-pointer"
    >
      <div onClick={() => setShow((prev) => !prev)}>
        <p className="text-xs mb-1">Passengers</p>
        <div className="flex gap-2">
          <IoPersonSharp />
          <p className="text-sm text-nowrap">{`${passengers} Passenger${passengers > 1 ? 's' : ''}`}</p>
        </div>
      </div>
      {show && (
        <div className="absolute right-0 top-16 w-fit p-0 border shadow-md bg-white z-50">
          <PassengersList
            title="Adults"
            detail="16+"
            increment={() => dispatch(searchAction.incrementAdult())}
            decrement={() => dispatch(searchAction.decrementAdult())}
            value={adultCount}
            type="adults"
          />
          <PassengersList
            title="Children"
            detail="2 - 15"
            increment={() => dispatch(searchAction.incrementChildren())}
            decrement={() => dispatch(searchAction.decrementChildren())}
            value={childrenCount}
          />
          <PassengersList
            title="Infants"
            detail="0 - 1"
            bottom
            increment={() => dispatch(searchAction.incrementInfant())}
            decrement={() => dispatch(searchAction.decrementInfant())}
            value={infantCount}
          />
        </div>
      )}
    </div>
  );
};

export default Index;
