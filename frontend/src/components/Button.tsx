import { ButtonHTMLAttributes, FC } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../utils/helperFn';

const buttonVariants = cva(
  'bg-indigo-600 text-slate-50 inline-flex items-center  rounded-sm  hover:bg-indigo-500  text-xs md:text-base',
  {
    variants: {
      variant: {
        default:
          ' border border-indigo-600 justify-center text-slate-50 rounded-sm inline-flex items-center   hover:border border-gray-400 text-xs md:text-base',
        outline:
          'bg-transparent text-black justify-center border border-gray-400 rounded-sm hover:bg-indigo-600 hover:text-white',
        borderless: 'bg-transparent text-black justify-center underline inline-flex items-center ',
        rounded:
          'rounded-full border border-indigo-600 justify-center inline-flex items-center justify-center h-10 w-10',
      },
      size: {
        default: 'text-xs md:text-sm p-2 ',
        sm: 'px-2 py-1 text-xs md:text-sm min-w-16 md:min-w-22 ',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  value?: string;
  onClick?: () => void;
}

const Buttons: FC<ButtonProps> = ({
  variant,
  size,
  className,
  title,
  children,
  value,
  onClick,
  ...props
}) => {
  return (
    <button
      value={value}
      onClick={onClick}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {title} {children}
    </button>
  );
};
export { Buttons, buttonVariants };
