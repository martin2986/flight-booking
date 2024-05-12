import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IoPersonSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import OverviewLayout from '@/layout/OverviewLayout';
import { useAppSelector } from '@/redux/hooks';
import { getYear, monthsOfYear, numbersFrom1To31 } from '@/utils/helperFn';
import { Buttons } from '@/UI/Button';
import Dropdown from '@/UI/Dropdown';
import Inputs from '@/components/Inputs';
import SearchInfo from '../SearchFlight/SearchInfo';

interface formFields {
  [key: string]: string;
}
export interface CheckoutProps {
  changeActiveStep: (step: number) => void;
}
const Form: FC<CheckoutProps> = ({ changeActiveStep }) => {
  const navigate = useNavigate();
  const { adultCount, childrenCount, infantCount } = useAppSelector((state) => state.app);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<formFields>();
  const totalPassengers = adultCount + childrenCount + infantCount;
  const onSubmit = (data: formFields) => {
    console.log(data);
    changeActiveStep(2);
  };
  return (
    <>
      {/* <SearchInfo /> */}
      <OverviewLayout>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-5">
          {errors.root && <p>{errors.root.message || 'Something went wrong'}</p>}
          <h2 className="mb-2 text-base font-medium">Passengers</h2>
          {[...Array(totalPassengers)].map((_, index) => (
            <div className="rounded-sm border shadow-md p-2 mb-8" key={index}>
              <div className="flex flex-row gap-4 mb-3 h-8 items-center">
                <IoPersonSharp className="text-2xl" />
                <h4 className="text-sm font-medium">{`Adult ${index + 1}`}</h4>
              </div>
              <div className="flex flex-row gap-3 items-center w-full mb-3">
                <div className="flex flex-col">
                  <h4 className="text-sm text-black">Title</h4>
                  <div className="border rounded-sm">
                    <Controller
                      name={`dropdown${index}`}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Dropdown {...field} title="Title" options={['Mr', 'Mrs', 'Ms', 'Miss']} />
                      )}
                    />
                  </div>
                </div>
                <Inputs
                  label="First name"
                  name={`firstName${index}`}
                  register={register}
                  error={errors[`firstName${index}`]?.message}
                />
                {errors && <p>{errors[`firstName${index}`]?.message}</p>}
                <Inputs label="Last name" name={`lastName${index}`} register={register} />
              </div>
              <h4 className="text-sm">Date of birth</h4>

              <div className="flex flex-row border w-fit rounded-sm">
                <Controller
                  name={`day${index}`}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Dropdown {...field} title="Title" options={numbersFrom1To31} />
                  )}
                />
                <Controller
                  name={`month${index}`}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Dropdown
                      {...field}
                      title="Title"
                      options={monthsOfYear}
                      className=" border-l "
                    />
                  )}
                />
                <Controller
                  name={`year${index}`}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Dropdown {...field} title="Title" options={getYear()} className=" border-l " />
                  )}
                />
              </div>
            </div>
          ))}
          <h4 className="text-base font-medium mb-2">Contact Information</h4>

          <div className="inline-flex justify-between items-center w-full">
            <Buttons variant="outline" onClick={() => navigate('/')}>
              Back
            </Buttons>
            <Buttons className=" rounded-3xl" type="submit">
              Continue
            </Buttons>
          </div>
        </form>
      </OverviewLayout>
    </>
  );
};

export default Form;
