import { useAppSelector, useDisPatch } from '@/redux/hooks';
import { Buttons, buttonVariants } from '@/UI/Button';
import { Card } from '@/UI/Card';
import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { searchAction } from './searchSlice';

type SearchFLightLayoutProps = {
  children: ReactNode;
};

const SearchFLightLayout: FC<SearchFLightLayoutProps> = ({ children }) => {
  const dispatch = useDisPatch();
  const { roundTrip } = useAppSelector((state) => state.search);
  return (
    <Card className=" bg-base-light text-base-600 mt-16">
      <div className="flex gap-2 md:gap-5 items-center mb-3">
        <Buttons className="text-xs text-base-light hover:bg-base-500">Flights</Buttons>
        <Link
          to={{ pathname: 'hotel-booking' }}
          target="_blank"
          className={`${buttonVariants({
            variant: 'outline',
          })} text-xs no-underline`}
        >
          Hotels
        </Link>
        <Link
          to={{ pathname: 'car-booking' }}
          target="_blank"
          className={`${buttonVariants({
            variant: 'outline',
          })}  text-xs no-underline`}
        >
          Cars Hire
        </Link>
      </div>
      <div className="mb-2">
        <Buttons
          className={`text-xs hover:text-indigo-500 hover:bg-transparent p-0 mr-3 ${roundTrip ? 'underline-offset-8' : 'no-underline'} `}
          variant="borderless"
          onClick={() => dispatch(searchAction.selectTripType(true))}
        >
          Round Trip
        </Buttons>
        <Buttons
          className={`text-xs hover:text-indigo-500 hover:bg-transparent p-0 ${!roundTrip ? 'underline-offset-8' : 'no-underline'} `}
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
