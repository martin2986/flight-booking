import moment from 'moment';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { flightClient } from '../../auth/apiClient';
import { appAction } from '../../redux/app/appSlice';
import { useAppSelector, useDisPatch } from '../../redux/hooks';
import { Buttons } from '../Button';
import Passengers from '../Passengers/Index';
import ToastNotification from '../UI/ToastNotification';
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
  const { roundTrip, adultCount, childrenCount, infantCount } = useAppSelector(
    (state) => state.app,
  );
  const navigate = useNavigate();
  const dispatch = useDisPatch();
  const {
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
  const passenger = adultCount + childrenCount + infantCount;
  let url: string;
  if (roundTrip) {
    url = '/search-roundtrip';
  } else {
    url = '/search-one-way';
  }
  if (isSubmitting) dispatch(appAction.setIsLoading(true));
  const onSubmit: SubmitHandler<InputStateTypes> = async (data: any) => {
    const { origin, destination, departureDate, arrivalDate } = data;

    const params = {
      params: {
        fromId: origin?.id,
        toId: destination?.id,
        departDate: moment(departureDate.$d).format('YYYY-MM-DD'),
        returnDate: moment(arrivalDate.$d).format('YYYY-MM-DD'),
        adults: `${passenger}`,
        currency: 'USD',
        market: 'US',
        locale: 'en-US',
      },
    };
    if (roundTrip) {
      params.params.returnDate = moment(arrivalDate.$d).format('YYYY-MM-DD');
    }
    try {
      const response = await flightClient.get(url, params);
      if (response) dispatch(appAction.setIsLoading(false));
      const { data } = response;
      if (!response) throw new Error(`Error occurred while fetching data Data`);
      dispatch(appAction.setFlightData(data?.data));
      reset();
      navigate('/schedule');
    } catch (err: any) {
      setError('root', {
        message: err.response.data.message,
      });
    }
  };

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row items-center gap-4"
      >
        <div className="flex flex-col md:flex-row w-full gap-1">
          <div className="flex flex-col md:flex-row gap-2 md:w-1/2">
            <AutoCompleteInput control={control} name="origin" label="Departure" />
            <AutoCompleteInput control={control} name="destination" label="Arrival" />
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:w-1/2">
            <Date control={control} name="departureDate" />
            {roundTrip && <Date control={control} name="arrivalDate" />}
          </div>
          <Passengers />
        </div>
        <Buttons
          title="Search"
          className="bg-gray-700 px-5 py-2 w-full md:w-fit"
          variant="default"
          type="submit"
        >
          <span className="incline-flex items-center ml-1">
            <HiOutlineArrowNarrowRight />
          </span>
        </Buttons>
      </form>

      {errors.root && (
        <ToastNotification message={errors.root.message || 'Ops an Error Occur'} type="error" />
      )}
    </>
  );
};

export default SearchFlight;
