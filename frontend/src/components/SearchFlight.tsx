import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { flightClient } from '../auth/apiClient';
import AutoCompleteInput from './AutoCompleteInput';
import { Buttons } from './Button';
import PageLoader from './PageLoader';
import SearchInput from './SearchInput';
import { Card } from './UI/Card';
export type InputStateTypes = {
  origin: string;
  destination: string;
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
    control,
    formState: { errors, isSubmitting },
  } = useForm<InputStateTypes>({
    defaultValues: {
      origin: '',
      destination: '',
      departureDate: '',
      arrivalDate: '',
    },
  });

  const onSubmit: SubmitHandler<InputStateTypes> = async (data: any) => {
    const { origin, destination, departureDate, arrivalDate } = data;
    console.log(origin?.code);
    console.log(destination?.code);
    console.log(departureDate);
    console.log(arrivalDate);

    //
    const params = {
      params: {
        origin: origin?.code,
        destination: destination?.code,
        depart_date: departureDate,
        return_date: arrivalDate,
      },
    };
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
          <Card className=" w-fit">
            <AutoCompleteInput control={control} name="origin" label="Departure" />
          </Card>
          <Card className=" w-fit">
            <AutoCompleteInput control={control} name="destination" label="Arrival" />
          </Card>
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
    </form>
  );
};

export default SearchFlight;
