import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type User,
} from 'firebase/auth';

import { validateLoginInput, validateSignUpInput } from '../domain/auth';
import type { AuthSession } from '../domain/types';
import { firebaseAuth, hasFirebaseConfig } from './firebase';

export class AuthError extends Error {}

function ensureFirebaseConfig() {
  if (!hasFirebaseConfig()) {
    throw new AuthError(
      'Firebase não configurado. Preencha as variáveis EXPO_PUBLIC_FIREBASE_*.',
    );
  }
}

async function toSession(user: User): Promise<AuthSession> {
  return {
    userId: user.uid,
    email: user.email ?? '',
    displayName: user.displayName ?? user.email ?? 'Usuário',
    token: await user.getIdToken(),
  };
}

function mapFirebaseError(error: unknown) {
  const code = typeof error === 'object' && error && 'code' in error ? String(error.code) : '';

  if (code.includes('auth/invalid-credential') || code.includes('auth/wrong-password')) {
    return 'E-mail ou senha inválidos.';
  }

  if (code.includes('auth/email-already-in-use')) {
    return 'Este e-mail já está cadastrado.';
  }

  if (code.includes('auth/network-request-failed')) {
    return 'Falha de conexão. Verifique sua internet.';
  }

  return 'Não foi possível autenticar.';
}

export async function signInWithPassword(email: string, password: string) {
  const validationError = validateLoginInput(email, password);

  if (validationError) {
    throw new AuthError(validationError);
  }

  ensureFirebaseConfig();

  try {
    const credential = await signInWithEmailAndPassword(
      firebaseAuth,
      email.trim().toLowerCase(),
      password,
    );

    return toSession(credential.user);
  } catch (error) {
    throw new AuthError(mapFirebaseError(error));
  }
}

export async function signUpWithPassword(name: string, email: string, password: string) {
  const validationError = validateSignUpInput(name, email, password);

  if (validationError) {
    throw new AuthError(validationError);
  }

  ensureFirebaseConfig();

  try {
    const credential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email.trim().toLowerCase(),
      password,
    );

    await updateProfile(credential.user, { displayName: name.trim() });

    return toSession(credential.user);
  } catch (error) {
    throw new AuthError(mapFirebaseError(error));
  }
}

export function subscribeToAuthState(callback: (session: AuthSession | null) => void) {
  return onAuthStateChanged(firebaseAuth, async (user) => {
    callback(user ? await toSession(user) : null);
  });
}

export async function signOut() {
  await firebaseSignOut(firebaseAuth);
}
