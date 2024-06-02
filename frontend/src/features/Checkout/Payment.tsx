import { FC } from 'react';
import { CheckoutProps } from './Form';
import OverviewLayout from '@/layout/OverviewLayout';
import Inputs from '@/components/Inputs';
import { useForm } from 'react-hook-form';

const Payment: FC<CheckoutProps> = ({ changeActiveStep }) => {
  const { register } = useForm();
  return (
    <OverviewLayout>
      <div className="font-[sans-serif] bg-transparent">
        <div className="max-lg:max-w-xl mx-auto w-full">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 max-lg:order-1  max-w-4xl mx-auto w-full">
              <div className="text-center max-lg:hidden"></div>
              <form className="lg:mt-1">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#333]">Shipping info</h2>
                  <div className="grid grid-cols-2 gap-6 mt-6">
                    <Inputs label="Name" name="name" register={register} placeholder="Name" />
                    <Inputs label="Email" name="email" register={register} placeholder="Email" />
                    <Inputs
                      label="Address"
                      name="address"
                      register={register}
                      placeholder="Address"
                    />
                    <Inputs label="City" name="city" register={register} placeholder="City" />
                    <Inputs label="State" name="state" register={register} placeholder="State" />
                    <Inputs
                      label="Postal code"
                      name="code"
                      register={register}
                      placeholder="Postal"
                    />
                  </div>
                </div>
                <div className="mt-12">
                  <h2 className="text-2xl font-extrabold text-[#333]">Payment method</h2>
                  <div className="grid gap-4 sm:grid-cols-2 mt-8">
                    <div className="flex items-center">
                      <input type="radio" className="w-5 h-5 cursor-pointer" id="card" />
                      <label htmlFor="card" className="ml-4 flex gap-2 cursor-pointer">
                        <img
                          src="https://readymadeui.com/images/visa.webp"
                          className="w-12"
                          alt="card1"
                        />
                        <img
                          src="https://readymadeui.com/images/american-express.webp"
                          className="w-12"
                          alt="card2"
                        />
                        <img
                          src="https://readymadeui.com/images/master.webp"
                          className="w-12"
                          alt="card3"
                        />
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" className="w-5 h-5 cursor-pointer" id="paypal" />
                      <label htmlFor="paypal" className="ml-4 flex gap-2 cursor-pointer">
                        <img
                          src="https://readymadeui.com/images/paypal.webp"
                          className="w-20"
                          alt="paypalCard"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="grid gap-6 mt-8">
                    <input
                      placeholder="Cardholder's Name"
                      className="p-2 bg-base-light text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                    />
                    <div>
                      <input
                        min={0}
                        type="number"
                        placeholder="Card Number"
                        className="p-2 bg-base-light text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <input
                        min={0}
                        type="number"
                        placeholder="EXP."
                        className="p-2 bg-base-light text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                      />
                      <input
                        min={0}
                        type="number"
                        placeholder="CVV"
                        className="p-1 bg-base-light text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-3 block text-sm">
                        I accept the
                        <a
                          href="javascript:void(0);"
                          className="text-blue-600 font-semibold hover:underline ml-1"
                        >
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-8">
                  <button
                    onClick={() => changeActiveStep(2)}
                    type="button"
                    className="min-w-[150px] px-6 py-3.5 text-sm bg-gray-100 text-[#333] rounded-md hover:bg-gray-200"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="min-w-[150px] px-6 py-3.5 text-sm bg-[#333] text-white rounded-md hover:bg-[#111]"
                  >
                    Confirm payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </OverviewLayout>
  );
};

export default Payment;
