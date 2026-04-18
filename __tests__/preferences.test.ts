import { mergeUserPreferences } from '../src/domain/preferences';
import { pilotUser } from '../src/data/mockData';

describe('preferences domain', () => {
  it('merges saved preferences over the pilot user', () => {
    const merged = mergeUserPreferences(pilotUser, {
      neighborhood: 'Jardim das Flores',
      notificationLeadHours: 24,
    });

    expect(merged.neighborhood).toBe('Jardim das Flores');
    expect(merged.notificationLeadHours).toBe(24);
    expect(merged.name).toBe(pilotUser.name);
  });

  it('keeps the original user when no preferences were saved', () => {
    const merged = mergeUserPreferences(pilotUser, null);

    expect(merged).toEqual(pilotUser);
  });
});
