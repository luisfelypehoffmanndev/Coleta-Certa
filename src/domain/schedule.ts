import type {
  CollectionSchedule,
  DisposalLocation,
  SectorId,
  ServiceAlert,
  UpcomingCollection,
  UserProfile,
  WasteType,
} from './types';

const weekdayLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

function cloneDate(date: Date) {
  return new Date(date.getTime());
}

function nextOccurrence(schedule: CollectionSchedule, now: Date) {
  const candidate = cloneDate(now);
  candidate.setHours(schedule.startHour, schedule.startMinute, 0, 0);

  const dayDelta = (schedule.weekday - candidate.getDay() + 7) % 7;
  candidate.setDate(candidate.getDate() + dayDelta);

  if (dayDelta === 0 && candidate <= now) {
    candidate.setDate(candidate.getDate() + 7);
  }

  return candidate;
}

function toIso(date: Date) {
  return date.toISOString();
}

export function getWasteLabel(type: WasteType) {
  const labels: Record<WasteType, string> = {
    wet: 'Lixo Úmido (não reciclável)',
    dry: 'Lixo Seco (reciclável)',
  };

  return labels[type];
}

export function buildUpcomingCollections(
  schedules: CollectionSchedule[],
  sectorId: SectorId,
  leadHours: number,
  now = new Date(),
): UpcomingCollection[] {
  return schedules
    .filter((schedule) => schedule.sectorId === sectorId)
    .map((schedule) => {
      const occursAt = nextOccurrence(schedule, now);
      const reminderAt = cloneDate(occursAt);
      reminderAt.setHours(reminderAt.getHours() - leadHours);

      return {
        ...schedule,
        occursAt: toIso(occursAt),
        weekdayLabel: weekdayLabels[schedule.weekday],
        reminderAt: toIso(reminderAt),
      };
    })
    .sort((left, right) => left.occursAt.localeCompare(right.occursAt));
}

export function getNextCollection(
  schedules: CollectionSchedule[],
  user: UserProfile,
  now = new Date(),
) {
  return buildUpcomingCollections(
    schedules,
    user.sectorId,
    user.notificationLeadHours,
    now,
  )[0];
}

export function getActiveAlerts(alerts: ServiceAlert[], user: UserProfile, now = new Date()) {
  return alerts.filter((alert) => {
    return (
      alert.affectedSectorIds.includes(user.sectorId) &&
      new Date(alert.endsAt).getTime() >= now.getTime()
    );
  });
}

export function formatScheduleTime(schedule: Pick<CollectionSchedule, 'startHour' | 'startMinute'>) {
  return `${String(schedule.startHour).padStart(2, '0')}:${String(schedule.startMinute).padStart(2, '0')}`;
}

export function buildDisposalMapUrl(location: DisposalLocation) {
  const query = encodeURIComponent(`${location.name}, ${location.address}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
