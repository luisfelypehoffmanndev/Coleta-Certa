import { useEffect, useState } from 'react';

import { mergeUserPreferences } from '../domain/preferences';
import { loadUserPreferences, saveUserPreferences } from '../services/preferencesStorage';
import {
  fetchCollectionSchedules,
  fetchDisposalLocations,
  fetchPilotUser,
  fetchServiceAlerts,
} from '../services/mockApi';
import type {
  CollectionSchedule,
  DisposalLocation,
  Neighborhood,
  ServiceAlert,
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

export function useEcoletaData() {
  const [state, setState] = useState<EcoletaDataState>(initialState);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const [user, collectionSchedules, disposalLocations, serviceAlerts, savedPreferences] =
        await Promise.all([
          fetchPilotUser(),
          fetchCollectionSchedules(),
          fetchDisposalLocations(),
          fetchServiceAlerts(),
          loadUserPreferences(),
        ]);

      if (!mounted) {
        return;
      }

      setState({
        user: mergeUserPreferences(user, savedPreferences),
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
  }, []);

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
      await saveUserPreferences({
        neighborhood,
        notificationLeadHours,
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
  };
}
