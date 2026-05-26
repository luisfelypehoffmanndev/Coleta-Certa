import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const rawFirebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const firebaseConfig = {
  apiKey: rawFirebaseConfig.apiKey ?? 'missing-api-key',
  authDomain: rawFirebaseConfig.authDomain ?? 'missing-auth-domain',
  projectId: rawFirebaseConfig.projectId ?? 'missing-project-id',
  appId: rawFirebaseConfig.appId ?? 'missing-app-id',
};

export function hasFirebaseConfig() {
  return Object.values(rawFirebaseConfig).every(Boolean);
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
