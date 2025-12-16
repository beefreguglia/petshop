'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { calculatePeriod, formatDateTime } from '@/utils';

const appointmentSchema = z.object({
  tutorName: z.string(),
  petName: z.string(),
  phone: z.string(),
  description: z.string(),
  scheduleAt: z.date(),
});

type AppointmentData = z.infer<typeof appointmentSchema>;

export async function createAppointment(data: AppointmentData) {
  try {
    const parsedData = appointmentSchema.parse(data);

    const { description, petName, phone, scheduleAt, tutorName } = parsedData;

    const hour = Number.parseInt(formatDateTime(scheduleAt));

    const { isMorning, isAfternoon, isEvening } = calculatePeriod(hour);

    if (!isMorning && !isAfternoon && !isEvening) {
      return {
        error:
          'Agendamento só podem ser feitos entre 9h e 12h, 13h e 18h, ou entre 19h e 21h.',
      };
    }

    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        scheduleAt,
      },
    });

    if (existingAppointment) {
      return {
        error: 'Este horario já está reservado.',
      };
    }

    const appointment = await prisma.appointment.create({
      data: {
        tutorName,
        petName,
        phone,
        description,
        scheduleAt,
      },
    });

    revalidatePath('/');

    return { appointment };
  } catch (error) {
    console.error(error);
    return { error: 'Erro ao criar agendamento. Tente novamente.' };
  }
}

export async function updateAppointment(id: string, data: AppointmentData) {
  try {
    const parsedData = appointmentSchema.parse(data);

    const { description, petName, phone, scheduleAt, tutorName } = parsedData;

    const hour = Number.parseInt(formatDateTime(scheduleAt));

    const { isMorning, isAfternoon, isEvening } = calculatePeriod(hour);

    if (!isMorning && !isAfternoon && !isEvening) {
      return {
        error:
          'Agendamento só podem ser feitos entre 9h e 12h, 13h e 18h, ou entre 19h e 21h.',
      };
    }

    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        scheduleAt,
        id: {
          not: id,
        },
      },
    });

    if (existingAppointment) {
      return {
        error: 'Este horario já está reservado.',
      };
    }

    const updatedAppointment = await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        tutorName,
        petName,
        phone,
        description,
        scheduleAt,
      },
    });

    revalidatePath('/');

    return { updatedAppointment };
  } catch (error) {
    console.log(error);
    return { error: 'Erro ao editar agendamento. Tente novamente.' };
  }
}

export async function deleteAppointment(id: string) {
  try {
    await prisma.appointment.delete({
      where: {
        id,
      },
    });

    revalidatePath('/');
  } catch (error) {
    console.log(error);
    return { error: 'Erro ao deletar agendamento. Tente novamente.' };
  }
}
