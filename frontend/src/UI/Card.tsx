import { cva, VariantProps } from 'class-variance-authority';
import { FC, HTMLProps } from 'react';
import { cn } from '../utils/helperFn';

const cardVariants = cva('relative border border-gray-300 rounded-lg mb-3 w-full', {
  variants: {
    variant: {
      default: 'relative border border-gray-300 rounded-lg w-full',
    },
    size: {
      default: 'md:p-3 p-1',
      md: 'w-1/2',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
});

interface CardProps
  extends Omit<HTMLProps<HTMLDivElement>, 'size'>,
    VariantProps<typeof cardVariants> {}

const Card: FC<CardProps> = ({ variant, size, className, children, ...props }) => {
  return (
    <div className={cn(cardVariants({ variant, size, className }))} {...props}>
      {children}
    </div>
  );
};

export { Card, cardVariants };
