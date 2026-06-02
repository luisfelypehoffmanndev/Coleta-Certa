import { mergeUserPreferences } from '../src/domain/preferences';
import { pilotUser } from '../src/data/mockData';

describe('preferences domain', () => {
  it('merges saved preferences over the pilot user', () => {
    const merged = mergeUserPreferences(pilotUser, {
      sectorId: 'sector-04',
      notificationLeadHours: 24,
      notificationsEnabled: true,
      theme: 'dark',
    });

    expect(merged.sectorId).toBe('sector-04');
    expect(merged.notificationLeadHours).toBe(24);
    expect(merged.notificationsEnabled).toBe(true);
    expect(merged.theme).toBe('dark');
    expect(merged.name).toBe(pilotUser.name);
  });

  it('keeps the original user when no preferences were saved', () => {
    const merged = mergeUserPreferences(pilotUser, null);

    expect(merged).toEqual(pilotUser);
  });
});
