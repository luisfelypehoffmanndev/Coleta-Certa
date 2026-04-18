import { Text, View } from 'react-native';

import { colors, iconLabels } from '../theme/tokens';
import { appStyles as styles } from '../ui/styles';
import { getWasteLabel } from '../domain/schedule';
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

function getWasteBadge(type: UpcomingCollection['wasteType']) {
  return iconLabels[type];
}

function getWasteTextStyle(type: UpcomingCollection['wasteType']) {
  if (type === 'recyclable') {
    return styles.wasteBadgeTextCyan;
  }

  if (type === 'electronic') {
    return styles.wasteBadgeTextRed;
  }

  return undefined;
}

export function HomeScreen({
  user,
  nextCollection,
  activeAlerts,
  upcomingCollections,
}: HomeScreenProps) {
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
                Rua Bimbam, 666 - {user.neighborhood}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.nextCollectionCard}>
          {nextCollection ? (
            <>
              <View style={styles.nextCollectionTopRow}>
                <Text style={styles.nextCollectionEyebrow}>Próxima Coleta</Text>
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
            </>
          ) : null}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Próximas Coletas</Text>
        {upcomingCollections.map((item) => (
          <View key={item.id} style={styles.scheduleCard}>
            <View style={styles.scheduleCardMain}>
              <View
                style={[
                  styles.wasteBadge,
                  { backgroundColor: colors.waste[item.wasteType] },
                ]}
              >
                <Text style={[styles.wasteBadgeText, getWasteTextStyle(item.wasteType)]}>
                  {getWasteBadge(item.wasteType)}
                </Text>
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
        ))}
      </View>

      {activeAlerts.map((alert) => (
        <View key={alert.id} style={styles.alertCard}>
          <Text style={styles.alertTitle}>{alert.title}</Text>
          <Text style={styles.alertText}>{alert.message}</Text>
        </View>
      ))}

      <View style={[styles.section, styles.sectionCompact]}>
        <View style={[styles.card, styles.tipsCard]}>
          <Text style={[styles.sectionTitleSmall, { color: '#1D4ED8' }]}>Dicas de Reciclagem</Text>
          <View style={styles.listBlock}>
            <View style={styles.tipRow}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>Separe o lixo orgânico dos recicláveis</Text>
            </View>
            <View style={styles.tipRow}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>Lave as embalagens antes de descartar</Text>
            </View>
            <View style={styles.tipRow}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>Não misture lixo eletrônico com lixo comum</Text>
            </View>
          </View>
          <Text style={styles.tipLink}>Ver mais dicas →</Text>
          <Text style={styles.meta}>Notificação {user.notificationLeadHours}h antes</Text>
        </View>
      </View>
    </>
  );
}
