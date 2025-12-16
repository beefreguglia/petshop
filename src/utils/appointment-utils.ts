import type { Appointment as AppointmentPrisma } from '@/generated/prisma/client';
import type {
  Appointment,
  AppointmentPeriodDay,
  AppointmentsPeriod,
} from '@/types/appointments';

export function getPeriod(hour: number): AppointmentPeriodDay {
  if (hour >= 9 && hour < 12) {
    return 'morning';
  }
  if (hour >= 13 && hour < 18) {
    return 'afternoon';
  }
  return 'evening';
}

export function formatDateTime(date: Date): string {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Sao_Paulo',
  });
}

export function groupAppointmentsByPeriod(
  appointments: AppointmentPrisma[]
): AppointmentsPeriod[] {
  const transformedAppoitments: Appointment[] = appointments.map(
    (appointment) => ({
      ...appointment,
      time: formatDateTime(appointment.scheduleAt),
      service: appointment.description,
      period: getPeriod(
        Number.parseInt(formatDateTime(appointment.scheduleAt))
      ),
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

export function calculatePeriod(hour: number) {
  const isMorning = hour >= 9 && hour < 12;
  const isAfternoon = hour >= 13 && hour < 18;
  const isEvening = hour >= 19 && hour < 21;

  return {
    isMorning,
    isAfternoon,
    isEvening,
  };
}
