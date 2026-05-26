import { buildUpcomingCollections, getNextCollection } from '../src/domain/schedule';
import { collectionSchedules, pilotUser } from '../src/data/mockData';

describe('schedule domain', () => {
  it('orders upcoming collections by nearest date for the selected neighborhood', () => {
    const items = buildUpcomingCollections(
      collectionSchedules,
      'Centro',
      12,
      new Date('2026-04-17T10:00:00.000Z'),
    );

    expect(items).toHaveLength(2);
    expect(items[0].wasteType).toBe('dry');
    expect(items[1].wasteType).toBe('wet');
  });

  it('derives the next collection and reminder timestamp from user preferences', () => {
    const item = getNextCollection(
      collectionSchedules,
      pilotUser,
      new Date('2026-04-17T10:00:00.000Z'),
    );

    expect(item?.wasteType).toBe('dry');
    expect(item?.weekdayLabel).toBe('Sex');
    expect(item?.reminderAt).toBe('2026-04-17T01:00:00.000Z');
  });
});
