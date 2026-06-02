import { buildUpcomingCollections, getNextCollection } from '../src/domain/schedule';
import { collectionSchedules, pilotUser } from '../src/data/mockData';
import { collectionSectors } from '../src/domain/sectors';

describe('schedule domain', () => {
  it('orders upcoming collections by nearest date for the selected sector', () => {
    const items = buildUpcomingCollections(
      collectionSchedules,
      'sector-01',
      12,
      new Date(2026, 3, 17, 10),
    );

    expect(items).toHaveLength(10);
    expect(items[0].wasteType).toBe('dry');
    expect(items[1].wasteType).toBe('wet');
  });

  it('derives the next collection and reminder timestamp from user preferences', () => {
    const item = getNextCollection(
      collectionSchedules,
      pilotUser,
      new Date(2026, 3, 17, 10),
    );

    expect(item?.wasteType).toBe('dry');
    expect(item?.weekdayLabel).toBe('Sex');
    expect(new Date(item?.reminderAt ?? '').getHours()).toBe(7);
  });

  it('contains official schedules for all twelve sectors', () => {
    expect(collectionSectors).toHaveLength(12);

    collectionSectors.forEach((sector) => {
      expect(collectionSchedules.some((schedule) => schedule.sectorId === sector.id)).toBe(true);
    });
  });

  it('keeps the half-hour dry collection time for sector 04', () => {
    const sectorFourDrySchedules = collectionSchedules.filter(
      (schedule) => schedule.sectorId === 'sector-04' && schedule.wasteType === 'dry',
    );

    expect(sectorFourDrySchedules).toHaveLength(3);
    expect(sectorFourDrySchedules.every((schedule) => schedule.startHour === 16)).toBe(true);
    expect(sectorFourDrySchedules.every((schedule) => schedule.startMinute === 30)).toBe(true);
  });
});
