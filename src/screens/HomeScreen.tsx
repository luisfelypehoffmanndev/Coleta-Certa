import { Linking, Pressable, Text, View } from 'react-native';

import { WasteIcon } from '../components/WasteIcon';
import { getAppStyles, getThemeColors } from '../ui/styles';
import { getWasteLabel } from '../domain/schedule';
import { getSectorLabel } from '../domain/sectors';
import type { ServiceAlert, UpcomingCollection, UserProfile } from '../domain/types';

function formatReminder(dateIso: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
  }).format(new Date(dateIso));
}

interface HomeScreenProps {
  user: UserProfile;
  nextCollection?: UpcomingCollection;
  activeAlerts: ServiceAlert[];
  upcomingCollections: UpcomingCollection[];
}

const officialMapUrl =
  'https://www.google.com/maps/d/u/1/edit?mid=1Yc8ek78vuJQatbjPNKn2rSQr15FrGi4&usp=sharing';

export function HomeScreen({
  user,
  nextCollection,
  activeAlerts,
  upcomingCollections,
}: HomeScreenProps) {
  const styles = getAppStyles(user.theme);
  const colors = getThemeColors(user.theme);

  return (
    <>
      <View style={[styles.topHeaderHero, styles.heroCard]}>
        <View style={styles.brandRow}>
          <View style={styles.brandBadge}>
            <Text style={styles.brandBadgeText}>CC</Text>
          </View>
          <View style={styles.brandTextBlock}>
            <Text style={styles.brandTitle}>Coleta Certa</Text>
            <View style={styles.locationRow}>
              <View style={styles.pinDot} />
              <Text style={styles.locationText}>
                Santo Ângelo - {getSectorLabel(user.sectorId)}
              </Text>
            </View>
          </View>
        </View>

        {nextCollection ? (
          <View style={styles.nextCollectionCard}>
            <View style={styles.nextCollectionTopRow}>
              <Text style={styles.nextCollectionEyebrow}>Próxima coleta</Text>
              <View style={styles.timePill}>
                <Text style={styles.timePillText}>
                  {new Intl.DateTimeFormat('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  }).format(new Date(nextCollection.occursAt))}
                </Text>
              </View>
            </View>
            <Text style={styles.nextCollectionTitle}>
              {new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })
                .format(new Date(nextCollection.occursAt))
                .replace(/^\w/, (char) => char.toUpperCase())}
            </Text>
            <Text style={styles.nextCollectionSubtitle}>
              {new Intl.DateTimeFormat('pt-BR', {
                weekday: 'long',
                day: '2-digit',
                month: 'short',
              })
                .format(new Date(nextCollection.occursAt))
                .replace(/^\w/, (char) => char.toUpperCase())}
            </Text>
            <View style={styles.divider} />
            <View style={styles.wasteInline}>
              <Text style={styles.wasteInlineTextLight}>
                {getWasteLabel(nextCollection.wasteType)}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.nextCollectionCard}>
            <Text style={styles.nextCollectionEyebrow}>Consulte seu setor</Text>
            <Text style={styles.nextCollectionTitle}>Horário por endereço</Text>
            <Text style={styles.nextCollectionSubtitle}>
              A Prefeitura orienta confirmar dia e turno no mapa oficial da coleta seletiva.
            </Text>
            <Pressable accessibilityRole="link" onPress={() => Linking.openURL(officialMapUrl)}>
              <Text style={styles.tipLink}>Abrir mapa oficial →</Text>
            </Pressable>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Próximas Coletas</Text>
        {upcomingCollections.length ? (
          upcomingCollections.map((item) => (
            <View key={item.id} style={styles.scheduleCard}>
              <View style={styles.scheduleCardMain}>
                <View
                  style={[
                    styles.wasteBadge,
                    { backgroundColor: colors.waste[item.wasteType] },
                  ]}
                >
                  <WasteIcon color={colors.wasteText[item.wasteType]} type={item.wasteType} />
                </View>
                <View style={styles.scheduleCardText}>
                  <Text style={styles.scheduleTitle}>{getWasteLabel(item.wasteType)}</Text>
                  <Text style={styles.scheduleMeta}>
                    {formatReminder(item.occursAt)} {item.weekdayLabel}
                  </Text>
                </View>
              </View>
              <Text style={styles.scheduleTime}>
                {new Intl.DateTimeFormat('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                }).format(new Date(item.occursAt))}
              </Text>
            </View>
          ))
        ) : (
          <View style={styles.noteCardInline}>
            <Text style={styles.noteText}>
              Este setor ainda não tem agenda local confirmada no app. Consulte o mapa oficial
              para ver dia e turno por endereço.
            </Text>
          </View>
        )}
      </View>

      {activeAlerts.map((alert) => (
        <View key={alert.id} style={styles.alertCard}>
          <Text style={styles.alertTitle}>{alert.title}</Text>
          <Text style={styles.alertText}>{alert.message}</Text>
        </View>
      ))}
    </>
  );
}
