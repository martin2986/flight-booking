import { FC, useState } from 'react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { Buttons } from './Button';
import SearchInput from './SearchInput';
export type InputStateTypes = {
  departure: string;
  arrival: string;
  departureDate: string;
  arrivalDate: string;
};

interface SearchFlightTypes {}
const SearchFlight: FC<SearchFlightTypes> = () => {
  const [inputs, setInputs] = useState<InputStateTypes>({
    departure: '',
    arrival: '',
    departureDate: '',
    arrivalDate: '',
  });
  const [selectedFlight, setSelectedFlight] = useState<InputStateTypes[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const handleSelected = () => {
    setSelectedFlight((prev) => [...prev, inputs]);
  };

  return (
    <>
      <div className="flex gap-1 w-full mb-3">
        <div className="flex gap-2 w-1/2">
          <SearchInput
            type="text"
            name="departure"
            topLabel="From"
            placeholder="Departure"
            value={inputs.departure}
            onChange={handleChange}
          />
          <SearchInput
            name="arrival"
            type="text"
            topLabel="To"
            placeholder="Departure"
            onChange={handleChange}
            value={inputs.arrival}
          />
        </div>
        <div className="flex gap-2 w-1/2">
          <SearchInput
            name="departureDate"
            topLabel="From"
            onChange={handleChange}
            value={inputs.departureDate}
            type="date"
          />
          <SearchInput
            name="arrivalDate"
            topLabel="To"
            onChange={handleChange}
            value={inputs.arrivalDate}
            type="date"
          />
        </div>
      </div>
      <div className="absolute right-0 -bottom-4 md:-right-4 ">
        <Buttons
          title="Search Flight"
          className="bg-gray-700 "
          variant="default"
          onClick={handleSelected}
        >
          <HiOutlineArrowNarrowRight />
        </Buttons>
      </div>
    </>
  );
};

export default SearchFlight;
