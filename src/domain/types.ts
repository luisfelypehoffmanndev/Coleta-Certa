export const wasteTypes = ['wet', 'dry'] as const;

export type WasteType = (typeof wasteTypes)[number];

export type Neighborhood =
  | 'Centro'
  | 'Casaroto'
  | 'Jardim das Palmeiras'
  | 'Jardim Residencial Sabo'
  | 'Kurtz'
  | 'Sossego (Centro Sul)'
  | 'Wilde'
  | 'Hortencia'
  | 'Missoes'
  | 'Olavo Reis'
  | 'Padoim'
  | 'Residencial Ipanema'
  | 'Rosani'
  | 'Sanches'
  | 'Sao Carlos';

export const neighborhoods: Neighborhood[] = [
  'Centro',
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
];

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  city: string;
  neighborhood: Neighborhood;
  notificationLeadHours: number;
  notificationsEnabled: boolean;
}

export interface UserPreferences {
  neighborhood: Neighborhood;
  notificationLeadHours: number;
  notificationsEnabled: boolean;
}

export interface AuthSession {
  userId: string;
  email: string;
  displayName: string;
  token?: string;
}

export interface CollectionSchedule {
  id: string;
  neighborhood: Neighborhood;
  wasteType: WasteType;
  weekday: number;
  startHour: number;
  guidance: string;
}

export interface DisposalLocation {
  id: string;
  name: string;
  address: string;
  acceptedWaste: WasteType[];
  openingHours: string;
  distanceKm: number;
  latitude: number;
  longitude: number;
}

export interface ServiceAlert {
  id: string;
  title: string;
  message: string;
  affectedNeighborhoods: Neighborhood[];
  startsAt: string;
  endsAt: string;
}

export interface UpcomingCollection extends CollectionSchedule {
  occursAt: string;
  weekdayLabel: string;
  reminderAt: string;
}
