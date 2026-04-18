import AsyncStorage from '@react-native-async-storage/async-storage';

import { neighborhoodSchema } from '../domain/schemas';
import type { UserPreferences } from '../domain/types';

const storageKey = 'ecoleta:user-preferences';

function isLeadHours(value: unknown): value is UserPreferences['notificationLeadHours'] {
  return value === 6 || value === 12 || value === 24;
}

export async function loadUserPreferences(): Promise<Partial<UserPreferences> | null> {
  const raw = await AsyncStorage.getItem(storageKey);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const neighborhood = parsed.neighborhood;
    const notificationLeadHours = parsed.notificationLeadHours;

    return {
      neighborhood:
        typeof neighborhood === 'string'
          ? neighborhoodSchema.parse(neighborhood)
          : undefined,
      notificationLeadHours: isLeadHours(notificationLeadHours)
        ? notificationLeadHours
        : undefined,
    };
  } catch {
    return null;
  }
}

export async function saveUserPreferences(preferences: UserPreferences) {
  await AsyncStorage.setItem(storageKey, JSON.stringify(preferences));
}
