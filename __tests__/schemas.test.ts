import {
  collectionScheduleSchema,
  disposalLocationSchema,
  serviceAlertSchema,
  userProfileSchema,
} from '../src/domain/schemas';
import { collectionSchedules, disposalLocations, pilotUser, serviceAlerts } from '../src/data/mockData';

describe('contract schemas', () => {
  it('accepts the pilot user and collection fixtures', () => {
    expect(() => userProfileSchema.parse(pilotUser)).not.toThrow();
    expect(() => collectionScheduleSchema.array().parse(collectionSchedules)).not.toThrow();
  });

  it('accepts disposal locations and alerts', () => {
    expect(() => disposalLocationSchema.array().parse(disposalLocations)).not.toThrow();
    expect(() => serviceAlertSchema.array().parse(serviceAlerts)).not.toThrow();
  });

  it('rejects schedules with invalid weekday values', () => {
    expect(() =>
      collectionScheduleSchema.parse({
        ...collectionSchedules[0],
        weekday: 7,
      }),
    ).toThrow();
  });
});
