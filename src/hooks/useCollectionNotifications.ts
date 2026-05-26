import { useEffect, useState } from 'react';

import {
  cancelCollectionReminder,
  scheduleCollectionReminder,
  type NotificationPermissionStatus,
  type ScheduledReminder,
} from '../services/notifications';
import type { UpcomingCollection, UserProfile } from '../domain/types';

interface CollectionNotificationState {
  permissionStatus: NotificationPermissionStatus;
  scheduledReminder: ScheduledReminder | null;
  isScheduling: boolean;
  error: string | null;
}

const initialState: CollectionNotificationState = {
  permissionStatus: 'unknown',
  scheduledReminder: null,
  isScheduling: false,
  error: null,
};

export function useCollectionNotifications(
  user: UserProfile | null,
  nextCollection?: UpcomingCollection,
) {
  const [state, setState] = useState<CollectionNotificationState>(initialState);

  useEffect(() => {
    let mounted = true;

    async function schedule() {
      if (!user || !user.notificationsEnabled || !nextCollection) {
        if (!user || !user.notificationsEnabled) {
          await cancelCollectionReminder().catch(() => undefined);
        }

        setState((current) => ({
          ...current,
          scheduledReminder: null,
          isScheduling: false,
          error: null,
        }));
        return;
      }

      setState((current) => ({
        ...current,
        isScheduling: true,
        error: null,
      }));

      try {
        const scheduledReminder = await scheduleCollectionReminder(user, nextCollection);

        if (!mounted) {
          return;
        }

        setState((current) => ({
          ...current,
          permissionStatus: scheduledReminder ? 'granted' : 'denied',
          scheduledReminder,
          isScheduling: false,
        }));
      } catch {
        if (!mounted) {
          return;
        }

        setState((current) => ({
          ...current,
          isScheduling: false,
          error: 'Não foi possível agendar o lembrete neste aparelho.',
        }));
      }
    }

    schedule();

    return () => {
      mounted = false;
    };
  }, [nextCollection, user]);

  return {
    ...state,
  };
}
