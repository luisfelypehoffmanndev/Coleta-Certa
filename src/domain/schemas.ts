import { z } from 'zod';

import { neighborhoods, wasteTypes } from './types';

export const wasteTypeSchema = z.enum(wasteTypes);
export const neighborhoodSchema = z.enum(neighborhoods);

export const userProfileSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2),
  email: z.email(),
  city: z.string().min(2),
  neighborhood: neighborhoodSchema,
  notificationLeadHours: z.number().int().min(1).max(48),
  notificationsEnabled: z.boolean(),
});

export const collectionScheduleSchema = z.object({
  id: z.string().min(1),
  neighborhood: neighborhoodSchema,
  wasteType: wasteTypeSchema,
  weekday: z.number().int().min(0).max(6),
  startHour: z.number().int().min(0).max(23),
  guidance: z.string().min(8),
});

export const disposalLocationSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2),
  address: z.string().min(6),
  acceptedWaste: z.array(wasteTypeSchema).min(1),
  openingHours: z.string().min(3),
  distanceKm: z.number().nonnegative(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const serviceAlertSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(4),
  message: z.string().min(8),
  affectedNeighborhoods: z.array(neighborhoodSchema).min(1),
  startsAt: z.iso.datetime(),
  endsAt: z.iso.datetime(),
});
