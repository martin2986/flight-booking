import { FC } from 'react';
import { CiEdit } from 'react-icons/ci';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import { LuPlaneLanding, LuPlaneTakeoff } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';
import { formatTime } from '@/utils/helperFn';
import TitleWithIcon from '@/components/TitleWithIcon';
type SearchInfoProps = {
  origin: string | null;
  destination: string | null;
  departDate: string | null;
  returnDate: string | null;
  isRoundTrip: string | null;
};

const SearchInfo: FC<SearchInfoProps> = ({ origin, destination, departDate, returnDate }) => {
  const { selectedFlight } = useAppSelector((state) => state.app);
  const { passengers, roundTrip } = useAppSelector((state) => state.search);
  const { isSelected } = selectedFlight;
  return (
    <>
      <div className="w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-5	py-2 rounded text-base-900">
        <div className="flex flex-row items-center justify-between ">
          <div className="flex flex-row  items-center md:gap-8">
            <TitleWithIcon
              name={isSelected && roundTrip ? destination : origin ?? origin}
              title="From"
              icon={<LuPlaneTakeoff />}
            />
            <TitleWithIcon
              name={isSelected && roundTrip ? origin : destination ?? destination}
              title="to"
              icon={<LuPlaneLanding />}
            />
            <TitleWithIcon
              name={
                isSelected && roundTrip
                  ? formatTime(returnDate)?.formattedDateShort
                  : formatTime(departDate)?.formattedDateShort
              }
              title="When"
              icon={<FaRegCalendarAlt />}
            />
            <TitleWithIcon name={`${passengers} passenger`} title="Who" icon={<IoPerson />} />
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
