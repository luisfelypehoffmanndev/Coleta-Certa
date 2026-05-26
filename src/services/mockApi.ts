import {
  collectionScheduleSchema,
  disposalLocationSchema,
  serviceAlertSchema,
  userProfileSchema,
} from '../domain/schemas';
import { collectionSchedules, disposalLocations, pilotUser, serviceAlerts } from '../data/mockData';

export async function fetchPilotUser() {
  return userProfileSchema.parse(pilotUser);
}

export async function fetchCollectionSchedules() {
  return collectionScheduleSchema.array().parse(collectionSchedules);
}

export async function fetchDisposalLocations() {
  return disposalLocationSchema.array().parse(disposalLocations);
}

export async function fetchServiceAlerts() {
  return serviceAlertSchema.array().parse(serviceAlerts);
}
