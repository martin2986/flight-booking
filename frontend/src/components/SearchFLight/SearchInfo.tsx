import { FC, useState } from 'react';
import SearchValue from './SearchValue';
import { LuPlaneTakeoff } from 'react-icons/lu';
import { LuPlaneLanding } from 'react-icons/lu';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import { Buttons } from '../Button';
import { AiOutlineEdit } from 'react-icons/ai';
import { useAppSelector } from '../../redux/hooks';
import SearchFlight from './SearchFlight';
import { IoCloseOutline } from 'react-icons/io5';
type SearchInfoProps = {};

const SearchInfo: FC<SearchInfoProps> = () => {
  const [toggleSearch, setToggleSearch] = useState<boolean>(false);
  const { flightData } = useAppSelector((state) => state.app);
  const { filterStats } = flightData;
  return (
    <>
      {toggleSearch && (
        <div className="flex flex-row justify-between px-5 pt-1">
          <div></div>
          <Buttons
            variant="outline"
            className="hover:bg-gray-100 hover:text-black"
            onClick={() => setToggleSearch((prev) => !prev)}
          >
            <span className="mr-1">
              <IoCloseOutline className="w-4 h-4" />
            </span>
            Cancel
          </Buttons>
        </div>
      )}
      <div className="flex flex-row justify-between items-center shadow-md px-5	py-4 rounded ">
        {!toggleSearch ? (
          <div className="flex flex-row items-center gap-8 ">
            <SearchValue
              name={filterStats.airports[1]?.city}
              title="From"
              icon={<LuPlaneTakeoff />}
            />
            <SearchValue
              name={filterStats.airports[0]?.city}
              title="to"
              icon={<LuPlaneLanding />}
            />
            <SearchValue name="19 Aug" title="When" icon={<FaRegCalendarAlt />} />
            <SearchValue name="1 passenger" title="Who" icon={<IoPerson />} />
          </div>
        ) : (
          <SearchFlight />
        )}
        {!toggleSearch ? (
          <Buttons
            variant="outline"
            className="hover:bg-gray-100 hover:text-black"
            onClick={() => setToggleSearch((prev) => !prev)}
          >
            <span className="mr-1">
              <AiOutlineEdit className="w-4 h-4" />
            </span>
            Edit your search
          </Buttons>
        ) : (
          <Buttons title="Search Flight" className="bg-gray-700 " variant="default" type="submit" />
        )}
      </div>
    </>
  );
};

export default SearchInfo;
