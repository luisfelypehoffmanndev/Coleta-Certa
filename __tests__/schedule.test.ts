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

    expect(items).toHaveLength(3);
    expect(items[0].wasteType).toBe('recyclable');
    expect(items[1].wasteType).toBe('electronic');
    expect(items[2].wasteType).toBe('organic');
  });

  it('derives the next collection and reminder timestamp from user preferences', () => {
    const item = getNextCollection(
      collectionSchedules,
      pilotUser,
      new Date('2026-04-17T10:00:00.000Z'),
    );

    expect(item?.wasteType).toBe('recyclable');
    expect(item?.weekdayLabel).toBe('Sex');
    expect(item?.reminderAt).toBe('2026-04-16T23:00:00.000Z');
  });
});
