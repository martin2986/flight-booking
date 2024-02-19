import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { cityClient, flightClient, appApi } from '../auth/apiClient';
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
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<InputStateTypes>({
    defaultValues: {
      departure: '',
      departureCode: '',
      arrival: '',
      arrivalCode: '',
      departureDate: '',
      arrivalDate: '',
    },
  });

  const [testInput, setTestInput] = useState<string>('');
  const [inputData, setInputData] = useState<any>();
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  const controller = new AbortController();

  useEffect(() => {
    const subscription = watch(async ({ departure, arrival }) => {
      let query;
      // const queryItem = departure || arrival;
      if (departure) {
        query = departure;
      } else {
        query = arrival;
      }
      if (query === '') {
        setIsEmpty(true);
        return;
      }

      const response = await appApi.get(`/city?city=` + query, {
        signal: controller.signal,
      });
      const { data } = response;
      setIsEmpty(false);
      setInputData(data.result);
      console.log(data.result);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        controller.abort();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // console.log(inputData);

  const filterData = IOTA.filter((item) => item.code.toLowerCase().includes(testInput));

  const onSubmit: SubmitHandler<InputStateTypes> = async (data) => {
    // const IOTAdata =
    console.log(data);
    //
    // const params = { params: data };
    // try {
    //   const response = await flightClient.request(params);
    //   console.log(response.data);
    //   reset();
    // } catch (err: any) {
    //   setError('root', {
    //     message: err.response.data.message,
    //   });
    // }
  };
  const handleClick = () => {};
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
        <Card className=" w-1/3">
          {inputData.map((item) => (
            <div
              key={item._id}
              className="flex flex-row items-center justify-between h-10 cursor-pointer border-b hover:bg-blue-200 -mx-3 px-3"
              onClick={() => setValue('departure', item.name || 'ar')}
            >
              <h3 className=" ">{item.name}</h3>
              <h3 className=" ">{item.code}</h3>
            </div>
          ))}
        </Card>
      )}
    </form>
  );
};

export default SearchFlight;
