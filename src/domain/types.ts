export const wasteTypes = ['general', 'recyclable', 'organic', 'electronic'] as const;

export type WasteType = (typeof wasteTypes)[number];

export type Neighborhood = 'Centro' | 'Jardim das Flores' | 'Vila Esperanca';

export const neighborhoods: Neighborhood[] = ['Centro', 'Jardim das Flores', 'Vila Esperanca'];

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  city: string;
  neighborhood: Neighborhood;
  notificationLeadHours: number;
}

export interface UserPreferences {
  neighborhood: Neighborhood;
  notificationLeadHours: number;
}

export interface AuthSession {
  token: string;
  userId: string;
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
