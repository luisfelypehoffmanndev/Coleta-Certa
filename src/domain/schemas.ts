import { z } from 'zod';

import { sectorIds, wasteTypes } from './types';

export const wasteTypeSchema = z.enum(wasteTypes);
export const sectorIdSchema = z.enum(sectorIds);

export const userProfileSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2),
  email: z.email(),
  city: z.string().min(2),
  sectorId: sectorIdSchema,
  notificationLeadHours: z.number().int().min(1).max(48),
  notificationsEnabled: z.boolean(),
  theme: z.enum(['light', 'dark']),
});

export const collectionScheduleSchema = z.object({
  id: z.string().min(1),
  sectorId: sectorIdSchema,
  wasteType: wasteTypeSchema,
  weekday: z.number().int().min(0).max(6),
  startHour: z.number().int().min(0).max(23),
  startMinute: z.number().int().min(0).max(59),
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
  affectedSectorIds: z.array(sectorIdSchema).min(1),
  startsAt: z.iso.datetime(),
  endsAt: z.iso.datetime(),
});
