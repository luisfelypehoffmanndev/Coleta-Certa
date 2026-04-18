import {
  collectionScheduleSchema,
  disposalLocationSchema,
  serviceAlertSchema,
  userProfileSchema,
} from '../domain/schemas';
import { validateLoginInput } from '../domain/auth';
import { collectionSchedules, disposalLocations, pilotCredentials, pilotUser, serviceAlerts } from '../data/mockData';
import type { AuthSession } from '../domain/types';

export class AuthError extends Error {}

export async function loginWithPassword(
  email: string,
  password: string,
): Promise<AuthSession> {
  const validationError = validateLoginInput(email, password);

  if (validationError) {
    throw new AuthError(validationError);
  }

  if (
    email.trim().toLowerCase() !== pilotCredentials.email ||
    password !== pilotCredentials.password
  ) {
    throw new AuthError('E-mail ou senha inválidos.');
  }

  return {
    token: 'mock-session-token',
    userId: pilotUser.id,
  };
}

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
