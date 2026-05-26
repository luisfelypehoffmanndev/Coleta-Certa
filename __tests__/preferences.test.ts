import { mergeUserPreferences } from '../src/domain/preferences';
import { pilotUser } from '../src/data/mockData';

describe('preferences domain', () => {
  it('merges saved preferences over the pilot user', () => {
    const merged = mergeUserPreferences(pilotUser, {
      neighborhood: 'Jardim das Palmeiras',
      notificationLeadHours: 24,
      notificationsEnabled: true,
    });

    expect(merged.neighborhood).toBe('Jardim das Palmeiras');
    expect(merged.notificationLeadHours).toBe(24);
    expect(merged.notificationsEnabled).toBe(true);
    expect(merged.name).toBe(pilotUser.name);
  });

  it('keeps the original user when no preferences were saved', () => {
    const merged = mergeUserPreferences(pilotUser, null);

    expect(merged).toEqual(pilotUser);
  });
});
