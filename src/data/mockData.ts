import type {
  CollectionSchedule,
  DisposalLocation,
  ServiceAlert,
  UserProfile,
} from '../domain/types';

export const pilotUser: UserProfile = {
  id: 'user-001',
  name: 'Felipe',
  email: 'felipe@ecoleta.app',
  city: 'Nova Aurora',
  neighborhood: 'Centro',
  notificationLeadHours: 12,
};

export const pilotCredentials = {
  email: 'felipe@ecoleta.app',
  password: 'ecoleta123',
};

export const collectionSchedules: CollectionSchedule[] = [
  {
    id: 'schedule-1',
    neighborhood: 'Centro',
    wasteType: 'organic',
    weekday: 4,
    startHour: 7,
    guidance: 'Use saco fechado e evite resíduos líquidos.',
  },
  {
    id: 'schedule-2',
    neighborhood: 'Centro',
    wasteType: 'recyclable',
    weekday: 5,
    startHour: 8,
    guidance: 'Separe papel, plástico, vidro e metal limpos.',
  },
  {
    id: 'schedule-3',
    neighborhood: 'Centro',
    wasteType: 'electronic',
    weekday: 6,
    startHour: 7,
    guidance: 'Separe pilhas, cabos e aparelhos pequenos para descarte assistido.',
  },
  {
    id: 'schedule-4',
    neighborhood: 'Jardim das Flores',
    wasteType: 'general',
    weekday: 2,
    startHour: 19,
    guidance: 'Coleta porta a porta na avenida principal.',
  },
  {
    id: 'schedule-5',
    neighborhood: 'Vila Esperanca',
    wasteType: 'recyclable',
    weekday: 4,
    startHour: 17,
    guidance: 'Disponibilize os materiais em recipiente identificado.',
  },
];

export const disposalLocations: DisposalLocation[] = [
  {
    id: 'drop-1',
    name: 'Ecoponto Central',
    address: 'Rua das Palmeiras, 210',
    acceptedWaste: ['electronic', 'recyclable'],
    openingHours: 'Seg-Sab, 08:00-18:00',
    distanceKm: 1.2,
    latitude: -23.5505,
    longitude: -46.6333,
  },
  {
    id: 'drop-2',
    name: 'Cooperativa Nova Triagem',
    address: 'Av. Brasil, 845',
    acceptedWaste: ['electronic'],
    openingHours: 'Seg-Sex, 09:00-17:00',
    distanceKm: 2.7,
    latitude: -23.5486,
    longitude: -46.6388,
  },
];

export const serviceAlerts: ServiceAlert[] = [
  {
    id: 'alert-1',
    title: 'Coleta da semana com ajuste operacional',
    message:
      'No Centro, confirme o material separado antes das 06:30 para evitar recolhimento incompleto.',
    affectedNeighborhoods: ['Centro'],
    startsAt: '2026-04-17T08:00:00.000Z',
    endsAt: '2026-04-21T23:00:00.000Z',
  },
];
