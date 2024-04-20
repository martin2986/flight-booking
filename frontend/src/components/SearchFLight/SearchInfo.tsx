import { FC } from 'react';
import { CiEdit } from 'react-icons/ci';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import { LuPlaneLanding, LuPlaneTakeoff } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { formatTime } from '../../utils/helperFn';
import SearchValue from '../SearchValue';
type SearchInfoProps = {};

const SearchInfo: FC<SearchInfoProps> = () => {
  const {
    departureDate,
    returnDate,
    adultCount,
    childrenCount,
    infantCount,
    origin,
    destination,
    selectedFlight,
    roundTrip,
  } = useAppSelector((state) => state.app);
  const passengers = adultCount + childrenCount + infantCount;
  const { isSelected } = selectedFlight || {};
  return (
    <>
      <div className="w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-5	py-2 rounded ">
        <div className="flex flex-row items-center justify-between ">
          <div className="flex flex-row flex-wrap items-center md:gap-8">
            <SearchValue
              name={isSelected && roundTrip ? destination : origin}
              title="From"
              icon={<LuPlaneTakeoff />}
            />
            <SearchValue
              name={isSelected && roundTrip ? origin : destination}
              title="to"
              icon={<LuPlaneLanding />}
            />
            <SearchValue
              name={
                isSelected && roundTrip
                  ? formatTime(returnDate)?.formattedDateShort
                  : formatTime(departureDate)?.formattedDateShort
              }
              title="When"
              icon={<FaRegCalendarAlt />}
            />
            <SearchValue name={`${passengers} passenger`} title="Who" icon={<IoPerson />} />
          </div>
          <Link to="/" className=" items-end">
            <CiEdit className=" cursor-pointer" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default SearchInfo;
