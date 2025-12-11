import { Cloud, Moon, Sun } from 'lucide-react';

const periodsIcons = {
  morning: <Sun className="text-accent-blue" />,
  afternoon: <Cloud className="text-accent-orange" />,
  evening: <Moon className="text-accent-yellow" />,
};

type PeriodsSectionProps = {
  period: any;
};

export function PeriodsSection({ period }: PeriodsSectionProps) {
  return (
    <section className="mb-8 rounded-xl bg-background-tertiary">
      <div className="flex items-center justify-between border-[#2e2c30] border-b px-5 py-3">
        <div>
          {periodsIcons[period?.type]}
          <h2>{period?.title}</h2>
        </div>
      </div>
    </section>
  );
}
