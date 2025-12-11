import { PeriodsSection } from '@/components/periods-section';
import prisma from '@/lib/prisma';
import { APPOINTMENTS, groupAppointmentsByPeriod } from '@/utils';

export default async function Home() {
  const appoint = await prisma.appointment.findMany();
  console.log(appoint);

  const periods = groupAppointmentsByPeriod(APPOINTMENTS);

  return (
    <div className="bg-background-primary p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-content-primary text-title-size">
            Sua agenda
          </h1>
          <p className="text-content-secondary text-paragraph-medium">
            Aqui você pode ver todos os clientes e serviços agendados para hoje.
          </p>
        </div>
      </div>
      <div className="pb-24 md:pb-0">
        {periods.map((period) => (
          <PeriodsSection key={period.type} period={period} />
        ))}
      </div>
    </div>
  );
}
