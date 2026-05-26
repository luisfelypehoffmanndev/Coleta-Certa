import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { buildUpcomingCollections, getActiveAlerts, getNextCollection } from '../domain/schedule';
import { useAuth } from '../hooks/useAuth';
import { useCollectionNotifications } from '../hooks/useCollectionNotifications';
import { useEcoletaData } from '../hooks/useEcoletaData';
import { appStyles as styles } from '../ui/styles';
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

function TabIcon({ type, selected }: { type: TabKey; selected: boolean }) {
  if (type === 'home') {
    return (
      <View style={styles.homeIcon}>
        <View style={[styles.homeIconRoof, selected && styles.iconShapeActive]} />
        <View style={[styles.homeIconBase, selected && styles.iconShapeActive]} />
      </View>
    );
  }

  if (type === 'calendar') {
    return (
      <View style={[styles.calendarIconBox, selected && styles.iconStrokeActive]}>
        <View style={[styles.calendarIconTop, selected && styles.iconShapeActive]} />
        <View style={styles.calendarIconGrid}>
          <View style={[styles.calendarIconDot, selected && styles.iconShapeActive]} />
          <View style={[styles.calendarIconDot, selected && styles.iconShapeActive]} />
          <View style={[styles.calendarIconDot, selected && styles.iconShapeActive]} />
        </View>
      </View>
    );
  }

  if (type === 'disposal') {
    return (
      <View style={styles.tipsIcon}>
        <View style={[styles.tipsIconBubble, selected && styles.iconStrokeActive]}>
          <View style={[styles.tipsIconLineLong, selected && styles.iconShapeActive]} />
          <View style={[styles.tipsIconLineShort, selected && styles.iconShapeActive]} />
        </View>
        <View style={[styles.tipsIconTail, selected && styles.iconShapeActive]} />
      </View>
    );
  }

  return (
    <View style={styles.settingsIcon}>
      <View style={[styles.settingsIconCircle, selected && styles.iconStrokeActive]} />
      <View style={[styles.settingsIconSliderTop, selected && styles.iconShapeActive]} />
      <View style={[styles.settingsIconSliderBottom, selected && styles.iconShapeActive]} />
    </View>
  );
}

export function EcoletaApp() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const { session, isLoading: isAuthLoading, isSubmitting, error, signIn, signUp, signOut } = useAuth();
  const {
    user,
    collectionSchedules,
    disposalLocations,
    serviceAlerts,
    isLoading,
    isSavingPreferences,
    updatePreferences,
    updateNotificationsEnabled,
  } = useEcoletaData(session);
  const currentDate = useMemo(() => new Date(), []);
  const activeUser = session ? user : null;
  const nextCollection = useMemo(
    () => (activeUser ? getNextCollection(collectionSchedules, activeUser, currentDate) : undefined),
    [activeUser, collectionSchedules, currentDate],
  );
  const upcomingCollections = useMemo(
    () =>
      activeUser
        ? buildUpcomingCollections(
            collectionSchedules,
            activeUser.neighborhood,
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
      <View style={styles.loadingWrap}>
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
      <View style={styles.loadingWrap}>
        <StatusBar style="dark" />
        <View style={styles.loadingCard}>
          <Text style={styles.eyebrow}>Coleta Certa</Text>
          <Text style={styles.title}>Carregando dados de Santo Ângelo</Text>
          <Text style={styles.subtitle}>
            Estamos preparando a agenda por bairro e os canais oficiais da coleta seletiva.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.shell}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, styles.contentWithTabs]}
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

        {activeTab === 'disposal' ? <DisposalScreen locations={disposalLocations} /> : null}

        {activeTab === 'profile' ? (
          <ProfileScreen
            user={user}
            isSavingPreferences={isSavingPreferences}
            notificationPermissionStatus={notificationState.permissionStatus}
            scheduledReminder={notificationState.scheduledReminder}
            isSchedulingNotification={notificationState.isScheduling}
            hasSchedulableCollection={Boolean(notificationNextCollection)}
            notificationError={notificationState.error}
            onNeighborhoodChange={(value) =>
              updatePreferences(value, user.notificationLeadHours)
            }
            onLeadHoursChange={(value) => updatePreferences(user.neighborhood, value)}
            onNotificationsEnabledChange={updateNotificationsEnabled}
            onSignOut={signOut}
          />
        ) : null}
      </ScrollView>

      <View style={styles.tabBar}>
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
                <TabIcon type={tab.key} selected={selected} />
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
