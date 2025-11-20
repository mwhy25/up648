import { type ButtonHTMLAttributes } from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-400 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-orange-500 text-white hover:bg-orange-600',
                secondary: 'bg-blue-500 text-white hover:bg-blue-600',
                outline: 'border border-orange-500 text-orange-600 bg-white hover:bg-orange-50',
                ghost: 'hover:bg-orange-100 text-orange-600 hover:text-orange-700',
                link: 'text-orange-600 underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-9 px-4 py-2',
                sm: 'h-8 rounded-md px-3 text-xs',
                lg: 'h-10 rounded-md px-8',
                icon: 'h-9 w-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    className?: string;
}

export function Button({
    className,
    variant,
    size,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}