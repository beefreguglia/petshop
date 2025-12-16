import { Cloud, Moon, Sun } from 'lucide-react';

import { AppoitmentCard } from '@/components/appoitment-card';
import type { AppointmentsPeriod } from '@/types/appointments';

const periodsIcons = {
  morning: <Sun className="text-accent-blue" />,
  afternoon: <Cloud className="text-accent-orange" />,
  evening: <Moon className="text-accent-yellow" />,
};

type PeriodsSectionProps = {
  period: AppointmentsPeriod;
};

export function PeriodsSection({ period }: PeriodsSectionProps) {
  return (
    <section className="mb-8 rounded-xl bg-background-tertiary">
      <div className="flex items-center justify-between border-[#2e2c30] border-b px-5 py-3">
        <div className="flex items-center gap-2">
          {periodsIcons[period.type]}
          <h2>{period.title}</h2>
        </div>
        <span className="text-content-secondary text-label-large-size">
          {period.timeRange}
        </span>
      </div>

      {period.appointments.length > 0 ? (
        <div className="px-5">
          <div>
            {period.appointments.map((appointment, i) => (
              <AppoitmentCard
                key={i}
                appointment={appointment}
                isFirstInSection={i === 0}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="p-5 text-content-secondary text-paratext-paragraph-small-size">
          Nenhum agendamento para esse período
        </p>
      )}
    </section>
  );
}
