import AsyncStorage from '@react-native-async-storage/async-storage';

import { sectorIdSchema } from '../domain/schemas';
import type { UserPreferences } from '../domain/types';

function getStorageKey(userId: string) {
  return `ecoleta:user-preferences:${userId}`;
}

function isLeadHours(value: unknown): value is UserPreferences['notificationLeadHours'] {
  return value === 1 || value === 6 || value === 12 || value === 24;
}

export async function loadUserPreferences(userId: string): Promise<Partial<UserPreferences> | null> {
  const raw = await AsyncStorage.getItem(getStorageKey(userId));

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const sectorId = parsed.sectorId;
    const notificationLeadHours = parsed.notificationLeadHours;
    const notificationsEnabled = parsed.notificationsEnabled;
    const theme = parsed.theme;

    return {
      sectorId:
        typeof sectorId === 'string'
          ? sectorIdSchema.parse(sectorId)
          : undefined,
      notificationLeadHours: isLeadHours(notificationLeadHours)
        ? notificationLeadHours
        : undefined,
      notificationsEnabled:
        typeof notificationsEnabled === 'boolean' ? notificationsEnabled : undefined,
      theme: theme === 'light' || theme === 'dark' ? theme : undefined,
    };
  } catch {
    return null;
  }
}

export async function saveUserPreferences(userId: string, preferences: UserPreferences) {
  await AsyncStorage.setItem(getStorageKey(userId), JSON.stringify(preferences));
}

export async function clearUserPreferences(userId: string) {
  await AsyncStorage.removeItem(getStorageKey(userId));
}
