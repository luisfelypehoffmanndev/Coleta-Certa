import { useEffect, useState } from 'react';

import { loadUserPreferences, saveUserPreferences } from '../services/preferencesStorage';
import {
  fetchCollectionSchedules,
  fetchDisposalLocations,
  fetchServiceAlerts,
} from '../services/mockApi';
import type {
  AuthSession,
  CollectionSchedule,
  DisposalLocation,
  Neighborhood,
  ServiceAlert,
  UserPreferences,
  UserProfile,
} from '../domain/types';

interface EcoletaDataState {
  user: UserProfile | null;
  collectionSchedules: CollectionSchedule[];
  disposalLocations: DisposalLocation[];
  serviceAlerts: ServiceAlert[];
  isLoading: boolean;
  isSavingPreferences: boolean;
}

const initialState: EcoletaDataState = {
  user: null,
  collectionSchedules: [],
  disposalLocations: [],
  serviceAlerts: [],
  isLoading: true,
  isSavingPreferences: false,
};

function buildUserFromSession(
  session: AuthSession,
  savedPreferences: Partial<UserPreferences> | null,
): UserProfile {
  return {
    id: session.userId,
    name: session.displayName || session.email,
    email: session.email,
    city: 'Santo Ângelo',
    neighborhood: savedPreferences?.neighborhood ?? 'Centro',
    notificationLeadHours: savedPreferences?.notificationLeadHours ?? 12,
    notificationsEnabled: savedPreferences?.notificationsEnabled ?? false,
    theme: savedPreferences?.theme ?? 'light',
  };
}

export function useEcoletaData(session: AuthSession | null) {
  const [state, setState] = useState<EcoletaDataState>(initialState);

  useEffect(() => {
    let mounted = true;

    async function load() {
      if (!session) {
        setState({
          ...initialState,
          isLoading: false,
        });
        return;
      }

      const [collectionSchedules, disposalLocations, serviceAlerts, savedPreferences] =
        await Promise.all([
          fetchCollectionSchedules(),
          fetchDisposalLocations(),
          fetchServiceAlerts(),
          loadUserPreferences(session.userId),
        ]);

      if (!mounted) {
        return;
      }

      setState({
        user: buildUserFromSession(session, savedPreferences),
        collectionSchedules,
        disposalLocations,
        serviceAlerts,
        isLoading: false,
        isSavingPreferences: false,
      });
    }

    load().catch(() => {
      if (!mounted) {
        return;
      }

      setState((current) => ({ ...current, isLoading: false }));
    });

    return () => {
      mounted = false;
    };
  }, [session]);

  async function updatePreferences(
    neighborhood: Neighborhood,
    notificationLeadHours: UserProfile['notificationLeadHours'],
  ) {
    if (!state.user) {
      return;
    }

    const nextUser = {
      ...state.user,
      neighborhood,
      notificationLeadHours,
    };

    setState((current) => ({
      ...current,
      user: nextUser,
      isSavingPreferences: true,
    }));

    try {
      await saveUserPreferences(nextUser.id, {
        neighborhood,
        notificationLeadHours,
        notificationsEnabled: nextUser.notificationsEnabled,
        theme: nextUser.theme,
      });
    } finally {
      setState((current) => ({
        ...current,
        isSavingPreferences: false,
      }));
    }
  }

  async function updateNotificationsEnabled(notificationsEnabled: boolean) {
    if (!state.user) {
      return;
    }

    const nextUser = {
      ...state.user,
      notificationsEnabled,
    };

    setState((current) => ({
      ...current,
      user: nextUser,
      isSavingPreferences: true,
    }));

    try {
      await saveUserPreferences(nextUser.id, {
        neighborhood: nextUser.neighborhood,
        notificationLeadHours: nextUser.notificationLeadHours,
        notificationsEnabled,
        theme: nextUser.theme,
      });
    } finally {
      setState((current) => ({
        ...current,
        isSavingPreferences: false,
      }));
    }
  }

  async function updateTheme(theme: UserProfile['theme']) {
    if (!state.user) {
      return;
    }

    const nextUser = {
      ...state.user,
      theme,
    };

    setState((current) => ({
      ...current,
      user: nextUser,
      isSavingPreferences: true,
    }));

    try {
      await saveUserPreferences(nextUser.id, {
        neighborhood: nextUser.neighborhood,
        notificationLeadHours: nextUser.notificationLeadHours,
        notificationsEnabled: nextUser.notificationsEnabled,
        theme,
      });
    } finally {
      setState((current) => ({
        ...current,
        isSavingPreferences: false,
      }));
    }
  }

  return {
    ...state,
    updatePreferences,
    updateNotificationsEnabled,
    updateTheme,
  };
}
