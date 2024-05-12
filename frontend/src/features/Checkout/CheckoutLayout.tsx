import { useMemo, useState } from 'react';
import Extras from './Extras';
import Form from './Form';
import Payment from './Payment';
import Stepper from './Stepper';

const CheckoutLayout = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const changeActiveStep = (stepValue: number) => {
    if (stepValue <= steps.length || stepValue >= 1) setActiveStep(stepValue);
  };

  const steps = useMemo(
    () => [
      {
        value: 1,
        title: "Who's flying",
        component: <Form changeActiveStep={changeActiveStep} />,
      },
      {
        value: 2,
        title: 'Baggage and Extras',
        component: <Extras changeActiveStep={changeActiveStep} />,
      },
      {
        value: 3,
        title: 'Payment',
        component: <Payment changeActiveStep={changeActiveStep} />,
      },
    ],
    [],
  );

  const activeComponent = useMemo(() => {
    return steps.find(({ value }) => value === activeStep)?.component || null;
  }, [activeStep, steps]);
  return (
    <>
      <Stepper activeStep={activeStep} steps={steps} changeActiveStep={changeActiveStep} />
      {activeComponent}
    </>
  );
};

export default CheckoutLayout;
