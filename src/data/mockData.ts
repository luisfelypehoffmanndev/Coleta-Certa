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
  city: 'Santo Ângelo',
  neighborhood: 'Centro',
  notificationLeadHours: 12,
  notificationsEnabled: false,
};

export const collectionSchedules: CollectionSchedule[] = [
  {
    id: 'centro-wet',
    neighborhood: 'Centro',
    wasteType: 'wet',
    weekday: 4,
    startHour: 10,
    guidance:
      'Lixo úmido é recolhido pela Novo Mundo. Confirme o setor no mapa oficial da Prefeitura.',
  },
  {
    id: 'centro-dry',
    neighborhood: 'Centro',
    wasteType: 'dry',
    weekday: 5,
    startHour: 10,
    guidance:
      'Lixo seco é recolhido pela Cooperativa Ecos do Verde. Materiais devem estar limpos.',
  },
  {
    id: 'casaroto-wet',
    neighborhood: 'Casaroto',
    wasteType: 'wet',
    weekday: 1,
    startHour: 10,
    guidance:
      'Bairro listado no Setor 4 com coleta passando da madrugada para o dia a partir das 10h.',
  },
  {
    id: 'casaroto-dry',
    neighborhood: 'Casaroto',
    wasteType: 'dry',
    weekday: 4,
    startHour: 10,
    guidance:
      'Separe papel, plástico, papelão, vidro, latinhas e embalagens limpas para a coleta seletiva.',
  },
  {
    id: 'jardim-palmeiras-wet',
    neighborhood: 'Jardim das Palmeiras',
    wasteType: 'wet',
    weekday: 2,
    startHour: 10,
    guidance:
      'Restos de comida, erva-mate, papel higiênico e embalagens contaminadas vão no lixo úmido.',
  },
  {
    id: 'jardim-palmeiras-dry',
    neighborhood: 'Jardim das Palmeiras',
    wasteType: 'dry',
    weekday: 5,
    startHour: 10,
    guidance:
      'Disponibilize recicláveis secos e limpos para facilitar a triagem da Ecos do Verde.',
  },
  {
    id: 'missoes-wet',
    neighborhood: 'Missoes',
    wasteType: 'wet',
    weekday: 2,
    startHour: 10,
    guidance:
      'A mudança de turno vale para Missões ao norte da Av. Rio Grande do Sul.',
  },
  {
    id: 'missoes-dry',
    neighborhood: 'Missoes',
    wasteType: 'dry',
    weekday: 5,
    startHour: 10,
    guidance:
      'Materiais recicláveis incluem papel, plástico, papelão, garrafas pet, vidro e latinhas.',
  },
];

export const disposalLocations: DisposalLocation[] = [
  {
    id: 'novo-mundo',
    name: 'Novo Mundo',
    address: 'Telefone/WhatsApp: (55) 3320-4044',
    acceptedWaste: ['wet'],
    openingHours: 'Responsável pela coleta de lixo úmido',
    distanceKm: 0,
    latitude: -28.3002,
    longitude: -54.2668,
  },
  {
    id: 'ecos-do-verde',
    name: 'Cooperativa Ecos do Verde',
    address: 'Telefone/WhatsApp: (55) 9.9134-0805',
    acceptedWaste: ['dry'],
    openingHours: 'Responsável pela coleta de lixo seco',
    distanceKm: 0,
    latitude: -28.3002,
    longitude: -54.2668,
  },
  {
    id: 'secretaria-meio-ambiente',
    name: 'Secretaria de Meio Ambiente e Desenvolvimento Urbano',
    address: 'Telefone: (55) 3312-0129',
    acceptedWaste: ['wet', 'dry'],
    openingHours: 'Dúvidas, sugestões ou reclamações sobre a coleta',
    distanceKm: 0,
    latitude: -28.3002,
    longitude: -54.2668,
  },
];

export const serviceAlerts: ServiceAlert[] = [
  {
    id: 'turno-setores-4-5',
    title: 'Mudança de turno em bairros dos setores 4 e 5',
    message:
      'Desde 11/11/2024, alguns bairros passaram da madrugada para coleta durante o dia a partir das 10h. Os horários seguem em experimentação.',
    affectedNeighborhoods: [
      'Casaroto',
      'Jardim das Palmeiras',
      'Jardim Residencial Sabo',
      'Kurtz',
      'Sossego (Centro Sul)',
      'Wilde',
      'Hortencia',
      'Missoes',
      'Olavo Reis',
      'Padoim',
      'Residencial Ipanema',
      'Rosani',
      'Sanches',
      'Sao Carlos',
    ],
    startsAt: '2024-11-11T00:00:00.000Z',
    endsAt: '2027-12-31T23:00:00.000Z',
  },
];
