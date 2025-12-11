import { PeriodsSection } from '@/components/periods-section';
import type { Appointment as AppointmentPrisma } from '@/generated/prisma/client';
import type {
  Appointment,
  AppointmentPeriodDay,
  AppointmentsPeriod,
} from '@/types/appointments';

const appointments = [
  {
    id: '1',
    petName: 'Rex',
    description: 'Consulta',
    tutorName: 'João',
    phone: '1234567890',
    scheduleAt: new Date('2025-12-11T10:00:00'),
  },
  {
    id: '2',
    petName: 'Mimi',
    tutorName: 'Maria',
    description: 'Banho',
    phone: '1234567890',
    scheduleAt: new Date('2025-12-11T11:00:00'),
  },
  {
    id: '3',
    petName: 'Nina',
    tutorName: 'Natalia',
    description: 'Consulta',
    phone: '1234567890',
    scheduleAt: new Date('2025-12-11T14:00:00'),
  },
  {
    id: '4',
    petName: 'Nina',
    tutorName: 'Natalia',
    description: 'Consulta',
    phone: '1234567890',
    scheduleAt: new Date('2025-12-11T19:00:00'),
  },
];

function getPeriod(hour: number): AppointmentPeriodDay {
  if (hour >= 9 && hour < 12) {
    return 'morning';
  }
  if (hour >= 13 && hour < 18) {
    return 'afternoon';
  }
  return 'evening';
}

function groupAppointmentsByPeriod(
  appointments: AppointmentPrisma[]
): AppointmentsPeriod[] {
  const transformedAppoitments: Appointment[] = appointments.map(
    (appointment) => ({
      ...appointment,
      time: appointment.scheduleAt.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      service: appointment.description,
      period: getPeriod(appointment.scheduleAt.getHours()),
    })
  );

  const morningAppointments = transformedAppoitments.filter(
    (appointment) => appointment.period === 'morning'
  );
  const afternoonAppointments = transformedAppoitments.filter(
    (appointment) => appointment.period === 'afternoon'
  );
  const eveningAppointments = transformedAppoitments.filter(
    (appointment) => appointment.period === 'evening'
  );

  return [
    {
      title: 'Manhã',
      type: 'morning',
      timeRange: '09h-12h',
      appointments: morningAppointments,
    },
    {
      title: 'Tarde',
      type: 'afternoon',
      timeRange: '13h-18h',
      appointments: afternoonAppointments,
    },
    {
      title: 'Noite',
      type: 'evening',
      timeRange: '19h-21h',
      appointments: eveningAppointments,
    },
  ];
}

export default function Home() {
  const periods = groupAppointmentsByPeriod(appointments);

  return (
    <div className="bg-background-primary p-6">
      <div className="flex items-center justify-between md:mb-8">
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
