import { useEffect, useState } from 'react';

import {
  deleteAccount as deleteFirebaseAccount,
  signInWithPassword,
  signOut as signOutFirebase,
  signUpWithPassword,
  subscribeToAuthState,
} from '../services/authService';
import { clearSession, loadSession, saveSession } from '../services/sessionStorage';
import { clearUserPreferences, saveUserPreferences } from '../services/preferencesStorage';
import type { AuthSession, Neighborhood } from '../domain/types';

interface AuthState {
  session: AuthSession | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
}

const initialState: AuthState = {
  session: null,
  isLoading: true,
  isSubmitting: false,
  error: null,
};

export function useAuth() {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    let mounted = true;

    loadSession()
      .then((session) => {
        if (!mounted || !session) {
          return;
        }

        setState({
          session,
          isLoading: false,
          isSubmitting: false,
          error: null,
        });
      })
      .catch(() => undefined);

    const unsubscribe = subscribeToAuthState((session) => {
      if (!mounted) {
        return;
      }

      setState((current) => ({
        session: session ?? current.session,
        isLoading: false,
        isSubmitting: false,
        error: null,
      }));
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  async function signIn(email: string, password: string) {
    setState((current) => ({
      ...current,
      isSubmitting: true,
      error: null,
    }));

    try {
      const session = await signInWithPassword(email, password);
      await saveSession(session);

      setState({
        session,
        isLoading: false,
        isSubmitting: false,
        error: null,
      });
    } catch (error) {
      setState((current) => ({
        ...current,
        isSubmitting: false,
        error: error instanceof Error ? error.message : 'Não foi possível entrar.',
      }));
    }
  }

  async function signUp(name: string, email: string, password: string, neighborhood: Neighborhood) {
    setState((current) => ({
      ...current,
      isSubmitting: true,
      error: null,
    }));

    try {
      const session = await signUpWithPassword(name, email, password);
      await saveUserPreferences(session.userId, {
        neighborhood,
        notificationLeadHours: 12,
        notificationsEnabled: false,
        theme: 'light',
      });
      await saveSession(session);

      setState({
        session,
        isLoading: false,
        isSubmitting: false,
        error: null,
      });
    } catch (error) {
      setState((current) => ({
        ...current,
        isSubmitting: false,
        error: error instanceof Error ? error.message : 'Não foi possível criar a conta.',
      }));
    }
  }

  async function signOut() {
    await signOutFirebase();
    await clearSession();

    setState({
      session: null,
      isLoading: false,
      isSubmitting: false,
      error: null,
    });
  }

  async function deleteAccount(password: string) {
    if (!state.session) {
      return;
    }

    setState((current) => ({
      ...current,
      isSubmitting: true,
      error: null,
    }));

    try {
      await deleteFirebaseAccount(state.session.email, password);
      await Promise.all([clearSession(), clearUserPreferences(state.session.userId)]);

      setState({
        session: null,
        isLoading: false,
        isSubmitting: false,
        error: null,
      });
    } catch (error) {
      setState((current) => ({
        ...current,
        isSubmitting: false,
        error: error instanceof Error ? error.message : 'Não foi possível excluir sua conta.',
      }));
    }
  }

  return {
    ...state,
    signIn,
    signUp,
    signOut,
    deleteAccount,
  };
}
