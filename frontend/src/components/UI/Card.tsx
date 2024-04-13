import { FC, ReactNode } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../utils/helperFn';

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

interface CardTypes extends VariantProps<typeof cardVariants> {
  children: ReactNode;
  className?: string;
}

const Card: FC<CardTypes> = ({ variant, size, className, children, ...props }) => {
  return (
    <div className={cn(cardVariants({ variant, size, className }))} {...props}>
      {children}
    </div>
  );
};

export { Card, cardVariants };
