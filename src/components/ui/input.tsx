import type * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-12 w-full rounded-md border border-border-primary bg-background-tertiary px-3 py-2 text-content-primary text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-content-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
        'hover:border-border-secondary',
        'focus:border-border-brand focus-visible:border-border-brand',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
        className
      )}
      {...props}
    />
  );
}

export { Input };
