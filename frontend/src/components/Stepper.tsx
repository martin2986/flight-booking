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
    <div className="flex flex-row w-full justify-center bg-gray-100 py-5 mb-2">
      {steps.map(({ title, value }, index) => (
        <div className="flex flex-row items-center" key={value}>
          <div
            className={`text-sm border border-indigo-600 h-6 w-6 rounded-full inline-flex justify-center items-center p-2  text-indigo-600 ${activeStep === value ? 'bg-indigo-600 text-white' : ''} ${isComplete(value) ? 'bg-indigo-600 text-white' : ''}`}
          >
            <span> {isComplete(value) ? <IoCheckmark /> : <HiPencil />}</span>
          </div>
          <p className="text-sm ml-2 text-nowrap">{title}</p>
          {index !== steps.length - 1 && <span className="mx-2 w-40 border"></span>}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
