import { ButtonHTMLAttributes, FC } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../utils/helperFn';
const buttonVariants = cva(' text-black inline-flex items-center rounded-sm text-xs md:text-base', {
  variants: {
    variant: {
      default:
        'justify-center text-xs hover:bg-base-500 text-base-light rounded-sm inline-flex items-center bg-base-600 text-xs md:text-base transition ease-in-out duration-300',
      outline:
        'bg-transparent justify-center border border-gray-400 rounded-sm hover:bg-base-600 hover:text-base-light hover:border-base-600 transition ease-in-out duration-300',
      borderless: 'bg-transparent text-black justify-center underline inline-flex items-center',
      rounded:
        'rounded-full border border-indigo-600 justify-center inline-flex items-center justify-center h-10 w-10',
    },
    size: {
      default: 'text-xs md:text-sm px-5 py-2 ',
      wide: 'text-xs md:text-sm px-6 py-2 ',
      sm: 'px-2 py-1 text-xs md:text-sm min-w-16 md:min-w-22 text-black',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  value?: string;
}

const Buttons: FC<ButtonProps> = ({
  variant,
  size,
  className,
  title,
  children,
  value,
  ...props
}) => {
  return (
    <button value={value} className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {title} {children}
    </button>
  );
};
export { Buttons, buttonVariants };
