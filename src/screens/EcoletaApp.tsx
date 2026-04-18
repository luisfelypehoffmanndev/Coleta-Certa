import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { buildUpcomingCollections, getActiveAlerts, getNextCollection } from '../domain/schedule';
import { useAuth } from '../hooks/useAuth';
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

const tabGlyphs: Record<TabKey, string> = {
  home: 'H',
  calendar: 'C',
  disposal: 'D',
  profile: 'P',
};

const referenceDate = new Date('2026-04-17T10:00:00.000Z');

export function EcoletaApp() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const { session, isLoading: isAuthLoading, isSubmitting, error, signIn, signOut } = useAuth();
  const {
    user,
    collectionSchedules,
    disposalLocations,
    serviceAlerts,
    isLoading,
    isSavingPreferences,
    updatePreferences,
  } = useEcoletaData();

  if (isAuthLoading) {
    return (
      <View style={styles.loadingWrap}>
        <StatusBar style="dark" />
        <View style={styles.loadingCard}>
          <Text style={styles.eyebrow}>Ecoleta</Text>
          <Text style={styles.title}>Verificando sessão</Text>
          <Text style={styles.subtitle}>
            Estamos validando a sessão local para proteger o acesso ao aplicativo.
          </Text>
        </View>
      </View>
    );
  }

  if (!session) {
    return <LoginScreen error={error} isSubmitting={isSubmitting} onSubmit={signIn} />;
  }

  if (isLoading || !user) {
    return (
      <View style={styles.loadingWrap}>
        <StatusBar style="dark" />
        <View style={styles.loadingCard}>
          <Text style={styles.eyebrow}>Ecoleta</Text>
          <Text style={styles.title}>Carregando dados do piloto</Text>
          <Text style={styles.subtitle}>
            Estamos preparando a agenda da sua região e os pontos de descarte.
          </Text>
        </View>
      </View>
    );
  }

  const nextCollection = getNextCollection(collectionSchedules, user, referenceDate);
  const upcomingCollections = buildUpcomingCollections(
    collectionSchedules,
    user.neighborhood,
    user.notificationLeadHours,
    referenceDate,
  ).slice(0, 3);
  const activeAlerts = getActiveAlerts(serviceAlerts, user, referenceDate);

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
            upcomingCollections={upcomingCollections}
          />
        ) : null}

        {activeTab === 'disposal' ? <DisposalScreen locations={disposalLocations} /> : null}

        {activeTab === 'profile' ? (
          <ProfileScreen
            user={user}
            isSavingPreferences={isSavingPreferences}
            onNeighborhoodChange={(value) =>
              updatePreferences(value, user.notificationLeadHours)
            }
            onLeadHoursChange={(value) => updatePreferences(user.neighborhood, value)}
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
                <Text style={[styles.tabIconText, selected && styles.tabIconTextActive]}>
                  {tabGlyphs[tab.key]}
                </Text>
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
