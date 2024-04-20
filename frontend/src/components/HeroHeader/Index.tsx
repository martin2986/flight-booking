import { FC } from 'react';
import { Buttons } from '../Button';
import SearchFlight from '../SearchFLight/SearchFlight';
import { Card } from '../UI/Card';

export type HeaderTypes = {};

const Index: FC<HeaderTypes> = () => {
  return (
    <div className=" container mx-auto">
      <div className=" top-24 mb-8">
        <h1 className="text-xl w-2/4 mb-6 md:text-4xl pt-14">
          Hey Buddy! where are you <strong>Flying</strong> to?
        </h1>
        <Buttons variant="borderless" className="hover:scale-125">
          Explore &rarr;
        </Buttons>
      </div>
      <Card className="bg-white mt-28">
        <div className="flex gap-2 md:gap-5 items-center mb-3">
          <Buttons
            className="text-xs no-underline hover:text-indigo-500 hover:bg-transparent"
            variant="outline"
          >
            Flights
          </Buttons>
          <Buttons
            className="text-xs no-underline hover:text-indigo-500 hover:bg-transparent"
            variant="outline"
          >
            Hotels
          </Buttons>
          <Buttons
            className="text-xs no-underline hover:text-indigo-500 hover:bg-transparent"
            variant="outline"
          >
            Cars Hire
          </Buttons>
        </div>
        <SearchFlight />
      </Card>
    </div>
  );
};

export default Index;
