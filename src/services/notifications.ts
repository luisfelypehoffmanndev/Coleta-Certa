import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { getWasteLabel } from '../domain/schedule';
import type { UpcomingCollection, UserProfile } from '../domain/types';

const channelId = 'collection-reminders';
const collectionReminderId = 'coleta-certa-next-collection';

try {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
} catch {
  // Expo Go/devices without native notification support should still run the app.
}

export type NotificationPermissionStatus = 'unknown' | 'granted' | 'denied';

export interface ScheduledReminder {
  scheduledAt: string;
  collectionAt: string;
  notificationId: string;
}

export async function cancelCollectionReminder() {
  if (Notifications.cancelScheduledNotificationAsync) {
    await Notifications.cancelScheduledNotificationAsync(collectionReminderId);
  }
}

async function setupAndroidChannel() {
  if (Platform.OS !== 'android') {
    return;
  }

  if (!Notifications.setNotificationChannelAsync) {
    throw new Error('Notificações locais não estão disponíveis neste ambiente.');
  }

  await Notifications.setNotificationChannelAsync(channelId, {
    name: 'Lembretes de coleta',
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#10B881',
  });
}

export async function requestNotificationPermission(): Promise<NotificationPermissionStatus> {
  await setupAndroidChannel();

  if (!Notifications.getPermissionsAsync || !Notifications.requestPermissionsAsync) {
    throw new Error('Permissões de notificação não estão disponíveis neste ambiente.');
  }

  const current = await Notifications.getPermissionsAsync();

  if (current.granted) {
    return 'granted';
  }

  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted ? 'granted' : 'denied';
}

function getNextReminderDate(collection: UpcomingCollection, now = new Date()) {
  const reminder = new Date(collection.reminderAt);

  while (reminder <= now) {
    reminder.setDate(reminder.getDate() + 7);
  }

  return reminder;
}

export async function scheduleCollectionReminder(
  user: UserProfile,
  collection: UpcomingCollection,
): Promise<ScheduledReminder | null> {
  const permissionStatus = await requestNotificationPermission();

  if (permissionStatus !== 'granted') {
    return null;
  }

  if (!Notifications.scheduleNotificationAsync) {
    throw new Error('Agendamento de notificação não está disponível neste ambiente.');
  }

  await cancelCollectionReminder();

  const scheduledAt = getNextReminderDate(collection);
  const collectionAt = new Date(collection.occursAt);

  while (collectionAt <= scheduledAt) {
    collectionAt.setDate(collectionAt.getDate() + 7);
  }

  const notificationId = await Notifications.scheduleNotificationAsync({
    identifier: collectionReminderId,
    content: {
      title: 'Prepare o lixo para a coleta',
      body: `${getWasteLabel(collection.wasteType)} em ${user.neighborhood}. Separe e coloque para fora antes das ${String(
        collection.startHour,
      ).padStart(2, '0')}:00.`,
      sound: 'default',
      data: {
        collectionId: collection.id,
        neighborhood: user.neighborhood,
        wasteType: collection.wasteType,
      },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: scheduledAt,
      channelId,
    },
  });

  return {
    scheduledAt: scheduledAt.toISOString(),
    collectionAt: collectionAt.toISOString(),
    notificationId,
  };
}
