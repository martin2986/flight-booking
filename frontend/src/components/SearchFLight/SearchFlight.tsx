import moment from 'moment';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { flightClient } from '../../auth/apiClient';
import { appAction } from '../../redux/app/appSlice';
import { useAppSelector, useDisPatch } from '../../redux/hooks';
import { Buttons } from '../Button';
import PageLoader from '../PageLoader';
import AutoCompleteInput from './AutoCompleteInput';
import Date from './DatePicker';
export type InputStateTypes = {
  origin: string;
  destination: string;
  departureDate: string;
  arrivalDate: string;
};

interface SearchFlightTypes {}
const SearchFlight: FC<SearchFlightTypes> = () => {
  const { flightData, roundTrip } = useAppSelector((state) => state.app);
  const { filterStats } = flightData;
  const navigate = useNavigate();
  const dispatch = useDisPatch();
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
  let url: string;
  if (roundTrip) {
    url = '/search-roundtrip';
  } else {
    url = '/search-one-way';
  }
  const onSubmit: SubmitHandler<InputStateTypes> = async (data: any) => {
    const { origin, destination, departureDate, arrivalDate } = data;
    console.log(origin);
    console.log(destination);
    console.log(departureDate);
    console.log(arrivalDate);

    console.log(url);

    const params = {
      params: {
        fromId: origin?.id,
        toId: destination?.id,
        departDate: moment(departureDate).format('YYYY-MM-DD'),
        returnDate: arrivalDate,
        // returnDate: '',
        adults: '1',
        currency: 'USD',
        market: 'US',
        locale: 'en-US',
      },
    };
    if (roundTrip) {
      params.params.returnDate = arrivalDate;
    }

    console.log(params);
    try {
      const response = await flightClient.get(url, params);
      const { data } = response;
      if (!response) throw new Error(`Error occurred while fetching data Data`);
      dispatch(appAction.setFlightData(data?.data));
      reset();
      navigate('/schedules');
    } catch (err: any) {
      setError('root', {
        message: err.response.data.message,
      });
    }
  };

  if (isSubmitting) return <PageLoader />;
  return (
    <>
      <div className="mb-2">
        <Buttons
          className="text-xs no-underline hover:text-indigo-500 hover:bg-transparent p-0 mr-3"
          variant="borderless"
          onClick={() => dispatch(appAction.selectTripType(true))}
        >
          Round Trip
        </Buttons>
        <Buttons
          className="text-xs no-underline hover:text-indigo-500 hover:bg-transparent p-0"
          variant="borderless"
          onClick={() => dispatch(appAction.selectTripType(false))}
        >
          One way
        </Buttons>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row items-center gap-4">
        {errors.root && <div className="text-red-500 text-sm mb-4">{errors.root.message}</div>}
        <div className="flex w-full gap-1">
          <div className="flex gap-2 w-1/2">
            <AutoCompleteInput control={control} name="origin" label="Departure" />
            <AutoCompleteInput control={control} name="destination" label="Arrival" />
          </div>
          <div className="flex gap-2 w-1/2">
            <Date control={control} name="departureDate" label="Date" />
            {roundTrip && <Date control={control} name="arrivalDate" label="Date" />}
          </div>
        </div>
        <Buttons title="Search" className="bg-gray-700 px-5 py-2" variant="default" type="submit">
          <span className="incline-flex items-center ml-1">
            <HiOutlineArrowNarrowRight />
          </span>
        </Buttons>
      </form>
    </>
  );
};

export default SearchFlight;
