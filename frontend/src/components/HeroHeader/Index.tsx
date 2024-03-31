import { FC } from 'react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { selectFlightType, selectPassenger, selectTrip } from '../../utils/helperFn';
import { Buttons } from '../Button';
import Dropdown from '../Dropdown';
import SearchFlight from '../SearchFlight';
import { Card } from '../UI/Card';
export type HeaderTypes = {};

const Index: FC<HeaderTypes> = () => {
  return (
    <div className="h-screen container mx-auto">
      <div className=" top-24 mb-8">
        <h1 className="text-xl w-2/4 mb-6 md:text-4xl pt-14">
          Hey Buddy! where are you <strong>Flying</strong> to?
        </h1>
        <Buttons variant="borderless" title="Explore">
          <HiOutlineArrowNarrowRight />
        </Buttons>
      </div>
      <Card className="bg-white ">
        <div className="flex gap-2 md:gap-5 items-center mb-3">
          <h1 className=" text-sm  md:text-base">Search Flight</h1>
          <Dropdown options={selectTrip} />
          <Dropdown options={selectPassenger} />
          <Dropdown options={selectFlightType} />
        </div>
        <p className="text-xs mb-3">Get the latest on our COVID 19 response</p>
        <SearchFlight />
      </Card>
    </div>
  );
};

export default Index;
