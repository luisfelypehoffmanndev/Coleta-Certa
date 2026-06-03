import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { buildUpcomingCollections, getActiveAlerts, getNextCollection } from '../domain/schedule';
import { AppIcon, type AppIconName } from '../components/AppIcon';
import { useAuth } from '../hooks/useAuth';
import { useCollectionNotifications } from '../hooks/useCollectionNotifications';
import { useEcoletaData } from '../hooks/useEcoletaData';
import { getAppStyles, getThemeColors } from '../ui/styles';
import { CalendarScreen } from './CalendarScreen';
import { DisposalScreen } from './DisposalScreen';
import { HomeScreen } from './HomeScreen';
import { LoginScreen } from './LoginScreen';
import { ProfileScreen } from './ProfileScreen';

type TabKey = 'home' | 'calendar' | 'disposal' | 'profile';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'home', label: 'Início' },
  { key: 'calendar', label: 'Calendário' },
  { key: 'disposal', label: 'Dicas' },
  { key: 'profile', label: 'Config' },
];

function TabIcon({
  type,
  selected,
  theme,
}: {
  type: TabKey;
  selected: boolean;
  theme?: Parameters<typeof getThemeColors>[0];
}) {
  const colors = getThemeColors(theme);
  const names: Record<TabKey, AppIconName> = {
    home: 'home',
    calendar: 'calendar',
    disposal: 'map',
    profile: 'settings',
  };

  return <AppIcon color={selected ? colors.primary : colors.textMuted} name={names[type]} size={18} />;
}

export function EcoletaApp() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const {
    session,
    isLoading: isAuthLoading,
    isSubmitting,
    error,
    signIn,
    signUp,
    signOut,
    deleteAccount,
  } = useAuth();
  const {
    user,
    collectionSchedules,
    disposalLocations,
    serviceAlerts,
    isLoading,
    isSavingPreferences,
    error: dataError,
    updatePreferences,
    updateNotificationsEnabled,
    updateTheme,
  } = useEcoletaData(session);
  const currentDate = useMemo(() => new Date(), []);
  const activeUser = session ? user : null;
  const styles = getAppStyles(activeUser?.theme);
  const nextCollection = useMemo(
    () => (activeUser ? getNextCollection(collectionSchedules, activeUser, currentDate) : undefined),
    [activeUser, collectionSchedules, currentDate],
  );
  const upcomingCollections = useMemo(
    () =>
      activeUser
        ? buildUpcomingCollections(
            collectionSchedules,
            activeUser.sectorId,
            activeUser.notificationLeadHours,
            currentDate,
          ).slice(0, 3)
        : [],
    [activeUser, collectionSchedules, currentDate],
  );
  const notificationNextCollection = useMemo(
    () => (activeUser ? getNextCollection(collectionSchedules, activeUser, currentDate) : undefined),
    [activeUser, collectionSchedules, currentDate],
  );
  const notificationState = useCollectionNotifications(activeUser, notificationNextCollection);
  const activeAlerts = useMemo(
    () => (activeUser ? getActiveAlerts(serviceAlerts, activeUser, currentDate) : []),
    [activeUser, currentDate, serviceAlerts],
  );

  if (isAuthLoading) {
    return (
      <View style={[styles.loadingWrap, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <StatusBar style="dark" />
        <View style={styles.loadingCard}>
          <Text style={styles.eyebrow}>Coleta Certa</Text>
          <Text style={styles.title}>Verificando sessão</Text>
          <Text style={styles.subtitle}>
            Estamos validando a sessão local para proteger o acesso ao aplicativo.
          </Text>
        </View>
      </View>
    );
  }

  if (!session) {
    return (
      <LoginScreen
        error={error}
        isSubmitting={isSubmitting}
        onSignIn={signIn}
        onSignUp={signUp}
      />
    );
  }

  if (isLoading || !user) {
    return (
      <View style={[styles.loadingWrap, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <StatusBar style="dark" />
        <View style={styles.loadingCard}>
          <Text style={styles.eyebrow}>Coleta Certa</Text>
          <Text style={styles.title}>
            {dataError ? 'Falha ao carregar dados' : 'Carregando dados de Santo Ângelo'}
          </Text>
          <Text style={styles.subtitle}>
            {dataError ||
              'Estamos preparando a agenda por setor e os canais oficiais da coleta seletiva.'}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.shell, { paddingTop: insets.top }]}>
      <StatusBar style={user.theme === 'dark' ? 'light' : 'dark'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.authenticatedKeyboardAvoider}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.content, styles.contentWithTabs]}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        >
          {activeTab === 'home' ? (
            <HomeScreen
              user={user}
              nextCollection={nextCollection}
              activeAlerts={activeAlerts}
              upcomingCollections={upcomingCollections}
            />
          ) : null}

          {activeTab === 'calendar' ? (
            <CalendarScreen
              user={user}
              collectionSchedules={collectionSchedules}
              referenceDate={currentDate}
            />
          ) : null}

          {activeTab === 'disposal' ? (
            <DisposalScreen locations={disposalLocations} theme={user.theme} />
          ) : null}

          {activeTab === 'profile' ? (
            <ProfileScreen
              user={user}
              isSavingPreferences={isSavingPreferences}
              notificationPermissionStatus={notificationState.permissionStatus}
              scheduledReminder={notificationState.scheduledReminder}
              isSchedulingNotification={notificationState.isScheduling}
              hasSchedulableCollection={Boolean(notificationNextCollection)}
              notificationError={notificationState.error}
              accountError={error}
              isSubmittingAccountAction={isSubmitting}
              onSectorChange={(value) =>
                updatePreferences(value, user.notificationLeadHours)
              }
              onLeadHoursChange={(value) => updatePreferences(user.sectorId, value)}
              onNotificationsEnabledChange={updateNotificationsEnabled}
              onThemeChange={updateTheme}
              onSignOut={signOut}
              onDeleteAccount={deleteAccount}
            />
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.tabBar, { paddingBottom: 14 + insets.bottom }]}>
        {tabs.map((tab) => {
          const selected = tab.key === activeTab;
          return (
            <Pressable
              key={tab.key}
              accessibilityRole="button"
              onPress={() => setActiveTab(tab.key)}
              style={styles.tabButton}
            >
              <View style={[styles.tabIcon, selected && styles.tabIconActive]}>
                <TabIcon type={tab.key} selected={selected} theme={activeUser?.theme} />
              </View>
              <Text style={[styles.tabButtonText, selected && styles.tabButtonTextActive]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
