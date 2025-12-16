import type { ReactNode } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from './ui/button';

type DatePickerNavigationButtonProps = {
  tooltipText: string;
  children: ReactNode;
  onClick: () => void;
};

export function DatePickerNavigationButton({
  children,
  onClick,
  tooltipText,
}: DatePickerNavigationButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          onClick={onClick}
          className="h-12 w-9 border border-border-primary bg-transparent text-content-primary hover:border-border-secondary hover:bg-background-tertiary focus-visible:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0"
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent className="bg-background-tertiary">
        <p>{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  );
}
