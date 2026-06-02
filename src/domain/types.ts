export const wasteTypes = ['wet', 'dry'] as const;
export const sectorIds = [
  'sector-01',
  'sector-02',
  'sector-03',
  'sector-04',
  'sector-05',
  'sector-06',
  'sector-07',
  'sector-08',
  'sector-09',
  'sector-10',
  'sector-11',
  'sector-12',
] as const;

export type WasteType = (typeof wasteTypes)[number];
export type AppTheme = 'light' | 'dark';
export type SectorId = (typeof sectorIds)[number];

export interface CollectionSector {
  id: SectorId;
  name: string;
  neighborhoods: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  city: string;
  sectorId: SectorId;
  notificationLeadHours: number;
  notificationsEnabled: boolean;
  theme: AppTheme;
}

export interface UserPreferences {
  sectorId: SectorId;
  notificationLeadHours: number;
  notificationsEnabled: boolean;
  theme: AppTheme;
}

export interface AuthSession {
  userId: string;
  email: string;
  displayName: string;
  token?: string;
}

export interface CollectionSchedule {
  id: string;
  sectorId: SectorId;
  wasteType: WasteType;
  weekday: number;
  startHour: number;
  startMinute: number;
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
  affectedSectorIds: SectorId[];
  startsAt: string;
  endsAt: string;
}

export interface UpcomingCollection extends CollectionSchedule {
  occursAt: string;
  weekdayLabel: string;
  reminderAt: string;
}
