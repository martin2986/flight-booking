import { FC } from 'react';
import { MdKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import { Buttons } from '../UI/Button';
import { CheckoutProps } from '../features/Checkout/Form';
import SeatItem from '../features/Checkout/Seats/SeatItem';

const SeatSelection: FC<CheckoutProps> = ({ changeActiveStep }) => {
  return (
    <div>
      <div className="flex flex-row justify-around">
        <div>
          <p className="text-sm w-64 mt-5 font-medium">
            If you don't select your seat now, the airline may randomly assign you a seat or allow
            you to choose from the remaining ones when you check in.
          </p>
        </div>
        <div className="">
          <div className="flex flex-row gap-2 items-center">
            <div className="">
              <SeatItem label section="A" secondSection="B" />
              <div className="inline-flex items-center gap-1 mt-2">
                <MdKeyboardDoubleArrowLeft className=" text-xl font-extralight text-green-600" />
                <span className="text-sm text-green-600">Exit</span>
              </div>
            </div>
            <div className="flex flex-col  justify-end items-end">
              <SeatItem section="C" secondSection="D" />
              <div className="inline-flex items-center gap-1 mt-2">
                <div className="inline-flex items-center gap-1">
                  <span className="text-sm text-green-600">Exit</span>{' '}
                  <MdOutlineKeyboardDoubleArrowRight className=" text-xl font-extralight text-green-600" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="">
              <SeatItem label section="A" secondSection="B" />
              <div className="inline-flex items-center gap-1 mt-2">
                <MdKeyboardDoubleArrowLeft className=" text-xl font-extralight text-green-600" />
                <span className="text-sm text-green-600">Exit</span>
              </div>
            </div>
            <div className="flex flex-col  justify-end items-end">
              <SeatItem section="C" secondSection="D" />
              <div className="inline-flex items-center gap-1 mt-2">
                <div className="inline-flex items-center gap-1">
                  <span className="text-sm text-green-600">Exit</span>{' '}
                  <MdOutlineKeyboardDoubleArrowRight className=" text-xl font-extralight text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between mt-5">
        <Buttons variant="outline" onClick={() => changeActiveStep(1)}>
          Back
        </Buttons>
        <Buttons onClick={() => changeActiveStep(3)}>Next</Buttons>
      </div>
    </div>
  );
};

export default SeatSelection;
