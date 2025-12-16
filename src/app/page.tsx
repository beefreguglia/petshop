import { AppointmentForm } from '@/components/appoitment-form';
import { PeriodsSection } from '@/components/periods-section';
import prisma from '@/lib/prisma';
import { groupAppointmentsByPeriod } from '@/utils';

export default async function Home() {
  const appointments = await prisma.appointment.findMany();

  const periods = groupAppointmentsByPeriod(appointments);

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
      <div className="fixed right-0 bottom-0 left-0 flex justify-center bg-[#23242C] px-6 py-[18px] md:top-auto md:right-6 md:bottom-6 md:left-auto md:bg-transparent md:p-0">
        <AppointmentForm />
      </div>
    </div>
  );
}
