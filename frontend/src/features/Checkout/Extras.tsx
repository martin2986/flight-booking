import { FC, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { GoShieldCheck, GoShieldX } from 'react-icons/go';
import { IoMdCheckmark } from 'react-icons/io';
import { LuBackpack } from 'react-icons/lu';
import { MdOutlineLuggage } from 'react-icons/md';
import OverviewLayout from '../../layout/OverviewLayout';
import { useDisPatch } from '../../redux/hooks';
import { Buttons } from '../../UI/Button';
import { checkoutAction } from './checkoutSlice';
import { type CheckoutProps } from './Form';

const Extras: FC<CheckoutProps> = ({ changeActiveStep }) => {
  const [selectExtraBag, setSelectExtraBag] = useState(false);
  const [extraInsurance, setExtraInsurance] = useState(false);

  const dispatch = useDisPatch();

  const extraLuggageHandler = () => {
    setSelectExtraBag((prev) => !prev);

    const isExtraLuggageSelected = !selectExtraBag;

    if (isExtraLuggageSelected) {
      dispatch(checkoutAction.addExtraLuggage());
    } else {
      dispatch(checkoutAction.removeExtraLuggage());
    }
  };

  const addProtectedInsuranceHandler = () => {
    setExtraInsurance(true);
    const isExtraInsuranceSelected = !extraInsurance;
    if (isExtraInsuranceSelected) {
      dispatch(checkoutAction.addProtectedInsurance());
    }
  };
  const removeProtectedInsuranceHandler = () => {
    setExtraInsurance(false);
    const isExtraInsuranceSelected = extraInsurance;
    if (isExtraInsuranceSelected) {
      dispatch(checkoutAction.removeExtraInsurance());
    }
  };
  return (
    <>
      <OverviewLayout>
        <h3 className="text-sm font-bold">Baggage allowance</h3>
        <p className="text-sm">On each flight</p>
        <div className="mt-3 flex flex-row gap-3 items-start">
          <LuBackpack />
          <div>
            <p className="text-xs">1 person item</p>
            <p className="text-xs text-green-700">Included</p>
            <p className="text-xs">Fits under the seat in front of you</p>
          </div>
        </div>
        <div className="mt-3 flex flex-row gap-3 items-start">
          <MdOutlineLuggage />
          <div>
            <p className="text-xs">1 carry-on bag</p>
            <p className="text-xs text-green-700">Included</p>
            <p className="text-xs">25 x 35 x 55 cm . Max weight 12 kg</p>
          </div>
        </div>
        <div className="border rounded-md w-60 p-3 mt-3 flex flex-row  items-center justify-between">
          <div className="flex flex-row items-center gap-4 ">
            <button className={`w-5 h-5 border rounded `} onClick={extraLuggageHandler}>
              {selectExtraBag && <FaCheck className="text-sm ml-1 text-green-700" />}
            </button>
            <div>
              <p className="text-xs">Add checked bag</p>
              <p className="text-xs ">+ 60,02 €</p>
              <p className="text-xs"> Max weight 60 kg</p>
            </div>
          </div>
          <MdOutlineLuggage />
        </div>
        <div className="mt-4">
          <h3 className="font-bold">Travel protection</h3>
          <p className="text-sm">
            Protect yourself from the unexpected. XCover's Travel Protection covers flight costs and
            more.
          </p>

          <div className="border rounded-md w-full mt-3 flex flex-row p-3 items-center justify-between">
            <div className="flex flex-row items-center gap-4">
              <input
                type="radio"
                name="insurance"
                className="text-xl w-4 h-4"
                onClick={removeProtectedInsuranceHandler}
              />
              <div>
                <p className="text-sm font-bold">No Insurance</p>
                <p className="text-sm">0,00 €</p>
              </div>
            </div>
            <GoShieldX className="text-xl font-lighter" />
          </div>
          <div className="border rounded-md w-full mt-3 p-3 ">
            <div className="  mb-2 flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-4">
                <input
                  type="radio"
                  name="insurance"
                  className="text-xl w-4 h-4"
                  onClick={addProtectedInsuranceHandler}
                />
                <div>
                  <p className="text-sm font-bold">No Insurance</p>
                  <p className="text-sm">27,48 € per traveler</p>
                </div>
              </div>
              <GoShieldCheck className="text-xl text-green-600 font-lighter" />
            </div>
            <div className="inline-flex items-center gap-2 ">
              <IoMdCheckmark className="text-indigo-600" />
              <p className="text-xs">
                Trip cancellation - Protect your travel investment with our trip cancellation
                insurance.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 ">
              <IoMdCheckmark className="text-indigo-600" />
              <p className="text-xs">
                Trip interruption - Travel confidently knowing that help is just a phone call away
                with our 24/7 travel assistance services.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 ">
              <IoMdCheckmark className="text-indigo-600" />
              <p className="text-xs">
                Baggage Protection - reimbursement for lost, stolen, or damaged luggage, as well as
                coverage for essential items if your baggage is delayed.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 ">
              <IoMdCheckmark className="text-indigo-600" />
              <p className="text-xs">
                Emergency Medical Coverage - Travel with peace of mind knowing you're covered with
                our emergency medical insurance.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 ">
              <IoMdCheckmark className="text-indigo-600" />
              <p className="text-xs">
                Travel Delay Coverage - coverage provides reimbursement for additional expenses.
              </p>
            </div>
          </div>
        </div>
      </OverviewLayout>
      <div className="flex flex-row items-center justify-between mb-8">
        <Buttons variant="outline" onClick={() => changeActiveStep(1)}>
          Back
        </Buttons>
        <Buttons className=" rounded-3xl" onClick={() => changeActiveStep(3)}>
          Continue
        </Buttons>
      </div>
    </>
  );
};

export default Extras;
