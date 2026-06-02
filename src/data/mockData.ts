import type {
  CollectionSchedule,
  DisposalLocation,
  SectorId,
  ServiceAlert,
  UserProfile,
  WasteType,
} from '../domain/types';

export const pilotUser: UserProfile = {
  id: 'user-001',
  name: 'Felipe',
  email: 'felipe@ecoleta.app',
  city: 'Santo Ângelo',
  sectorId: 'sector-01',
  notificationLeadHours: 12,
  notificationsEnabled: false,
  theme: 'light',
};

interface ScheduleGroup {
  sectorId: SectorId;
  wasteType: WasteType;
  weekdays: number[];
  startHour: number;
  startMinute?: number;
}

const weekdaySlugs = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

function buildSchedules({
  sectorId,
  wasteType,
  weekdays,
  startHour,
  startMinute = 0,
}: ScheduleGroup): CollectionSchedule[] {
  return weekdays.map((weekday) => ({
    id: `${sectorId}-${wasteType}-${weekdaySlugs[weekday]}`,
    sectorId,
    wasteType,
    weekday,
    startHour,
    startMinute,
    guidance:
      wasteType === 'wet'
        ? 'Separe o lixo úmido e disponibilize antes do início do turno indicado para seu setor.'
        : 'Disponibilize recicláveis secos e limpos antes do início do turno indicado para seu setor.',
  }));
}

export const collectionSchedules: CollectionSchedule[] = [
  ...buildSchedules({ sectorId: 'sector-01', wasteType: 'wet', weekdays: [1, 2, 3, 4, 5, 6], startHour: 0 }),
  ...buildSchedules({ sectorId: 'sector-01', wasteType: 'dry', weekdays: [1, 3, 5, 6], startHour: 19 }),
  ...buildSchedules({ sectorId: 'sector-02', wasteType: 'wet', weekdays: [1, 3, 5], startHour: 0 }),
  ...buildSchedules({ sectorId: 'sector-02', wasteType: 'dry', weekdays: [2, 4, 6], startHour: 19 }),
  ...buildSchedules({ sectorId: 'sector-03', wasteType: 'wet', weekdays: [2, 4, 6], startHour: 0 }),
  ...buildSchedules({ sectorId: 'sector-03', wasteType: 'dry', weekdays: [1, 3, 5], startHour: 7 }),
  ...buildSchedules({ sectorId: 'sector-04', wasteType: 'wet', weekdays: [2, 4, 6], startHour: 0 }),
  ...buildSchedules({ sectorId: 'sector-04', wasteType: 'dry', weekdays: [1, 3, 5], startHour: 16, startMinute: 30 }),
  ...buildSchedules({ sectorId: 'sector-05', wasteType: 'wet', weekdays: [1, 3, 5], startHour: 0 }),
  ...buildSchedules({ sectorId: 'sector-05', wasteType: 'dry', weekdays: [2, 4, 6], startHour: 7 }),
  ...buildSchedules({ sectorId: 'sector-06', wasteType: 'wet', weekdays: [1, 3, 5], startHour: 0 }),
  ...buildSchedules({ sectorId: 'sector-06', wasteType: 'dry', weekdays: [2, 4, 6], startHour: 7 }),
  ...buildSchedules({ sectorId: 'sector-07', wasteType: 'wet', weekdays: [1, 3, 5], startHour: 10 }),
  ...buildSchedules({ sectorId: 'sector-07', wasteType: 'dry', weekdays: [2, 4, 6], startHour: 7 }),
  ...buildSchedules({ sectorId: 'sector-08', wasteType: 'wet', weekdays: [1, 3, 5], startHour: 10 }),
  ...buildSchedules({ sectorId: 'sector-08', wasteType: 'dry', weekdays: [2, 4, 6], startHour: 16, startMinute: 30 }),
  ...buildSchedules({ sectorId: 'sector-09', wasteType: 'wet', weekdays: [1, 3, 5], startHour: 10 }),
  ...buildSchedules({ sectorId: 'sector-09', wasteType: 'dry', weekdays: [2, 4, 6], startHour: 16, startMinute: 30 }),
  ...buildSchedules({ sectorId: 'sector-10', wasteType: 'wet', weekdays: [2, 4, 6], startHour: 10 }),
  ...buildSchedules({ sectorId: 'sector-10', wasteType: 'dry', weekdays: [1, 3, 5], startHour: 16, startMinute: 30 }),
  ...buildSchedules({ sectorId: 'sector-11', wasteType: 'wet', weekdays: [2, 4, 6], startHour: 10 }),
  ...buildSchedules({ sectorId: 'sector-11', wasteType: 'dry', weekdays: [1, 3, 5], startHour: 7 }),
  ...buildSchedules({ sectorId: 'sector-12', wasteType: 'wet', weekdays: [2, 4, 6], startHour: 10 }),
  ...buildSchedules({ sectorId: 'sector-12', wasteType: 'dry', weekdays: [1, 3, 5], startHour: 7 }),
];

export const disposalLocations: DisposalLocation[] = [
  {
    id: 'novo-mundo',
    name: 'Empresa Novo Mundo',
    address: 'Telefone: (55) 3320-4044',
    acceptedWaste: ['wet'],
    openingHours: 'Responsável pela coleta de lixo úmido',
    distanceKm: 0,
    latitude: -28.3002,
    longitude: -54.2668,
  },
  {
    id: 'ecos-do-verde',
    name: 'Cooperativa Ecos do Verde',
    address: 'Telefone: (55) 9.9134-0805',
    acceptedWaste: ['dry'],
    openingHours: 'Responsável pela coleta de lixo seco',
    distanceKm: 0,
    latitude: -28.3002,
    longitude: -54.2668,
  },
  {
    id: 'secretaria-meio-ambiente',
    name: 'Secretaria de Meio Ambiente',
    address: 'Telefone: (55) 3312-0129',
    acceptedWaste: ['wet', 'dry'],
    openingHours: 'Dúvidas, sugestões ou reclamações sobre a coleta',
    distanceKm: 0,
    latitude: -28.3002,
    longitude: -54.2668,
  },
];

export const serviceAlerts: ServiceAlert[] = [];
