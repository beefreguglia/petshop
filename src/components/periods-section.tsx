import { Cloud, Moon, Sun } from 'lucide-react';
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
            <div className="mb-2 grid grid-cols-2 text-content-secondary text-label-small-size md:hidden">
              <div className="text-left">Horario</div>
              <div className="text-right">Paciente</div>
            </div>
            {period.appointments.map((appointment, i) => (
              <div key={i} className="">
                {appointment.petName}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Nenhum agendamento para esse período</p>
      )}
    </section>
  );
}
