import * as SecureStore from 'expo-secure-store';

import type { AuthSession } from '../domain/types';

const sessionKey = 'ecoleta_session';

export async function loadSession(): Promise<AuthSession | null> {
  const raw = await SecureStore.getItemAsync(sessionKey);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as AuthSession;

    if (!parsed.token || !parsed.userId) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export async function saveSession(session: AuthSession) {
  await SecureStore.setItemAsync(sessionKey, JSON.stringify(session));
}

export async function clearSession() {
  await SecureStore.deleteItemAsync(sessionKey);
}
