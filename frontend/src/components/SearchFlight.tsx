import debounce from 'lodash.debounce';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { flightClient } from '../auth/apiClient';
import { IOTA } from '../utils/util';
import { Buttons } from './Button';
import PageLoader from './PageLoader';
import SearchInput from './SearchInput';
import { Card } from './UI/Card';
export type InputStateTypes = {
  departure: string;
  arrival: string;
  departureDate: string;
  arrivalDate: string;
};

interface SearchFlightTypes {}
const SearchFlight: FC<SearchFlightTypes> = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<InputStateTypes>();

  const [testInput, setTestInput] = useState<string>('');
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  const handleInputChange = (e: any) => {
    setTestInput(e.target.value);
    e.target.value !== '' ? setIsEmpty(false) : setIsEmpty(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await flightClient.get('cities.json');
      console.log(response);
    };
    fetchData();
  }, []);

  // const testHandler = debounce(handleInputChange, 2000);
  const filterData = IOTA.filter((item) => item.code.toLowerCase().includes(testInput));
  // console.log(filterData);

  const onSubmit: SubmitHandler<InputStateTypes> = async (data) => {
    const params = { params: data };
    try {
      const response = await flightClient.request(params);
      console.log(response.data);
      reset();
    } catch (err: any) {
      setError('root', {
        message: err.response.data.message,
      });
    }
  };
  if (isSubmitting) return <PageLoader />;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errors.root && <div className="text-red-500 text-sm mb-4">{errors.root.message}</div>}
      <div className="flex gap-1 w-full mb-3">
        <div className="flex gap-2 w-1/2">
          <SearchInput
            type="text"
            name="departure"
            topLabel="From"
            placeholder="Departure"
            register={register}
            onChange={handleInputChange}
          />

          <SearchInput
            name="arrival"
            type="text"
            topLabel="To"
            placeholder="Arrival"
            register={register}
          />
        </div>
        <div className="flex gap-2 w-1/2">
          <SearchInput name="departureDate" topLabel="From" register={register} type="date" />
          <SearchInput name="arrivalDate" topLabel="To" register={register} type="date" />
        </div>
      </div>
      <div className="absolute right-0 -bottom-4 md:-right-4 ">
        <Buttons title="Search Flight" className="bg-gray-700 " variant="default" type="submit">
          <HiOutlineArrowNarrowRight />
        </Buttons>
      </div>
      {!isEmpty && (
        <Card>
          {filterData.map((item, id) => (
            <h3 className="underline" key={id}>
              {item.code}
            </h3>
          ))}
        </Card>
      )}
    </form>
  );
};

export default SearchFlight;
