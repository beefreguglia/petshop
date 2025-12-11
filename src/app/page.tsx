import { PeriodsSection } from '@/components/periods-section';

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

export default function Home() {
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
      <PeriodsSection period={[]} />
    </div>
  );
}
