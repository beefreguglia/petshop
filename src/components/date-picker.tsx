'use client';

import { addDays, format, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { DatePickerNavigationButton } from './date-picker-navigation-button';

export const DatePicker = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date');

  const getInitialDate = useCallback(() => {
    if (!dateParam) return;

    const [year, month, day] = dateParam.split('-').map(Number);
    const parsedDate = new Date(year, month - 1, day);

    if (!isValid(parsedDate)) return new Date();

    return parsedDate;
  }, [dateParam]);

  const [date, setDate] = useState<Date | undefined>(getInitialDate);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  function updateURLWithDate(selectedDate: Date | undefined) {
    if (!selectedDate) {
      return;
    }

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('date', format(selectedDate, 'yyyy-MM-dd'));
    router.push(`${pathname}?${newParams.toString()}`);
  }

  function handleNavigateDay(days: number) {
    const newDate = addDays(date || new Date(), days);
    updateURLWithDate(newDate);
  }

  function handleDateSelect(selectedData: Date | undefined) {
    updateURLWithDate(selectedData);
    setIsPopoverOpen(false);
  }

  useEffect(() => {
    const newDate = getInitialDate();

    if (date?.getTime() !== newDate?.getTime()) {
      setDate(newDate);
    }
  }, [date, getInitialDate]);

  return (
    <div className="flex items-center gap-2">
      <DatePickerNavigationButton
        onClick={() => handleNavigateDay(-1)}
        tooltipText="Dia anterior"
      >
        <ChevronLeft className="h-4 w-4" />
      </DatePickerNavigationButton>

      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-min[180px] justify-between border-border-primary bg-transparent text-left font-normal text-content-primary hover:border-border-secondary hover:bg-background-tertiary hover:text-content-primary focus:border-border-brand focus-visible:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0"
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-content-brand" />
              {date ? (
                format(date, 'dd/MM/yyyy')
              ) : (
                <span>Selecione uma data</span>
              )}
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            autoFocus
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>

      <DatePickerNavigationButton
        onClick={() => handleNavigateDay(1)}
        tooltipText="Próximo dia"
      >
        <ChevronRight className="h-4 w-4" />
      </DatePickerNavigationButton>
    </div>
  );
};
