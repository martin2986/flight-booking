import { useDisPatch } from '@/redux/hooks';
import { Buttons } from '@/UI/Button';
import { Card } from '@/UI/Card';
import { FC, ReactNode } from 'react';
import { searchAction } from './searchSlice';

type SearchFLightLayoutProps = {
  children: ReactNode;
};

const SearchFLightLayout: FC<SearchFLightLayoutProps> = ({ children }) => {
  const dispatch = useDisPatch();
  return (
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
      <div className="mb-2">
        <Buttons
          className="text-xs no-underline hover:text-indigo-500 hover:bg-transparent p-0 mr-3"
          variant="borderless"
          onClick={() => dispatch(searchAction.selectTripType(true))}
        >
          Round Trip
        </Buttons>
        <Buttons
          className="text-xs no-underline hover:text-indigo-500 hover:bg-transparent p-0"
          variant="borderless"
          onClick={() => dispatch(searchAction.selectTripType(false))}
        >
          One way
        </Buttons>
      </div>
      {children}
    </Card>
  );
};

export default SearchFLightLayout;
