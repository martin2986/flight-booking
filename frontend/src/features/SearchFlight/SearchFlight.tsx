import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { flightClient } from '@/services/auth/apiClient';
import Passengers from '@/features/SearchFlight/Passengers/Index';
import Search from '@/features/SearchFlight/Search';
import { Buttons } from '@/UI/Button';
import ToastNotification from '@/UI/ToastNotification';
import { appAction } from '@/redux/app/appSlice';
import { useAppSelector, useDisPatch } from '@/redux/hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import Date from './DatePicker';
import Spinner from '@/UI/Spinner';

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
  const onSubmit: SubmitHandler<InputStateTypes> = async (data: any) => {
    const { origin, destination, departureDate, arrivalDate } = data;
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
        `/flight-schedule?origin=${origin.city}&destination=${destination.city}&isRoundTrip=${roundTrip}&departDate=${moment(departureDate.$d).format('YYYY-MM-DD')}&${roundTrip ? `returnDate=${moment(arrivalDate.$d).format('YYYY-MM-DD')}` : ''}`,
        { state: data },
      );
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
          <div className="flex flex-col md:flex-row gap-2 md:w-1/2 ">
            <Date control={control} name="departureDate" />
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: roundTrip ? 1 : 0, width: roundTrip ? '100%' : 0 }}
                transition={{ duration: 0.5 }}
              >
                {roundTrip && <Date control={control} name="arrivalDate" />}
              </motion.div>
            </AnimatePresence>
          </div>
          <Passengers />
        </div>
        <Buttons
          className={`px-8 py-2 w-full md:w-fit h-12 text-nowrap ${isSubmitting ? 'bg-base-500' : ''}`}
          variant="default"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner /> : <span>Search &rarr;</span>}
        </Buttons>
      </form>

      {errors.root && (
        <ToastNotification message={errors.root.message || 'Ops an Error Occur'} type="error" />
      )}
    </>
  );
};

export default SearchFlight;
