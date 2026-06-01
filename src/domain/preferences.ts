import type { UserPreferences, UserProfile } from './types';

const allowedLeadHours = [1, 6, 12, 24] as const;

export function getLeadHourOptions() {
  return allowedLeadHours;
}

export function mergeUserPreferences(
  user: UserProfile,
  preferences?: Partial<UserPreferences> | null,
): UserProfile {
  if (!preferences) {
    return user;
  }

  return {
    ...user,
    neighborhood: preferences.neighborhood ?? user.neighborhood,
    notificationLeadHours:
      preferences.notificationLeadHours ?? user.notificationLeadHours,
    notificationsEnabled:
      preferences.notificationsEnabled ?? user.notificationsEnabled,
    theme: preferences.theme ?? user.theme,
  };
}
