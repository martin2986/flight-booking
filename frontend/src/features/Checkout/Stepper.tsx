import { FC } from 'react';
import { IoCheckmark } from 'react-icons/io5';
import { HiPencil } from 'react-icons/hi';
interface StepperProps {
  activeStep: number;
  steps: any[];
  changeActiveStep: (step: number) => void;
}

const Stepper: FC<StepperProps> = ({ activeStep, steps }) => {
  const isComplete = (currentStep: number) => activeStep > currentStep;
  return (
    <div className="flex flex-row w-full justify-center py-5 mb-2">
      {steps.map(({ title, value }, index) => (
        <div className="flex flex-row items-center" key={value}>
          <div
            className={` text-sm border border-base-600 w-3 h-3 md:h-6 md:w-6 rounded-full inline-flex justify-center items-center p-2 text-base-600 ${activeStep === value ? 'bg-base-900 text-base-light' : ''} ${isComplete(value) ? 'bg-base-900 text-base-light' : ''}`}
          >
            <span> {isComplete(value) ? <IoCheckmark /> : <HiPencil />}</span>
          </div>
          <p className="text-xs md:text-sm ml-2 text-nowrap">{title}</p>
          {index !== steps.length - 1 && <span className="mx-2 w-2 sm:w-10 md:w-32 border"></span>}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
