import { flightClient } from '@/services/auth/apiClient';
import Passengers from '@/features/SearchFlight/Passengers/Index';
import Search from '@/features/SearchFlight/Search';
import { Buttons } from '@/UI/Button';
import ToastNotification from '@/UI/ToastNotification';
import { appAction } from '@/redux/app/appSlice';
import { useAppSelector, useDisPatch } from '@/redux/hooks';
import moment from 'moment';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Date from './DatePicker';
export type InputStateTypes = {
  origin: string;
  destination: string;
  departureDate: string;
  arrivalDate: string;
};

const SearchFlight = () => {
  const { roundTrip, passengers } = useAppSelector((state) => state.search);
  const navigate = useNavigate();
  const dispatch = useDisPatch();
  const {
    handleSubmit,
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
  if (isSubmitting) dispatch(appAction.setIsLoading(true));
  const onSubmit: SubmitHandler<InputStateTypes> = async (data: any) => {
    const { origin, destination, departureDate, arrivalDate } = data;
    if (origin === '' && destination === '') {
      dispatch(appAction.setIsLoading(false));
      return;
    }

    const params = {
      params: {
        fromId: origin.id,
        toId: destination.id,
        departDate: moment(departureDate.$d).format('YYYY-MM-DD'),
        returnDate: '',
        adults: `${passengers}`,
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
      if (!response) throw new Error(`Error occurred while fetching data Data`);
      const { data } = response;
      dispatch(appAction.clearSelectedFlight());
      navigate(
        `/flight-schedule?origin=${origin.city}&destination=${destination.city}&isRoundTrip=${roundTrip}&departDate=${moment(departureDate.$d).format('YYYY-MM-DD')}&returnDate=&${moment(arrivalDate.$d).format('YYYY-MM-DD')}`,
        { state: data },
      );
      dispatch(appAction.setIsLoading(false));
    } catch (err: any) {
      setError('root', {
        message: err.response.data.message,
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row items-center gap-4"
      >
        <div className="flex flex-col md:flex-row w-full gap-1">
          <div className="flex flex-col md:flex-row gap-2 md:w-1/2">
            <Search control={control} name="origin" label="Departure" />
            <Search control={control} name="destination" label="Arrival" />
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:w-1/2">
            <Date control={control} name="departureDate" show />
            <Date control={control} name="arrivalDate" show={roundTrip} />
          </div>

          <Passengers />
        </div>
        <Buttons
          className="bg-gray-700 px-5 py-2 w-full md:w-fit text-nowrap"
          variant="default"
          type="submit"
        >
          Search &rarr;
        </Buttons>
      </form>

      {errors.root && (
        <ToastNotification message={errors.root.message || 'Ops an Error Occur'} type="error" />
      )}
    </>
  );
};

export default SearchFlight;
