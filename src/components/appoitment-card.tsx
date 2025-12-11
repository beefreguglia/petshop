import { cn } from '@/lib/utils';
import type { Appointment } from '@/types/appointments';

type AppoitmentCardProps = {
  appointment: Appointment;
  isFirstInSection?: boolean;
};

export function AppoitmentCard({
  appointment,
  isFirstInSection = false,
}: AppoitmentCardProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 items-center py-3 md:grid-cols-[15%_35%_30%_20%]',
        !isFirstInSection && 'border-border-divisor border-t'
      )}
    >
      <div className="pr-4 text-left md:pr-0">
        <span className="font-semibold text-content-primary text-label-small">
          {appointment.time}
        </span>
      </div>
      <div className="text-right md:pr-4 md:text-left">
        <div className="flex items-center justify-end gap-1 md:justify-start">
          <span className="font-semibold text-content-primary text-label-small-size">
            {appointment.petName}
          </span>
          <span className="text-content-secondary text-paragraph-small-size">
            /
          </span>
          <span className="text-content-secondary text-paragraph-small-size">
            {appointment.tutorName}
          </span>
        </div>
      </div>
      <div className="col-span-2 mt-1 hidden md:col-span-1 md:mt-0 md:block">
        <span className="text-content-secondary text-paragraph-small-size">
          {appointment.description}
        </span>
      </div>
    </div>
  );
}
