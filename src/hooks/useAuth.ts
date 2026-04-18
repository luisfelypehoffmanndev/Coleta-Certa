import { useEffect, useState } from 'react';

import { loginWithPassword } from '../services/mockApi';
import { clearSession, loadSession, saveSession } from '../services/sessionStorage';
import type { AuthSession } from '../domain/types';

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
        if (!mounted) {
          return;
        }

        setState({
          session,
          isLoading: false,
          isSubmitting: false,
          error: null,
        });
      })
      .catch(() => {
        if (!mounted) {
          return;
        }

        setState((current) => ({
          ...current,
          isLoading: false,
        }));
      });

    return () => {
      mounted = false;
    };
  }, []);

  async function signIn(email: string, password: string) {
    setState((current) => ({
      ...current,
      isSubmitting: true,
      error: null,
    }));

    try {
      const session = await loginWithPassword(email, password);
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

  async function signOut() {
    await clearSession();

    setState({
      session: null,
      isLoading: false,
      isSubmitting: false,
      error: null,
    });
  }

  return {
    ...state,
    signIn,
    signOut,
  };
}
